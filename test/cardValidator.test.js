import { CardValidator } from '../src/js/cardValidator';

describe('CardValidator', () => {
  test('should validate valid card numbers', () => {
    expect(CardValidator.isValid('4111111111111111')).toBe(true);
    expect(CardValidator.isValid('5500000000000004')).toBe(true);
    expect(CardValidator.isValid('340000000000009')).toBe(true);
    expect(CardValidator.isValid('6011000000000004')).toBe(true);
  });

  test('should reject invalid card numbers', () => {
    expect(CardValidator.isValid('4111111111111112')).toBe(false);
    expect(CardValidator.isValid('1234567890123456')).toBe(false);
    expect(CardValidator.isValid('')).toBe(false);
    expect(CardValidator.isValid('123')).toBe(false);
  });

  test('should handle spaces and dashes', () => {
    expect(CardValidator.isValid('4111 1111 1111 1111')).toBe(true);
    expect(CardValidator.isValid('4111-1111-1111-1111')).toBe(true);
    expect(CardValidator.isValid('4111 1111 1111 1112')).toBe(false);
  });

  test('Luhn algorithm should work correctly', () => {
    expect(CardValidator.luhnAlgorithm('4111111111111111')).toBe(true);
    expect(CardValidator.luhnAlgorithm('5500000000000004')).toBe(true);
    expect(CardValidator.luhnAlgorithm('1234567890123456')).toBe(false);
  });
});