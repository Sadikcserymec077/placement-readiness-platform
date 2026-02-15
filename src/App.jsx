import React from 'react';
import { TopBar, ContextHeader } from './components/layout/HeaderComponents';
import { ProofFooter, SecondaryPanel } from './components/layout/Panels';
import { Button, Input, Card } from './components/ui/components';
import { Settings, Plus, Box } from 'lucide-react';

function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Fixed Top Bar */}
      <div className="flex-none z-10">
        <TopBar />
      </div>

      {/* Main Content Area - Split View */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* Primary Workspace (70% approx, responsive) */}
        <main className="flex-1 overflow-y-auto" style={{ scrollBehavior: 'smooth' }}>
          <div className="px-12 py-12 pb-32 mx-auto" style={{ maxWidth: '960px' }}>
            <ContextHeader
              title="Project Initialization"
              description="Configure the fundamental settings for the KodNest Premium Build System. Ensure all parameters align with the enterprise architecture guidelines."
            />

            <div className="flex flex-col gap-8">
              {/* Main Configuration Card */}
              <Card className="p-8 shadow-sm transition-shadow hover:shadow-md bg-white">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="p-3 bg-gray-50 rounded-full border" style={{ borderColor: 'var(--color-border)' }}>
                    <Box size={24} style={{ color: 'var(--color-accent)' }} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-gray-900">Core Configuration</h3>
                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>Define the essential build parameters for the new service.</p>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-6">
                    <Input label="Project Name" placeholder="e.g. KodNest CRM" />
                    <Input label="Namespace" placeholder="com.kodnest.app" />
                  </div>

                  <Input label="Root Directory" placeholder="./kodnest-crm" />

                  <div className="flex gap-6">
                    <div className="w-1/4">
                      <Input label="Version" placeholder="1.0.0" />
                    </div>
                    <div className="w-3/4">
                      <Input label="License" placeholder="MIT" />
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-400">Configuration ID: #KN-2024-88A</span>
                    <div className="flex gap-3">
                      <Button variant="secondary">Reset Defaults</Button>
                      <Button>Initialize Repository</Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Add Module Placeholder */}
              <Card className="p-8 border bg-transparent border-dashed flex flex-col items-center justify-center text-center py-16 gap-4 transition-colors hover:bg-white/50 cursor-pointer group"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
                <div className="w-14 h-14 rounded-full bg-gray-50 border flex items-center justify-center group-hover:bg-white transition-colors" style={{ borderColor: 'var(--color-border)' }}>
                  <Plus size={24} className="text-gray-400 group-hover:text-gray-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Add Microservice Module</h4>
                  <p className="text-sm text-gray-500 max-w-sm mx-auto">Connect additional services, databases, or API gateways to the build pipeline.</p>
                </div>
              </Card>
            </div>
          </div>
        </main>

        {/* Secondary Panel (30%) */}
        <aside className="hidden lg:flex flex-col border-l bg-white/50 backdrop-blur-sm" style={{ width: 'var(--sidebar-width)', borderColor: 'var(--color-border)' }}>
          <SecondaryPanel />
        </aside>

      </div>

      {/* Persistent Footer */}
      <div className="flex-none z-20">
        <ProofFooter />
      </div>
    </div>
  );
}

export default App;
