
// Skill Dictionary & Question Bank
export const SKILL_DB = {
    coreCS: {
        keywords: ['DSA', 'Data Structures', 'Algorithms', 'OOP', 'Object Oriented', 'DBMS', 'Database Management', 'OS', 'Operating Systems', 'Networks', 'Computer Networks', 'System Design', 'Low Level Design', 'High Level Design', 'Distributed Systems'],
        questions: [
            "Explain the difference between a process and a thread.",
            "How does a hash map work internally? Handle collisions.",
            "Explain ACID properties in databases.",
            "What is the difference between TCP and UDP.",
            "Design a URL shortener system (High-level approach).",
            "Explain Polymorphism and its types with examples."
        ]
    },
    languages: {
        keywords: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'C#', 'Go', 'Golang', 'Rust', 'Ruby', 'Swift', 'Kotlin'],
        questions: [
            "Explain memory management in your primary language.",
            "What are the key differences between Java and C++? (or Python/JS)",
            "Explain the concept of closures/decorators/pointers (language specific).",
            "How does garbage collection work in this language?"
        ]
    },
    web: {
        keywords: ['React', 'Next.js', 'Vue', 'Angular', 'Node.js', 'Express', 'HTML', 'CSS', 'DOM', 'Redux', 'Context API', 'REST', 'GraphQL', 'WebSockets', 'Microservices'],
        questions: [
            "What is the Virtual DOM and how does generic reconciliation work?",
            "Explain the event loop in Node.js/Browser.",
            "Difference between SSR, CSR, and SSG.",
            "How do you secure a REST API?",
            "Explain CORS and how to handle it."
        ]
    },
    data: {
        keywords: ['SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'NoSQL', 'Redis', 'ElasticSearch', 'Kafka', 'Spark', 'Hadoop'],
        questions: [
            "Difference between SQL and NoSQL databases.",
            "Explain Indexing and when to use it.",
            "How would you optimize a slow running query?",
            "What is normalization and denormalization?",
            "Explain eventual consistency."
        ]
    },
    cloud: {
        keywords: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'GitHub Actions', 'Linux', 'Bash', 'Shell', 'DevOps'],
        questions: [
            "What is a container and how is it different from a VM?",
            "Explain the concept of Autoscaling.",
            "What is the purpose of a Load Balancer?",
            "Basic Linux commands for process management (ps, top, kill)."
        ]
    },
    testing: {
        keywords: ['Selenium', 'Cypress', 'Playwright', 'Jest', 'Mocha', 'JUnit', 'PyTest', 'TDD', 'Unit Testing', 'Integration Testing'],
        questions: [
            "Difference between Unit Testing and Integration Testing.",
            "What is TDD (Test Driven Development)?",
            "How do you handle flaky tests?"
        ]
    },
    other: {
        keywords: [], // Populated dynamically if empty
        questions: []
    }
};

const ENTERPRISE_COMPANIES = [
    'amazon', 'google', 'microsoft', 'adobe', 'salesforce', 'oracle', 'ibm', 'cisco', 'intel',
    'infosys', 'tcs', 'wipro', 'accenture', 'cognizant', 'capgemini', 'hcl', 'tech mahindra', 'deloitte',
    'jpmorgan', 'goldman sachs', 'morgan stanley', 'wells fargo', 'american express'
];

export const getCompanyProfile = (companyName) => {
    const name = (companyName || "").toLowerCase();

    // Heuristic 1: Check known lists
    const isEnterprise = ENTERPRISE_COMPANIES.some(c => name.includes(c));

    if (isEnterprise) {
        return {
            size: 'Enterprise',
            industry: 'Technology Services',
            focus: 'Strong fundamentals (DSA/OS/DBMS) + System Design'
        };
    }

    // Heuristic 2: Name patterns
    if (name.includes('inc') || name.includes('corp') || name.includes('ltd') || name.includes('group')) {
        return {
            size: 'Mid-size',
            industry: 'Technology Services',
            focus: 'Balanced mix of Coding & Framework skills'
        };
    }

    // Default to Startup
    return {
        size: 'Startup',
        industry: 'Technology Services',
        focus: 'Practical application logic, Speed, and Full-stack depth'
    };
};

const generateHiringProcess = (profile, skills) => {
    const rounds = [];
    const isStartup = profile.size.includes('Startup');

    if (isStartup) {
        rounds.push({
            roundTitle: "Round 1: Practical / Screening",
            focusAreas: ["Take-home assignment", "Pair-programming", "Building a feature"],
            whyItMatters: "Startups value 'builders'. They want to see clean, working code for a real problem."
        });

        if (skills.web && skills.web.length > 0) {
            rounds.push({
                roundTitle: "Round 2: Framework Deep Dive",
                focusAreas: ["React/Node lifecycles", "State management", "API design"],
                whyItMatters: "To verify you can ship production features starting Day 1."
            });
        } else {
            rounds.push({
                roundTitle: "Round 2: Problem Solving",
                focusAreas: ["Algorithmic problems", "Real-world scenarios", "Logical thinking"],
                whyItMatters: "To test your logical thinking and adaptability."
            });
        }

        rounds.push({
            roundTitle: "Round 3: Founder / Culture Fit",
            focusAreas: ["Product vision", "Ownership", "Adaptability"],
            whyItMatters: "In small teams, culture and alignment are critical risks."
        });

    } else {
        // Enterprise & Mid-size
        rounds.push({
            roundTitle: "Round 1: Online Assessment",
            focusAreas: ["DSA problems", "Aptitude MCQs", "Timed test (HackerRank/Amcat)"],
            whyItMatters: "Automated filter to screen thousands of applicants."
        });

        rounds.push({
            roundTitle: "Round 2: Technical Interview I",
            focusAreas: ["Data Structures (Arrays, Trees, Graphs)", "Clean & optimized code", "Problem Solving"],
            whyItMatters: "Tests core problem-solving capability independent of framework."
        });

        rounds.push({
            roundTitle: "Round 3: Technical Interview II",
            focusAreas: ["DBMS & OS concepts", "High/Low Level Design", "Architectural thinking"],
            whyItMatters: "Evaluates architectural thinking and theoretical depth."
        });

        rounds.push({
            roundTitle: "Round 4: Managerial / HR",
            focusAreas: ["STAR method questions", "Project experiences", "Salary discussions"],
            whyItMatters: "Checks team fit, communication skills, and long-term potential."
        });
    }

    return rounds;
};

