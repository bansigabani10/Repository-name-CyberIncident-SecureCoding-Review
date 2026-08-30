// ==========================================
// FINAL 10 QUESTION QUIZ
// ==========================================


const questionBank = [

    {
        category: "PHISHING",

        question:
            "Which is a common warning sign of a phishing email?",

        options: [

            "An unexpected urgent request for information",

            "A normal internal message you were expecting",

            "A scheduled company meeting invitation",

            "A known document from your manager"

        ],

        answer: 0,

        explanation:
            "Unexpected urgency combined with a request for information is a common phishing warning sign."

    },


    {
        category: "FAKE WEBSITE",

        question:
            "What should you check first when a login page seems suspicious?",

        options: [

            "The website's URL and domain",

            "The background color",

            "The number of images",

            "The font size"

        ],

        answer: 0,

        explanation:
            "The URL and domain can reveal whether you are visiting the legitimate organization or a suspicious look-alike."

    },


    {
        category: "SOCIAL ENGINEERING",

        question:
            "An attacker says your account will be disabled unless you act immediately. Which tactic is being used?",

        options: [

            "Reward",

            "Curiosity",

            "Urgency and fear",

            "Trust"

        ],

        answer: 2,

        explanation:
            "Threats and time pressure are commonly used to create fear and urgency."

    },


    {
        category: "SOCIAL ENGINEERING",

        question:
            "Someone claiming to be your manager asks you to make an unusual financial payment. What should you do?",

        options: [

            "Complete it immediately",

            "Verify the request through a trusted channel",

            "Send your password first",

            "Ignore all company procedures"

        ],

        answer: 1,

        explanation:
            "Important financial requests should be independently verified, even when they appear to come from a manager."

    },


    {
        category: "PHISHING",

        question:
            "You receive an unexpected attachment from an unknown sender. What is the safest action?",

        options: [

            "Open it immediately",

            "Download it and scan it later",

            "Verify the sender before opening it",

            "Forward it to coworkers"

        ],

        answer: 2,

        explanation:
            "Unexpected attachments can contain malicious content. Verify the sender and context before opening them."

    },


    {
        category: "PASSWORD SECURITY",

        question:
            "A website asks you to enter your password after you clicked an unexpected email link. What should you do?",

        options: [

            "Enter the password quickly",

            "Use a different password",

            "Close the page and access the service independently",

            "Disable security software"

        ],

        answer: 2,

        explanation:
            "Avoid entering credentials through unexpected links. Navigate to the official service independently."

    },


    {
        category: "SOCIAL ENGINEERING",

        question:
            "Which technique uses a fake prize or benefit to persuade someone to take an unsafe action?",

        options: [

            "Reward",

            "Authority",

            "Fear",

            "Trust"

        ],

        answer: 0,

        explanation:
            "Reward-based social engineering uses prizes, discounts, benefits or similar incentives."

    },


    {
        category: "REAL-WORLD INCIDENTS",

        question:
            "What is one important lesson from employee-targeted social engineering attacks?",

        options: [

            "Technology alone can stop every attack",

            "Security procedures should be bypassed when someone sounds convincing",

            "Employees are an important part of an organization's security",

            "Passwords should be shared with IT staff"

        ],

        answer: 2,

        explanation:
            "Attackers may target people and processes, so employee awareness and strong procedures are essential."

    },


    {
        category: "VERIFICATION",

        question:
            "What is the best way to verify an unusual request from someone you know?",

        options: [

            "Reply to the suspicious message",

            "Use a previously known trusted communication method",

            "Trust the display name",

            "Follow the request immediately"

        ],

        answer: 1,

        explanation:
            "Use an independently known communication channel instead of relying on the suspicious message itself."

    },


    {
        category: "GENERAL AWARENESS",

        question:
            "What should you do if you believe you have interacted with a phishing attack?",

        options: [

            "Hide the incident",

            "Continue using the suspicious website",

            "Report it through your organization's security process",

            "Share your credentials with the attacker"

        ],

        answer: 2,

        explanation:
            "Prompt reporting allows the security team to investigate and reduce potential damage."
    }

];


// ==========================================
// RANDOMIZE QUESTIONS
// ==========================================


let questions = [...questionBank];


// Shuffle array

function shuffle(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];

    }

    return array;
}


// Randomize

questions = shuffle(questions);


// ==========================================
// STATE
// ==========================================


let currentQuestion = 0;

let score = 0;

let answered = false;

let userAnswers = [];


// ==========================================
// DOM
// ==========================================


const questionNumber =
    document.getElementById(
        "questionNumber"
    );


const quizScore =
    document.getElementById(
        "quizScore"
    );


const quizProgressFill =
    document.getElementById(
        "quizProgressFill"
    );


const questionCategory =
    document.getElementById(
        "questionCategory"
    );


const questionText =
    document.getElementById(
        "questionText"
    );


const answerOptions =
    document.getElementById(
        "answerOptions"
    );


const quizFeedback =
    document.getElementById(
        "quizFeedback"
    );


const nextQuestion =
    document.getElementById(
        "nextQuestion"
    );


