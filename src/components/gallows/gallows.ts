import './gallows.css'

type GameState = {
    word: string  // Загаданное слово
    guessedLetters: Set<string>  // Угаданные буквы
    attemptsLeft: number  // Попытки
    status: 'playing'| 'won'| 'lost' // Состояние игры
}

const config = {
    max_attempts: 7,
    words: ['яндекс','стажировка','фронтендер','разработчик']
}

const wordDisplay = document.getElementById('wordDisplay') as HTMLElement
const statusDisplay = document.getElementById('status') as HTMLElement
const lettersContainer = document.getElementById('letters') as HTMLElement
const restartBtn = document.getElementById('restartBtn') as HTMLElement

let state: GameState

//* Инициализация игры
function initGame(): void {
    const randomWord = config.words[Math.floor(Math.random() * config.words.length)]
    state = {
        word: randomWord,
        guessedLetters: new Set(),
        attemptsLeft: config.max_attempts,
        status: 'playing'
    }
    renderGame()
    createLetterButtons()
}

//* Отрисовка игры
function renderGame(): void {
    // Показываем слово с угаданными буквами
    wordDisplay.textContent = state.word
    .split('')
    .map(letter => state.guessedLetters.has(letter) ? letter : '_')
    .join(' ')
    
    //* Статус игры
    if (state.status === 'won') {
        statusDisplay.textContent = 'Поздравляем! Вы выйграли!!!'
    } else if (state.status === 'lost') {
        statusDisplay.textContent = `Игра окончена, загаданное слово: ${state.word}`
    } else {
        statusDisplay.textContent = `Попыток осталось: ${state.attemptsLeft}`
    
        //* Отрисовка виселицы
        const hangmanElement = document.getElementById('hangmen') as HTMLElement 
            hangmanElement.dataset.stage =String(config.max_attempts - state.attemptsLeft)
        
    }
}

//* Кнопки для букв
function createLetterButtons(): void {
    lettersContainer.innerHTML = ''
    const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'

    alphabet.split('').forEach(letter => {
        const button = document.createElement('button')
        button.className = 'letter-btn'
        button.textContent = letter
        button.addEventListener('click', () => handleGuess(letter))
        lettersContainer?.appendChild(button)
    })
}

//* Обработка выбора буквы
function handleGuess(letter: string): void {
    if(state.status !== 'playing') return

    const lowerLetter = letter.toLowerCase()
    state.guessedLetters.add(lowerLetter)

    if(!state.word.includes(lowerLetter)) {
        state.attemptsLeft--
        if(state.attemptsLeft === 0) {
            state.status = 'lost'
        }
    }

    //* Проверка победы
    if(state.word.split('').every(l => state.guessedLetters.has(l))) {
        state.status = 'won'
    }
    renderGame()
}

restartBtn?.addEventListener('click', initGame)

window.addEventListener('DOMContentLoaded', initGame)
