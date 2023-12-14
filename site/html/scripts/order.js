async function getUserId() {

}


async function fetchcoachAndPopulateSelect() {
  try {
    const coachResponse = await fetch('http://localhost:3000/coach');
    
    if (!coachResponse.ok) {
      throw new Error('Ошибка при получении данных о компьютерах');
    }

    const coachData = await coachResponse.json();
    const coach = coachData.coach;

    const selectcoach = document.getElementById('coachelect');

    coach.forEach(coach => {
      const option = document.createElement('option');
      option.value = coach.id;
      option.textContent = `${coach.title} (${coach.description}) - Цена: ${coach.price} (${coach.price_per_month})`;
      selectcoach.appendChild(option);
    });

  } catch (error) {
    console.error('Ошибка:', error);
  }
}

async function createOrder() {
  try {
    const token = localStorage.getItem('token');

    const selectedcoachId = document.querySelector('#coachselect').value;
    const customerName = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const phoneNumber = document.getElementById('numberInput').value;
    const deliveryAddress = document.getElementById('addressInput').value;
    const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    const orderData = {
      user_id: null,
      coach_id: selectedcoachId,
      customer_name: customerName,
      email: email,
      phone_number: phoneNumber,
      delivery_address: deliveryAddress,
      payment_method: selectedPaymentMethod
    };

    const response = await fetch('http://localhost:3000/createOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      throw new Error('Ошибка при создании заказа');
    }

    const result = await response.json();
    console.log('Заказ успешно создан:', result);
    alert('Заказ оформлен');
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  await fetchcoachAndPopulateSelect();
});

document.querySelector('.main-btn').addEventListener('click', async function() {
  await createOrder();
});
