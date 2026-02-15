import React, { useState } from 'react';
import { CheckSquare, Square, Copy, ArrowRight, AlertCircle, CheckCircle, Plus } from 'lucide-react';
import { Button } from '../ui/components';

export const ProofFooter = () => {
    const [checks, setChecks] = useState({
        ui: false,
        logic: false,
        test: false,
        deploy: false
    });

    const toggle = (key) => setChecks(prev => ({ ...prev, [key]: !prev[key] }));

    const labels = {
        ui: 'UI Built',
        logic: 'Logic Working',
        test: 'Test Passed',
        deploy: 'Deployed'
    };

    return (
        <div
            className="w-full flex items-center justify-between px-6 py-4 border-t bg-white"
            style={{
                borderColor: 'var(--color-border)',
                height: '64px',
                zIndex: 50
            }}
        >
            <div className="text-sm font-semibold tracking-wide" style={{ color: 'var(--color-text-primary)' }}>PROOF OF WORK</div>
            <div className="flex gap-6 items-center">
                {Object.entries(checks).map(([key, checked]) => (
                    <div
                        key={key}
                        className="flex items-center gap-2 cursor-pointer select-none group transition-colors"
                        onClick={() => toggle(key)}
                    >
                        {checked ? (
                            <CheckSquare size={18} style={{ color: 'var(--color-success)' }} />
                        ) : (
                            <Square size={18} style={{ color: 'var(--color-border)' }} className="group-hover:stroke-gray-400" />
                        )}
                        <span
                            className="text-sm font-medium transition-colors"
                            style={{ color: checked ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}
                        >
                            {labels[key]}
                        </span>
                    </div>
                ))}
            </div>
            <div>
                {/* Placeholder for optional right-side action or status */}
            </div>
        </div>
    );
};

export const SecondaryPanel = () => {
    return (
        <div className="h-full flex flex-col p-6 border-l bg-gray-50" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <h3 className="text-lg font-serif font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Step Guidance</h3>

            <div className="mb-6 p-4 rounded bg-white border" style={{ borderColor: 'var(--color-border)' }}>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    Ensure all design tokens are correctly implemented before proceeding to component logic. verify contrast ratios.
                </p>
            </div>

            <div className="flex flex-col gap-3 mt-auto mb-6">
                <div className="bg-white p-3 rounded border font-mono text-xs text-secondary overflow-x-auto mb-4" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
                    npx create-vite@latest my-app --template react
                </div>

                <Button variant="secondary" className="w-full flex items-center justify-center gap-2 py-3 bg-white">
                    <Copy size={16} /> Copy
                </Button>

                <Button variant="primary" className="w-full flex items-center justify-center gap-2 py-3 shadow-sm hover:shadow-md transition-shadow" style={{ backgroundColor: '#000000', color: 'white' }}>
                    <ArrowRight size={16} /> Build in Lovable
                </Button>

                <Button variant="secondary" className="w-full flex items-center justify-center gap-2 py-3 bg-white">
                    <Plus size={16} /> Add Screenshot
                </Button>

                <div className="flex gap-3 mt-4 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <Button
                        variant="secondary"
                        className="flex-1 flex items-center justify-center gap-2 text-xs py-2 border-red-200 text-red-700 hover:bg-red-50 bg-white"
                        style={{ color: 'var(--color-error)', borderColor: '#fadbd8' }}
                    >
                        <AlertCircle size={14} /> Error
                    </Button>
                    <Button
                        variant="secondary"
                        className="flex-1 flex items-center justify-center gap-2 text-xs py-2 border-green-200 text-green-700 hover:bg-green-50 bg-white"
                        style={{ color: 'var(--color-success)', borderColor: '#d1f2eb' }}
                    >
                        <CheckCircle size={14} /> It Worked
                    </Button>
                </div>
            </div>
        </div>
    );
};
