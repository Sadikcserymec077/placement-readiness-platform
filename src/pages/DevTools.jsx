import React, { useState, useEffect } from 'react';
import {
    CheckSquare,
    AlertTriangle,
    RotateCcw,
    Lock,
    Rocket,
    ExternalLink,
    ChevronRight,
    ClipboardList,
    ShieldCheck,
    Link as LinkIcon,
    CheckCircle,
    Copy,
    Award,
    Globe
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter
} from '../components/ui/shadcn';
import { Link, useNavigate } from 'react-router-dom';

const CHECKLIST_KEY = 'prp_test_checklist';
const PROOF_KEY = 'prp_final_submission';

const PROJECT_STEPS = [
    "Project Setup & Routing",
    "Job Analysis Core Logic",
    "UI Implementation (Shadcn/Tailwind)",
    "Interactive Features (Scoring/Toggles)",
    "Persistence & History",
    "Company Intelligence Engine",
    "Testing & Validation",
    "Final Polish & Shipping"
];

const TEST_ITEMS = [
    { id: 'validation', label: 'JD required validation works', hint: 'Try analyzing with empty JD. Button should be disabled.' },
    { id: 'warning', label: 'Short JD warning shows for <200 chars', hint: 'Type "short text" in JD. Verify amber warning appears.' },
    { id: 'extraction', label: 'Skills extraction groups correctly', hint: 'Paste JD with "React" and "Python". Verify they appear in Web and Languages.' },
    { id: 'mapping', label: 'Round mapping changes based on company + skills', hint: 'Compare "Google" (Enterprise) vs "Startup" (Startup) rounds.' },
    { id: 'score_det', label: 'Score calculation is deterministic', hint: 'Analyzing same JD twice should give same base score.' },
    { id: 'score_live', label: 'Skill toggles update score live', hint: 'Toggle skills in results. Verify score changes (+/- 2).' },
    { id: 'persistence', label: 'Changes persist after refresh', hint: 'Toggle a skill, refresh page. verifies state remains.' },
    { id: 'history', label: 'History saves and loads correctly', hint: 'Check sidebar for new entries. Click execution to load.' },
    { id: 'export', label: 'Export buttons copy the correct content', hint: 'Click "Plan" and paste in Notepad. Verify formatting.' },
    { id: 'console', label: 'No console errors on core pages', hint: 'Open F12 Console. Navigate app. Ensure clean log.' },
];

