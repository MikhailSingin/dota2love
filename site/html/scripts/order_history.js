async function getOrderHistory() {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch('http://localhost:3000/order-history', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Ошибка получения истории заказов');
      }
  
      const data = await response.json();
      const orders = data.orders;
  
      displayOrderHistory(orders);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
  
    return `${day}.${month}.${year}`;
  }

  function displayOrderHistory(orders) {
    const orderList = document.querySelector('.order-list');
  
    if (orders.length === 0) {
      const noOrdersMessage = document.createElement('li');
      noOrdersMessage.textContent = 'Нет заказов';
      orderList.appendChild(noOrdersMessage);
    } else {
      orders.forEach(order => {
        const listItem = document.createElement('li');
        listItem.classList.add('order-item');
  
        const formattedDate = formatDate(order.order_date);
  
        listItem.innerHTML = `<div class="order-text">Заказ №${order.order_id}</div><div class="order-text">${formattedDate}</div>`;
        orderList.appendChild(listItem);
      });
    }
  }
  
  window.addEventListener('DOMContentLoaded', async () => {
    await getOrderHistory();
  });
  