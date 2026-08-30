// ==========================================
// SOCIAL ENGINEERING TRAINING
// ==========================================


const scenarios = [

    {
        technique: "FEAR",
        icon: "😨",
        title: "The Security Threat",

        situation:
            `You receive a phone call from someone claiming
            to be from your company's IT department.

            <br><br>

            They tell you that your computer has been
            infected and that your account will be disabled
            unless you immediately follow their instructions.`,

        attacker:
            `"Your system has been compromised. If you don't
            act right now, your account will be permanently
            disabled."`,

        choices: [

            {
                text:
                    "Follow the caller's instructions immediately.",

                correct: false,

                feedback:
                    "This is risky. The caller is using fear to pressure you into acting without verification."
            },

            {
                text:
                    "End the call and contact your IT department using a trusted contact method.",

                correct: true,

                feedback:
                    "Correct. You should independently verify unexpected security warnings instead of trusting an unknown caller."
            },

            {
                text:
                    "Give the caller your password so they can fix the problem.",

                correct: false,

                feedback:
                    "Never share your password with someone who unexpectedly contacts you."
            },

            {
                text:
                    "Install software they tell you to install.",

                correct: false,

                feedback:
                    "Installing unknown software can give an attacker access to your device."
            }

        ]

    },


    {
        technique: "URGENCY",
        icon: "⏰",
        title: "Act Right Now",

        situation:
            `You receive a message claiming to be from your
            company's payroll department.

            <br><br>

            The message says your salary information must
            be confirmed within the next 10 minutes.`,

        attacker:
            `"This request expires in 10 minutes. Confirm your
            details immediately or your payment may be delayed."`,

        choices: [

            {
                text:
                    "Click the link immediately because there is a deadline.",

                correct: false,

                feedback:
                    "Urgency is often used to prevent people from thinking carefully."
            },

            {
                text:
                    "Ignore the deadline and verify the request through the official payroll system.",

                correct: true,

                feedback:
                    "Correct. A deadline should never prevent you from independently verifying a request."
            },

            {
                text:
                    "Reply with your employee information.",

                correct: false,

                feedback:
                    "Unexpected requests for personal information should be verified first."
            },

            {
                text:
                    "Forward the message to coworkers and ask them to click it.",

                correct: false,

                feedback:
                    "Don't spread a suspicious message before confirming that it is legitimate."
            }

        ]

    },


    {
        technique: "AUTHORITY",
        icon: "👔",
        title: "The Executive Request",

        situation:
            `You receive a message from someone claiming
            to be your company manager.

            <br><br>

            They say they are in an important meeting and
            need you to purchase gift cards immediately.`,

        attacker:
            `"I'm in a meeting and can't talk right now.
            Please purchase five gift cards and send me
            the codes as soon as possible."`,

        choices: [

            {
                text:
                    "Buy the gift cards because the request is from your manager.",

                correct: false,

                feedback:
                    "Attackers often impersonate managers or executives to exploit authority."
            },

            {
                text:
                    "Verify the request using a known phone number or another trusted channel.",

                correct: true,

                feedback:
                    "Correct. Important financial requests should be independently verified."
            },

            {
                text:
                    "Send the gift-card codes immediately.",

                correct: false,

                feedback:
                    "Gift-card requests are a common social engineering warning sign."
            },

            {
                text:
                    "Ask the attacker for their password.",

                correct: false,

                feedback:
                    "Requesting another person's password is not an appropriate verification method."
            }

        ]

    },


    {
        technique: "CURIOSITY",
        icon: "🔍",
        title: "The Mysterious File",

        situation:
            `While browsing your work messages, you receive
            a file from an unknown sender.

            <br><br>

            The message claims the file contains an
            interesting document about your company.`,

        attacker:
            `"You won't believe what I found about your company!
            Open the attached document to see it."`,

        choices: [

            {
                text:
                    "Open the file because you are curious.",

                correct: false,

                feedback:
                    "Curiosity can cause people to open malicious attachments without verifying them."
            },

            {
                text:
                    "Verify the sender and attachment before opening it.",

                correct: true,

                feedback:
                    "Correct. Unexpected files should be treated cautiously and verified before opening."
            },

            {
                text:
                    "Download the file and send it to your friends.",

                correct: false,

                feedback:
                    "You should not distribute an unverified attachment."
            },

            {
                text:
                    "Disable your antivirus and open the file.",

                correct: false,

                feedback:
                    "Security protections should never be disabled simply to open an unexpected file."
            }

        ]

    },


    {
        technique: "REWARD",
        icon: "🎁",
        title: "You Won a Prize!",

        situation:
            `A message appears saying that you have won
            an expensive prize.

            <br><br>

            To claim it, you are asked to provide your
            personal and banking information.`,

        attacker:
            `"Congratulations! You have won a $1,000 prize.
            Submit your banking information now to receive
            your reward."`,

        choices: [

            {
                text:
                    "Submit your banking information to claim the prize.",

                correct: false,

                feedback:
                    "Unexpected prizes that require sensitive information are a common social engineering tactic."
            },

            {
                text:
                    "Verify the promotion independently before providing any information.",

                correct: true,

                feedback:
                    "Correct. Verify unexpected rewards through an independent and trusted source."
            },

            {
                text:
                    "Send your password so they can process the prize.",

                correct: false,

                feedback:
                    "Legitimate organizations should not require you to reveal your password."
            },

            {
                text:
                    "Pay a processing fee immediately.",

                correct: false,

                feedback:
                    "Unexpected prize fees are a common warning sign of scams."
            }

        ]

    },


    {
        technique: "TRUST",
        icon: "🤝",
        title: "A Familiar Face",

        situation:
            `You receive a message from an account using
            the name and profile picture of a coworker.

            <br><br>

            They ask you to send them a confidential
            company document.`,

        attacker:
            `"Hi! I'm working from my personal account today.
            Can you quickly send me the confidential report?
            I need it for a meeting."`,

        choices: [

            {
                text:
                    "Send the document because you recognize the coworker's name.",

                correct: false,

                feedback:
                    "Names and profile pictures can be copied. Identity should be verified through a trusted channel."
            },

            {
                text:
                    "Verify the request with your coworker through a known communication method.",

                correct: true,

                feedback:
                    "Correct. When a request involves sensitive information, verify the person's identity independently."
            },

            {
                text:
                    "Post the document in the group chat.",

                correct: false,

                feedback:
                    "Confidential information should never be shared publicly or without authorization."
            },

            {
                text:
                    "Ask the account to send another suspicious link.",

                correct: false,

                feedback:
                    "This does not verify the person's identity and could increase the risk."
            }

        ]

    }

];


