document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const login = document.getElementById('loginInput').value;
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    const confirmPassword = document.getElementById('confirmpasswordInput').value;

    if (password !== confirmPassword) {
      console.error('Пароли не совпадают');
      return;
    }

    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, email, password }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Ошибка регистрации');
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