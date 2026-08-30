// ==========================================
// REAL-WORLD CASE STUDIES
// ==========================================


const cases = [

    /*
    ==========================================
    CASE 1
    ==========================================
    */

    {

        number: "CASE 01",

        icon: "💰",

        category:
            "BUSINESS EMAIL COMPROMISE",

        title:
            "The Fake Invoice Scam",

        story:
            `Business Email Compromise (BEC) attacks have
            caused organizations to lose large amounts of
            money. Attackers may impersonate executives,
            suppliers or business partners and attempt to
            convince employees to make unauthorized payments.
            
            <br><br>
            
            The FBI identifies BEC as a major form of
            cyber-enabled financial crime.`,

        techniqueTitle:
            "🎭 Impersonation + Social Engineering",

        technique:
            `The attacker attempts to appear trustworthy by
            pretending to be a person or organization the
            victim already knows.`,

        warnings: [

            "Unexpected request to change payment details",

            "Pressure to complete a financial transaction",

            "Communication that is unusual for the sender",

            "Request that bypasses normal approval procedures"

        ],

        action:
            `<strong>🛡️ Safe Response</strong>
            
            Independently verify the payment request using
            a trusted communication method. Follow your
            organization's normal financial approval process
            and don't rely only on the message that requested
            the payment.`,

        question:
            "What is the safest response to an unexpected payment request?",

        options: [

            {
                text:
                    "Process it immediately because the request looks professional.",

                correct: false,

                feedback:
                    "Professional-looking messages can still be fraudulent."
            },

            {
                text:
                    "Verify the request through a trusted channel and follow normal approval procedures.",

                correct: true,

                feedback:
                    "Correct. Independent verification is one of the strongest defenses against BEC."
            },

            {
                text:
                    "Reply to the same email asking whether it is legitimate.",

                correct: false,

                feedback:
                    "If the account is compromised, replying to the same channel may not verify the request."
            }

        ],

        source:
            "FBI — Business Email Compromise awareness and reporting guidance"

    },


    /*
    ==========================================
    CASE 2
    ==========================================
    */

    {

        number: "CASE 02",

        icon: "🐦",

        category:
            "EMPLOYEE SOCIAL ENGINEERING",

        title:
            "The 2020 Twitter Attack",

        story:
            `In July 2020, attackers compromised a number of
            high-profile Twitter accounts after targeting
            employees through social engineering.
            
            <br><br>
            
            The incident demonstrated that attackers may
            target people and internal processes instead of
            directly attacking the technology.`,

        techniqueTitle:
            "🎭 Employee Social Engineering",

        technique:
            `Attackers targeted employees and attempted to
            manipulate them into providing access or helping
            the attackers bypass normal security controls.`,

        warnings: [

            "Unexpected requests involving internal access",

            "Attempts to bypass established procedures",

            "Requests that require unusual privileges",

            "Pressure to act outside normal workflows"

        ],

        action:
            `<strong>🛡️ Safe Response</strong>
            
            Treat unusual internal requests carefully.
            Verify the requester's identity and follow
            established access-control and escalation
            procedures.`,

        question:
            "What should you do when someone asks you to bypass a normal security procedure?",

        options: [

            {
                text:
                    "Do it because they say the request is urgent.",

                correct: false,

                feedback:
                    "Urgency does not make an unusual request trustworthy."
            },

            {
                text:
                    "Verify the request and follow the organization's established procedure.",

                correct: true,

                feedback:
                    "Correct. Security procedures exist specifically to reduce the risk of manipulation."
            },

            {
                text:
                    "Give them temporary access without checking.",

                correct: false,

                feedback:
                    "Temporary access can still create serious security risks."
            }

        ],

        source:
            "Twitter / U.S. Department of Justice public reporting on the 2020 incident"

    },


    /*
    ==========================================
    CASE 3
    ==========================================
    */

    {

        number: "CASE 03",

        icon: "🏨",

        category:
            "PHONE-BASED SOCIAL ENGINEERING",

        title:
            "The MGM Resorts Incident",

        story:
            `In September 2023, MGM Resorts International
            disclosed a cybersecurity incident that affected
            parts of its operations.
            
            <br><br>
            
            Public reporting around the incident highlighted
            the role of social engineering in obtaining access
            to an employee's account.`,

        techniqueTitle:
            "📞 Help-Desk / Identity Manipulation",

        technique:
            `Social engineering can involve manipulating people
            who provide technical or administrative assistance.
            Attackers may attempt to convince support staff that
            they are a legitimate employee.`,

        warnings: [

            "Unexpected account-recovery request",

            "Caller unable to provide normal verification",

            "Request involving account credentials or access",

            "Pressure placed on support staff"

        ],

        action:
            `<strong>🛡️ Safe Response</strong>
            
            Follow identity-verification procedures exactly.
            Never skip authentication checks simply because
            someone sounds convincing or claims the situation
            is urgent.`,

        question:
            "What is the best defense against a suspicious account-recovery request?",

        options: [

            {
                text:
                    "Trust the caller if they know the employee's name.",

                correct: false,

                feedback:
                    "Knowing someone's name does not prove their identity."
            },

            {
                text:
                    "Follow the organization's identity-verification process.",

                correct: true,

                feedback:
                    "Correct. Formal verification procedures help prevent impersonation attacks."
            },

            {
                text:
                    "Disable the verification process to resolve the issue faster.",

                correct: false,

                feedback:
                    "Bypassing verification removes an important security control."
            }

        ],

        source:
            "MGM Resorts International public disclosures and SEC filing regarding the 2023 incident"

    },


    /*
    ==========================================
    CASE 4
    ==========================================
    */

    {

        number: "CASE 04",

        icon: "🎣",

        category:
            "PHISHING + CREDENTIAL THEFT",

        title:
            "Large-Scale Phishing Campaigns",

        story:
            `Security organizations regularly document
            phishing campaigns that imitate well-known
            services and organizations.
            
            <br><br>
            
            These campaigns often attempt to persuade users
            to click a link and enter credentials on a
            fraudulent website.`,

        techniqueTitle:
            "🎣 Phishing + Brand Impersonation",

        technique:
            `The attacker creates a message that appears to
            come from a familiar organization and attempts
            to make the victim trust the message.`,

        warnings: [

            "Unexpected login or verification request",

            "Link leading to an unfamiliar domain",

            "Message creates urgency or fear",

            "Request for passwords or sensitive information"

        ],

        action:
            `<strong>🛡️ Safe Response</strong>
            
            Don't use the message's link to sign in.
            Instead, navigate to the organization's official
            website through a trusted method and check whether
            the request is legitimate.`,

        question:
            "What should you do when a message asks you to verify your account through a link?",

        options: [

            {
                text:
                    "Click the link and check whether the page looks legitimate.",

                correct: false,

                feedback:
                    "A convincing appearance does not prove that a website is legitimate."
            },

            {
                text:
                    "Access the organization's official website independently and verify the request.",

                correct: true,

                feedback:
                    "Correct. Independently navigating to the official service reduces the risk of following a phishing link."
            },

            {
                text:
                    "Enter your password quickly before the link expires.",

                correct: false,

                feedback:
                    "Urgency should not cause you to enter credentials without verification."
            }

        ],

        source:
            "CISA — Phishing guidance and cybersecurity awareness resources"

    }

];


