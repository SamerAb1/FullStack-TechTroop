// Mock fileUtils before requiring contactService!
jest.mock('../utils/fileUtils');

const { readContacts, saveContacts } = require('../utils/fileUtils');
const { addContact, deleteContact, listContacts, searchContacts } = require('./contactService');

describe('contactService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addContact', () => {
    it('adds a valid contact to empty list', () => {
      readContacts.mockImplementation(() => []);
      saveContacts.mockImplementation(() => {});
      expect(() =>
        addContact({ name: 'Alice', email: 'alice@example.com', phone: '123-4567' }, 'fake.json')
      ).not.toThrow();
      expect(saveContacts).toHaveBeenCalledWith('fake.json', [
        { name: 'Alice', email: 'alice@example.com', phone: '123-4567' }
      ]);
    });

    it('adds a valid contact to existing list', () => {
      readContacts.mockImplementation(() => [{ name: 'Bob', email: 'bob@example.com', phone: '555-3333' }]);
      saveContacts.mockImplementation(() => {});
      expect(() =>
        addContact({ name: 'Alice', email: 'alice@example.com', phone: '123-4567' }, 'fake.json')
      ).not.toThrow();
      expect(saveContacts).toHaveBeenCalledWith('fake.json', [
        { name: 'Bob', email: 'bob@example.com', phone: '555-3333' },
        { name: 'Alice', email: 'alice@example.com', phone: '123-4567' }
      ]);
    });

    it('throws on duplicate email', () => {
      readContacts.mockImplementation(() => [
        { name: 'Alice', email: 'alice@example.com', phone: '123-4567' }
      ]);
      expect(() =>
        addContact({ name: 'Alice', email: 'alice@example.com', phone: '123-4567' }, 'fake.json')
      ).toThrow(/already exists/);
    });

    it('creates file if not found', () => {
      // Simulate readContacts throws "File not found"
      readContacts.mockImplementation(() => {
        const err = new Error('File not found');
        throw err;
      });
      saveContacts.mockImplementation(() => {});
      expect(() =>
        addContact({ name: 'Alice', email: 'alice@example.com', phone: '123-4567' }, 'fake.json')
      ).not.toThrow();
      expect(saveContacts).toHaveBeenCalledWith('fake.json', [
        { name: 'Alice', email: 'alice@example.com', phone: '123-4567' }
      ]);
    });
  });

  describe('deleteContact', () => {
    it('deletes the contact with matching email', () => {
      readContacts.mockImplementation(() => [
        { name: 'Bob', email: 'bob@example.com', phone: '555-3333' }
      ]);
      saveContacts.mockImplementation(() => {});
      const result = deleteContact('bob@example.com', 'fake.json');
      expect(result.deleted).toEqual({ name: 'Bob', email: 'bob@example.com', phone: '555-3333' });
      expect(saveContacts).toHaveBeenCalledWith('fake.json', []);
    });

    it('throws if contact not found', () => {
      readContacts.mockImplementation(() => []);
      expect(() =>
        deleteContact('noone@example.com', 'fake.json')
      ).toThrow(/No contact found/);
    });
  });

  describe('listContacts', () => {
    it('returns all contacts', () => {
      const sampleContacts = [
        { name: 'A', email: 'a@a.com', phone: '111' },
        { name: 'B', email: 'b@b.com', phone: '222' }
      ];
      readContacts.mockImplementation(() => sampleContacts);
      expect(listContacts('fake.json')).toEqual(sampleContacts);
    });
  });

  describe('searchContacts', () => {
    it('returns matching contacts by name or email', () => {
      readContacts.mockImplementation(() => [
        { name: 'Bob', email: 'bob@example.com', phone: '111' },
        { name: 'Alice', email: 'alice@example.com', phone: '222' }
      ]);
      const { results, count } = searchContacts('bob', 'fake.json');
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('Bob');
      expect(count).toBe(2);
    });

    it('returns empty results when no match', () => {
      readContacts.mockImplementation(() => [
        { name: 'Bob', email: 'bob@example.com', phone: '111' }
      ]);
      const { results, count } = searchContacts('alice', 'fake.json');
      expect(results).toHaveLength(0);
      expect(count).toBe(1);
    });
  });
});
