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
    ChevronDown
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
import { analyzeJD } from '../utils/jobAnalysis';

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
                <span className="text-2xl font-bold text-gray-900">{score}%</span>
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

    // Load History
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            setHistory(JSON.parse(saved));
        }
    }, []);

    const handleAnalyze = () => {
        if (!formData.company || !formData.role || !formData.jd) return;

        setIsAnalyzing(true);
        setTimeout(() => {
            const result = analyzeJD(formData.company, formData.role, formData.jd);

            // Save to history
            const newHistory = [result, ...history].slice(0, 10); // Keep last 10
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
    };

    if (view === 'results' && currentAnalysis) {
        return (
            <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <button
                    onClick={() => setView('input')}
                    className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
                >
                    &larr; Back to Analysis
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Col: Overview & Skills */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="bg-white border-indigo-100 shadow-md">
                            <CardContent className="pt-6 flex flex-col items-center text-center">
                                <ScoreCircle score={currentAnalysis.readinessScore} />
                                <h2 className="mt-4 text-xl font-bold text-gray-900">Readiness Score</h2>
                                <p className="text-sm text-gray-500 mb-6">Based on JD match & density</p>

                                <div className="w-full space-y-3 text-left">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Company</span>
                                        <span className="font-semibold text-gray-900">{currentAnalysis.company}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Role</span>
                                        <span className="font-semibold text-gray-900">{currentAnalysis.role}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Analyzed</span>
                                        <span className="text-gray-900">{new Date(currentAnalysis.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Layers size={18} className="text-indigo-600" /> Detected Skills
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {Object.entries(currentAnalysis.extractedSkills).map(([cat, skills]) => (
                                        skills.map((skill, i) => (
                                            <span key={cat + i} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full border border-indigo-100">
                                                {skill}
                                            </span>
                                        ))
                                    ))}
                                    {Object.keys(currentAnalysis.extractedSkills).length === 0 && (
                                        <p className="text-sm text-gray-500 italic">No specific technical keywords detected.</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Col: Plan & Checklist */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* 7-Day Plan */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar size={18} className="text-indigo-600" /> 7-Day Preparation Plan
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {currentAnalysis.plan.map((day, i) => (
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
                                <label className="text-sm font-medium text-gray-700">Company Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Google, Startup Inc."
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50/50"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Role / Title</label>
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
                            <label className="text-sm font-medium text-gray-700">Job Description Text</label>
                            <textarea
                                placeholder="Paste the full JD content here..."
                                className="w-full h-48 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50/50 resize-none text-sm leading-relaxed"
                                value={formData.jd}
                                onChange={(e) => setFormData({ ...formData, jd: e.target.value })}
                            />
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
                                        <h4 className="font-semibold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors line-clamp-1">{item.role}</h4>
                                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">{item.readinessScore}%</span>
                                    </div>
                                    <p className="text-xs text-gray-500 truncate">{item.company}</p>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-[10px] text-gray-400">
                                            {new Date(item.createdAt).toLocaleDateString()}
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
