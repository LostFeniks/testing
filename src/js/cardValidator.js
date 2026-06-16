export class CardValidator {
  static luhnAlgorithm(cardNumber) {
    const digits = cardNumber.replace(/\D/g, '').split('').map(Number);
    let sum = 0;
    let isEven = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = digits[i];

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  }

  static isValid(cardNumber) {
    if (!cardNumber) return false;
    const cleaned = cardNumber.replace(/\D/g, '');
    if (cleaned.length < 13 || cleaned.length > 19) return false;
    return this.luhnAlgorithm(cleaned);
  }
}