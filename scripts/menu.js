document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll('.menu-item');
    const batchSize = 8;
    let visibleCount = 0;
    let activeCategory = 'all';

    // Кнопка
    const showMoreContainer = document.createElement('div');
    showMoreContainer.className = 'show-more-container';

    const showMoreBtn = document.createElement('button');
    showMoreBtn.id = 'show-more';
    showMoreBtn.textContent = 'Показать ещё';

    showMoreContainer.appendChild(showMoreBtn);
    document.querySelector('main').appendChild(showMoreContainer);

    showMoreBtn.addEventListener('click', () => showNextBatch());

    // Функция фильтрации
    function filterMenu(category) {
      activeCategory = category;
      visibleCount = 0;

      menuItems.forEach(item => {
        const itemCategories = item.dataset.category.split(',');
        const matches = category === 'all' || itemCategories.includes(category);
        item.style.display = 'none';
        item.classList.remove('visible');

        if (matches) {
          item.style.display = '';
        }
      });

      showNextBatch();

      // Скрыть кнопку
      const filteredItems = getFilteredItems();
      showMoreBtn.style.display = filteredItems.length > batchSize ? 'inline-block' : 'none';
    }

    function getFilteredItems() {
      return Array.from(menuItems).filter(item => {
        const itemCategories = item.dataset.category.split(',');
        return activeCategory === 'all' || itemCategories.includes(activeCategory);
      });
    }

    // Показать следующее
    function showNextBatch() {
      const filteredItems = getFilteredItems();

      for (let i = visibleCount; i < visibleCount + batchSize && i < filteredItems.length; i++) {
        filteredItems[i].classList.add('visible');
      }

      visibleCount += batchSize;

      if (visibleCount >= filteredItems.length) {
        showMoreBtn.style.display = 'none';
      }
    }

    // Показать все
    filterMenu('all');

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const category = button.dataset.filter;
        filterMenu(category);
      });
    });
  });