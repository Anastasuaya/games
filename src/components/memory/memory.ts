import './memory.css'

const modal = document.getElementById('modal') as HTMLElement;
const confirmButton = document.getElementById('confirm') as HTMLButtonElement;

// Функция для открытия модального окна
function openModal() {
    modal.style.display = "block";
}

// Открываем модальное окно при загрузке страницы
window.onload = function() {
    openModal();
}

// Логика подтверждения
confirmButton.onclick = function() {
    alert("Подтверждено!");
    modal.style.display = "none";
}

const cardArray = [
    { name: 'twilight', img: './memoryCards/twilight.jpg' },
    { name: 'starlight', img: './memoryCards/starlight.jpg' },
    { name: 'applejack', img: './memoryCards/applejack.jpg' },
    { name: 'fluttershy', img: './memoryCards/fluttershy.jpg' },
    { name: 'rainbow', img: './memoryCards/rainbow.jpg' },
];
let shuffledCards: Array<{ name: string, img: string }> = [];
// Создание контейнера
const gameBoard = document.getElementById('game-board') as HTMLElement;
let cardChosen: string[] = [];
let cardChosenId: number[] = [];
let cardsWon: string[] = [];

function createBoard() {
     shuffledCards = [...cardArray, ...cardArray].sort(() => 0.5 - Math.random());

    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.setAttribute('class', 'card');
        cardElement.setAttribute('data-id', index.toString());
        cardElement.addEventListener('click', flipCard);

        const frontFace = document.createElement('img');
        frontFace.setAttribute('src', './memoryCards/shirt.jpg'); // Лицевая сторона (скрытая)

        const backFace = document.createElement('img');
        backFace.setAttribute('src', card.img); // Обратная сторона (открытая)
        backFace.style.display = 'none'; // Скрываем обратную сторону по умолчанию

        cardElement.appendChild(frontFace);
        cardElement.appendChild(backFace);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard(this: HTMLElement) {
    const selectedCardId = parseInt(this.getAttribute('data-id')!);

    if (cardChosenId.length < 2 && !cardChosenId.includes(selectedCardId)) {
        cardChosen.push(shuffledCards[selectedCardId].name); // Используем модуль для получения правильного индекса
        cardChosenId.push(selectedCardId);

        // Показать обратную сторону карточки
        const backFace = this.querySelectorAll('img')[1] as HTMLImageElement;
        backFace.style.display = 'block'; // Показываем изображение

        this.classList.add('flipped');

        if (cardChosen.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    const cards = document.querySelectorAll('.card') as NodeListOf<HTMLElement>;

    if (cardChosen[0] === cardChosen[1]) {
        alert('You found a match!');
        
        // Удаляем обработчик событий для найденных карточек
        cards[cardChosenId[0]].removeEventListener('click', flipCard);
        cards[cardChosenId[1]].removeEventListener('click', flipCard);
        
        cardsWon.push(cardChosen[0]);
    } else {
        alert('Try again!');
        
        // Скрываем карточки, если они не совпадают
        const firstBackFace = cards[cardChosenId[0]].querySelectorAll('img')[1] as HTMLImageElement;
        const secondBackFace = cards[cardChosenId[1]].querySelectorAll('img')[1] as HTMLImageElement;

        firstBackFace.style.display = 'none'; // Скрываем изображение первой карточки
        secondBackFace.style.display = 'none'; // Скрываем изображение второй карточки
        
        cards[cardChosenId[0]].classList.remove('flipped');
        cards[cardChosenId[1]].classList.remove('flipped');
    }

    // Сбрасываем выбранные карточки
    cardChosen = [];
    cardChosenId = [];

    if (cardsWon.length === cardArray.length) {
        alert('Congratulations! You found all matches!');
    }
}

createBoard();
