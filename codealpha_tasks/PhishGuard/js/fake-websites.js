// ==========================================
// FAKE WEBSITE DETECTION
// ==========================================


// Information about suspicious elements

const websiteFlags = {

    url: {

        title: "Suspicious Website Domain",

        description:
            "The address uses 'secure-mybank-login.com'. A website can look like a legitimate bank while using an unrelated or deceptive domain.",

        tip:
            "Always check the complete domain name. When accessing banking services, use the official website or a trusted bookmark rather than an unexpected link."

    },


    "login-form": {

        title: "Credential Collection",

        description:
            "This page provides a login form requesting a username. Phishing websites commonly imitate real login pages to capture credentials.",

        tip:
            "Before entering credentials, verify that you are on the legitimate organization's website."

    },


    password: {

        title: "Password Request",

        description:
            "The page asks for a password. Entering a password on an unverified website can expose your credentials to attackers.",

        tip:
            "Verify the website's domain before entering a password."

    },


    security: {

        title: "Urgent Security Message",

        description:
            "The message says the account must be verified immediately. Creating urgency can pressure users into ignoring other warning signs.",

        tip:
            "Don't let urgent messages prevent you from checking the website carefully."

    },


    "login-button": {

        title: "Suspicious Login Action",

        description:
            "The Sign In button would submit credentials to the website. On an unverified website, submitting credentials could expose them to an attacker.",

        tip:
            "Never submit credentials until the website's legitimacy has been independently verified."

    },


    "forgot-password": {

        title: "Potential Credential-Recovery Trap",

        description:
            "Password-recovery links on fraudulent websites can be used to collect additional personal information or credentials.",

        tip:
            "Use password recovery only through the organization's verified official website."

    }

};


// State

let discoveredFlags = new Set();

const totalFlags =
    Object.keys(websiteFlags).length;


// Find clickable elements

const clickableElements =
    document.querySelectorAll(".clickable");


// Add click handlers

clickableElements.forEach(element => {

    element.addEventListener("click", function () {

        const id =
            this.dataset.id;

        inspectWebsiteElement(
            id,
            this
        );

    });

});


// Inspect element

function inspectWebsiteElement(id, element) {

    const flag =
        websiteFlags[id];

    if (!flag) {
        return;
    }


    // Add discovered flag

    discoveredFlags.add(id);

    element.classList.add("found");


    // Update score

    updateWebsiteScore();


    // Analysis panel

    const analysis =
        document.getElementById(
            "analysisContent"
        );


    analysis.innerHTML = `

        <div class="analysis-result">

            <h3>
                🚨 ${flag.title}
            </h3>

            <p>
                ${flag.description}
            </p>

            <div class="tip">

                <strong>💡 Safety Tip:</strong><br>

                ${flag.tip}

            </div>

        </div>

    `;


    // Check completion

    if (
        discoveredFlags.size ===
        totalFlags
    ) {

        showWebsiteCompletion();

    }

}


// Update score

function updateWebsiteScore() {

    const score =
        document.getElementById(
            "score"
        );


    const progress =
        document.getElementById(
            "progressBar"
        );


    score.textContent =
        discoveredFlags.size;


    const percentage =
        (
            discoveredFlags.size /
            totalFlags
        ) * 100;


    progress.style.width =
        percentage + "%";

}


// Completion

function showWebsiteCompletion() {

    document
        .getElementById(
            "completionMessage"
        )
        .classList.add("show");

}


// Reset

function resetWebsiteTraining() {

    discoveredFlags.clear();


    document
        .getElementById("score")
        .textContent = "0";


    document
        .getElementById("progressBar")
        .style.width = "0%";


    document
        .querySelectorAll(".clickable")
        .forEach(element => {

            element.classList.remove(
                "found"
            );

        });


    document
        .getElementById(
            "analysisContent"
        )
        .innerHTML = `

        <div class="analysis-empty">

            🔍

            <h3>
                Inspect the Website
            </h3>

            <p>
                Click an element on the website
                to learn why it may be suspicious.
            </p>

        </div>

    `;


    document
        .getElementById(
            "completionMessage"
        )
        .classList.remove("show");

}


// Next module

function goToNextModule() {

    window.location.href =
        "social-engineering.html";

}