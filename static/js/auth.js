import { sendRequest, saveToken } from './api.js';

// Переключение между формами
export const initAuthTabs = () => {
  const tabs = document.querySelectorAll('.auth-tab');
  const forms = document.querySelectorAll('.auth-form');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const url = new URL(window.location.href);  
      const params = new URLSearchParams(url.search);
      const tabName = params.get('tab') || tab.dataset.tab;
      
      // Обновление активной вкладки
      tabs.forEach(t => t.classList.remove('auth-tab--active'));
      tab.classList.add('auth-tab--active');
      
      // Показ активной формы
      forms.forEach(form => {
        form.classList.remove('auth-form--active');
        if (form.id === `${tabName}-form`) {
          form.classList.add('auth-form--active');
        }
      });
    });
  });
};

// Обработка входа
export const handleLogin = async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  const response = await sendRequest(
    form.action,
    form.method,
    data
  );
  
  if (response.token) {
    saveToken(response.token);
    window.location.href = '/main.cgi/profile';
  } else {
    showFormErrors(form, response.errors);
  }
};

// Обработка регистрации
export const handleRegister = async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  const response = await sendRequest(
    form.action,
    form.method,
    data
  );
  
  if (response.login && response.password) {
    showUserCredentials(response);
  } else {
    showFormErrors(form, response.errors);
  }
};

// Показать учетные данные
const showUserCredentials = (data) => {
  const container = document.createElement('div');
  container.className = 'alert alert--success mt-2';
  container.innerHTML = `
    <h3>Регистрация успешна!</h3>
    <p>Логин: <strong>${data.login}</strong></p>
    <p>Пароль: <strong>${data.password}</strong></p>
    <p>Профиль: <a href="${data.profileUrl}">${data.profileUrl}</a></p>
  `;
  
  form.parentNode.insertBefore(container, form.nextSibling);
};

// Показать ошибки формы
const showFormErrors = (form, errors) => {
  form.querySelectorAll('.form-error').forEach(el => {
    el.textContent = '';
  });
  
  for (const [field, message] of Object.entries(errors)) {
    const errorEl = form.querySelector(`.form-error[data-for="${field}"]`);
    if (errorEl) {
      errorEl.textContent = message;
    }
  }
};