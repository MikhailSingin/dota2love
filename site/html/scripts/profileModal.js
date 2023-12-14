window.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout');

    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('token');
      window.location.href = './index.html';
    });
  });

async function fetchUserProfile() {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:3000/userProfile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const userData = await response.json();
      const userLogin = userData.username;
      const loginElement = document.querySelector('.login');
      loginElement.textContent = userLogin;
    } else {
      throw new Error('Ошибка при получении данных пользователя');
    }
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  await fetchUserProfile();
});
