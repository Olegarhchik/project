import { sendRequest, getToken } from './api.js';

// Инициализация форм
export const initForms = () => {
  // Форма входа
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  // Форма регистрации
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }
  
  // Форма профиля
  const profileForm = document.getElementById('profile-form');
  if (profileForm) {
    profileForm.addEventListener('submit', handleProfileUpdate);
  }
};

// Обновление профиля
const handleProfileUpdate = async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  const response = await sendRequest(
    form.action,
    form.method,
    data,
    getToken()
  );
  
  if (response.success) {
    showAlert('Данные успешно обновлены', 'success');
  } else {
    showFormErrors(form, response.errors);
  }
};

// Показать уведомление
const showAlert = (message, type) => {
  const alert = document.createElement('div');
  alert.className = `alert alert--${type}`;
  alert.textContent = message;
  
  const container = document.querySelector('.main .container');
  container.prepend(alert);
  
  setTimeout(() => {
    alert.remove();
  }, 5000);
};