export const TestChecklist = () => {
    const [checkedItems, setCheckedItems] = useState({});

    // Load from storage
    useEffect(() => {
        try {
            const saved = localStorage.getItem(CHECKLIST_KEY);
            if (saved) {
                setCheckedItems(JSON.parse(saved));
            }
        } catch (e) {
            console.error("Failed to load checklist", e);
        }
    }, []);

    // Save to storage
    const handleCheck = (id) => {
        const updated = { ...checkedItems, [id]: !checkedItems[id] };
        setCheckedItems(updated);
        localStorage.setItem(CHECKLIST_KEY, JSON.stringify(updated));
    };

    const handleReset = () => {
        if (confirm('Reset all test progress?')) {
            setCheckedItems({});
            localStorage.removeItem(CHECKLIST_KEY);
        }
    };

    const passedCount = TEST_ITEMS.filter(i => checkedItems[i.id]).length;
    const totalCount = TEST_ITEMS.length;
    const progress = (passedCount / totalCount) * 100;
    const isComplete = passedCount === totalCount;

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500 py-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                        <ClipboardList className="text-indigo-600" /> QA Checklist
                    </h1>
                    <p className="text-gray-500 mt-2">Verify all functionalities before shipping to production.</p>
                </div>
                {isComplete && (
                    <Link to="/prp/08-ship" className="group flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all font-semibold shadow-lg shadow-emerald-200">
                        Go to Ship Page <Rocket size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                )}
            </div>

            <Card className={`border-t-4 ${isComplete ? 'border-t-emerald-500' : 'border-t-indigo-500'} shadow-md`}>
                <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-6">
                    <div className="flex justify-between items-end mb-2">
                        <CardTitle className="text-xl">release-v1.0 Candidate</CardTitle>
                        <span className={`text-2xl font-bold ${isComplete ? 'text-emerald-600' : 'text-indigo-600'}`}>
                            {passedCount} / {totalCount} Passed
                        </span>
                    </div>
                    {/* Manual Progress Bar since standard component might be small */}
                    <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-500 ease-out ${isComplete ? 'bg-emerald-500' : 'bg-indigo-600'}`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    {!isComplete && (
                        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-3 text-amber-800">
                            <AlertTriangle size={20} className="shrink-0" />
                            <p className="font-medium text-sm">Deployment Locked: Fix items marked incomplete before shipping.</p>
                        </div>
                    )}

                    <div className="space-y-1">
                        {TEST_ITEMS.map((item) => (
                            <label
                                key={item.id}
                                className={`flex items-start gap-4 p-4 rounded-lg border transition-all cursor-pointer hover:bg-gray-50
                                    ${checkedItems[item.id] ? 'bg-gray-50 border-gray-200 opacity-75' : 'bg-white border-gray-200 shadow-sm'}
                                `}
                            >
                                <div className="relative flex items-center pt-0.5">
                                    <input
                                        type="checkbox"
                                        className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 shadow-sm checked:border-indigo-600 checked:bg-indigo-600 focus:ring-2 focus:ring-indigo-500"
                                        checked={!!checkedItems[item.id]}
                                        onChange={() => handleCheck(item.id)}
                                    />
                                    <CheckSquare
                                        size={14}
                                        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100"
                                        strokeWidth={3}
                                    />
                                </div>
                                <div>
                                    <p className={`font-semibold text-gray-900 ${checkedItems[item.id] ? 'line-through text-gray-500' : ''}`}>
                                        {item.label}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                        <ChevronRight size={12} /> {item.hint}
                                    </p>
                                </div>
                            </label>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="bg-gray-50 border-t border-gray-100 flex justify-between py-4">
                    <button
                        onClick={handleReset}
                        className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center gap-2 px-3 py-1.5 rounded hover:bg-red-50 transition-colors"
                    >
                        <RotateCcw size={14} /> Reset checklist
                    </button>
                    <div className="text-xs text-gray-400">
                        Checklist ID: {CHECKLIST_KEY}
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export const ShipReadiness = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState('checking');

    useEffect(() => {
        const saved = localStorage.getItem(CHECKLIST_KEY);
        const checkedItems = saved ? JSON.parse(saved) : {};
        const passedCount = TEST_ITEMS.filter(i => checkedItems[i.id]).length;
        const totalCount = TEST_ITEMS.length;

        if (passedCount === totalCount) {
            setStatus('unlocked');
        } else {
            setStatus('locked');
        }
    }, []);

    if (status === 'locked') {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 animate-in zoom-in-95 duration-300">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Lock size={40} className="text-gray-400" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Shipment Locked</h1>
                <p className="text-gray-500 max-w-md text-center mb-8">
                    You cannot access the shipping dashboard until all QA tests are passed.
                    Please complete the checklist first.
                </p>
                <Link
                    to="/prp/07-test"
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
                >
                    Go to QA Checklist <ExternalLink size={18} />
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500 py-12 text-center">
            <div className="inline-flex p-4 bg-emerald-50 rounded-full text-emerald-600 mb-6 ring-8 ring-emerald-50/50">
                <Rocket size={48} />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Ready for Liftoff!</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                All 10/10 QA tests passed. The platform is stable, validated, and ready for production deployment.
            </p>

            <Link to="/prp/proof" className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 text-lg font-bold shadow-xl shadow-indigo-200 transition-all transform hover:-translate-y-1 mb-12">
                Generate Final Proof <Award size={20} />
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <ShieldCheck className="text-emerald-500 mx-auto mb-3" size={32} />
                    <h3 className="font-bold text-gray-900 mb-1">Quality Assured</h3>
                    <p className="text-sm text-gray-500">Validation & Logic verified.</p>
                </div>
                <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-emerald-600 font-mono font-bold text-2xl mb-2">v1.2.0</div>
                    <p className="text-sm text-gray-500">Release Version</p>
                </div>
            </div>
        </div>
    );
};

export const ProofPage = () => {
    const [status, setStatus] = useState('checking');
    const [links, setLinks] = useState({ lovable: '', github: '', deployed: '' });
    const [completedSteps, setCompletedSteps] = useState({});

    // Check checklist status
    useEffect(() => {
        const saved = localStorage.getItem(CHECKLIST_KEY);
        const checkedItems = saved ? JSON.parse(saved) : {};
        const passedCount = TEST_ITEMS.filter(i => checkedItems[i.id]).length;
        const totalCount = TEST_ITEMS.length;

        if (passedCount !== totalCount) {
            setStatus('locked');
        } else {
            setStatus('unlocked');
            // Load proof data
            const savedProof = localStorage.getItem(PROOF_KEY);
            if (savedProof) {
                const parsed = JSON.parse(savedProof);
                setLinks(parsed.links || { lovable: '', github: '', deployed: '' });
                setCompletedSteps(parsed.completedSteps || {});
            }
        }
    }, []);

    const handleLinkChange = (key, value) => {
        const newLinks = { ...links, [key]: value };
        setLinks(newLinks);
        saveProof(newLinks, completedSteps);
    };

    const toggleStep = (step) => {
        const newSteps = { ...completedSteps, [step]: !completedSteps[step] };
        setCompletedSteps(newSteps);
        saveProof(links, newSteps);
    };

    const saveProof = (currentLinks, currentSteps) => {
        localStorage.setItem(PROOF_KEY, JSON.stringify({
            links: currentLinks,
            completedSteps: currentSteps
        }));
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    };

    const areLinksValid = isValidUrl(links.lovable) && isValidUrl(links.github) && isValidUrl(links.deployed);
    const areStepsComplete = PROJECT_STEPS.every(step => completedSteps[step]);

    // Also independently verify checklist status
    const savedChecklist = localStorage.getItem(CHECKLIST_KEY);
    const checklistItems = savedChecklist ? JSON.parse(savedChecklist) : {};
    const checklistComplete = TEST_ITEMS.filter(i => checklistItems[i.id]).length === TEST_ITEMS.length;

    const isShippable = areLinksValid && areStepsComplete && checklistComplete;

    const copySubmission = () => {
        const text = `Placement Readiness Platform — Final Submission

Lovable Project: ${links.lovable}
GitHub Repository: ${links.github}
Live Deployment: ${links.deployed}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence`;
        navigator.clipboard.writeText(text);
        alert("Submission Proof Copied!");
    };

    if (status === 'locked') {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 animate-in zoom-in-95 duration-300">
                <Lock size={40} className="text-gray-400 mb-4" />
                <h1 className="text-2xl font-bold text-gray-900">Checklist Incomplete</h1>
                <p className="text-gray-500 mt-2 mb-6">Complete the QA checklist before generating proof.</p>
                <Link to="/prp/07-test" className="text-indigo-600 hover:underline">Go to QA</Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500 py-12">

            <div className="text-center mb-10">
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4 
                    ${isShippable ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {isShippable ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                    Status: {isShippable ? 'SHIPPED' : 'IN PROGRESS'}
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Final Submission Proof</h1>
            </div>

            {isShippable && (
                <div className="mb-8 p-8 bg-gradient-to-br from-indigo-900 to-indigo-800 rounded-2xl text-white text-center shadow-xl transform animate-in slide-in-from-bottom-4 duration-700">
                    <Award size={48} className="mx-auto text-yellow-400 mb-4" />
                    <h2 className="text-2xl font-bold mb-2">You built a real product.</h2>
                    <p className="text-indigo-200 text-lg leading-relaxed max-w-lg mx-auto">
                        Not a tutorial. Not a clone.<br />
                        A structured tool that solves a real problem.<br />
                        <span className="text-white font-semibold mt-2 block">This is your proof of work.</span>
                    </p>
                </div>
            )}

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>1. Artifact Links</CardTitle>
                    <CardDescription>Required for shipping validation.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lovable Project URL</label>
                        <div className="relative">
                            <LinkIcon size={16} className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                placeholder="https://lovable.dev/..."
                                value={links.lovable}
                                onChange={(e) => handleLinkChange('lovable', e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Repository</label>
                        <div className="relative">
                            <LinkIcon size={16} className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                placeholder="https://github.com/..."
                                value={links.github}
                                onChange={(e) => handleLinkChange('github', e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Deployed Application URL</label>
                        <div className="relative">
                            <Globe size={16} className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                placeholder="https://..."
                                value={links.deployed}
                                onChange={(e) => handleLinkChange('deployed', e.target.value)}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>2. Workflow Verification</CardTitle>
                    <CardDescription>Confirm completion of all development phases.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {PROJECT_STEPS.map((step) => (
                            <label key={step} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    checked={!!completedSteps[step]}
                                    onChange={() => toggleStep(step)}
                                />
                                <span className={`text-sm ${completedSteps[step] ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                                    {step}
                                </span>
                            </label>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <button
                    onClick={copySubmission}
                    disabled={!isShippable}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-black font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <Copy size={18} /> Copy Final Submission
                </button>
            </div>

        </div>
    );
};
