/* =========================================================
   PHISHGUARD
   PHASE 7 + PHASE 8.3
   BEHAVIOR-BASED ATTACK SIMULATOR
========================================================= */

(function () {
    "use strict";

    /* =====================================================
       LOAD HUMAN RISK ENGINE
    ===================================================== */

    function loadRiskEngine(callback) {

        if (window.PhishGuardRiskEngine) {
            callback();
            return;
        }

        const existing =
            document.querySelector(
                'script[data-phishguard-risk-engine="true"]'
            );

        if (existing) {

            existing.addEventListener(
                "load",
                callback
            );

            return;
        }

        const script =
            document.createElement("script");

        script.src =
            "js/human-risk-engine.js";

        script.dataset.phishguardRiskEngine =
            "true";

        script.onload = callback;

        script.onerror = function () {

            console.error(
                "PhishGuard Human Risk Engine could not be loaded."
            );

            callback();

        };

        document.head.appendChild(script);
    }


    /* =====================================================
       SCENARIOS
    ===================================================== */

    const scenarios = [

        {
            id: "fear-01",

            technique: "fear",

            title:
                "Security Alert: Account Compromise",

            description:
                "You receive a message claiming that suspicious activity has been detected on your account.",

            message:
                "SECURITY ALERT: We detected an unauthorized login. Your account may be suspended unless you verify your identity immediately.",

            decisions: [

                {
                    id: "fear-a",

                    text:
                        "Click the verification link immediately.",

                    outcome:
                        "risky",

                    points:
                        20,

                    behavior:
                        "reacted_to_account_warning",

                    feedback:
                        "Risky decision. The attacker is using fear and an account-security warning to make you act without thinking."
                },

                {
                    id: "fear-b",

                    text:
                        "Open the organization's official website manually and check the account.",

                    outcome:
                        "safe",

                    points:
                        -10,

                    behaviors: [
                        "stayed_calm",
                        "contacted_organization_directly"
                    ],

                    feedback:
                        "Good decision. You avoided the suspicious link and independently verified the situation."
                },

                {
                    id: "fear-c",

                    text:
                        "Reply to the message and provide your password.",

                    outcome:
                        "risky",

                    points:
                        30,

                    behaviors: [
                        "responded_to_threat",
                        "shared_information_without_verification"
                    ],

                    feedback:
                        "Dangerous decision. Legitimate organizations should never require you to send your password by email."
                }

            ]

        },


        {
            id: "urgency-01",

            technique: "urgency",

            title:
                "Bank Account: 10 Minutes Remaining",

            description:
                "A message claims your bank account will be locked in ten minutes.",

            message:
                "URGENT: Your online banking access will be permanently disabled in 10 minutes. Click below to prevent account closure.",

            decisions: [

                {
                    id: "urgency-a",

                    text:
                        "Click the link immediately because there is very little time.",

                    outcome:
                        "risky",

                    points:
                        25,

                    behavior:
                        "clicked_immediately",

                    feedback:
                        "Risky decision. Artificial deadlines are one of the most common phishing techniques."
                },

                {
                    id: "urgency-b",

                    text:
                        "Ignore the deadline and open your bank's official website yourself.",

                    outcome:
                        "safe",

                    points:
                        -15,

                    behaviors: [
                        "ignored_deadline_warning",
                        "contacted_organization_directly"
                    ],

                    feedback:
                        "Excellent. You refused to let the artificial deadline control your decision."
                },

                {
                    id: "urgency-c",

                    text:
                        "Reply to the sender asking whether the warning is real.",

                    outcome:
                        "neutral",

                    points:
                        5,

                    behavior:
                        "acted_without_verification",

                    feedback:
                        "Better than clicking the link, but replying to the suspicious sender is still not ideal. Verify through an independent channel."
                }

            ]

        },


        {
            id: "authority-01",

            technique: "authority",

            title:
                "CEO Emergency Request",

            description:
                "You receive an unexpected request that appears to come from your company CEO.",

            message:
                "I'm in an important meeting. I need you to purchase gift cards immediately and send me the codes. Please don't call because I'm unavailable.",

            decisions: [

                {
                    id: "authority-a",

                    text:
                        "Follow the CEO's instructions immediately.",

                    outcome:
                        "risky",

                    points:
                        25,

                    behaviors: [
                        "trusted_authority_without_checking",
                        "followed_manager_request_without_verification"
                    ],

                    feedback:
                        "Risky. Attackers often impersonate executives to exploit authority and pressure employees."
                },

                {
                    id: "authority-b",

                    text:
                        "Verify the request using the company's normal communication channel.",

                    outcome:
                        "safe",

                    points:
                        -15,

                    behavior:
                        "verified_authority",

                    feedback:
                        "Excellent. Authority does not eliminate the need for verification."
                },

                {
                    id: "authority-c",

                    text:
                        "Reply asking the sender to confirm their identity.",

                    outcome:
                        "neutral",

                    points:
                        5,

                    behavior:
                        "acted_without_verification",

                    feedback:
                        "Somewhat cautious, but replying to the suspicious account is not independent verification."
                }

            ]

        },


        {
            id: "curiosity-01",

            technique: "curiosity",

            title:
                "Confidential Salary Document",

            description:
                "You receive an unexpected attachment with a sensational filename.",

            message:
                "CONFIDENTIAL_2026_SALARY_INCREASES.xlsx — You are not supposed to see this. Open immediately.",

            decisions: [

                {
                    id: "curiosity-a",

                    text:
                        "Open the attachment because you want to know what is inside.",

                    outcome:
                        "risky",

                    points:
                        25,

                    behavior:
                        "opened_suspicious_attachment",

                    feedback:
                        "Risky. Attackers frequently use curiosity and confidential-looking files as bait."
                },

                {
                    id: "curiosity-b",

                    text:
                        "Do not open it and report the suspicious message.",

                    outcome:
                        "safe",

                    points:
                        -15,

                    behaviors: [
                        "investigated_safely",
                        "reported_attack"
                    ],

                    feedback:
                        "Excellent. You resisted curiosity-based bait and reported the suspicious content."
                },

                {
                    id: "curiosity-c",

                    text:
                        "Click the link in the message to investigate it.",

                    outcome:
                        "risky",

                    points:
                        20,

                    behavior:
                        "clicked_sensational_link",

                    feedback:
                        "Risky. Curiosity is exactly what the attacker wants you to exploit."
                }

            ]

        },


        {
            id: "reward-01",

            technique: "reward",

            title:
                "You've Won a Smartphone!",

            description:
                "A message tells you that you have won an expensive prize.",

            message:
                "Congratulations! You have been selected to receive a brand-new smartphone. Claim your prize before midnight.",

            decisions: [

                {
                    id: "reward-a",

                    text:
                        "Click the prize link and claim the reward.",

                    outcome:
                        "risky",

                    points:
                        25,

                    behaviors: [
                        "clicked_prize_link",
                        "claimed_fake_reward"
                    ],

                    feedback:
                        "Risky. Unexpected prizes are commonly used as phishing bait."
                },

                {
                    id: "reward-b",

                    text:
                        "Ignore the message because you did not enter any competition.",

                    outcome:
                        "safe",

                    points:
                        -15,

                    behavior:
                        "questioned_unexpected_reward",

                    feedback:
                        "Good decision. Unexpected rewards should be treated with suspicion."
                },

                {
                    id: "reward-c",

                    text:
                        "Click the link just to see whether the prize is real.",

                    outcome:
                        "risky",

                    points:
                        20,

                    behavior:
                        "clicked_prize_link",

                    feedback:
                        "Risky. Even curiosity about a reward can lead you to a malicious website."
                }

            ]

        },


        {
            id: "trust-01",

            technique: "trust",

            title:
                "Message From a Familiar Contact",

            description:
                "A message appears to come from someone you know.",

            message:
                "Hi, I need you to send me the latest company document. I'm currently having trouble accessing my account. Please send it here.",

            decisions: [

                {
                    id: "trust-a",

                    text:
                        "Send the document because you recognize the person's name.",

                    outcome:
                        "risky",

                    points:
                        25,

                    behaviors: [
                        "trusted_familiar_name",
                        "shared_information_without_verification"
                    ],

                    feedback:
                        "Risky. Familiar names and compromised accounts can be used to build trust."
                },

                {
                    id: "trust-b",

                    text:
                        "Contact the person through another trusted channel before sending anything.",

                    outcome:
                        "safe",

                    points:
                        -15,

                    behaviors: [
                        "independently_verified_request",
                        "contacted_organization_directly"
                    ],

                    feedback:
                        "Excellent. Independent verification is the safest way to confirm an unusual request."
                },

                {
                    id: "trust-c",

                    text:
                        "Reply asking whether they really need the document.",

                    outcome:
                        "neutral",

                    points:
                        5,

                    behavior:
                        "acted_without_verification",

                    feedback:
                        "Be careful. If the account is compromised, the attacker can simply confirm the request."
                }

            ]

        }

    ];


    /* =====================================================
       STATE
    ===================================================== */

    let currentScenario = 0;

    let sessionRisk = 50;

    let answeredScenarios = {};

    let scenarioResults = [];


    /* =====================================================
       DOM
    ===================================================== */

    function get(id) {
        return document.getElementById(id);
    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    function init() {

        loadSession();

        renderScenarioList();

        renderCurrentScenario();

        updateProgress();

        updateRiskDisplay();

    }


    /* =====================================================
       LOAD SESSION
    ===================================================== */

    function loadSession() {

        try {

            const saved =
                localStorage.getItem(
                    "phishguardSimulatorSession"
                );

            if (!saved) {
                return;
            }

            const data =
                JSON.parse(saved);

            sessionRisk =
                Number(
                    data.sessionRisk ?? 50
                );

            answeredScenarios =
                data.answeredScenarios || {};

            scenarioResults =
                Array.isArray(
                    data.scenarioResults
                )
                    ? data.scenarioResults
                    : [];

        }
        catch (error) {

            console.warn(
                "Could not restore simulator session.",
                error
            );

        }

    }


    /* =====================================================
       SAVE SESSION
    ===================================================== */

    function saveSession() {

        localStorage.setItem(

            "phishguardSimulatorSession",

            JSON.stringify({

                sessionRisk,

                answeredScenarios,

                scenarioResults

            })

        );

    }


    /* =====================================================
       RENDER SCENARIO LIST
    ===================================================== */

    function renderScenarioList() {

        const list =
            get("scenarioList");

        if (!list) return;

        list.innerHTML = "";


        scenarios.forEach(
            (scenario, index) => {

                const button =
                    document.createElement("button");

                button.className =
                    "scenario-item";

                if (
                    index === currentScenario
                ) {

                    button.classList.add(
                        "active"
                    );

                }


                if (
                    answeredScenarios[
                        scenario.id
                    ]
                ) {

                    button.classList.add(
                        "completed"
                    );

                }


                button.innerHTML = `

                    <span class="scenario-number">
                        ${index + 1}
                    </span>

                    <span class="scenario-info">

                        <strong>
                            ${escapeHTML(
                                scenario.title
                            )}
                        </strong>

                        <small>
                            ${capitalize(
                                scenario.technique
                            )}
                        </small>

                    </span>

                    <span class="scenario-state">
                        ${
                            answeredScenarios[
                                scenario.id
                            ]
                                ? "✓"
                                : ""
                        }
                    </span>

                `;


                button.addEventListener(
                    "click",
                    function () {

                        currentScenario =
                            index;

                        renderScenarioList();

                        renderCurrentScenario();

                    }
                );


                list.appendChild(button);

            }
        );

    }


    /* =====================================================
       RENDER CURRENT SCENARIO
    ===================================================== */

    function renderCurrentScenario() {

        const container =
            get("scenarioContent");

        if (!container) return;


        const scenario =
            scenarios[currentScenario];


        const completed =
            answeredScenarios[
                scenario.id
            ];


        container.innerHTML = `

            <div class="scenario-header">

                <span class="scenario-technique">
                    ${capitalize(
                        scenario.technique
                    )}
                </span>

                <h2>
                    ${escapeHTML(
                        scenario.title
                    )}
                </h2>

                <p>
                    ${escapeHTML(
                        scenario.description
                    )}
                </p>

            </div>


            <div class="attack-message">

                <div class="message-label">
                    SUSPICIOUS MESSAGE
                </div>

                <div class="message-body">
                    ${escapeHTML(
                        scenario.message
                    )}
                </div>

            </div>


            ${
                completed

                    ?

                    renderCompletedScenario(
                        scenario
                    )

                    :

                    renderDecisionOptions(
                        scenario
                    )
            }

        `;

        attachDecisionEvents();

    }


    /* =====================================================
       DECISION OPTIONS
    ===================================================== */

    function renderDecisionOptions(
        scenario
    ) {

        return `

            <div class="decision-section">

                <h3>
                    What would you do?
                </h3>

                <p class="decision-help">
                    Choose the action you would actually take.
                    Your behavioral response will be analyzed.
                </p>


                <div class="decision-list">

                    ${scenario.decisions
                        .map(
                            (decision, index) => `

                            <button
                                class="decision-btn"
                                data-decision-index="${index}"
                            >

                                <span class="decision-number">
                                    ${String.fromCharCode(
                                        65 + index
                                    )}
                                </span>

                                <span>
                                    ${escapeHTML(
                                        decision.text
                                    )}
                                </span>

                            </button>

                        `
                        )
                        .join("")
                    }

                </div>

            </div>

        `;

    }


    /* =====================================================
       ATTACH DECISION EVENTS
    ===================================================== */

    function attachDecisionEvents() {

        document
            .querySelectorAll(
                ".decision-btn"
            )
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        function () {

                            const index =
                                Number(
                                    button.dataset
                                        .decisionIndex
                                );

                            processDecision(
                                index
                            );

                        }
                    );

                }
            );

    }


    /* =====================================================
       PROCESS DECISION
    ===================================================== */

    function processDecision(
        decisionIndex
    ) {

        const scenario =
            scenarios[currentScenario];

        const decision =
            scenario.decisions[
                decisionIndex
            ];


        if (
            answeredScenarios[
                scenario.id
            ]
        ) {

            return;

        }


        /* ---------------------------------------------
           UPDATE SESSION RISK
        --------------------------------------------- */

        sessionRisk =

            Math.max(

                0,

                Math.min(

                    100,

                    sessionRisk +
                    decision.points

                )

            );


        /* ---------------------------------------------
           SAVE RESULT
        --------------------------------------------- */

        const result = {

            id:
                Date.now(),

            scenarioId:
                scenario.id,

            technique:
                scenario.technique,

            decisionId:
                decision.id,

            decisionText:
                decision.text,

            outcome:
                decision.outcome,

            points:
                decision.points,

            timestamp:
                new Date().toISOString()

        };


        scenarioResults.push(
            result
        );


        answeredScenarios[
            scenario.id
        ] = true;


        saveSession();


        /* ---------------------------------------------
           RECORD BEHAVIOR
        --------------------------------------------- */

        recordDecisionBehavior(
            scenario,
            decision
        );


        /* ---------------------------------------------
           UPDATE UI
        --------------------------------------------- */

        showFeedback(
            scenario,
            decision
        );


        updateProgress();

        updateRiskDisplay();

        renderScenarioList();

    }


    /* =====================================================
       RECORD BEHAVIOR
    ===================================================== */

    function recordDecisionBehavior(
        scenario,
        decision
    ) {

        if (
            !window.PhishGuardRiskEngine
        ) {

            console.warn(
                "Human Risk Engine is not available."
            );

            return;

        }


        const metadata = {

            scenarioId:
                scenario.id,

            decisionId:
                decision.id

        };


        /*
           A decision can contain one behavior
           or several behaviors.
        */

        if (
            Array.isArray(
                decision.behaviors
            )
        ) {

            window.PhishGuardRiskEngine
                .recordBehaviors(
                    decision.behaviors,
                    metadata
                );

        }

        else if (
            decision.behavior
        ) {

            window.PhishGuardRiskEngine
                .recordBehavior(
                    decision.behavior,
                    metadata
                );

        }

    }


    /* =====================================================
       FEEDBACK
    ===================================================== */

    function showFeedback(
        scenario,
        decision
    ) {

        const container =
            get("scenarioContent");

        if (!container) return;


        const feedbackClass =

            decision.outcome === "safe"

                ? "safe"

                : decision.outcome === "risky"

                    ? "risky"

                    : "neutral";


        const nextIndex =
            currentScenario + 1;


        const hasNext =
            nextIndex <
            scenarios.length;


        container.innerHTML = `

            <div class="scenario-header">

                <span class="scenario-technique">
                    ${capitalize(
                        scenario.technique
                    )}
                </span>

                <h2>
                    ${escapeHTML(
                        scenario.title
                    )}
                </h2>

            </div>


            <div class="decision-feedback ${feedbackClass}">

                <div class="feedback-title">

                    ${
                        decision.outcome === "safe"
                            ? "✓ SAFE DECISION"
                            : decision.outcome === "risky"
                                ? "⚠ RISKY DECISION"
                                : "ℹ NEEDS IMPROVEMENT"
                    }

                </div>

                <p>
                    ${escapeHTML(
                        decision.feedback
                    )}
                </p>

                <div class="feedback-points">

                    Session Risk:
                    <strong>
                        ${
                            decision.points > 0
                                ? "+" + decision.points
                                : decision.points
                        }
                    </strong>

                </div>

            </div>


            <div class="behavior-recorded">

                <span>🧠</span>

                <div>

                    <strong>
                        Behavioral response recorded
                    </strong>

                    <p>
                        This decision has been added to your
                        personalized Attack DNA.
                    </p>

                </div>

            </div>


            <div class="next-action">

                ${
                    hasNext

                        ?

                        `
                            <button
                                class="primary-btn"
                                id="nextScenarioBtn"
                            >
                                Next Scenario →
                            </button>
                        `

                        :

                        `
                            <button
                                class="primary-btn"
                                id="finishSimulatorBtn"
                            >
                                View Risk Profile →
                            </button>
                        `
                }

            </div>

        `;


        const nextButton =
            get("nextScenarioBtn");


        if (nextButton) {

            nextButton.addEventListener(
                "click",
                function () {

                    currentScenario =
                        nextIndex;

                    renderScenarioList();

                    renderCurrentScenario();

                    updateProgress();

                }
            );

        }


        const finishButton =
            get("finishSimulatorBtn");


        if (finishButton) {

            finishButton.addEventListener(
                "click",
                function () {

                    window.location.href =
                        "human-risk-dashboard.html";

                }
            );

        }

    }


    /* =====================================================
       COMPLETED SCENARIO
    ===================================================== */

    function renderCompletedScenario(
        scenario
    ) {

        const result =
            scenarioResults.find(
                item =>
                    item.scenarioId ===
                    scenario.id
            );


        return `

            <div class="completed-box">

                <div class="completed-icon">
                    ✓
                </div>

                <h3>
                    Scenario Completed
                </h3>

                <p>
                    You already answered this scenario.
                </p>

                ${
                    result

                        ?

                        `
                            <div class="completed-result">

                                <strong>
                                    ${
                                        result.outcome ===
                                        "safe"
                                            ? "Safe Decision"
                                            : result.outcome ===
                                              "risky"
                                                ? "Risky Decision"
                                                : "Neutral Decision"
                                    }
                                </strong>

                                <span>
                                    ${
                                        result.points > 0
                                            ? "+" +
                                              result.points
                                            : result.points
                                    }
                                    risk points
                                </span>

                            </div>
                        `

                        : ""

                }

            </div>

        `;

    }


    /* =====================================================
       PROGRESS
    ===================================================== */

    function updateProgress() {

        const completed =
            Object.keys(
                answeredScenarios
            ).length;


        const total =
            scenarios.length;


        const text =
            get("progressText");

        const bar =
            get("progressBar");


        if (text) {

            text.textContent =
                `${completed} / ${total}`;

        }


        if (bar) {

            bar.style.width =
                `${(
                    completed /
                    total
                ) * 100}%`;

        }

    }


    /* =====================================================
       RISK DISPLAY
    ===================================================== */

    function updateRiskDisplay() {

        const score =
            get("riskScore");

        const level =
            get("riskLevel");


        if (score) {

            score.textContent =
                sessionRisk;

        }


        let label;


        if (
            sessionRisk <= 30
        ) {

            label = "LOW";

        }

        else if (
            sessionRisk <= 60
        ) {

            label = "MODERATE";

        }

        else if (
            sessionRisk <= 80
        ) {

            label = "HIGH";

        }

        else {

            label = "CRITICAL";

        }


        if (level) {

            level.textContent =
                label;

        }

    }


    /* =====================================================
       UTILITY
    ===================================================== */

    function capitalize(value) {

        if (!value) {
            return "";
        }

        return (
            value.charAt(0).toUpperCase() +
            value.slice(1)
        );

    }


    function escapeHTML(value) {

        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* =====================================================
       START
    ===================================================== */

    loadRiskEngine(
        function () {

            document.addEventListener(
                "DOMContentLoaded",
                init
            );

            /*
               If DOMContentLoaded already happened.
            */

            if (
                document.readyState !==
                "loading"
            ) {

                init();

            }

        }
    );

})();