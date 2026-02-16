import React, { useState, useEffect } from 'react';
import {
    Briefcase,
    Search,
    FileText,
    ArrowRight,
    Clock,
    Trash2,
    CheckCircle,
    BarChart2,
    Calendar,
    Layers,
    HelpCircle,
    ChevronDown,
    Download,
    Copy,
    Target,
    PenTool,
    XCircle,
    Building,
    Users,
    Zap,
    Filter,
    AlertTriangle
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
    Progress
} from '../components/ui/shadcn';
import { analyzeJD, getCompanyProfile } from '../utils/jobAnalysis';

const STORAGE_KEY = 'job_placement_history';

// Helper component for score display
const ScoreCircle = ({ score }) => {
    const radius = 40;
    const stroke = 6;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center w-24 h-24">
            <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
                <circle
                    stroke="#f3f4f6"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-in-out' }}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="text-indigo-600 drop-shadow-sm"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{Math.round(score)}%</span>
            </div>
        </div>
    );
};


export const Assessments = () => {
    const [view, setView] = useState('input'); // 'input', 'results'
    const [history, setHistory] = useState([]);
    const [currentAnalysis, setCurrentAnalysis] = useState(null);
    const [formData, setFormData] = useState({ company: '', role: '', jd: '' });
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [skillConfidence, setSkillConfidence] = useState({}); // { skillName: 'know' | 'practice' }
    const [jdWarning, setJdWarning] = useState(null);
    const [historyError, setHistoryError] = useState(null);
    const [jdError, setJdError] = useState(null);

    // Load History with robust error handling
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    // Filter out corrupted entries
                    const validHistory = parsed.filter(item => item && item.id && item.baseScore !== undefined);
                    setHistory(validHistory);
                    if (validHistory.length < parsed.length) {
                        setHistoryError("One saved entry couldn't be loaded. Create a new analysis.");
                    }
                }
            }
        } catch (e) {
            console.error("Failed to load history:", e);
            setHistoryError("One saved entry couldn't be loaded. Create a new analysis.");
            localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    // Initialize/Update live confidence state when analysis changes
    useEffect(() => {
        if (currentAnalysis) {
            setSkillConfidence(currentAnalysis.skillConfidenceMap || {});
        }
    }, [currentAnalysis]);

    // Validation Effect
    useEffect(() => {
        if (formData.jd.length > 0 && formData.jd.length < 200) {
            setJdWarning("This JD is too short to analyze deeply. Paste full JD for better output.");
        } else {
            setJdWarning(null);
        }
    }, [formData.jd]);

    const handleAnalyze = () => {
        if (!formData.jd || formData.jd.trim().length === 0) {
            setJdError('Job Description is required. Please paste a JD to analyze.');
            return;
        }
        setJdError(null);

        setIsAnalyzing(true);
        setTimeout(() => {
            const result = analyzeJD(formData.company, formData.role, formData.jd);

            // skillConfidenceMap is already initialized in analyzeJD now
            const newHistory = [result, ...history].slice(0, 10);
            setHistory(newHistory);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));

            setCurrentAnalysis(result);
            setIsAnalyzing(false);
            setView('results');
        }, 800);
    };

    const loadHistoryItem = (item) => {
        setCurrentAnalysis(item);
        setView('results');
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem(STORAGE_KEY);
        setHistoryError(null);
    };

    // Live Score Logic - Based on baseScore
    const calculateLiveScore = (baseScore, confidenceMap) => {
        let score = baseScore;
        Object.values(confidenceMap).forEach((status) => {
            if (status === 'know') score += 2;
            if (status === 'practice') score -= 2;
        });
        return Math.max(0, Math.min(100, score));
    };

    const toggleSkill = (skill) => {
        setSkillConfidence(prev => {
            const next = { ...prev, [skill]: prev[skill] === 'know' ? 'practice' : 'know' };

            // Persist changes to history immediately
            if (currentAnalysis) {
                const newFinalScore = calculateLiveScore(currentAnalysis.baseScore, next);

                const updatedAnalysis = {
                    ...currentAnalysis,
                    skillConfidenceMap: next,
                    finalScore: newFinalScore,
                    updatedAt: new Date().toISOString()
                };

                const updatedHistory = history.map(h => h.id === currentAnalysis.id ? updatedAnalysis : h);
                setHistory(updatedHistory);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
                setCurrentAnalysis(updatedAnalysis); // Update current view to reflect persistence
            }
            return next;
        });
    };

    // Export Tools
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    const generateChecklistText = () => {
        if (!currentAnalysis || !currentAnalysis.checklist) return "";
        return Object.entries(currentAnalysis.checklist).map(([round, items]) =>
            `[${round.toUpperCase()}]\n` + items.map(item => `- ${item}`).join('\n')
        ).join('\n\n');
    };

    const generateQuestionsText = () => {
        if (!currentAnalysis) return "";
        return currentAnalysis.questions.map((q, i) => `${i + 1}. ${q}`).join('\n');
    };

    const generateExportText = () => {
        if (!currentAnalysis) return "";
        return `
JOB ANALYSIS REPORT
Company: ${currentAnalysis.company || "N/A"}
Role: ${currentAnalysis.role || "N/A"}
Date: ${new Date(currentAnalysis.createdAt).toLocaleDateString()}
Score: ${currentAnalysis.finalScore}%

SKILLS:
${Object.entries(currentAnalysis.extractedSkills).map(([cat, skills]) =>
            `\n[${cat.toUpperCase()}]\n` + (skills.length > 0 ? skills.map(s => `- ${s} (${skillConfidence[s]?.toUpperCase() || 'PRACTICE'})`).join('\n') : "  No skills detected")
        ).join('\n')}

HIRING PROCESS:
${currentAnalysis.roundMapping?.map(r => `${r.roundTitle}: ${r.focusAreas.join(', ')}`).join('\n') || 'N/A'}

7-DAY PLAN:
${currentAnalysis.plan7Days.map(d => `${d.day}: ${d.focus}\n${d.tasks.map(t => `  - ${t}`).join('\n')}`).join('\n')}

QUESTIONS:
${currentAnalysis.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}
        `.trim();
    };

    const downloadTxt = () => {
        const element = document.createElement("a");
        const file = new Blob([generateExportText()], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `Analysis_${currentAnalysis.company || 'Job'}_${currentAnalysis.role || 'Role'}.txt`;
        document.body.appendChild(element);
        element.click();
    };

    if (view === 'results' && currentAnalysis) {
        const currentScore = currentAnalysis.finalScore;
        const weakSkills = Object.entries(skillConfidence)
            .filter(([, status]) => status === 'practice')
            .map(([skill]) => skill)
            .slice(0, 3);

        const companyProfile = getCompanyProfile(currentAnalysis.company);
        const companyIntel = companyProfile || { size: 'Unknown', industry: 'Technology Services', focus: 'General' };
        const process = currentAnalysis.roundMapping || [];

        return (
            <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={() => setView('input')}
                        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
                    >
                        &larr; Back to Analysis
                    </button>
                    <div className="flex gap-2 flex-wrap">
                        <button onClick={() => copyToClipboard(currentAnalysis.plan7Days.map(d => `${d.day}: ${d.focus}\n${d.tasks.join('\n')}`).join('\n\n'))} className="px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-2">
                            <Copy size={12} /> Plan
                        </button>
                        <button onClick={() => copyToClipboard(generateChecklistText())} className="px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-2">
                            <Copy size={12} /> Checklist
                        </button>
                        <button onClick={() => copyToClipboard(generateQuestionsText())} className="px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-2">
                            <Copy size={12} /> Questions
                        </button>
                        <button onClick={downloadTxt} className="px-3 py-1.5 text-xs font-medium bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-100 flex items-center gap-2">
                            <Download size={12} /> Download Report
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Col: Overview & Skills */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="bg-white border-indigo-100 shadow-md transition-all duration-300">
                            <CardContent className="pt-6 flex flex-col items-center text-center">
                                <ScoreCircle score={currentScore} />
                                <h2 className="mt-4 text-xl font-bold text-gray-900">Readiness Score</h2>
                                <p className="text-sm text-gray-500 mb-6">Live update based on your self-check</p>

                                <div className="w-full space-y-3 text-left">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Company</span>
                                        <span className="font-semibold text-gray-900">{currentAnalysis.company || "Not specified"}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Role</span>
                                        <span className="font-semibold text-gray-900">{currentAnalysis.role || "Not specified"}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Analyzed</span>
                                        <span className="text-gray-900">{new Date(currentAnalysis.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Company Intel Card */}
                        <Card className="bg-gradient-to-br from-gray-50 to-white">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Building size={18} className="text-indigo-600" /> Company Intel
                                </CardTitle>
                                <CardDescription className="text-xs">Heuristically generated</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                        <Users size={16} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Estimated Size</p>
                                        <p className="font-semibold text-sm text-gray-900">{companyIntel.size}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                                        <Filter size={16} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Industry</p>
                                        <p className="font-semibold text-sm text-gray-900">{companyIntel.industry}</p>
                                    </div>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Zap size={14} className="text-amber-500" />
                                        <span className="text-xs font-bold text-gray-700">Typical Hiring Focus</span>
                                    </div>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {companyIntel.focus}
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-0">
                                <p className="text-[10px] text-gray-400 italic w-full text-center">Demo Mode: Company intel generated heuristically.</p>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Layers size={18} className="text-indigo-600" /> Skill Assessment
                                </CardTitle>
                                <CardDescription>Tap to toggle status</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {Object.entries(currentAnalysis.extractedSkills).map(([cat, skills]) => {
                                        if (skills.length === 0) return null;
                                        return (
                                            <div key={cat}>
                                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{cat.replace(/([A-Z])/g, ' $1').trim()}</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {skills.map((skill, i) => {
                                                        const status = skillConfidence[skill] || 'practice';
                                                        return (
                                                            <button
                                                                key={skill + i}
                                                                onClick={() => toggleSkill(skill)}
                                                                className={`
                                                                    px-3 py-1 text-xs font-medium rounded-full border transition-all flex items-center gap-1.5
                                                                    ${status === 'know'
                                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                                                        : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                                                                    }
                                                                `}
                                                            >
                                                                {status === 'know' ? <CheckCircle size={10} /> : <XCircle size={10} />}
                                                                {skill}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {Object.keys(currentAnalysis.extractedSkills).every(k => currentAnalysis.extractedSkills[k].length === 0) && (
                                        <p className="text-sm text-gray-500 italic">No specific technical keywords detected.</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Col: Process, Plan & Checklist */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Round Mapping */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Briefcase size={18} className="text-indigo-600" /> Predicted Hiring Process
                                </CardTitle>
                                <CardDescription>Typical round structure for this profile</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="relative border-l-2 border-indigo-100 ml-4 space-y-8 py-2">
                                    {process.map((round, i) => (
                                        <div key={i} className="relative pl-8">
                                            {/* Timeline dot */}
                                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-indigo-500"></div>

                                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                                                <h4 className="text-sm font-bold text-gray-900">{round.roundTitle}</h4>
                                            </div>

                                            <div className="flex flex-wrap gap-1.5 mb-3">
                                                {round.focusAreas.map((area, j) => (
                                                    <span key={j} className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600">{area}</span>
                                                ))}
                                            </div>

                                            <div className="bg-amber-50 border border-amber-100 rounded p-3 text-xs text-amber-800 flex gap-2">
                                                <div className="shrink-0 pt-0.5"><Target size={12} /></div>
                                                <div>
                                                    <span className="font-semibold">Why this matters:</span> {round.whyItMatters}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {(!process || process.length === 0) && (
                                        <p className="text-sm text-gray-500 italic pl-8">No process data available.</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* 7-Day Plan */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar size={18} className="text-indigo-600" /> 7-Day Preparation Plan
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {currentAnalysis.plan7Days.map((day, i) => (
                                        <div key={i} className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                            <div className="flex-shrink-0 w-16 text-sm font-bold text-indigo-600 pt-1">
                                                {day.day}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-900 mb-1">{day.focus}</h4>
                                                <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                                                    {day.tasks.map((task, j) => (
                                                        <li key={j}>{task}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Interview Questions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <HelpCircle size={18} className="text-indigo-600" /> Likely Interview Questions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {currentAnalysis.questions.map((q, i) => (
                                        <li key={i} className="flex gap-3 text-sm text-gray-700 items-start">
                                            <span className="flex-shrink-0 w-5 h-5 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                                                {i + 1}
                                            </span>
                                            {q}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Action Next Box */}
                        <div className="bg-indigo-900 rounded-xl p-6 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <Target className="text-indigo-300" size={20} />
                                    Ready to take action?
                                </h3>
                                <p className="text-indigo-200 text-sm mt-1 max-w-md">
                                    {weakSkills.length > 0
                                        ? `Focus your immediate attention on: ${weakSkills.join(', ')}`
                                        : "You marked everything as 'Matched'. Great start! Review the deeper concepts now."
                                    }
                                </p>
                            </div>
                            <button className="whitespace-nowrap px-5 py-2.5 bg-white text-indigo-900 font-semibold rounded-lg hover:bg-indigo-50 transition-colors shadow-sm text-sm">
                                Start Day 1 Plan
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Job Description Analysis</h1>
                <p className="text-gray-500 mt-2">Paste a JD to get a tailored preparation strategy.</p>
                {historyError && (
                    <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200 flex items-center gap-2">
                        <AlertTriangle size={16} /> {historyError}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input Form */}
                <Card className="lg:col-span-2 shadow-sm border-indigo-100">
                    <CardHeader>
                        <CardTitle>New Analysis</CardTitle>
                        <CardDescription>Enter details manually (no scraping for privacy).</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Company Name <span className="text-gray-400 font-normal">(Optional)</span></label>
                                <input
                                    type="text"
                                    placeholder="e.g. Google, Startup Inc."
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50/50"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Role / Title <span className="text-gray-400 font-normal">(Optional)</span></label>
                                <input
                                    type="text"
                                    placeholder="e.g. SDE-1, Frontend Dev"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50/50"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Job Description Text <span className="text-red-500">*</span></label>
                            <textarea
                                placeholder="Paste the full JD content here..."
                                className={`w-full h-48 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50/50 resize-none text-sm leading-relaxed ${jdWarning ? 'border-amber-300 focus:ring-amber-200' : ''}`}
                                value={formData.jd}
                                onChange={(e) => setFormData({ ...formData, jd: e.target.value })}
                            />
                            {jdWarning && (
                                <p className="text-xs text-amber-600 flex items-center gap-1 mt-1 animate-in fade-in">
                                    <AlertTriangle size={12} /> {jdWarning}
                                </p>
                            )}
                            {jdError && (
                                <p className="text-xs text-red-600 flex items-center gap-1 mt-1 animate-in fade-in">
                                    <AlertTriangle size={12} /> {jdError}
                                </p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-3 pt-2">
                        <button
                            disabled={isAnalyzing || !formData.jd}
                            onClick={handleAnalyze}
                            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white transition-all bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-200"
                        >
                            {isAnalyzing ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Analyzing...
                                </>
                            ) : (
                                <>Analyze & Generate Plan <ArrowRight size={16} /></>
                            )}
                        </button>
                    </CardFooter>
                </Card>

                {/* History Sidebar */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                            <Clock size={16} /> Recent History
                        </h3>
                        {history.length > 0 && (
                            <button onClick={clearHistory} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
                                <Trash2 size={12} /> Clear
                            </button>
                        )}
                    </div>

                    <div className="space-y-3">
                        {history.length === 0 ? (
                            <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                <FileText className="mx-auto text-gray-300 mb-2" size={24} />
                                <p className="text-sm text-gray-500">No recent analyses.</p>
                            </div>
                        ) : (
                            history.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => loadHistoryItem(item)}
                                    className="p-3 bg-white rounded-lg border border-gray-100 hover:border-indigo-200 shadow-sm hover:shadow-md cursor-pointer transition-all group"
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-semibold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors line-clamp-1">{item.role || "Role not specified"}</h4>
                                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                                            {item.finalScore !== undefined ? Math.round(item.finalScore) : Math.round(item.baseScore)}%
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 truncate">{item.company || "Company not specified"}</p>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-[10px] text-gray-400">
                                            {new Date(item.updatedAt || item.createdAt).toLocaleDateString()}
                                        </span>
                                        <ArrowRight size={12} className="text-gray-300 group-hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-4px] group-hover:translate-x-0" />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
