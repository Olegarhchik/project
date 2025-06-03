import { initAuthTabs, handleLogin, handleRegister } from './auth.js';
import { initForms } from './form.js';

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
  // Инициализация аутентификации
  if (document.querySelector('.auth-container')) {
    initAuthTabs();
  }
  
  // Инициализация форм
  initForms();
  
  // Проверка авторизации
  updateAuthState();
});

// Обновление состояния авторизации
const updateAuthState = () => {
  const token = localStorage.getItem('token');
  
  if (token) {
    document.querySelectorAll('.nav__item--auth').forEach(el => {
      el.style.display = 'none';
    });
    document.querySelector('.nav__item--profile').style.display = 'block';
    document.querySelector('.nav__item--logout').style.display = 'block';
  } else {
    document.querySelectorAll('.nav__item--auth').forEach(el => {
      el.style.display = 'block';
    });
    document.querySelector('.nav__item--profile').style.display = 'none';
    document.querySelector('.nav__item--logout').style.display = 'none';
  }
};

// Выход из системы
window.logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/main.cgi';
};