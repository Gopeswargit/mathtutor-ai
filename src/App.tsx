import React, { useState } from 'react';
import { Header } from './components/Header';
import { PathwaysExplorer } from './components/PathwaysExplorer';
import { IncomeCalculator } from './components/IncomeCalculator';
import { AIPitchGenerator } from './components/AIPitchGenerator';
import { AIAdvisorChat } from './components/AIAdvisorChat';
import { RlhfSimulator } from './components/RlhfSimulator';
import { PlatformDirectory } from './components/PlatformDirectory';
import { ActionRoadmap } from './components/ActionRoadmap';
import { ClientEarningsTracker } from './components/ClientEarningsTracker';
import { AIPlanModal } from './components/AIPlanModal';
import { Bot, Sparkles, DollarSign, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('pathways');
  const [customPlanParams, setCustomPlanParams] = useState<any | null>(null);

  const handleGenerateCustomPlan = (params: any) => {
    setCustomPlanParams(params);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'pathways' && (
          <PathwaysExplorer
            onOpenCalculator={() => setActiveTab('calculator')}
            onOpenPitchGen={() => setActiveTab('pitch-gen')}
          />
        )}

        {activeTab === 'calculator' && (
          <IncomeCalculator onGenerateCustomPlan={handleGenerateCustomPlan} />
        )}

        {activeTab === 'ai-coach' && <AIAdvisorChat />}

        {activeTab === 'pitch-gen' && <AIPitchGenerator />}

        {activeTab === 'rlhf-practice' && <RlhfSimulator />}

        {activeTab === 'platforms' && <PlatformDirectory />}

        {activeTab === 'roadmap' && <ActionRoadmap />}

        {activeTab === 'tracker' && <ClientEarningsTracker />}
      </main>

      {/* Floating EulerBot Quick Access Button */}
      {activeTab !== 'ai-coach' && (
        <button
          onClick={() => setActiveTab('ai-coach')}
          id="floating-ai-coach-btn"
          className="fixed bottom-6 right-6 z-30 bg-gradient-to-tr from-indigo-600 to-violet-600 text-white p-3.5 rounded-full shadow-lg hover:shadow-indigo-500/25 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 group"
          title="Ask EulerBot AI Coach"
        >
          <Bot className="w-5 h-5" />
          <span className="text-xs font-bold pr-1 hidden sm:inline group-hover:inline">
            Ask Math Coach AI
          </span>
        </button>
      )}

      {/* AI Strategy Custom Plan Modal */}
      {customPlanParams && (
        <AIPlanModal
          params={customPlanParams}
          onClose={() => setCustomPlanParams(null)}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-700">Math Student Income Engine</span>
            <span>•</span>
            <span>Empowering STEM majors to achieve financial independence</span>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setActiveTab('pathways')} className="hover:text-indigo-600 transition-colors">
              Pathways
            </button>
            <button onClick={() => setActiveTab('calculator')} className="hover:text-indigo-600 transition-colors">
              Calculator
            </button>
            <button onClick={() => setActiveTab('rlhf-practice')} className="hover:text-indigo-600 transition-colors">
              AI Test Practice
            </button>
            <button onClick={() => setActiveTab('platforms')} className="hover:text-indigo-600 transition-colors">
              Platform Directory
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