const quizCard =
    document.getElementById(
        "quizCard"
    );


const quizResult =
    document.getElementById(
        "quizResult"
    );


// ==========================================
// LOAD QUESTION
// ==========================================


function loadQuestion() {

    answered = false;


    const question =
        questions[currentQuestion];


    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;


    quizScore.textContent =
        `Score: ${score}`;


    quizProgressFill.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;


    questionCategory.textContent =
        question.category;


    questionText.textContent =
        question.question;


    answerOptions.innerHTML = "";


    quizFeedback.className =
        "quiz-feedback";


    quizFeedback.innerHTML = "";


    nextQuestion.classList.remove(
        "show"
    );


    nextQuestion.textContent =
        currentQuestion ===
        questions.length - 1

        ? "View Final Result →"

        : "Next Question →";


    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "answer-option";


            button.textContent =
                option;


            button.addEventListener(
                "click",
                () => selectAnswer(
                    index,
                    button
                )
            );


            answerOptions.appendChild(
                button
            );

        }
    );

}


// ==========================================
// ANSWER
// ==========================================


function selectAnswer(
    selectedIndex,
    selectedButton
) {

    if (answered) {

        return;

    }


    answered = true;


    const question =
        questions[currentQuestion];


    const correct =
        selectedIndex ===
        question.answer;


    userAnswers.push({

        question:
            question.question,

        selected:
            question.options[
                selectedIndex
            ],

        correctAnswer:
            question.options[
                question.answer
            ],

        isCorrect:
            correct

    });


    const buttons =
        document.querySelectorAll(
            ".answer-option"
        );


    buttons.forEach(
        (button, index) => {

            button.classList.add(
                "disabled"
            );


            if (
                index === question.answer
            ) {

                button.classList.add(
                    "correct"
                );

            }

        }
    );


    if (correct) {

        score++;


        selectedButton.classList.add(
            "correct"
        );


        quizFeedback.className =
            "quiz-feedback correct show";


        quizFeedback.innerHTML = `

            <strong>
                ✅ Correct!
            </strong>

            <br>

            ${question.explanation}

        `;

    } else {

        selectedButton.classList.add(
            "wrong"
        );


        quizFeedback.className =
            "quiz-feedback wrong show";


        quizFeedback.innerHTML = `

            <strong>
                ❌ Incorrect
            </strong>

            <br>

            ${question.explanation}

        `;

    }


    quizScore.textContent =
        `Score: ${score}`;


    nextQuestion.classList.add(
        "show"
    );

}


// ==========================================
// NEXT QUESTION
// ==========================================


nextQuestion.addEventListener(
    "click",
    () => {

        currentQuestion++;


        if (
            currentQuestion >=
            questions.length
        ) {

            showResult();

            return;

        }


        loadQuestion();


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


// ==========================================
// RESULT
// ==========================================


function showResult() {

    quizCard.style.display =
        "none";


    quizResult.classList.add(
        "show"
    );


    const percentage =
        Math.round(
            (score / questions.length) *
            100
        );


    document.getElementById(
        "finalScore"
    ).textContent =
        score;


    document.getElementById(
        "percentage"
    ).textContent =
        `${percentage}%`;


    const status =
        document.getElementById(
            "resultStatus"
        );


    const message =
        document.getElementById(
            "resultMessage"
        );


    if (percentage >= 70) {

        status.textContent =
            "✅ PASSED";

        status.className =
            "result-status pass";


        message.textContent =
            "Excellent work! You demonstrated a strong understanding of phishing and social engineering awareness.";

    } else {

        status.textContent =
            "⚠️ NEEDS REVIEW";

        status.className =
            "result-status fail";


        message.textContent =
            "You completed the assessment. Review the incorrect answers and revisit the training modules before retaking the quiz.";

    }


    generateReview();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ==========================================
// REVIEW
// ==========================================


function generateReview() {

    const review =
        document.getElementById(
            "answerReview"
        );


    review.innerHTML = "";


    userAnswers.forEach(
        (item, index) => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "review-item";


            div.innerHTML = `

                <div class="review-question">

                    <strong>
                        ${index + 1}.
                    </strong>

                    ${item.question}

                </div>

                <div class="
                    review-answer
                    ${
                        item.isCorrect
                            ? "correct-answer"
                            : "wrong-answer"
                    }
                ">

                    Your answer:
                    ${item.selected}

                </div>

                ${
                    item.isCorrect
                        ? ""
                        : `
                            <div class="
                                review-answer
                                correct-answer
                            ">

                                Correct answer:
                                ${item.correctAnswer}

                            </div>
                        `
                }

            `;


            review.appendChild(div);

        }
    );

}


// ==========================================
// RESTART
// ==========================================


function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    answered = false;

    userAnswers = [];


    questions =
        shuffle(
            [...questionBank]
        );


    quizCard.style.display =
        "block";


    quizResult.classList.remove(
        "show"
    );


    loadQuestion();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ==========================================
// HOME
// ==========================================


function goHome() {

    window.location.href =
        "index.html";

}


// ==========================================
// START
// ==========================================


loadQuestion();