// State

let currentScenario = 0;

let score = 0;

let answered = false;


// DOM

const scenarioNumber =
    document.getElementById("scenarioNumber");

const scoreDisplay =
    document.getElementById("scoreDisplay");

const scenarioProgress =
    document.getElementById("scenarioProgress");

const techniqueIcon =
    document.getElementById("techniqueIcon");

const techniqueLabel =
    document.getElementById("techniqueLabel");

const scenarioTitle =
    document.getElementById("scenarioTitle");

const scenarioText =
    document.getElementById("scenarioText");

const attackerText =
    document.getElementById("attackerText");

const choicesContainer =
    document.getElementById("choices");

const feedback =
    document.getElementById("feedback");

const nextButton =
    document.getElementById("nextButton");

const scenarioCard =
    document.getElementById("scenarioCard");

const finalResult =
    document.getElementById("finalResult");


// Load scenario

function loadScenario() {

    answered = false;

    const scenario =
        scenarios[currentScenario];


    scenarioNumber.textContent =
        `Scenario ${currentScenario + 1} of ${scenarios.length}`;


    scoreDisplay.textContent =
        `Score: ${score} / ${scenarios.length}`;


    const progress =
        ((currentScenario + 1) / scenarios.length) * 100;


    scenarioProgress.style.width =
        progress + "%";


    techniqueIcon.textContent =
        scenario.icon;


    techniqueLabel.textContent =
        scenario.technique;


    scenarioTitle.textContent =
        scenario.title;


    scenarioText.innerHTML =
        scenario.situation;


    attackerText.textContent =
        scenario.attacker;


    choicesContainer.innerHTML = "";


    feedback.className =
        "feedback";


    feedback.innerHTML = "";


    nextButton.classList.remove(
        "show"
    );


    scenario.choices.forEach(
        (choice, index) => {

            const button =
                document.createElement("button");


            button.className =
                "choice-button";


            button.textContent =
                choice.text;


            button.addEventListener(
                "click",
                () => selectChoice(
                    index,
                    button
                )
            );


            choicesContainer.appendChild(
                button
            );

        }
    );

}


// Choice

function selectChoice(index, selectedButton) {

    if (answered) {
        return;
    }

    answered = true;


    const scenario =
        scenarios[currentScenario];


    const selected =
        scenario.choices[index];


    const buttons =
        document.querySelectorAll(
            ".choice-button"
        );


    buttons.forEach(
        (button, buttonIndex) => {

            button.classList.add(
                "disabled"
            );


            if (
                scenario.choices[
                    buttonIndex
                ].correct
            ) {

                button.classList.add(
                    "correct"
                );

            }

        }
    );


    if (selected.correct) {

        score++;

        selectedButton.classList.add(
            "correct"
        );


        feedback.className =
            "feedback correct-feedback show";


        feedback.innerHTML = `

            <h3>
                ✅ Correct Decision
            </h3>

            <p>
                ${selected.feedback}
            </p>

        `;

    } else {

        selectedButton.classList.add(
            "wrong"
        );


        feedback.className =
            "feedback wrong-feedback show";


        feedback.innerHTML = `

            <h3>
                ⚠️ Risky Decision
            </h3>

            <p>
                ${selected.feedback}
            </p>

        `;

    }


    scoreDisplay.textContent =
        `Score: ${score} / ${scenarios.length}`;


    nextButton.classList.add(
        "show"
    );


    if (
        currentScenario ===
        scenarios.length - 1
    ) {

        nextButton.textContent =
            "View Final Result →";

    }

}


// Next

function nextScenario() {

    currentScenario++;


    if (
        currentScenario >=
        scenarios.length
    ) {

        showFinalResult();

        return;

    }


    loadScenario();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// Final

function showFinalResult() {

    scenarioCard.style.display =
        "none";

    finalResult.classList.add(
        "show"
    );


    document.getElementById(
        "finalScore"
    ).textContent = score;


    let message = "";


    if (score === 6) {

        message =
            "Excellent! You consistently recognized the manipulation tactics and chose safe responses.";

    } else if (score >= 4) {

        message =
            "Good job! You recognized most of the social engineering tactics. Review the missed scenarios.";

    } else if (score >= 2) {

        message =
            "You're making progress. Review the techniques below and remember to slow down and verify unexpected requests.";

    } else {

        message =
            "Social engineering can be difficult to recognize. Review the examples below and practice verifying unexpected requests.";

    }


    document.getElementById(
        "finalMessage"
    ).textContent = message;


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// Restart

function restartTraining() {

    currentScenario = 0;

    score = 0;


    scenarioCard.style.display =
        "block";


    finalResult.classList.remove(
        "show"
    );


    loadScenario();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// Real-world examples

function goToExamples() {

    window.location.href =
        "real-world-examples.html";

}


// Start

loadScenario();