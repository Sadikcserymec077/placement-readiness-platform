import React from 'react';
import { Clock } from 'lucide-react';

export const TopBar = () => {
    return (
        <div
            className="flex items-center justify-between px-6 py-4 border-b bg-white top-bar"
            style={{
                borderColor: 'var(--color-border)',
                height: '64px'
            }}
        >
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-900 rounded-sm flex items-center justify-center text-white font-serif font-bold text-lg" style={{ backgroundColor: 'var(--color-accent)' }}>K</div>
                <span className="font-serif font-semibold text-lg tracking-tight" style={{ color: 'var(--color-text-primary)' }}>KodNest Premium Build System</span>
            </div>

            <div className="flex flex-col items-center justify-center w-1/3">
                <span className="text-xs font-medium mb-1 " style={{ color: 'var(--color-text-muted)' }}>Step 1 / 5</span>
                <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden" style={{ backgroundColor: '#E0E0E0' }}>
                    <div className="h-full w-1/5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></div>
                </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-warning)' }}>
                <Clock size={14} />
                <span>Not Started</span>
            </div>
        </div>
    );
};

export const ContextHeader = ({ title, description }) => {
    return (
        <div className="mb-8 pl-1">
            <h1 className="text-4xl font-serif font-bold mb-3" style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>{title}</h1>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--color-text-secondary)' }}>{description}</p>
        </div>
    );
};