// Current case

let currentCase = 0;


// DOM elements

const caseNumber =
    document.getElementById("caseNumber");

const caseIcon =
    document.getElementById("caseIcon");

const caseCategory =
    document.getElementById("caseCategory");

const caseTitle =
    document.getElementById("caseTitle");

const caseStory =
    document.getElementById("caseStory");

const caseTechnique =
    document.getElementById("caseTechnique");

const warningSigns =
    document.getElementById("warningSigns");

const recommendedAction =
    document.getElementById("recommendedAction");

const question =
    document.getElementById("question");

const checkOptions =
    document.getElementById("checkOptions");

const checkFeedback =
    document.getElementById("checkFeedback");

const caseSource =
    document.getElementById("caseSource");

const caseProgressText =
    document.getElementById("caseProgressText");

const caseProgressFill =
    document.getElementById("caseProgressFill");


// Load case

function loadCase(index) {

    currentCase = index;

    const data =
        cases[index];


    // Header

    caseNumber.textContent =
        data.number;

    caseIcon.textContent =
        data.icon;

    caseCategory.textContent =
        data.category;

    caseTitle.textContent =
        data.title;


    // Story

    caseStory.innerHTML =
        data.story;


    // Technique

    caseTechnique.innerHTML = `

        <div class="technique-title">
            ${data.techniqueTitle}
        </div>

        <p>
            ${data.technique}
        </p>

    `;


    // Warning signs

    warningSigns.innerHTML = "";


    data.warnings.forEach(
        warning => {

            const item =
                document.createElement("div");

            item.className =
                "warning-item";

            item.textContent =
                warning;

            warningSigns.appendChild(
                item
            );

        }
    );


    // Action

    recommendedAction.innerHTML =
        data.action;


    // Question

    question.textContent =
        data.question;


    // Options

    checkOptions.innerHTML = "";


    data.options.forEach(
        (option, index) => {

            const button =
                document.createElement("button");

            button.className =
                "check-option";

            button.textContent =
                option.text;

            button.addEventListener(
                "click",
                () => checkAnswer(
                    index,
                    button
                )
            );

            checkOptions.appendChild(
                button
            );

        }
    );


    // Reset feedback

    checkFeedback.className =
        "check-feedback";

    checkFeedback.innerHTML = "";


    // Source

    caseSource.textContent =
        data.source;


    // Progress

    caseProgressText.textContent =
        `Case ${index + 1} of ${cases.length}`;


    caseProgressFill.style.width =
        `${((index + 1) / cases.length) * 100}%`;


    // Tabs

    document
        .querySelectorAll(".case-tab")
        .forEach(
            (tab, tabIndex) => {

                tab.classList.toggle(
                    "active",
                    tabIndex === index
                );

            }
        );


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// Knowledge check

function checkAnswer(
    selectedIndex,
    selectedButton
) {

    const data =
        cases[currentCase];

    const selected =
        data.options[selectedIndex];


    const buttons =
        document.querySelectorAll(
            ".check-option"
        );


    buttons.forEach(
        (button, index) => {

            button.classList.add(
                "disabled"
            );


            if (
                data.options[index].correct
            ) {

                button.classList.add(
                    "correct"
                );

            }

        }
    );


    if (selected.correct) {

        selectedButton.classList.add(
            "correct"
        );


        checkFeedback.className =
            "check-feedback correct-feedback show";


        checkFeedback.innerHTML = `

            <strong>
                ✅ Correct
            </strong>

            <br>

            ${selected.feedback}

        `;

    } else {

        selectedButton.classList.add(
            "wrong"
        );


        checkFeedback.className =
            "check-feedback wrong-feedback show";


        checkFeedback.innerHTML = `

            <strong>
                ⚠️ Review the warning signs
            </strong>

            <br>

            ${selected.feedback}

        `;

    }

}


// Case tabs

document
    .querySelectorAll(".case-tab")
    .forEach(
        (tab, index) => {

            tab.addEventListener(
                "click",
                () => {

                    loadCase(index);

                }
            );

        }
    );


// Go to quiz

function goToQuiz() {

    window.location.href =
        "quiz.html";

}


// Start

loadCase(0);