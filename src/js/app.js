import '../css/style.css';
import { CardValidator } from './cardValidator';
import { CardSystemDetector } from './cardSystemDetector';

// Импортируем PNG изображения
import visaIcon from '../img/visa.png';
import mastercardIcon from '../img/mastercard.png';
import americanExpressIcon from '../img/american-express.png';
import discoverIcon from '../img/discover.png';
import mirIcon from '../img/mir.png';

class CreditCardWidget {
  constructor() {
    this.form = document.querySelector('.innogrn-form-widget');
    this.input = this.form?.querySelector('.input');
    this.submitBtn = this.form?.querySelector('.submit');
    this.resultDiv = this.form?.querySelector('.result');
    this.cardIcons = this.form?.querySelector('.card-icons');
    
    // Карта иконок
    this.iconsMap = {
      'visa': visaIcon,
      'mastercard': mastercardIcon,
      'american-express': americanExpressIcon,
      'discover': discoverIcon,
      'mir': mirIcon,
    };
    
    this.init();
  }

  init() {
    if (!this.form) return;
    
    this.renderCardIcons();
    this.setupEventListeners();
  }

  renderCardIcons() {
    if (!this.cardIcons) return;
    
    // Очищаем контейнер иконок
    this.cardIcons.innerHTML = '';
    
    const systems = ['visa', 'mastercard', 'american-express', 'discover', 'mir'];
    
    systems.forEach(system => {
      const img = document.createElement('img');
      img.src = this.iconsMap[system];
      img.alt = CardSystemDetector.getSystemName(system);
      img.className = 'card-icon';
      img.dataset.system = system;
      img.width = 50;
      img.height = 35;
      img.title = CardSystemDetector.getSystemName(system);
      
      // Добавляем обработчик ошибок
      img.onerror = function() {
        console.error(`Не удалось загрузить иконку: ${system}`);
        this.style.display = 'none';
      };
      
      this.cardIcons.appendChild(img);
    });
  }

  setupEventListeners() {
    if (this.input) {
      this.input.addEventListener('input', this.handleInput.bind(this));
    }

    if (this.submitBtn) {
      this.submitBtn.addEventListener('click', this.handleSubmit.bind(this));
    }

    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit();
      });
    }
  }

  handleInput() {
    const value = this.input.value;
    
    if (value.length > 0) {
      const system = CardSystemDetector.detectSystem(value);
      
      // Подсвечиваем активную иконку
      const icons = this.cardIcons?.querySelectorAll('.card-icon');
      icons?.forEach(icon => {
        icon.classList.toggle('active', icon.dataset.system === system);
      });

      // Валидация в реальном времени
      if (value.length >= 13 && CardValidator.isValid(value)) {
        this.input.classList.add('valid');
        this.input.classList.remove('invalid');
        this.showResult(`✅ Карта ${CardSystemDetector.getSystemName(system)} валидна`, 'success');
      } else if (value.length >= 13) {
        this.input.classList.add('invalid');
        this.input.classList.remove('valid');
        this.showResult(`❌ Неверный номер карты`, 'error');
      } else if (value.length > 0) {
        this.input.classList.remove('valid', 'invalid');
        this.showResult(`⏳ Введите минимум 13 цифр (сейчас ${value.replace(/\D/g, '').length})`, 'info');
      }
    } else {
      // Сброс при пустом поле
      this.input.classList.remove('valid', 'invalid');
      const icons = this.cardIcons?.querySelectorAll('.card-icon');
      icons?.forEach(icon => icon.classList.remove('active'));
      this.showResult('Введите номер карты для проверки', 'info');
    }
  }

  handleSubmit() {
    const value = this.input.value;
    const cleaned = value.replace(/\D/g, '');
    
    if (!value || cleaned.length < 13) {
      this.showResult(`⚠️ Пожалуйста, введите номер карты (минимум 13 цифр, сейчас ${cleaned.length})`, 'error');
      return;
    }

    const isValid = CardValidator.isValid(value);
    const system = CardSystemDetector.detectSystem(value);
    
    if (isValid) {
      this.input.classList.add('valid');
      this.input.classList.remove('invalid');
      this.showResult(`✅ Карта ${CardSystemDetector.getSystemName(system)} валидна`, 'success');
    } else {
      this.input.classList.add('invalid');
      this.input.classList.remove('valid');
      this.showResult(`❌ Неверный номер карты ${system !== 'unknown' ? `(${CardSystemDetector.getSystemName(system)})` : ''}`, 'error');
    }
  }

  showResult(message, type) {
    if (!this.resultDiv) return;
    this.resultDiv.textContent = message;
    this.resultDiv.className = `result ${type}`;
  }
}

// Инициализация виджета
document.addEventListener('DOMContentLoaded', () => {
  new CreditCardWidget();
});