// Heuristic Analysis Logic
export const analyzeJD = (company, role, jdText) => {
    const text = (jdText || "").toLowerCase();

    // Strict Schema Initialization
    const extractedSkills = {
        coreCS: [],
        languages: [],
        web: [],
        data: [],
        cloud: [],
        testing: [],
        other: []
    };

    let totalSkillCount = 0;
    let categoryCount = 0;

    // 1. Skill Extraction
    Object.keys(SKILL_DB).forEach(category => {
        if (category === 'other') return; // skip other for now

        const hits = SKILL_DB[category].keywords.filter(keyword =>
            text.includes(keyword.toLowerCase())
        );
        if (hits.length > 0) {
            extractedSkills[category] = hits;
            totalSkillCount += hits.length;
            categoryCount++;
        }
    });

    // Default if no skills found
    if (totalSkillCount === 0) {
        extractedSkills.other = ['Communication', 'Problem solving', 'Basic coding', 'Projects'];
    }

    // 2. Score Calculation
    let score = 35; // Base
    score += Math.min(30, categoryCount * 5); // +5 per category (max 30)
    if (company && company.trim().length > 0) score += 10;
    if (role && role.trim().length > 0) score += 10;
    if (jdText.length > 800) score += 10; // Detailed JD bonus
    score = Math.min(100, score); // Cap at 100

    // 3. Generate Questions (Pick random 10 from detected categories)
    let pool = [];
    Object.keys(extractedSkills).forEach(cat => {
        if (SKILL_DB[cat]) {
            pool = [...pool, ...SKILL_DB[cat].questions];
        }
    });

    // Fill with general questions if pool is small
    if (pool.length < 10) {
        pool = [...pool,
            "Tell me about a challenging project you worked on.",
            "Where do you see yourself in 5 years?",
            "Describe a time you had a conflict with a team member.",
            "What are your strengths and weaknesses?"
        ];
    }

    // Shuffle and pick 10
    const questions = pool.sort(() => 0.5 - Math.random()).slice(0, 10);

    // 4. Generate Checklist (Standardized Schema)
    const checklist = {
        round1: ["Quantitative Aptitude", "Logical Reasoning", "Verbal Ability", "Resume Review"],
        round2: ["Data Structures (Arrays/Strings)", "Basic Algorithms", "Time Complexity Analysis"],
        round3: ["Project Deep Dive", "System Design Basics", "Core CS Concepts (OS/DBMS)"],
        round4: ["Behavioral Answers (STAR Method)", "Company Research", "Questions for Interviewer"]
    };

    if (extractedSkills.web.length > 0) checklist.round3.push("Framework Lifecycle Methodologies");
    if (extractedSkills.data.length > 0) checklist.round2.push("SQL Queries & Normalization");
    if (extractedSkills.cloud.length > 0) checklist.round3.push("Deployment & CI/CD Pipelines");

    // 5. Generate 7-Day Plan
    const plan7Days = [
        { day: "Day 1-2", focus: "Foundations", tasks: ["Revise Core CS Concepts (OS, DBMS)", "Practice 10 Easy LeetCode problems", "Review Aptitude formulas"] },
        { day: "Day 3-4", focus: "Coding & Skills", tasks: ["Focus on " + (extractedSkills.languages?.[0] || "Language") + " specific patterns", "Solve Medium Difficulty Problems", "Build/Refactor a small feature related to " + (extractedSkills.web?.[0] || "Web")] },
        { day: "Day 5", focus: "Projects", tasks: ["Deep dive into Resume Projects", "Prepare 'Challenges Faced' stories", "Mock modify your major project"] },
        { day: "Day 6", focus: "Mocks", tasks: ["Take a timed coding mock", "Record answers to HR questions", "Review System Design basics"] },
        { day: "Day 7", focus: "Revision", tasks: ["Review weak areas", "Read company engineering blog", "Relax and sleep well"] }
    ];

    // 6. Company Intel & Round Mapping
    const companyProfile = getCompanyProfile(company);
    const roundMapping = generateHiringProcess(companyProfile, extractedSkills);

    // Initialize confidence map 
    const skillConfidenceMap = {};
    Object.values(extractedSkills).flat().forEach(skill => {
        skillConfidenceMap[skill] = 'practice';
    });

    // Calculate initial finalScore applying default practice penalties
    let finalScore = score;
    Object.values(skillConfidenceMap).forEach((status) => {
        if (status === 'practice') finalScore -= 2;
    });
    finalScore = Math.max(0, Math.min(100, finalScore));

    return {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        company: company || "",
        role: role || "",
        jdText,
        extractedSkills,
        roundMapping,
        checklist,
        plan7Days,
        questions,
        baseScore: score,
        skillConfidenceMap,
        finalScore
    };
};
