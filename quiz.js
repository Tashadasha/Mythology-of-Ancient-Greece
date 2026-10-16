const questions = [
    {
        question: "Хто був верховним богом Олімпу?",
        answers: ["Посейдон", "Зевс", "Аїд", "Аполлон"],
        correct: 1,
        explanation: "Зевс був володарем неба, грому та блискавок."
    },
    {
        question: "Хто був богом морів?",
        answers: ["Гефест", "Гермес", "Посейдон", "Арес"],
        correct: 2,
        explanation: "Посейдон керував морями та океанами."
    },
    {
        question: "Яка богиня уособлювала мудрість?",
        answers: ["Афіна", "Афродіта", "Гера", "Деметра"],
        correct: 0,
        explanation: "Афіна була богинею мудрості та військової стратегії."
    },
    {
        question: "Хто переміг Медузу Горгону?",
        answers: ["Ахіллес", "Одіссей", "Геракл", "Персей"],
        correct: 3,
        explanation: "Персей переміг Медузу, використовуючи відображення у щиті."
    },
    {
        question: "Яке чудовисько жило в лабіринті на Криті?",
        answers: ["Цербер", "Мінотавр", "Гідра", "Сфінкс"],
        correct: 1,
        explanation: "Мінотавр мав тіло людини та голову бика."
    },
    {
        question: "Хто був богом підземного царства?",
        answers: ["Зевс", "Аполлон", "Аїд", "Гермес"],
        correct: 2,
        explanation: "Аїд був володарем царства мертвих."
    },
    {
        question: "Скільки подвигів здійснив Геракл?",
        answers: ["7", "10", "12", "15"],
        correct: 2,
        explanation: "Геракл прославився дванадцятьма подвигами."
    },
    {
        question: "Який птах був символом Афіни?",
        answers: ["Орел", "Сова", "Лебідь", "Ворон"],
        correct: 1,
        explanation: "Сова символізувала мудрість і була пов'язана з Афіною."
    },
    {
        question: "Хто була богинею кохання та краси?",
        answers: ["Артеміда", "Гестія", "Персефона", "Афродіта"],
        correct: 3,
        explanation: "Афродіта була богинею любові та краси."
    },
    {
        question: "Як звали батька Зевса?",
        answers: ["Крон", "Уран", "Океан", "Гіперіон"],
        correct: 0,
        explanation: "Крон був титаном і батьком Зевса."
    },
    {
        question: "Хто був богом ковальства та вогню?",
        answers: ["Арес", "Гефест", "Гермес", "Діоніс"],
        correct: 1,
        explanation: "Гефест був богом вогню, ковальства та ремесел."
    },
    {
        question: "Який герой брав участь у Троянській війні?",
        answers: ["Ахіллес", "Персей", "Тесей", "Кадм"],
        correct: 0,
        explanation: "Ахіллес був одним із найвидатніших героїв Троянської війни."
    },
    {
        question: "Яка істота мала одне око посередині чола?",
        answers: ["Кентавр", "Сирена", "Циклоп", "Грифон"],
        correct: 2,
        explanation: "Циклопи були велетнями з одним оком."
    },
    {
        question: "Хто був вісником богів?",
        answers: ["Гермес", "Арес", "Посейдон", "Гефест"],
        correct: 0,
        explanation: "Гермес був вісником богів і покровителем мандрівників."
    },
    {
        question: "Який герой переміг Мінотавра?",
        answers: ["Одіссей", "Тесей", "Ясон", "Геракл"],
        correct: 1,
        explanation: "Тесей переміг Мінотавра, а Аріадна допомогла йому знайти вихід із лабіринту."
    }
];

const quizElement = document.getElementById("quiz");
const resultElement = document.getElementById("result");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const questionNumberElement = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");

let currentQuestion = 0;
let score = 0;
let answered = false;

function showQuestion() {
    answered = false;

    const question = questions[currentQuestion];



questionNumberElement.textContent =
        Запитання ${currentQuestion + 1} із ${questions.length};

    scoreElement.textContent = Бали: ${score};

    progressBar.style.width =
        ${(currentQuestion / questions.length) * 100}%;

    questionElement.textContent = question.question;
    answersElement.innerHTML = "";
    feedbackElement.textContent = "";
    nextButton.disabled = true;

    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.className = "answer-button";
        button.textContent = answer;

        button.addEventListener("click", () => {
            selectAnswer(index);
        });

        answersElement.appendChild(button);
    });

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "Показати результат"
            : "Наступне запитання →";
}

function selectAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const question = questions[currentQuestion];
    const buttons = answersElement.querySelectorAll("button");

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === question.correct) {
            button.classList.add("correct");
        }

        if (
            index === selectedIndex &&
            selectedIndex !== question.correct
        ) {
            button.classList.add("wrong");
        }
    });

    if (selectedIndex === question.correct) {
        score++;

        feedbackElement.textContent =
            ✅ Правильно! ${question.explanation};
    } else {
        feedbackElement.textContent =
            ❌ Неправильно. ${question.explanation};
    }

    scoreElement.textContent = Бали: ${score};
    nextButton.disabled = false;
}

function showResult() {
    quizElement.classList.add("hidden");
    resultElement.classList.remove("hidden");

    progressBar.style.width = "100%";

    document.getElementById("final-score").textContent =
        Твій результат: ${score} із ${questions.length} балів!;

    let message;

    if (score === questions.length) {
        message = "🏆 Неймовірно! Ти справжній знавець міфології!";
    } else if (score >= 12) {
        message = "⚡ Чудовий результат! Ти багато знаєш про Олімп!";
    } else if (score >= 8) {
        message = "🏛️ Гарний результат! Але ще є що дослідити.";
    } else if (score >= 4) {
        message = "📚 Продовжуй вивчати міфи — ти на правильному шляху!";
    } else {
        message = "✨ Час вирушити в захопливу подорож світом міфів!";
    }

    document.getElementById("result-message").textContent = message;
}

nextButton.addEventListener("click", () => {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;

    resultElement.classList.add("hidden");
    quizElement.classList.remove("hidden");

    showQuestion();
});

showQuestion();