// Отправка запросов к API
export const sendRequest = async (url, method, data = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json'
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : null
    });

    return await response.json();
  } catch (error) {
    console.error('API error:', error);
    return { error: 'Network error' };
  }
};

// Проверка авторизации
export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

// Получение токена
export const getToken = () => {
  return localStorage.getItem('token');
};

// Сохранение токена
export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

// Удаление токена
export const removeToken = () => {
  localStorage.removeItem('token');
};