/* =========================================================
   PHISHGUARD
   HUMAN RISK DASHBOARD
   PHASE 8.3
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       LOAD ENGINE
    ===================================================== */

    function loadEngine(callback) {

        if (
            window.PhishGuardRiskEngine
        ) {

            callback();

            return;

        }


        const script =
            document.createElement("script");

        script.src =
            "js/human-risk-engine.js";

        script.onload =
            callback;

        document.head.appendChild(
            script
        );

    }


    /* =====================================================
       DATA
    ===================================================== */

    function getProfile() {

        if (
            !window.PhishGuardRiskEngine
        ) {

            return null;

        }


        return window.PhishGuardRiskEngine
            .getProfile();

    }


    /* =====================================================
       FORMAT
    ===================================================== */

    function titleCase(
        value
    ) {

        if (!value) {
            return "Unknown";
        }


        return value
            .charAt(0)
            .toUpperCase()
            +
            value.slice(1);

    }


    /* =====================================================
       RISK CLASS
    ===================================================== */

    function riskClass(
        risk
    ) {

        if (risk <= 30) {
            return "low";
        }

        if (risk <= 60) {
            return "moderate";
        }

        if (risk <= 80) {
            return "high";
        }

        return "critical";

    }


    /* =====================================================
       DASHBOARD
    ===================================================== */

    function renderDashboard() {

        const profile =
            getProfile();


        if (!profile) {

            console.error(
                "Human Risk Profile unavailable."
            );

            return;

        }


        const root =
            document.querySelector(
                "#riskDashboard"
            );


        /*
           If your existing dashboard contains
           a dedicated root, use it.

           Otherwise create one automatically.
        */

        let container =
            root;


        if (!container) {

            container =
                document.createElement(
                    "main"
                );

            container.id =
                "riskDashboard";

            container.className =
                "risk-dashboard-generated";

            document.body.appendChild(
                container
            );

        }


        const dna =
            profile.attackDNA;


        const stats =
            profile.statistics;


        const primary =
            profile.primaryWeakness;


        const risk =
            profile.overallRisk;


        const level =
            profile.riskLevel;


        container.innerHTML = `

            <section class="hr-hero">

                <div>

                    <span class="hr-eyebrow">
                        PHASE 8.3 · BEHAVIOR ANALYSIS
                    </span>

                    <h1>
                        Human Risk
                        <span>Dashboard</span>
                    </h1>

                    <p>
                        Your profile is calculated from
                        individual decisions made during
                        phishing attack simulations.
                    </p>

                </div>

            </section>


            <section class="hr-grid">

                <!-- RISK -->

                <div class="hr-card risk-card">

                    <div class="card-title">
                        HUMAN RISK SCORE
                    </div>

                    <div
                        class="risk-gauge"
                        style="--risk:${risk * 3.6}deg;"
                    >

                        <div class="risk-gauge-inner">

                            <strong>
                                ${risk}
                            </strong>

                            <span>
                                / 100
                            </span>

                        </div>

                    </div>

                    <div
                        class="risk-level ${riskClass(
                            risk
                        )}"
                    >
                        ${level}
                    </div>

                </div>


                <!-- PRIMARY WEAKNESS -->

                <div class="hr-card">

                    <div class="card-title">
                        PRIMARY VULNERABILITY
                    </div>

                    <div class="primary-technique">

                        <div class="technique-icon">
                            ⚠
                        </div>

                        <div>

                            <strong>
                                ${titleCase(
                                    primary.technique
                                )}
                            </strong>

                            <span>
                                ${primary.score}%
                            </span>

                        </div>

                    </div>

                    <p>
                        This is currently the strongest
                        behavioral vulnerability detected
                        from your simulator decisions.
                    </p>

                </div>


                <!-- DECISION STATS -->

                <div class="hr-card">

                    <div class="card-title">
                        DECISION STATISTICS
                    </div>

                    <div class="stats-grid">

                        <div>
                            <strong>
                                ${stats.totalDecisions}
                            </strong>
                            <span>
                                Decisions
                            </span>
                        </div>

                        <div>
                            <strong>
                                ${stats.safeDecisions}
                            </strong>
                            <span>
                                Safe
                            </span>
                        </div>

                        <div>
                            <strong>
                                ${stats.riskyDecisions}
                            </strong>
                            <span>
                                Risky
                            </span>
                        </div>

                        <div>
                            <strong>
                                ${stats.decisionAccuracy}%
                            </strong>
                            <span>
                                Accuracy
                            </span>
                        </div>

                    </div>

                </div>

            </section>


            <!-- ATTACK DNA -->

            <section class="dna-section">

                <div class="section-heading">

                    <span>
                        BEHAVIORAL PROFILE
                    </span>

                    <h2>
                        Attack DNA
                    </h2>

                    <p>
                        Each score comes from individual
                        behavioral choices rather than simply
                        counting completed scenarios.
                    </p>

                </div>


                <div class="dna-grid">

                    ${renderDNAItem(
                        "fear",
                        dna.fear
                    )}

                    ${renderDNAItem(
                        "urgency",
                        dna.urgency
                    )}

                    ${renderDNAItem(
                        "authority",
                        dna.authority
                    )}

                    ${renderDNAItem(
                        "curiosity",
                        dna.curiosity
                    )}

                    ${renderDNAItem(
                        "reward",
                        dna.reward
                    )}

                    ${renderDNAItem(
                        "trust",
                        dna.trust
                    )}

                </div>

            </section>


            <!-- RECOMMENDATION -->

            <section class="recommendation-card">

                <div class="recommendation-icon">
                    🧠
                </div>

                <div>

                    <span>
                        PERSONALIZED TRAINING
                    </span>

                    <h2>
                        Focus on
                        ${titleCase(
                            profile
                                .recommendedTraining
                                .technique
                        )}
                    </h2>

                    <p>
                        ${
                            profile
                                .recommendedTraining
                                .description
                        }
                    </p>

                </div>

            </section>


            <!-- ACTION -->

            <section class="dashboard-actions">

                <a
                    href="attack-simulator.html"
                    class="dashboard-btn"
                >
                    Run Simulator Again
                </a>

                <button
                    class="dashboard-btn secondary"
                    id="resetRiskProfile"
                >
                    Reset Behavioral Profile
                </button>

            </section>

        `;


        const reset =
            document.getElementById(
                "resetRiskProfile"
            );


        if (reset) {

            reset.addEventListener(
                "click",
                function () {

                    const confirmed =
                        confirm(
                            "Reset all PhishGuard behavioral data?"
                        );


                    if (!confirmed) {
                        return;
                    }


                    window.PhishGuardRiskEngine
                        .clearProfile();


                    location.reload();

                }
            );

        }

    }


    /* =====================================================
       DNA ITEM
    ===================================================== */

    function renderDNAItem(
        technique,
        value
    ) {

        return `

            <div class="dna-item">

                <div class="dna-header">

                    <strong>
                        ${titleCase(
                            technique
                        )}
                    </strong>

                    <span>
                        ${value}%
                    </span>

                </div>

                <div class="dna-track">

                    <div
                        class="dna-fill"
                        style="width:${value}%"
                    ></div>

                </div>

            </div>

        `;

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    loadEngine(
        function () {

            if (
                document.readyState ===
                "loading"
            ) {

                document.addEventListener(
                    "DOMContentLoaded",
                    renderDashboard
                );

            }

            else {

                renderDashboard();

            }

        }
    );

})();