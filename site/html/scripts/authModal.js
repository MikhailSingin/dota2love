document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const login = document.getElementById('loginInput').value;
    const password = document.getElementById('passwordInput').value;

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Ошибка авторизации');
        }
      })
      .then(data => {
        console.log(data.token)
        localStorage.setItem('token', data.token);
        window.location.href = './index.html';
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
  });