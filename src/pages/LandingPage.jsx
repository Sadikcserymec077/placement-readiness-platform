import React from 'react';
import { Code, Video, BarChart2, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-32 md:pt-32">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50 to-white/0 -z-10"></div>
                <div className="container mx-auto px-6 text-center max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-full border border-indigo-100">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        New Batch Starting Soon
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 font-display">
                        Ace Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Placement</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Practice coding, assess your skills, and prepare specifically for your dream job with our comprehensive platform.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white transition-all bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg shadow-indigo-200"
                        >
                            Get Started <ArrowRight size={18} />
                        </Link>
                        <button className="px-8 py-4 text-base font-semibold text-gray-700 transition-all bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300">
                            View Curriculum
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Feature 1 */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Code className="text-indigo-600" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Practice Problems</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Access a curated library of coding challenges tailored for top tech companies.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Video className="text-violet-600" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Mock Interviews</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Simulated interview environments with real-time feedback and analysis.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <BarChart2 className="text-purple-600" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Track Progress</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Visualize your growth with detailed analytics and performance insights.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-auto border-t border-gray-200 bg-white py-12">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 font-bold text-xl text-indigo-900">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">P</div>
                        Placement Prep
                    </div>
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Placement Prep Platform. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};
