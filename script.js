// ===========================
// Smooth Scroll
// ===========================

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

// ===========================
// Quiz Questions
// ===========================

const questions = [
    {
        question: "What is phishing?",
        answers: [
            { text: "A cyber attack to steal personal information", correct: true },
            { text: "A computer game", correct: false },
            { text: "A type of antivirus", correct: false },
            { text: "A programming language", correct: false }
        ]
    },

    {
        question: "Which is a sign of a phishing email?",
        answers: [
            { text: "Urgent message asking for your password", correct: true },
            { text: "Normal company newsletter", correct: false },
            { text: "Receipt from your own purchase", correct: false },
            { text: "Friend sending vacation photos", correct: false }
        ]
    },

    {
        question: "What should you do before clicking a link?",
        answers: [
            { text: "Check the URL carefully", correct: true },
            { text: "Click immediately", correct: false },
            { text: "Ignore the website address", correct: false },
            { text: "Share it with friends", correct: false }
        ]
    },

    {
        question: "Which adds extra security to your account?",
        answers: [
            { text: "Two-Factor Authentication (2FA)", correct: true },
            { text: "Using only one password everywhere", correct: false },
            { text: "Turning off updates", correct: false },
            { text: "Ignoring security warnings", correct: false }
        ]
    },

    {
        question: "What should you do if you receive a suspicious email?",
        answers: [
            { text: "Delete or report it", correct: true },
            { text: "Reply with your password", correct: false },
            { text: "Open every attachment", correct: false },
            { text: "Click every link", correct: false }
        ]
    }
];

// ===========================
// Variables
// ===========================

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers");
const nextButton = document.getElementById("nextBtn");
const scoreElement = document.getElementById("score");

let currentQuestion = 0;
let score = 0;

// ===========================
// Start Quiz
// ===========================

startQuiz();

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    nextButton.innerHTML = "Next Question";
    showQuestion();
}

// ===========================
// Show Question
// ===========================

function showQuestion() {

    resetState();

    let current = questions[currentQuestion];

    questionElement.innerHTML =
        (currentQuestion + 1) + ". " + current.question;

    current.answers.forEach(answer => {

        const button = document.createElement("button");

        button.innerHTML = answer.text;

        button.classList.add("answer-btn");

        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);

    });

}

// ===========================
// Reset Buttons
// ===========================

function resetState() {

    nextButton.style.display = "none";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

// ===========================
// Select Answer
// ===========================

function selectAnswer(e) {

    const selected = e.target;

    const correct =
        selected.dataset.correct === "true";

    if (correct) {

        selected.style.background = "green";

        score++;

    } else {

        selected.style.background = "red";

    }

    Array.from(answerButtons.children).forEach(button => {

        if (button.dataset.correct === "true") {

            button.style.background = "green";

        }

        button.disabled = true;

    });

    nextButton.style.display = "inline-block";

}

// ===========================
// Next Button
// ===========================

nextButton.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showScore();

    }

});

// ===========================
// Show Score
// ===========================

function showScore() {

    resetState();

    questionElement.innerHTML = "Quiz Completed! 🎉";

    scoreElement.innerHTML =
        "You scored " + score + " out of " + questions.length;

    if (score === questions.length) {

        scoreElement.innerHTML +=
            "<br><br>Excellent! You know how to spot phishing attacks.";

    } else if (score >= 3) {

        scoreElement.innerHTML +=
            "<br><br>Good job! Keep improving your cybersecurity awareness.";

    } else {

        scoreElement.innerHTML +=
            "<br><br>You should review the phishing awareness guide again.";

    }

    nextButton.innerHTML = "Restart Quiz";

    nextButton.style.display = "inline-block";

    nextButton.onclick = startQuiz;

}