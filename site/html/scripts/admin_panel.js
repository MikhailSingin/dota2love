document.getElementById('admin_panelForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('titleInput').value;
    const description = document.getElementById('descriptionInput').value;
    const price = document.getElementById('priceInput').value;
    const price_per_month = document.getElementById('price_per_monthInput').value;

    const data = {
      title,
      description,
      price,
      price_per_month, 
    };

    fetch('http://localhost:3000/addcoach', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Ошибка при добавлении запроса');
      }
    })
    .then(result => {
      console.log('Запрос успешно добавлен:', result);
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
  });

async function fetchcoachAndPopulateSelect() {
  try {
    const coachResponse = await fetch('http://localhost:3000/coach');
    
    if (!coachResponse.ok) {
      throw new Error('Ошибка при получении данных о тренировках');
    }

    const coachData = await coachResponse.json();
    const coach = coachData.coach;

    const selectcoach = document.getElementById('coachelect');
    selectcoach.innerHTML = '';

    coach.forEach(coach => {
      const option = document.createElement('option');
      option.value = coach.id;
      option.textContent = `${coach.title} (${coach.description}) - Цена: ${coach.price}`;
      selectcoach.appendChild(option);
    });

  } catch (error) {
    console.error('Ошибка:', error);
  }
}


window.addEventListener('DOMContentLoaded', async () => {
  await fetchcoachAndPopulateSelect();
});

document.getElementById('deletecoachBtn').addEventListener('click', function(event) {
  event.preventDefault();

  const selectcoach = document.getElementById('coachelect');
  const selectedcoachId = selectcoach.value;

  if (selectedcoachId) {
      fetch(`http://localhost:3000/deletecoach/${selectedcoachId}`, {
          method: 'DELETE',
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
      })
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              throw new Error('Ошибка при удалении запроса');
          }
      })
      .then(result => {
          console.log('Запрос успешно удален:', result);
          fetchcoachAndPopulateSelect();
      })
      .catch(error => {
          console.error('Ошибка:', error);
      });
  } else {
      console.error('Пожалуйста, выберите пакет тренировок для удаления');
  }
});

