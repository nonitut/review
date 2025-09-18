document.addEventListener('DOMContentLoaded', function() {
  // Элементы DOM
  const reviewsList = document.getElementById('reviewsList');
  const reviewForm = document.getElementById('reviewForm');
  const nameInput = document.getElementById('nameInput');
  const reviewInput = document.getElementById('reviewInput');
  const submitBtn = document.getElementById('submitBtn');
  const cancelEdit = document.getElementById('cancelEdit');
  
  let currentEditId = null;

  // Начальные отзывы
  const initialReviews = [
    { 
      id: 'init-1', 
      name: "Анна", 
      text: "Нона, все супер 💔  Спасибо Вам большое благодарю Вас за работу! Взаимодействие! Мне было безмерно приятно коммуницировать!", 
      date: "01.01.2023" 
    },
    { 
      id: 'init-2', 
      name: "Иван", 
      text: "Отличный сервис! Быстро и качественно.", 
      date: "02.01.2023" 
    },
    { 
      id: 'init-3', 
      name: "Мария", 
      text: "Приятные цены и профессиональный подход.", 
      date: "03.01.2023" 
    }
  ];

  // Форматирование даты
  function formatDate(dateString) {
    if (!dateString) return '';
    
    let date;
    
    // Пробуем разные форматы даты
    if (dateString.includes('-')) {
      // ISO формат (YYYY-MM-DD)
      date = new Date(dateString);
    } else if (dateString.includes('.')) {
      // Формат DD.MM.YYYY
      const parts = dateString.split('.');
      if (parts.length === 3) {
        date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      }
    }
    
    // Если не удалось распарсить, возвращаем оригинальную строку
    if (!date || isNaN(date.getTime())) {
      return dateString;
    }
    
    // Красивое форматирование для отображения
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  // Загрузка отзывов
  function loadReviews() {
    let savedReviews = [];
    
    try {
      savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    } catch (e) {
      console.error('Ошибка загрузки отзывов:', e);
    }

    // Объединяем и сортируем отзывы
    const allReviews = [...savedReviews, ...initialReviews]
      .map(review => {
        // Добавляем дату, если её нет
        if (!review.date) {
          review.date = new Date().toISOString();
        }
        return review;
      })
      .sort((a, b) => {
        // Сравниваем даты для сортировки
        const dateA = new Date(a.date.includes('.') ? 
          a.date.split('.').reverse().join('-') : a.date);
        const dateB = new Date(b.date.includes('.') ? 
          b.date.split('.').reverse().join('-') : b.date);
        return dateB - dateA; // Новые сначала
      });

    // Очищаем список
    reviewsList.innerHTML = '';

    // Добавляем отзывы в DOM
    allReviews.forEach(review => {
      const reviewElement = document.createElement('div');
      reviewElement.className = 'review';
      reviewElement.dataset.id = review.id;
      
      reviewElement.innerHTML = `
        <div class="review-actions">
          ${review.id.startsWith('init') ? '' : `
            <button class="review-btn edit-btn" aria-label="Редактировать">✏️</button>
            <button class="review-btn delete-btn" aria-label="Удалить">🗑️</button>
          `}
        </div>
        <h4>${escapeHtml(review.name)}</h4>
        <small>${formatDate(review.date)}</small>
        <p>${escapeHtml(review.text)}</p>
      `;
      
      reviewsList.appendChild(reviewElement);
    });

    // Назначаем обработчики для кнопок
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', deleteReview);
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', startEditReview);
    });
  }

  // Удаление отзыва
  function deleteReview(e) {
    if (!confirm('Вы уверены, что хотите удалить этот отзыв?')) return;
    
    const reviewId = e.target.closest('.review').dataset.id;
    
    try {
      const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
      const updatedReviews = savedReviews.filter(review => review.id !== reviewId);
      localStorage.setItem('reviews', JSON.stringify(updatedReviews));
      loadReviews();
    } catch (e) {
      console.error('Ошибка при удалении отзыва:', e);
      alert('Не удалось удалить отзыв');
    }
  }

  // Начало редактирования
  function startEditReview(e) {
    const reviewId = e.target.closest('.review').dataset.id;
    
    try {
      const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
      const reviewToEdit = savedReviews.find(review => review.id === reviewId);

      if (reviewToEdit) {
        currentEditId = reviewId;
        nameInput.value = reviewToEdit.name;
        reviewInput.value = reviewToEdit.text;
        submitBtn.textContent = 'Обновить';
        cancelEdit.style.display = 'inline-block';
        nameInput.focus();
      }
    } catch (e) {
      console.error('Ошибка при редактировании:', e);
    }
  }

  // Отмена редактирования
  cancelEdit.addEventListener('click', function() {
    reviewForm.reset();
    currentEditId = null;
    submitBtn.textContent = 'Отправить';
    cancelEdit.style.display = 'none';
  });

  // Обработка отправки формы
  reviewForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = nameInput.value.trim();
    const text = reviewInput.value.trim();

    if (!name || !text) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    try {
      let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
      
      if (currentEditId) {
        // Редактируем существующий отзыв
        reviews = reviews.map(review => 
          review.id === currentEditId 
            ? { ...review, name, text, date: new Date().toISOString() }
            : review
        );
      } else {
        // Добавляем новый отзыв
        reviews.unshift({
          id: Date.now().toString(),
          name,
          text,
          date: new Date().toISOString()
        });
      }
      
      localStorage.setItem('reviews', JSON.stringify(reviews));
      
      // Сбрасываем форму
      reviewForm.reset();
      currentEditId = null;
      submitBtn.textContent = 'Отправить';
      cancelEdit.style.display = 'none';
      
      // Обновляем список
      loadReviews();
    } catch (e) {
      console.error('Ошибка при сохранении:', e);
      alert('Не удалось сохранить отзыв');
    }
  });

  // Защита от XSS
  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }



});