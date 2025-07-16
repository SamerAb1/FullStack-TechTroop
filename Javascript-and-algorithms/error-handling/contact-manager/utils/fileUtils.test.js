const fs = require('fs');
const { readContacts, saveContacts } = require('./fileUtils');

// Mock fs methods
jest.mock('fs');

describe('fileUtils', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('readContacts', () => {
    it('reads and returns contacts if file is valid', () => {
      const sampleContacts = [{ name: 'Alice', email: 'a@a.com', phone: '123' }];
      fs.readFileSync.mockReturnValueOnce(JSON.stringify(sampleContacts));
      expect(readContacts('contacts.json')).toEqual(sampleContacts);
    });

    it('throws "File not found" if file does not exist (ENOENT)', () => {
      fs.readFileSync.mockImplementationOnce(() => {
        const err = new Error('no file');
        err.code = 'ENOENT';
        throw err;
      });
      expect(() => readContacts('contacts.json')).toThrow('File not found');
    });

    it('throws "Corrupted contacts file" if JSON is invalid', () => {
      fs.readFileSync.mockReturnValueOnce('{ this is not valid json');
      expect(() => readContacts('contacts.json')).toThrow('Corrupted contacts file');
    });

    it('throws "Corrupted contacts file" if file is not an array', () => {
      fs.readFileSync.mockReturnValueOnce(JSON.stringify({ not: 'an array' }));
      expect(() => readContacts('contacts.json')).toThrow('Corrupted contacts file');
    });
  });

  describe('saveContacts', () => {
    it('writes contacts to file as JSON', () => {
      fs.writeFileSync.mockImplementationOnce(() => {});
      const contacts = [{ name: 'Alice', email: 'a@a.com', phone: '123' }];
      expect(() => saveContacts('contacts.json', contacts)).not.toThrow();
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        'contacts.json',
        JSON.stringify(contacts, null, 2),
        'utf8'
      );
    });

    it('throws "Error writing file" if writeFileSync fails', () => {
      fs.writeFileSync.mockImplementationOnce(() => { throw new Error('fail'); });
      const contacts = [{ name: 'Alice', email: 'a@a.com', phone: '123' }];
      expect(() => saveContacts('contacts.json', contacts)).toThrow('Error writing file');
    });
  });
});
