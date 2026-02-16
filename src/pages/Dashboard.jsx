import React, { PureComponent } from 'react';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip
} from 'recharts';
import {
    ArrowRight,
    Calendar,
    Clock,
    Trophy,
    Target
} from 'lucide-react';
import {
    Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter, Progress
} from '../components/ui/shadcn';
import { cn } from '../components/ui/shadcn';

const skillData = [
    { subject: 'DSA', A: 75, fullMark: 100 },
    { subject: 'Sys Design', A: 60, fullMark: 100 },
    { subject: 'Communication', A: 80, fullMark: 100 },
    { subject: 'Resume', A: 85, fullMark: 100 },
    { subject: 'Aptitude', A: 70, fullMark: 100 },
];

// Circular Progress Component
const CircularProgress = ({ value, className }) => {
    const radius = 70;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
        <div className={cn("relative flex items-center justify-center", className)}>
            <svg
                height={radius * 2}
                width={radius * 2}
                className="rotate-[-90deg]"
            >
                <circle
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset: 0 }}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="text-gray-100"
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
                    className="text-indigo-600 drop-shadow-md"
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">{value}</span>
                <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest mt-1">Score</span>
            </div>
        </div>
    );
};

export const Dashboard = () => {
    return (
        <div className="space-y-6 animate-in fade-in-50 duration-500">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 leading-tight">Dashboard Overview</h1>
                <p className="text-gray-500 mt-2">Track your placement preparation progress.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* 1. Overall Readiness */}
                <Card className="col-span-1 lg:col-span-1 flex flex-col justify-between">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Trophy className="h-5 w-5 text-yellow-500" />
                            Overall Readiness
                        </CardTitle>
                        <CardDescription>Your preparedness score based on recent mocks.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center pb-8">
                        <CircularProgress value={72} className="mb-4" />
                        <div className="text-center">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-200">
                                Top 15% of candidates
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Skill Breakdown Radar */}
                <Card className="col-span-1 lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Skill Breakdown</CardTitle>
                        <CardDescription>Performance across key placement areas.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                                <PolarGrid stroke="#e5e7eb" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                                {/* <PolarRadiusAxis angle={30} domain={[0, 100]} /> */}
                                <Radar
                                    name="My Skills"
                                    dataKey="A"
                                    stroke="hsl(245, 58%, 51%)"
                                    fill="hsl(245, 58%, 51%)"
                                    fillOpacity={0.3}
                                />
                                <Tooltip />
                            </RadarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* 3. Continue Practice */}
                <Card className="col-span-1 lg:col-span-1 flex flex-col justify-between bg-gradient-to-br from-indigo-50 to-white border-indigo-100">
                    <CardHeader>
                        <CardTitle className="text-indigo-900">Continue Practice</CardTitle>
                        <CardDescription>Pick up where you left off.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-1">Dynamic Programming</h4>
                            <p className="text-sm text-gray-500 mb-4">Topic 3 of 10 • Median Difficulty</p>

                            <div className="flex items-center justify-between text-xs font-medium text-gray-600 mb-2">
                                <span>Progress</span>
                                <span>30%</span>
                            </div>
                            <Progress value={30} className="h-2 bg-indigo-100" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white transition-all bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm hover:shadow-md active:transform active:scale-95 group">
                            Continue <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </CardFooter>
                </Card>

                {/* 4. Weekly Goals */}
                <Card className="col-span-1 border-l-4 border-l-emerald-500">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-emerald-600" />
                            Weekly Goals
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-sm font-medium text-gray-600">Problems Solved</span>
                            <span className="text-2xl font-bold text-gray-900">12<span className="text-sm text-gray-400 font-normal">/20</span></span>
                        </div>
                        <Progress value={60} className="h-2 mb-6 bg-emerald-100" /> {/* Should be emerald color technically but using primary unless forced */}

                        <div className="flex justify-between items-center text-center">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                <div key={i} className="flex flex-col items-center gap-1">
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors",
                                        // Fake data: Mon, Tue, Thu have activity
                                        [0, 1, 3].includes(i)
                                            ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                                            : "bg-gray-50 text-gray-400 border border-gray-100"
                                    )}>
                                        {day}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* 5. Upcoming Assessments */}
                <Card className="col-span-1 md:col-span-2 lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-indigo-600" />
                            Upcoming Assessments
                        </CardTitle>
                        <CardDescription>Review your schedule and prepare accordingly.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { title: "DSA Mock Test", time: "Tomorrow, 10:00 AM", type: "Technical", color: "bg-blue-50 text-blue-700 border-blue-100" },
                                { title: "System Design Review", time: "Wed, 2:00 PM", type: "Review", color: "bg-purple-50 text-purple-700 border-purple-100" },
                                { title: "HR Interview Prep", time: "Friday, 11:00 AM", type: "Behavioral", color: "bg-amber-50 text-amber-700 border-amber-100" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-gray-50 bg-gray-50/50 hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all group cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className={cn("px-3 py-1 rounded text-xs font-medium border uppercase tracking-wider", item.color)}>
                                            {item.type}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{item.title}</h4>
                                            <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                                                <Clock size={14} />
                                                {item.time}
                                            </div>
                                        </div>
                                    </div>
                                    <button className="p-2 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors">
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
};
