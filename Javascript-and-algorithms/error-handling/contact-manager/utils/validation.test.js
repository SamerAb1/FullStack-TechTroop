const {isValidName, isValidEmail, isValidPhone, validateContact} = require("./validation.js");
const {
  isValidName,
  isValidEmail,
  isValidPhone,
  validateContact,
} = require('./validation');

describe('Validation functions', () => {
  describe('isValidName', () => {
    it('accepts normal names', () => {
      expect(isValidName('John Doe')).toBe(true);
      expect(isValidName('Alice')).toBe(true);
    });
    it('rejects empty and numeric names', () => {
      expect(isValidName('')).toBe(false);
      expect(isValidName('1234')).toBe(false);
      expect(isValidName('John123')).toBe(false);
    });
  });

  describe('isValidEmail', () => {
    it('accepts valid emails', () => {
      expect(isValidEmail('john@example.com')).toBe(true);
      expect(isValidEmail('a@b.co')).toBe(true);
    });
    it('rejects invalid emails', () => {
      expect(isValidEmail('notanemail')).toBe(false);
      expect(isValidEmail('noatsign.com')).toBe(false);
      expect(isValidEmail('bad@nodot')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('accepts phone numbers with digits and dashes', () => {
      expect(isValidPhone('555-1234')).toBe(true);
      expect(isValidPhone('5551234')).toBe(true);
      expect(isValidPhone('123-456-7890')).toBe(true);
    });
    it('rejects letters and invalid formats', () => {
      expect(isValidPhone('phone123')).toBe(false);
      expect(isValidPhone('123 456')).toBe(false);
      expect(isValidPhone('')).toBe(false);
    });
  });

  describe('validateContact', () => {
    const base = { name: 'John Doe', email: 'john@example.com', phone: '555-1234' };

    it('returns valid for correct contact', () => {
      expect(validateContact(base, [])).toEqual({ valid: true });
    });

    it('detects missing or invalid name', () => {
      expect(validateContact({ ...base, name: '' }, [])).toEqual({
        valid: false,
        error: expect.stringContaining('Name is required')
      });
      expect(validateContact({ ...base, name: '1234' }, [])).toEqual({
        valid: false,
        error: expect.stringContaining('Name is required')
      });
    });

    it('detects missing @ in email', () => {
      expect(validateContact({ ...base, email: 'johnexample.com' }, [])).toEqual({
        valid: false,
        error: expect.stringContaining('Email must contain @ symbol')
      });
    });

    it('detects invalid email format', () => {
      expect(validateContact({ ...base, email: 'john@com' }, [])).toEqual({
        valid: false,
        error: expect.stringContaining('Email is required')
      });
    });

    it('detects missing or invalid phone', () => {
      expect(validateContact({ ...base, phone: '' }, [])).toEqual({
        valid: false,
        error: expect.stringContaining('Phone is required')
      });
      expect(validateContact({ ...base, phone: 'abc' }, [])).toEqual({
        valid: false,
        error: expect.stringContaining('Phone is required')
      });
    });

    it('detects duplicate email', () => {
      expect(validateContact(base, [base])).toEqual({
        valid: false,
        error: expect.stringContaining('already exists')
      });
    });
  });
});
