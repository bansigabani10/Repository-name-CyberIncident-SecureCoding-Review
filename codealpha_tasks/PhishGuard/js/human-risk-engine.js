/* =========================================================
   PHISHGUARD
   PHASE 8.3
   BEHAVIOR-BASED HUMAN RISK ENGINE
========================================================= */

(function () {

    "use strict";


    const STORAGE_KEY =
        "phishguardRiskData";

    const PROFILE_KEY =
        "phishguardHumanRiskProfile";


    const TECHNIQUES = [
        "fear",
        "urgency",
        "authority",
        "curiosity",
        "reward",
        "trust"
    ];


    /* =====================================================
       BEHAVIOR WEIGHTS
    ===================================================== */

    const BEHAVIOR_WEIGHTS = {

        clicked_immediately: {
            urgency: 20
        },

        acted_without_verification: {
            urgency: 15,
            trust: 5
        },

        ignored_deadline_warning: {
            urgency: -15
        },

        responded_to_threat: {
            fear: 20
        },

        reacted_to_account_warning: {
            fear: 20,
            urgency: 10
        },

        stayed_calm: {
            fear: -15
        },

        trusted_authority_without_checking: {
            authority: 25
        },

        followed_manager_request_without_verification: {
            authority: 25,
            trust: 10
        },

        verified_authority: {
            authority: -15
        },

        opened_suspicious_attachment: {
            curiosity: 25
        },

        clicked_sensational_link: {
            curiosity: 20
        },

        investigated_safely: {
            curiosity: -10
        },

        clicked_prize_link: {
            reward: 25
        },

        claimed_fake_reward: {
            reward: 30
        },

        questioned_unexpected_reward: {
            reward: -15
        },

        trusted_familiar_name: {
            trust: 20
        },

        shared_information_without_verification: {
            trust: 30
        },

        independently_verified_request: {
            trust: -20
        },

        checked_url: {
            urgency: -8,
            trust: -8
        },

        verified_sender: {
            authority: -10,
            trust: -10
        },

        contacted_organization_directly: {
            fear: -10,
            urgency: -10,
            authority: -10,
            trust: -10
        },

        reported_attack: {
            fear: -5,
            urgency: -5,
            authority: -5,
            curiosity: -5,
            reward: -5,
            trust: -5
        },

        refused_request: {
            fear: -10,
            urgency: -10,
            authority: -10,
            curiosity: -10,
            reward: -10,
            trust: -10
        }

    };


    /* =====================================================
       DEFAULT DATA
    ===================================================== */

    function defaultData() {

        return {

            attackDNA: {
                fear: 0,
                urgency: 0,
                authority: 0,
                curiosity: 0,
                reward: 0,
                trust: 0
            },

            behaviorEvents: [],

            scenarioResults: [],

            completedScenarios: []

        };

    }


    /* =====================================================
       LOAD
    ===================================================== */

    function loadData() {

        try {

            const saved =
                localStorage.getItem(
                    STORAGE_KEY
                );


            if (!saved) {

                return defaultData();

            }


            const parsed =
                JSON.parse(saved);


            const base =
                defaultData();


            return {

                ...base,

                ...parsed,

                attackDNA: {

                    ...base.attackDNA,

                    ...(parsed.attackDNA || {})

                },

                behaviorEvents:
                    Array.isArray(
                        parsed.behaviorEvents
                    )
                        ? parsed.behaviorEvents
                        : [],

                scenarioResults:
                    Array.isArray(
                        parsed.scenarioResults
                    )
                        ? parsed.scenarioResults
                        : [],

                completedScenarios:
                    Array.isArray(
                        parsed.completedScenarios
                    )
                        ? parsed.completedScenarios
                        : []

            };

        }

        catch (error) {

            console.error(
                "PhishGuard risk data error:",
                error
            );

            return defaultData();

        }

    }


    /* =====================================================
       SAVE
    ===================================================== */

    function saveData(data) {

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(data)

        );

    }


    /* =====================================================
       RECORD BEHAVIOR
    ===================================================== */

    function recordBehavior(
        behavior,
        metadata = {}
    ) {

        const weights =
            BEHAVIOR_WEIGHTS[
                behavior
            ];


        if (!weights) {

            console.warn(
                "Unknown PhishGuard behavior:",
                behavior
            );

            return null;

        }


        const data =
            loadData();


        const event = {

            id:
                Date.now() +
                Math.random(),

            behavior,

            scenarioId:
                metadata.scenarioId || null,

            decisionId:
                metadata.decisionId || null,

            timestamp:
                new Date().toISOString(),

            weights: {
                ...weights
            }

        };


        data.behaviorEvents.push(
            event
        );


        TECHNIQUES.forEach(
            technique => {

                const change =
                    Number(
                        weights[
                            technique
                        ] || 0
                    );


                data.attackDNA[
                    technique
                ] += change;

            }
        );


        /*
           Keep raw values bounded.
        */

        TECHNIQUES.forEach(
            technique => {

                data.attackDNA[
                    technique
                ] = Math.max(
                    0,
                    Math.min(
                        100,
                        data.attackDNA[
                            technique
                        ]
                    )
                );

            }
        );


        saveData(data);

        generateProfile();

        return event;

    }


    /* =====================================================
       MULTIPLE BEHAVIORS
    ===================================================== */

    function recordBehaviors(
        behaviors,
        metadata = {}
    ) {

        if (
            !Array.isArray(
                behaviors
            )
        ) {

            return;

        }


        behaviors.forEach(
            behavior => {

                recordBehavior(
                    behavior,
                    metadata
                );

            }
        );

    }


    /* =====================================================
       RECORD SCENARIO
    ===================================================== */

    function recordScenarioResult(
        result
    ) {

        const data =
            loadData();


        data.scenarioResults.push(
            result
        );


        if (
            result.scenarioId &&
            !data.completedScenarios.includes(
                result.scenarioId
            )
        ) {

            data.completedScenarios.push(
                result.scenarioId
            );

        }


        saveData(data);

        generateProfile();

    }


    /* =====================================================
       ATTACK DNA
    ===================================================== */

    function getAttackDNA(
        data
    ) {

        const dna = {};


        TECHNIQUES.forEach(
            technique => {

                dna[technique] =
                    Math.max(
                        0,
                        Math.min(
                            100,
                            Math.round(
                                Number(
                                    data.attackDNA[
                                        technique
                                    ] || 0
                                )
                            )
                        )
                    );

            }
        );


        return dna;

    }


    /* =====================================================
       RANK
    ===================================================== */

    function rankDNA(
        dna
    ) {

        return Object.entries(dna)
            .sort(
                (a, b) =>
                    b[1] - a[1]
            )
            .map(
                ([technique, score]) => ({
                    technique,
                    score
                })
            );

    }


    /* =====================================================
       STATISTICS
    ===================================================== */

    function getStatistics(
        data
    ) {

        const total =
            data.scenarioResults.length;


        const safe =
            data.scenarioResults.filter(
                item =>
                    item.outcome ===
                    "safe"
            ).length;


        const risky =
            data.scenarioResults.filter(
                item =>
                    item.outcome ===
                    "risky"
            ).length;


        const neutral =
            data.scenarioResults.filter(
                item =>
                    item.outcome ===
                    "neutral"
            ).length;


        const accuracy =
            total
                ? Math.round(
                    (
                        safe /
                        total
                    ) * 100
                )
                : 0;


        return {

            totalDecisions:
                total,

            safeDecisions:
                safe,

            riskyDecisions:
                risky,

            neutralDecisions:
                neutral,

            decisionAccuracy:
                accuracy,

            completedScenarios:
                data.completedScenarios.length,

            behaviorEvents:
                data.behaviorEvents.length

        };

    }


    /* =====================================================
       OVERALL RISK
    ===================================================== */

    function calculateRisk(
        dna,
        statistics
    ) {

        if (
            statistics.totalDecisions ===
                0 &&
            statistics.behaviorEvents ===
                0
        ) {

            return 0;

        }


        const dnaAverage =
            Object.values(dna)
                .reduce(
                    (sum, value) =>
                        sum + value,
                    0
                )
                /
                TECHNIQUES.length;


        const decisionRisk =
            100 -
            statistics.decisionAccuracy;


        return Math.max(
            0,
            Math.min(
                100,
                Math.round(
                    (
                        dnaAverage *
                        0.60
                    )
                    +
                    (
                        decisionRisk *
                        0.40
                    )
                )
            )
        );

    }


    /* =====================================================
       RISK LEVEL
    ===================================================== */

    function getRiskLevel(
        risk
    ) {

        if (risk <= 30) {

            return "LOW";

        }

        if (risk <= 60) {

            return "MODERATE";

        }

        if (risk <= 80) {

            return "HIGH";

        }

        return "CRITICAL";

    }


    /* =====================================================
       RECOMMENDATIONS
    ===================================================== */

    const recommendations = {

        fear:
            "Practice staying calm when messages use account suspension, legal threats, security alerts, or fear.",

        urgency:
            "Practice slowing down when messages create deadlines, countdowns, or pressure to act immediately.",

        authority:
            "Practice verifying requests from managers, executives, IT teams, banks, and other authority figures.",

        curiosity:
            "Practice identifying suspicious attachments, sensational links, confidential documents, and curiosity bait.",

        reward:
            "Practice recognizing fake prizes, giveaways, bonuses, discounts, and unexpected rewards.",

        trust:
            "Practice independently verifying requests even when they appear to come from familiar people."

    };


    /* =====================================================
       GENERATE PROFILE
    ===================================================== */

    function generateProfile() {

        const data =
            loadData();


        const dna =
            getAttackDNA(data);


        const ranking =
            rankDNA(dna);


        const statistics =
            getStatistics(data);


        const risk =
            calculateRisk(
                dna,
                statistics
            );


        const primary =
            ranking[0] || {
                technique: "none",
                score: 0
            };


        const secondary =
            ranking[1] || {
                technique: "none",
                score: 0
            };


        const profile = {

            version:
                "8.3-behavior",

            generatedAt:
                new Date().toISOString(),

            overallRisk:
                risk,

            riskLevel:
                getRiskLevel(risk),

            attackDNA:
                dna,

            ranking,

            primaryWeakness:
                primary,

            secondaryWeakness:
                secondary,

            statistics,

            recommendedTraining: {

                technique:
                    primary.technique,

                score:
                    primary.score,

                description:
                    recommendations[
                        primary.technique
                    ] ||
                    "Complete more simulations to generate a personalized recommendation."

            }

        };


        localStorage.setItem(

            PROFILE_KEY,

            JSON.stringify(profile)

        );


        return profile;

    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    window.PhishGuardRiskEngine = {

        recordBehavior,

        recordBehaviors,

        recordScenarioResult,

        analyze:
            generateProfile,

        run:
            generateProfile,

        getProfile:
            function () {

                try {

                    const saved =
                        localStorage.getItem(
                            PROFILE_KEY
                        );


                    return saved
                        ? JSON.parse(saved)
                        : generateProfile();

                }

                catch (error) {

                    return generateProfile();

                }

            },

        clearProfile:
            function () {

                localStorage.removeItem(
                    STORAGE_KEY
                );

                localStorage.removeItem(
                    PROFILE_KEY
                );

                localStorage.removeItem(
                    "phishguardSimulatorSession"
                );

            }

    };


    /* =====================================================
       INITIALIZE
    ===================================================== */

    generateProfile();

})();