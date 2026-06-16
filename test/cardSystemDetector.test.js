import { CardSystemDetector } from '../src/js/cardSystemDetector';

describe('CardSystemDetector', () => {
  test('should detect Visa cards', () => {
    expect(CardSystemDetector.detectSystem('4111111111111111')).toBe('visa');
    expect(CardSystemDetector.detectSystem('4012888888881881')).toBe('visa');
    expect(CardSystemDetector.detectSystem('4222222222222')).toBe('visa');
    expect(CardSystemDetector.detectSystem('4532015112830366')).toBe('visa');
  });

  test('should detect Mastercard cards', () => {
    // 51-55
    expect(CardSystemDetector.detectSystem('5500000000000004')).toBe('mastercard');
    expect(CardSystemDetector.detectSystem('5111111111111118')).toBe('mastercard');
    expect(CardSystemDetector.detectSystem('5555555555554444')).toBe('mastercard');
    // 2221-2720
    expect(CardSystemDetector.detectSystem('2221000000000009')).toBe('mastercard');
    expect(CardSystemDetector.detectSystem('2223000000000007')).toBe('mastercard');
    expect(CardSystemDetector.detectSystem('2720000000000005')).toBe('mastercard');
    // Проверяем, что 2200-2204 не определяются как Mastercard
    expect(CardSystemDetector.detectSystem('2200000000000000')).not.toBe('mastercard');
  });

  test('should detect American Express cards', () => {
    expect(CardSystemDetector.detectSystem('340000000000009')).toBe('american-express');
    expect(CardSystemDetector.detectSystem('370000000000002')).toBe('american-express');
    expect(CardSystemDetector.detectSystem('378282246310005')).toBe('american-express');
  });

  test('should detect Discover cards', () => {
    // 6011
    expect(CardSystemDetector.detectSystem('6011000000000004')).toBe('discover');
    expect(CardSystemDetector.detectSystem('6011111111111117')).toBe('discover');
    // 622126-622925
    expect(CardSystemDetector.detectSystem('6221260000000000')).toBe('discover');
    expect(CardSystemDetector.detectSystem('6229250000000000')).toBe('discover');
    expect(CardSystemDetector.detectSystem('6221267890123456')).toBe('discover');
    // 644-649
    expect(CardSystemDetector.detectSystem('6440000000000000')).toBe('discover');
    expect(CardSystemDetector.detectSystem('6490000000000000')).toBe('discover');
    expect(CardSystemDetector.detectSystem('6450000000000000')).toBe('discover');
    // 65
    expect(CardSystemDetector.detectSystem('6500000000000002')).toBe('discover');
    expect(CardSystemDetector.detectSystem('6512345678901234')).toBe('discover');
  });

  test('should detect MIR cards', () => {
    expect(CardSystemDetector.detectSystem('2200000000000000')).toBe('mir');
    expect(CardSystemDetector.detectSystem('2204123456789012')).toBe('mir');
    expect(CardSystemDetector.detectSystem('2202202202202200')).toBe('mir');
    expect(CardSystemDetector.detectSystem('2201000000000000')).toBe('mir');
    expect(CardSystemDetector.detectSystem('2204000000000000')).toBe('mir');
  });

  test('should return unknown for unrecognized cards', () => {
    expect(CardSystemDetector.detectSystem('1111111111111111')).toBe('unknown');
    expect(CardSystemDetector.detectSystem('1234567890123456')).toBe('unknown');
    expect(CardSystemDetector.detectSystem('9999999999999999')).toBe('unknown');
  });

  test('should handle spaces and dashes', () => {
    expect(CardSystemDetector.detectSystem('4111 1111 1111 1111')).toBe('visa');
    expect(CardSystemDetector.detectSystem('5500 0000 0000 0004')).toBe('mastercard');
    expect(CardSystemDetector.detectSystem('6011-0000-0000-0004')).toBe('discover');
    expect(CardSystemDetector.detectSystem('2200 0000 0000 0000')).toBe('mir');
  });

  test('should return correct icon name', () => {
    expect(CardSystemDetector.getCardIcon('visa')).toBe('visa.png');
    expect(CardSystemDetector.getCardIcon('mastercard')).toBe('mastercard.png');
    expect(CardSystemDetector.getCardIcon('american-express')).toBe('american-express.png');
    expect(CardSystemDetector.getCardIcon('discover')).toBe('discover.png');
    expect(CardSystemDetector.getCardIcon('mir')).toBe('mir.png');
    expect(CardSystemDetector.getCardIcon('unknown')).toBe('unknown.png');
  });

  test('should return correct system name', () => {
    expect(CardSystemDetector.getSystemName('visa')).toBe('Visa');
    expect(CardSystemDetector.getSystemName('mastercard')).toBe('Mastercard');
    expect(CardSystemDetector.getSystemName('american-express')).toBe('American Express');
    expect(CardSystemDetector.getSystemName('discover')).toBe('Discover');
    expect(CardSystemDetector.getSystemName('mir')).toBe('МИР');
    expect(CardSystemDetector.getSystemName('unknown')).toBe('Неизвестная система');
  });
});