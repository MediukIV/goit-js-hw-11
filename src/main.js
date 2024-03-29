// Підключаємо бібліотеку для сповіщень (Toast) та її стилі
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Підключаємо бібліотеку для галереї світлин та її стилі
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Чекаємо, доки весь контент сторінки буде завантажено
document.addEventListener("DOMContentLoaded", () => {
  // Отримуємо посилання на форму, поле вводу, індикатор завантаження та контейнер галереї
  const form = document.querySelector(".searchForm");
  const searchInput = document.querySelector(".searchInput");
  const loader = document.querySelector(".loader");
  const gallery = document.querySelector(".gallery");

  // Ключ API та URL для запитів до Pixabay API
  const apiKey = "42055816-5ec499474650eadfc6b07a02f";
  const apiUrl = "https://pixabay.com/api/";

  // Створюємо екземпляр SimpleLightbox та вказуємо селектор для зображень у галереї
  const lightbox = new SimpleLightbox(".gallery a", {captionDelay: 250, captionsData: 'alt'});

  // Встановлюємо обробник подій для форми при її відправці
  form.addEventListener("submit", (event) => {
    // Запобігаємо стандартну поведінку форми (перезавантаження сторінки)
    event.preventDefault();

    // Отримуємо значення з поля вводу та видаляємо пробіли з обох боків
    const searchTerm = searchInput.value.trim();

    // Перевіряємо, чи введено ключове слово для пошуку
    if (searchTerm === "") {
      // Якщо ключове слово відсутнє, виводимо повідомлення про помилку
      iziToast.error({
        title: "Error",
        titleColor: '#FFFFFF',
        message: "Please enter a search term.",
        messageColor: '#FFFFFF',
        messageSize: '16px',
        backgroundColor: '#EF4040',
        iconColor: '#FFFFFF',
        position: 'topRight'
      });
      return;
    }

    // Показуємо індикатор завантаження та очищуємо попередні результати пошуку
    loader.classList.remove("hidden");
    gallery.innerHTML = "";

    // Відправляємо запит до Pixabay API за допомогою fetch
    fetch(`${apiUrl}?key=${apiKey}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true`)
      .then((response) => {
        // Перевіряємо, чи відповідь успішна
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Парсимо відповідь у формат JSON
        return response.json();
      })
      .then((data) => {
        // Перевіряємо, чи отримані зображення
        if (data.hits.length === 0) {
          // Якщо зображення відсутні, виводимо повідомлення
          iziToast.warning({
            title: "",
            titleColor: '#FFFFFF',
            message: "Sorry, there are no images matching your search query. Please try again!",
            messageColor: '#FFFFFF',
            messageSize: '16px',
            backgroundColor: '#FFA000',
            iconColor: '#FFFFFF',
            position: 'center'
          });
        } else {
          // Якщо є зображення, відображаємо їх на сторінці
          const images = data.hits.map((hit) => ({
            webformatURL: hit.webformatURL,
            largeImageURL: hit.largeImageURL,
            tags: hit.tags,
            likes: hit.likes,
            views: hit.views,
            comments: hit.comments,
            downloads: hit.downloads,
          }));

          displayImages(images);
        }
      })
      .catch((error) => {
        // Виводимо повідомлення про помилку у випадку проблеми з запитом
        console.error("Error fetching data:", error);
        iziToast.error({
          title: "Error",
          titleColor: '#FFFFFF',
          message: "An error occurred while fetching data. Please try again.",
          messageColor: '#FFFFFF',
          messageSize: '16px',
          backgroundColor: '#EF4040',
          iconColor: '#FFFFFF',
          position: 'topRight'
        });
      })
      .finally(() => {
        // Приховуємо індикатор завантаження після завершення запиту
        loader.classList.add("hidden");
      });
    
    // Очищаємо Input форми
    form.reset();

  });

  // Функція для відображення зображень на сторінці
  function displayImages(images) {
  // Створюємо HTML-розмітку для кожного зображення
 const galleryHTML = images
    .map(
      (image, index) => `
        <div class="gallery-item">
          <a href="${image.largeImageURL}" data-lightbox="gallery" data-title="${image.tags}">
            <img src="${image.webformatURL}" alt="${image.tags}" class="image-thumbnail image-${index + 1}">
          </a>
          <div class="image-details image-details-${index + 1}">
            <p class="likes likes-${index + 1}">Likes: <span class="result-likes">${image.likes}</span></p>
            <p class="views views-${index + 1}">Views: <span class="result-views">${image.views}</span></p>
            <p class="comments comments-${index + 1}">Comments: <span class="result-comments">${image.comments}</span></p>
            <p class="downloads downloads-${index + 1}">Downloads: <span class="result-downloads">${image.downloads}</span></p>
          </div>
        </div>
      `
    )
    .join("");

    // Додаємо HTML до контейнера галереї
    gallery.innerHTML = galleryHTML;

    // Оновлюємо SimpleLightbox після додавання нових зображень
    lightbox.refresh();
  }
});