let slideIndex = 0;

function showSlides() {
    const slides = document.querySelector('.slides');
    const slideWidth = document.querySelector('.slide').clientWidth;
    slides.style.transform = `translateX(${-slideIndex * slideWidth}px)`;
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    slideIndex = (slideIndex + 1) % slides.length;
    showSlides();
}

function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlides();
}

// Автоматическое переключение слайдов
// Переключение каждые 5 секунд



const cardsData = [
    {
        className: "partall__Tv__ob",
        imageClass: "partall__Tv",
        title: "Portal TV",
        description: "Умные видеозвонки на самом большом экране вашего дома",
        link: "#"
    },
    {
        className: "partall__ob",
        imageClass: "partall",
        title: "Portal",
        description: "Умные видеовызовы на 10-дюймовом HD-дисплее",
        link: "#"
    },
    {
        className: "partall__pllus__Ob",
        imageClass: "partall__pllus",
        title: "Portal+",
        description: "Умные видеовызовы на HD-дисплее с диагональю 15,6 дюйма",
        link: "#"
    },
    {
        className: "partall__mini__ob",
        imageClass: "partall__mini",
        title: "Portal Mini",
        description: "Умные видеовызовы на 8-дюймовом HD-дисплее",
        link: "#"
    }
];
function createCard(card) {
    return `
        <div class="${card.className}">
            <div class="${card.imageClass}"></div>
            <div class="title__partall__tv">
                <p class="title__partall__tv__decaration">${card.title}</p>
            </div>
            <div class="title__partall__tv__decaration__1">
                <p>${card.description}</p>
            </div>
            <div class="button__partall__tv">
                <a class="button__partall__tv__decaration" href="${card.link}">Узнать больше</a>
            </div>
        </div>
    `;
}
function renderCards() {
    const cardContainer = document.querySelector(".card__Partall");
    console.log(cardContainer);
    /*  cardContainer.innerHTML = ''; */ // Очищаем контейнер перед добавлением новых карточек

    cardsData.forEach(card => {
        console.log(card);

        const cardElement = createCard(card);
        console.log(cardElement);

        console.log(cardContainer);


        cardContainer.insertAdjacentHTML('beforeend', cardElement);
    });
}

// Вызов функции для отрисовки карточек
renderCards();
document.addEventListener('DOMContentLoaded', () => {
    const mediaFiles = document.querySelectorAll('img, video');
    const privolder = document.getElementById('privolder');
    const prosent = document.getElementById('prosent');
    
    let loadedCount = 0;
    const totalFiles = mediaFiles.length;

    // Если нет медиа-файлов, сразу скрываем прелоадер
    if(totalFiles === 0) {
        privolder.classList.add('privolder--hide');
        prosent.textContent = '100';
        return;
    }

    mediaFiles.forEach(file => {
        // Для img проверяем complete свойство
        if(file.tagName === 'IMG' && file.complete) {
            updateProgress();
            return;
        }
        
        // Для video аналогично
        if(file.tagName === 'VIDEO' && file.readyState > 3) {
            updateProgress();
            return;
        }

        file.addEventListener('load', updateProgress);
        file.addEventListener('loadeddata', updateProgress); // Для видео
        file.addEventListener('error', updateProgress); // На случай ошибки загрузки
    });

    function updateProgress() {
        loadedCount++;
        const percent = Math.round((loadedCount / totalFiles) * 100);
        prosent.textContent = percent;
       
        if(loadedCount === totalFiles) {
            privolder.classList.add('privolder--hide');
        }
    }
});