import React, { useState } from 'react';
import { EARNING_PATHS } from '../data/mathEarningData';
import { EarningPath } from '../types';
import { Clock, TrendingUp, CheckCircle, AlertCircle, Sparkles, ArrowRight, BookOpen, Layers, ShieldCheck } from 'lucide-react';

interface PathwaysExplorerProps {
  onSelectPath?: (pathId: string) => void;
  onOpenCalculator?: () => void;
  onOpenPitchGen?: () => void;
}

export const PathwaysExplorer: React.FC<PathwaysExplorerProps> = ({ onOpenCalculator, onOpenPitchGen }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalPath, setActiveModalPath] = useState<EarningPath | null>(null);

  const filteredPaths = selectedCategory === 'all'
    ? EARNING_PATHS
    : EARNING_PATHS.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Hero Welcome Box */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>High-Demand Mathematical Skill Monetization</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Turn Your Math Mind into High-Paying Income
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            As a mathematics student, you possess analytical rigor, abstract deduction, and problem-solving skills that command top dollar. 
            Discover the highest-return earning streams tailored specifically for your major.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-800/80">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-emerald-400">$30 - $80/hr</div>
              <div className="text-xs text-slate-400">Typical Earning Range</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-indigo-300">100% Remote</div>
              <div className="text-xs text-slate-400">Flexible Schedule</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-amber-300">3 - 7 Days</div>
              <div className="text-xs text-slate-400">Time to First Payout</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-cyan-300">High ROI</div>
              <div className="text-xs text-slate-400">Sharpens Coursework</div>
            </div>
          </div>
        </div>

        {/* Decorative subtle formula background */}
        <div className="absolute right-0 top-0 bottom-0 opacity-10 flex items-center pr-8 pointer-events-none select-none text-right font-mono text-7xl text-white">
          <span>∫ f(x)dx<br/>∇²Φ = 0<br/>e^iπ + 1 = 0</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-200">
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All Pathways (5)' },
            { id: 'ai_annotation', label: 'AI Math Specialist ($30-$55/hr)' },
            { id: 'tutoring', label: 'Private Tutoring ($35-$85/hr)' },
            { id: 'data_freelance', label: 'Quant & Data Freelance' },
            { id: 'latex', label: 'LaTeX Typesetting' },
            { id: 'content', label: 'Math Tools & Content' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing {filteredPaths.length} strategy pathways
        </div>
      </div>

      {/* Pathways Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPaths.map((path) => {
          return (
            <div
              key={path.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    path.category === 'ai_annotation' ? 'bg-purple-100 text-purple-800' :
                    path.category === 'tutoring' ? 'bg-emerald-100 text-emerald-800' :
                    path.category === 'data_freelance' ? 'bg-blue-100 text-blue-800' :
                    path.category === 'latex' ? 'bg-amber-100 text-amber-800' :
                    'bg-rose-100 text-rose-800'
                  }`}>
                    {path.category.replace('_', ' ')}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {path.difficulty}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {path.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  {path.shortDesc}
                </p>

                {/* Key Metrics */}
                <div className="bg-slate-50 rounded-lg p-3 space-y-2 mb-4 border border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                      Pay Range:
                    </span>
                    <span className="font-bold text-emerald-700">{path.avgHourlyRate}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      Payout Speed:
                    </span>
                    <span className="font-semibold text-slate-700">{path.timeToFirstDollar}</span>
                  </div>
                </div>

                {/* Skills Preview */}
                <div className="mb-3">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Math Skills Used
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {path.mathSkillsRequired.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 text-[11px] px-2 py-0.5 rounded-md">
                        {skill}
                      </span>
                    ))}
                    {path.mathSkillsRequired.length > 3 && (
                      <span className="text-slate-400 text-[11px] px-1 py-0.5">
                        +{path.mathSkillsRequired.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500 font-medium">
                  {path.topPlatforms[0]} + {path.topPlatforms.length - 1} more
                </div>
                <button
                  onClick={() => setActiveModalPath(path)}
                  className="inline-flex items-center space-x-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <span>Step-by-Step Blueprint</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Interactive Tool Prompts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-5 flex items-start space-x-4">
          <div className="p-2.5 bg-indigo-600 text-white rounded-lg shadow-sm">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-indigo-950 text-sm mb-1">Calculate Your Monthly Math Income</h4>
            <p className="text-indigo-800/80 text-xs mb-3">
              Input your available weekly hours and math topics to generate a tailored monthly earnings projection.
            </p>
            {onOpenCalculator && (
              <button
                onClick={onOpenCalculator}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors inline-flex items-center space-x-1"
              >
                <span>Launch Calculator</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-5 flex items-start space-x-4">
          <div className="p-2.5 bg-emerald-600 text-white rounded-lg shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-emerald-950 text-sm mb-1">Generate High-Converting Pitches</h4>
            <p className="text-emerald-800/80 text-xs mb-3">
              Create tailored outreach emails for tutoring parents, college peers, or freelance LaTeX proposals in seconds.
            </p>
            {onOpenPitchGen && (
              <button
                onClick={onOpenPitchGen}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors inline-flex items-center space-x-1"
              >
                <span>Open Pitch Generator</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Detailed Blueprint Modal */}
      {activeModalPath && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Detailed Blueprint
                </span>
                <h3 className="text-lg font-bold text-slate-900">{activeModalPath.title}</h3>
              </div>
              <button
                onClick={() => setActiveModalPath(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Pay & Timeline Banner */}
              <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <div>
                  <div className="text-xs text-slate-500 font-medium">Average Pay</div>
                  <div className="text-sm font-bold text-emerald-700">{activeModalPath.avgHourlyRate}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Payout Speed</div>
                  <div className="text-sm font-bold text-indigo-700">{activeModalPath.timeToFirstDollar}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Entry Difficulty</div>
                  <div className="text-sm font-bold text-slate-800">{activeModalPath.difficulty}</div>
                </div>
              </div>

              {/* Step-by-Step Implementation */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-indigo-600" />
                  Exact Step-by-Step Action Plan
                </h4>
                <div className="space-y-2.5">
                  {activeModalPath.stepByStep.map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-xs text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insider Tip Box */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs mb-1">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Math Major Insider Advantage</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  {activeModalPath.insiderTip}
                </p>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3.5">
                  <div className="text-xs font-bold text-emerald-900 mb-2 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Key Advantages
                  </div>
                  <ul className="space-y-1.5 text-xs text-emerald-800">
                    {activeModalPath.pros.map((p, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                  <div className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
                    Things to Keep in Mind
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {activeModalPath.cons.map((c, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-slate-400 font-bold">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommended Platforms */}
              <div>
                <div className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-slate-600" />
                  Top Verified Platforms for this Path
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeModalPath.topPlatforms.map((plat, i) => (
                    <span key={i} className="bg-indigo-50 border border-indigo-100 text-indigo-800 font-medium text-xs px-3 py-1 rounded-lg">
                      {plat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex justify-end">
              <button
                onClick={() => setActiveModalPath(null)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
              >
                Close Blueprint
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
