const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Which is the most critically endangered species in India?',
        choice1: 'Great Indian Bustard',
        choice2: 'Bengal Tiger',
        choice3: 'Indian Rhinoceros',
        choice4: 'Asiatic Elephant',
        answer: 2,
    },
    {
        question:
            "Which of the following is a major threat to India's forests?",
        choice1: "Forest fires",
        choice2: "Illegal logging",
        choice3: "Shifting cultivation",
        choice4: "All of the above",
        answer: 4,
    },
    {
        question: "Deforestation leads to which of the following?",
        choice1: " Soil erosion",
        choice2: " Climate change",
        choice3: "Loss of biodiversity",
        choice4: "All of the above",
        answer: 4,
    },
    {
        question: "Which state in India has the highest forest cover percentage?",
        choice1: "Madhya Pradesh",
        choice2: "Arunachal Pradesh",
        choice3: "Mizoram",
        choice4: "Chhattisgarh",
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()