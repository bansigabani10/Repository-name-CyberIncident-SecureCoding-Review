// ==========================================
// PHISHING EMAIL INTERACTIVE TRAINING
// ==========================================


// Red flag information

const redFlags = {

    sender: {

        title: "Suspicious Sender Address",

        description:
            "The message claims to be from PayPal, but the domain is 'paypa1-support.com'. The number 1 is used instead of the letter 'l', and the domain is not the official PayPal domain.",

        tip:
            "Always carefully inspect the complete sender address. Don't trust a display name alone."

    },


    subject: {

        title: "Urgent Subject Line",

        description:
            "The subject uses alarming language and creates a sense of urgency. Attackers commonly use fear to make people act before they think.",

        tip:
            "Be cautious when an unexpected message says you must act immediately."

    },


    urgency: {

        title: "Threat and Urgency",

        description:
            "The email threatens permanent account suspension within 24 hours. This is a social engineering technique designed to create panic.",

        tip:
            "Stop and independently verify urgent account warnings before taking action."

    },


    link: {

        title: "Suspicious Verification Link",

        description:
            "The message asks you to verify your account through a link. Phishing attacks commonly use links to send victims to fraudulent websites designed to steal credentials.",

        tip:
            "Don't click unexpected login or verification links. Navigate to the organization's official website yourself."

    },


    information: {

        title: "Request for Account Information",

        description:
            "The email asks the recipient to provide account information as part of the verification process. Unexpected requests for sensitive information are a major warning sign.",

        tip:
            "Never provide passwords, OTPs or other sensitive information through an unexpected email."

    }

};


// Track discovered flags

let foundFlags = new Set();

const totalFlags = Object.keys(redFlags).length;


// Find clickable elements

const clickableElements =
    document.querySelectorAll(".clickable");


// Add click events

clickableElements.forEach(element => {

    element.addEventListener("click", function () {

        const id = this.dataset.id;

        analyzeFlag(id, this);

    });

});


// Analyze selected red flag

function analyzeFlag(id, element) {

    const flag = redFlags[id];

    if (!flag) {
        return;
    }


    // Add to found list

    foundFlags.add(id);

    element.classList.add("found");


    // Update score

    updateScore();


    // Display analysis

    const analysis =
        document.getElementById("analysisContent");


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

    if (foundFlags.size === totalFlags) {

        showCompletion();

    }

}


// Update score

function updateScore() {

    const score =
        document.getElementById("score");

    const progress =
        document.getElementById("progressBar");


    score.textContent =
        foundFlags.size;


    const percentage =
        (foundFlags.size / totalFlags) * 100;


    progress.style.width =
        percentage + "%";

}


// Show completion message

function showCompletion() {

    const message =
        document.getElementById("completionMessage");

    message.classList.add("show");

}


// Reset training

function resetTraining() {

    foundFlags.clear();


    // Reset score

    document.getElementById("score")
        .textContent = "0";


    // Reset progress

    document.getElementById("progressBar")
        .style.width = "0%";


    // Reset analysis panel

    document.getElementById("analysisContent")
        .innerHTML = `

        <div class="analysis-empty">

            🔍

            <h3>
                Analyze the Email
            </h3>

            <p>
                Click a suspicious element
                in the email to see its analysis.
            </p>

        </div>

    `;


    // Remove found styles

    document
        .querySelectorAll(".clickable")
        .forEach(element => {

            element.classList.remove("found");

        });


    // Hide completion

    document
        .getElementById("completionMessage")
        .classList.remove("show");

}


// Next module

function goToNextModule() {

    alert(
        "Phase 3 coming next: Fake Website Detection"
    );

}