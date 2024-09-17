let questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Rome"],
        correctAnswer: 0
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Saturn", "Jupiter", "Uranus"],
        correctAnswer: 2
    },
    {
        question: "What is the smallest country in the world?",
        options: ["Vatican City", "Monaco", "Nauru", "Tuvalu"],
        correctAnswer: 0
    },
    {
        question: "What is the largest living species of lizard?",
        options: ["Komodo dragon", "Saltwater crocodile", "Black mamba", "Green anaconda"],
        correctAnswer: 0
    },
    {
        question: "What is the highest mountain peak in the world?",
        options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
        correctAnswer: 0
    },
    {
        question: "What is the largest mammal on Earth?",
        options: ["Blue whale", "Fin whale", "Humpback whale", "Sperm whale"],
        correctAnswer: 0
    },
    {
        question: "What is the deepest ocean?",
        options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
        correctAnswer: 0
    },
    {
        question: "What is the longest river in South America?",
        options: ["Amazon River", "Paraná River", "São Francisco River", "Magdalena River"],
        correctAnswer: 0
    },
    {
        question: "What is the largest desert in the world?",
        options: ["Sahara Desert", "Gobi Desert", "Mojave Desert", "Atacama Desert"],
        correctAnswer: 0
    },
    {
        question: "What is the largest island in the Mediterranean Sea?",
        options: ["Sicily", "Sardinia", "Corsica", "Crete"],
        correctAnswer: 0
    }
];

let currentQuestion = 0;
let answeredQuestions = {};
let reviewQuestions = [];

document.getElementById("exam-form").addEventListener("submit", (e) => {
    e.preventDefault();
    submitAnswers();
});

document.getElementById("review-button").addEventListener("click", () => {
    showReviewQuestions();
});

function renderQuestions() {
    let questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = "";
    let question = questions[currentQuestion];
    let questionHTML = `
        <div class="question">
            <h3>${question.question}</h3>
            <div class="options">
                ${question.options.map((option, index) => {
                    return `
                        <div class="option" data-index="${index}">
                            ${option}
                        </div>
                    `;
                }).join("")}
            </div>
            <button class="skip-button">Skip</button>
            <button class="review-button">Review</button>
        </div>
    `;
    questionContainer.innerHTML = questionHTML;
    let options = document.querySelectorAll(".option");
    options.forEach((option) => {
        option.addEventListener("click", (e) => {
            let index = e.target.getAttribute("data-index");
            answeredQuestions[currentQuestion] = index;
            currentQuestion++;
            if (currentQuestion < questions.length) {
                renderQuestions();
            } else {
                submitAnswers();
            }
        });
    });
    let skipButton = document.querySelector(".skip-button");
    skipButton.addEventListener("click", () => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            renderQuestions();
        } else {
            submitAnswers();
        }
    });
    let reviewButton = document.querySelector(".review-button");
    reviewButton.addEventListener("click", () => {
        reviewQuestions.push(currentQuestion);
        currentQuestion++;
        if (currentQuestion < questions.length) {
            renderQuestions();
        } else {
            submitAnswers();
        }
    });
}

function submitAnswers() {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (answeredQuestions[i] === questions[i].correctAnswer) {
            score++;
        }
    }
    document.getElementById("score").innerHTML = `You scored ${score} out of ${questions.length}`;
    document.getElementById("result-container").style.display = "block";
    document.getElementById("exam-form").style.display = "none";
}


function showReviewQuestions() {
    let reviewQuestionsHTML = "";
    reviewQuestions.forEach((questionIndex) => {
        let question = questions[questionIndex];
        let correctAnswer = question.correctAnswer;
        let userAnswer = answeredQuestions[questionIndex];
        let correctAnswerText = question.options[correctAnswer];
        let userAnswerText = question.options[userAnswer];
        reviewQuestionsHTML += `
            <div class="review-question">
                <h3>${question.question}</h3>
                <p>Correct answer: ${correctAnswerText}</p>
                <p>Your answer: ${userAnswerText}</p>
            </div>
        `;
    });
    document.getElementById("review-questions").innerHTML = reviewQuestionsHTML;
}

renderQuestions();