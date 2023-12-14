window.addEventListener('DOMContentLoaded', () => {
    const profileButton = document.getElementById('profile');

    profileButton.addEventListener('click', async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await fetch('http://localhost:3000/checkToken', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });

          if (response.ok) {
            window.location.href = './profileModal.html';
          } else {

            window.location.href = './authModal.html';
          }
        } catch (error) {
          console.error('Ошибка при проверке токена:', error);

          window.location.href = './authModal.html';
        }
      } else {

        window.location.href = './authModal.html';
      }
    });
  });