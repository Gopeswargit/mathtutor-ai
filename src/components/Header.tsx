import React from 'react';
import { Sparkles, Calculator, BookOpen, Send, CheckSquare, Layers, DollarSign, Bot } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'pathways', label: 'Earning Pathways', icon: BookOpen },
    { id: 'calculator', label: 'Income Calculator', icon: Calculator },
    { id: 'ai-coach', label: 'AI Math Advisor', icon: Bot },
    { id: 'pitch-gen', label: 'Pitch & Proposal AI', icon: Send },
    { id: 'rlhf-practice', label: 'AI Test Practice', icon: Sparkles },
    { id: 'platforms', label: 'Platforms Hub', icon: Layers },
    { id: 'roadmap', label: '7-Day Sprint', icon: CheckSquare },
    { id: 'tracker', label: 'Earnings Tracker', icon: DollarSign },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('pathways')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-100">
              <span className="text-xl">∑</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold text-slate-900 leading-tight">Math Student Income Engine</h1>
                <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-indigo-100">
                  STEM Edition
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Monetize your mathematical intellect: AI RLHF, High-Ticket Tutoring & Quant Gigs
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('calculator')}
              className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center space-x-1.5 hover:bg-emerald-100 transition-colors"
            >
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Calc: </span>
              <span>$30 - $75+/hr</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation */}
        <div className="lg:hidden flex space-x-1 overflow-x-auto pb-2 pt-1 scrollbar-none border-t border-slate-100">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap flex items-center space-x-1 transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
