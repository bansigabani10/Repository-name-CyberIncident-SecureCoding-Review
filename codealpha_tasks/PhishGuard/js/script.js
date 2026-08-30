// =====================================
// PHISHING AWARENESS TRAINING
// Phase 1 JavaScript
// =====================================


// Start Training
function startTraining() {

    const trainingSection =
        document.getElementById("training");

    trainingSection.scrollIntoView({
        behavior: "smooth"
    });

}


// Scroll to Training
function scrollToTraining() {

    const trainingSection =
        document.getElementById("training");

    trainingSection.scrollIntoView({
        behavior: "smooth"
    });

}


// Open Training Module
function openModule(page) {

    window.location.href = page;

}


// Page loaded message
document.addEventListener("DOMContentLoaded", function () {

    console.log(
        "PhishGuard Phishing Awareness Training loaded successfully."
    );

});