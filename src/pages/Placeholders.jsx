import React from 'react';

const PlaceholderPage = ({ title }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 animate-in fade-in-50 duration-500">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 shadow-sm border border-indigo-100">
                <span className="text-3xl font-bold">{title[0]}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
                This is a placeholder page for the <span className="font-semibold text-indigo-600">{title}</span> section.
                Detailed implementation coming soon.
            </p>
            <div className="flex gap-4">
                <div className="h-4 w-32 bg-gray-100 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-100 rounded animate-pulse"></div>
            </div>
        </div>
    );
};

export const Dashboard = () => <PlaceholderPage title="Dashboard" />;
export const Practice = () => <PlaceholderPage title="Practice" />;
export const Assessments = () => <PlaceholderPage title="Assessments" />;
export const Resources = () => <PlaceholderPage title="Resources" />;
export const Profile = () => <PlaceholderPage title="Profile" />;
