// Mock the service layer
jest.mock('../services/contactService');

const {addContact, deleteContact, listContacts, searchContacts} = require('../services/contactService');
const { handleCommand, printUsage } = require('./commandHandler');

describe('commandHandler', () => {
  let logSpy;
  const fakePath = 'contacts.json';

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.clearAllMocks();
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('should print usage and error for missing arguments in add', () => {
    handleCommand('add', ['John'], fakePath);
    expect(logSpy).toHaveBeenCalledWith('Error: Missing arguments for add command');
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Usage: node contacts.js [command]'));
  });

  it('should add contact and print output', () => {
    addContact.mockImplementation(() => {});
    listContacts.mockImplementation(() => [{ name: 'John Doe', email: 'john@example.com', phone: '555-123-4567' }]);
    handleCommand('add', ['John Doe', 'john@example.com', '555-123-4567'], fakePath);
    expect(logSpy).toHaveBeenCalledWith('Loading contacts from contacts.json...');
    expect(logSpy).toHaveBeenCalledWith('Contact added: John Doe');
    expect(logSpy).toHaveBeenCalledWith('Contacts saved to contacts.json');
  });

  it('should print error if addContact throws "File not found" and then adds contact', () => {
    let firstCall = true;
    addContact.mockImplementation(() => {
      if (firstCall) {
        firstCall = false;
        const err = new Error('File not found');
        throw err;
      }
    });
    listContacts.mockImplementation(() => [{ name: 'John Doe', email: 'john@example.com', phone: '555-123-4567' }]);
    handleCommand('add', ['John Doe', 'john@example.com', '555-123-4567'], fakePath);
    expect(logSpy).toHaveBeenCalledWith('File not found - creating new contact list');
    expect(logSpy).toHaveBeenCalledWith('Contact added: John Doe');
    expect(logSpy).toHaveBeenCalledWith('Contacts saved to contacts.json');
  });

  it('should print error if addContact throws validation error', () => {
    addContact.mockImplementation(() => {
      throw new Error('Error: Email must contain @ symbol');
    });
    handleCommand('add', ['John Doe', 'invalidemail', '555-123-4567'], fakePath);
    expect(logSpy).toHaveBeenCalledWith('Error: Email must contain @ symbol');
  });

  it('should print all contacts on list', () => {
    listContacts.mockImplementation(() => [
      { name: 'Alice', email: 'alice@example.com', phone: '111' },
      { name: 'Bob', email: 'bob@example.com', phone: '222' }
    ]);
    handleCommand('list', [], fakePath);
    expect(logSpy).toHaveBeenCalledWith('Loading contacts from contacts.json...');
    expect(logSpy).toHaveBeenCalledWith('Loaded 2 contacts\n');
    expect(logSpy).toHaveBeenCalledWith('=== All Contacts ===');
    expect(logSpy).toHaveBeenCalledWith('1. Alice - alice@example.com - 111');
    expect(logSpy).toHaveBeenCalledWith('2. Bob - bob@example.com - 222');
  });

  it('should print no contacts found when list is empty', () => {
    listContacts.mockImplementation(() => []);
    handleCommand('list', [], fakePath);
    expect(logSpy).toHaveBeenCalledWith('No contacts found.');
  });

  it('should print search results', () => {
    searchContacts.mockImplementation(() => ({
      results: [{ name: 'Alice', email: 'alice@example.com', phone: '111' }],
      count: 2
    }));
    handleCommand('search', ['Alice'], fakePath);
    expect(logSpy).toHaveBeenCalledWith('Loading contacts from contacts.json...');
    expect(logSpy).toHaveBeenCalledWith('Loaded 2 contacts\n');
    expect(logSpy).toHaveBeenCalledWith('=== Search Results for "Alice" ===');
    expect(logSpy).toHaveBeenCalledWith('1. Alice - alice@example.com - 111');
  });

  it('should print "no contacts found" when search returns empty', () => {
    searchContacts.mockImplementation(() => ({ results: [], count: 2 }));
    handleCommand('search', ['notfound'], fakePath);
    expect(logSpy).toHaveBeenCalledWith('No contacts found matching "notfound"');
  });

  it('should print error if search called with no query', () => {
    handleCommand('search', [], fakePath);
    expect(logSpy).toHaveBeenCalledWith('Error: Missing query for search command');
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Usage: node contacts.js [command]'));
  });

  it('should delete a contact and print result', () => {
    listContacts.mockImplementation(() => [
      { name: 'Bob', email: 'bob@example.com', phone: '222' }
    ]);
    deleteContact.mockImplementation(() => ({ deleted: { name: 'Bob', email: 'bob@example.com', phone: '222' } }));
    handleCommand('delete', ['bob@example.com'], fakePath);
    expect(logSpy).toHaveBeenCalledWith('Contact deleted: Bob');
    expect(logSpy).toHaveBeenCalledWith('Contacts saved to contacts.json');
  });

  it('should print error if contact not found on delete', () => {
    listContacts.mockImplementation(() => []);
    deleteContact.mockImplementation(() => { throw new Error('Error: No contact found with email: bob@example.com'); });
    handleCommand('delete', ['bob@example.com'], fakePath);
    expect(logSpy).toHaveBeenCalledWith('Error: No contact found with email: bob@example.com');
  });

  it('should print usage on help', () => {
    handleCommand('help', [], fakePath);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Usage: node contacts.js [command]'));
  });

  it('should print error and usage on unknown command', () => {
    handleCommand('foobar', [], fakePath);
    expect(logSpy).toHaveBeenCalledWith(`Error: Unknown command 'foobar'`);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Usage: node contacts.js [add|list|search|delete|help]'));
  });
});
