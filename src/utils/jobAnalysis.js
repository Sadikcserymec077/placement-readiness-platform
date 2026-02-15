
// Skill Dictionary & Question Bank
export const SKILL_DB = {
    core: {
        keywords: ['DSA', 'Data Structures', 'Algorithms', 'OOP', 'Object Oriented', 'DBMS', 'Database Management', 'OS', 'Operating Systems', 'Networks', 'Computer Networks', 'System Design', 'Low Level Design', 'High Level Design', 'Distributed Systems'],
        questions: [
            "Explain the difference between a process and a thread.",
            "How does a hash map work internally? Handle collisions.",
            "Explain ACID properties in databases.",
            "What is the difference between TCP and UDP?",
            "Design a URL shortener system (High-level approach).",
            "Explain Polymorphism and its types with examples."
        ]
    },
    languages: {
        keywords: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C++', 'C#', 'Go', 'Golang', 'Rust', 'Ruby', 'Swift', 'Kotlin'],
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
    }
};

// Heuristic Analysis Logic
export const analyzeJD = (company, role, jdText) => {
    const text = jdText.toLowerCase();
    const foundSkills = {};
    let totalSkillCount = 0;
    let categoryCount = 0;

    // 1. Skill Extraction
    Object.keys(SKILL_DB).forEach(category => {
        const hits = SKILL_DB[category].keywords.filter(keyword =>
            text.includes(keyword.toLowerCase())
        );
        if (hits.length > 0) {
            foundSkills[category] = hits;
            totalSkillCount += hits.length;
            categoryCount++;
        }
    });

    // Default if no skills found
    if (totalSkillCount === 0) {
        foundSkills['general'] = ['Fresher Basics', 'Communication', 'Aptitude'];
    }

    // 2. Score Calculation
    let score = 35; // Base
    score += Math.min(30, categoryCount * 5); // +5 per category (max 30)
    if (company && company.length > 2) score += 10;
    if (role && role.length > 2) score += 10;
    if (jdText.length > 800) score += 10; // Detailed JD bonus
    // Skill density bonus
    if (totalSkillCount > 5) score += 5;
    score = Math.min(100, score); // Cap at 100

    // 3. Generate Questions (Pick random 10 from detected categories)
    let pool = [];
    Object.keys(foundSkills).forEach(cat => {
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

    // 4. Generate Checklist
    const checklist = {
        round1: ["Quantitative Aptitude", "Logical Reasoning", "Verbal Ability", "Resume Review"],
        round2: ["Data Structures (Arrays/Strings)", "Basic Algorithms", "Time Complexity Analysis"],
        round3: ["Project Deep Dive", "System Design Basics", "Core CS Concepts (OS/DBMS)"],
        round4: ["Behavioral Answers (STAR Method)", "Company Research", "Questions for Interviewer"]
    };

    if (foundSkills.web) checklist.round3.push("Framework Lifecycle Methodologies");
    if (foundSkills.data) checklist.round2.push("SQL Queries & Normalization");
    if (foundSkills.cloud) checklist.round3.push("Deployment & CI/CD Pipelines");

    // 5. Generate 7-Day Plan
    const plan = [
        { day: "Day 1-2", focus: "Foundations", tasks: ["Revise Core CS Concepts (OS, DBMS)", "Practice 10 Easy LeetCode problems", "Review Aptitude formulas"] },
        { day: "Day 3-4", focus: "Coding & Skills", tasks: ["Focus on " + (foundSkills.languages?.[0] || "Language") + " specific patterns", "Solve Medium Difficulty Problems", "Build/Refactor a small feature related to " + (foundSkills.web?.[0] || "Web")] },
        { day: "Day 5", focus: "Projects", tasks: ["Deep dive into Resume Projects", "Prepare 'Challenges Faced' stories", "Mock modify your major project"] },
        { day: "Day 6", focus: "Mocks", tasks: ["Take a timed coding mock", "Record answers to HR questions", "Review System Design basics"] },
        { day: "Day 7", focus: "Revision", tasks: ["Review weak areas", "Read company engineering blog", "Relax and sleep well"] }
    ];

    return {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        company,
        role,
        jdText,
        extractedSkills: foundSkills,
        readinessScore: score,
        questions,
        checklist,
        plan
    };
};
