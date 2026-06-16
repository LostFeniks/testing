export class CardSystemDetector {
  static detectSystem(cardNumber) {
    const cleaned = cardNumber.replace(/\D/g, '');
    if (!cleaned || cleaned.length === 0) return 'unknown';
    
    const firstDigit = parseInt(cleaned[0]);
    const firstTwoDigits = parseInt(cleaned.substring(0, 2));
    const firstThreeDigits = parseInt(cleaned.substring(0, 3));
    const firstFourDigits = parseInt(cleaned.substring(0, 4));
    const firstSixDigits = parseInt(cleaned.substring(0, 6));

    // Проверяем в порядке приоритета (от более специфичных к общим)

    // 1. МИР: 2200-2204 (самый специфичный диапазон)
    if (firstFourDigits >= 2200 && firstFourDigits <= 2204) {
      return 'mir';
    }

    // 2. American Express: 34 или 37
    if (firstTwoDigits === 34 || firstTwoDigits === 37) {
      return 'american-express';
    }

    // 3. Discover: 6011, 622126-622925, 644-649, 65
    if (firstFourDigits === 6011 ||
        (firstSixDigits >= 622126 && firstSixDigits <= 622925) ||
        (firstThreeDigits >= 644 && firstThreeDigits <= 649) ||
        firstTwoDigits === 65) {
      return 'discover';
    }

    // 4. Visa: начинается с 4
    if (firstDigit === 4) {
      return 'visa';
    }

    // 5. Mastercard: 51-55 или 2221-2720 (исключая уже обработанные 2200-2204)
    if ((firstTwoDigits >= 51 && firstTwoDigits <= 55) ||
        (firstTwoDigits >= 22 && firstTwoDigits <= 27 && 
         !(firstFourDigits >= 2200 && firstFourDigits <= 2204))) {
      return 'mastercard';
    }

    return 'unknown';
  }

  static getCardIcon(system) {
    const icons = {
      'visa': 'visa.png',
      'mastercard': 'mastercard.png',
      'american-express': 'american-express.png',
      'discover': 'discover.png',
      'mir': 'mir.png',
      'unknown': 'unknown.png'
    };
    return icons[system] || icons.unknown;
  }

  static getSystemName(system) {
    const names = {
      'visa': 'Visa',
      'mastercard': 'Mastercard',
      'american-express': 'American Express',
      'discover': 'Discover',
      'mir': 'МИР',
      'unknown': 'Неизвестная система'
    };
    return names[system] || system;
  }
}