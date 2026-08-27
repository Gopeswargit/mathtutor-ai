import React, { useState } from 'react';
import { DollarSign, Clock, Target, Award, CheckCircle2, TrendingUp, HelpCircle, ArrowRight } from 'lucide-react';
import { MathLevel } from '../types';

interface IncomeCalculatorProps {
  onGenerateCustomPlan?: (planParams: {
    mathLevel: string;
    weeklyHours: number;
    targetMonthlyIncome: number;
    strongSubjects: string;
    technicalSkills: string;
    preferredMode: string;
  }) => void;
}

export const IncomeCalculator: React.FC<IncomeCalculatorProps> = ({ onGenerateCustomPlan }) => {
  const [mathLevel, setMathLevel] = useState<MathLevel>('junior');
  const [weeklyHours, setWeeklyHours] = useState<number>(12);
  const [targetIncome, setTargetIncome] = useState<number>(1200);
  const [strategyMode, setStrategyMode] = useState<'hybrid' | 'ai_focus' | 'tutoring_focus' | 'quant_focus'>('hybrid');
  const [strongSubjects, setStrongSubjects] = useState<string[]>(['Calculus 1-3', 'Linear Algebra', 'Basic Statistics']);
  const [customSubject, setCustomSubject] = useState<string>('');

  // Rate estimates based on math level
  const baseRates: Record<MathLevel, { min: number; avg: number; max: number; label: string }> = {
    freshman: { min: 25, avg: 35, max: 45, label: '1st Year Undergrad' },
    sophomore: { min: 28, avg: 40, max: 55, label: '2nd Year Undergrad' },
    junior: { min: 32, avg: 48, max: 65, label: '3rd Year Undergrad' },
    senior: { min: 38, avg: 55, max: 75, label: 'Senior Math Major' },
    graduate: { min: 45, avg: 65, max: 95, label: 'Master’s / PhD Student' },
  };

  const levelRate = baseRates[mathLevel];

  // Adjust rate based on chosen strategy
  const strategyMultiplier = {
    hybrid: 1.05,
    ai_focus: 0.95, // Consistent high volume, slightly lower than 1-on-1 private tutoring peak
    tutoring_focus: 1.15, // High hourly rates, requires scheduling
    quant_focus: 1.2, // Higher project fee potential
  }[strategyMode];

  const effectiveHourly = Math.round(levelRate.avg * strategyMultiplier);
  const monthlyHours = weeklyHours * 4.2; // average weeks in a month
  const projectedMonthlyIncome = Math.round(monthlyHours * effectiveHourly);
  const minProjected = Math.round(monthlyHours * levelRate.min * (strategyMode === 'tutoring_focus' ? 1.1 : 0.9));
  const maxProjected = Math.round(monthlyHours * levelRate.max * (strategyMode === 'quant_focus' ? 1.25 : 1.15));

  const hoursNeededForGoal = Math.ceil(targetIncome / effectiveHourly / 4.2);
  const feasibilityRatio = projectedMonthlyIncome / (targetIncome || 1);

  const toggleSubject = (subj: string) => {
    if (strongSubjects.includes(subj)) {
      setStrongSubjects(strongSubjects.filter(s => s !== subj));
    } else {
      setStrongSubjects([...strongSubjects, subj]);
    }
  };

  const addCustomSubject = () => {
    if (customSubject.trim() && !strongSubjects.includes(customSubject.trim())) {
      setStrongSubjects([...strongSubjects, customSubject.trim()]);
      setCustomSubject('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Title & Introduction */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
          Math Student Income & Hours Planner
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm">
          Calculate your realistic earning capacity based on your mathematical seniority, available hours, and target strategy blend.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column (Left) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Math Academic Level */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              1. Your Academic Seniority
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(['freshman', 'sophomore', 'junior', 'senior', 'graduate'] as MathLevel[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setMathLevel(level)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all text-left ${
                    mathLevel === level
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 ring-1 ring-indigo-600'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <div className="font-bold capitalize">{level}</div>
                  <div className="text-[11px] text-slate-500 font-normal">
                    ${baseRates[level].avg}/hr avg
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Weekly Hours Slider */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-600" />
                2. Available Weekly Hours
              </label>
              <span className="text-sm font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                {weeklyHours} hrs/week (~{(weeklyHours / 7).toFixed(1)} h/day)
              </span>
            </div>
            <input
              type="range"
              min="3"
              max="30"
              step="1"
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>3 hrs (Casual Side)</span>
              <span>10-15 hrs (Typical Student Load)</span>
              <span>30 hrs (Intensive / Vacation)</span>
            </div>
          </div>

          {/* Target Monthly Goal Slider */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-4 h-4 text-emerald-600" />
                3. Target Monthly Income Goal
              </label>
              <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                ${targetIncome.toLocaleString()} / month
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="4000"
              step="50"
              value={targetIncome}
              onChange={(e) => setTargetIncome(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>$200 (Pocket Money)</span>
              <span>$1,200 (Living Expenses)</span>
              <span>$4,000 (Full Self-Funding)</span>
            </div>
          </div>

          {/* Strategy Blend */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              4. Preferred Monetization Blend
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'hybrid', title: 'Optimal Hybrid (60% AI + 40% Tutoring)', desc: 'Best balance of reliable queue work and peak hourly tutoring rates.' },
                { id: 'ai_focus', title: '100% Async AI Annotation (Outlier / DataAnnotation)', desc: 'Zero client scheduling. Log in whenever you want, day or night.' },
                { id: 'tutoring_focus', title: 'High-Ticket Tutoring Focus (AP & College)', desc: 'Maximized hourly rate ($45-$80/hr), requires recurring student sessions.' },
                { id: 'quant_focus', title: 'Quant, Python & LaTeX Freelancing', desc: 'Project-based gigs solving math/statistical modeling problems.' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStrategyMode(item.id as any)}
                  className={`p-3 rounded-lg text-left border text-xs transition-all ${
                    strategyMode === item.id
                      ? 'border-indigo-600 bg-indigo-50/60 ring-1 ring-indigo-600 text-indigo-950'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <div className="font-bold mb-1">{item.title}</div>
                  <div className="text-[11px] text-slate-500 leading-normal">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Math Subjects & Tool Strengths */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              5. Your Strongest Math Topics
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Calculus 1-3',
                'Linear Algebra',
                'Basic Statistics',
                'Differential Equations',
                'Discrete Math',
                'Proof Writing / Real Analysis',
                'Probability & Combinatorics',
                'LaTeX / TikZ',
                'Python (NumPy/SciPy)',
                'SAT / ACT Math Prep'
              ].map((subj) => {
                const isSelected = strongSubjects.includes(subj);
                return (
                  <button
                    key={subj}
                    type="button"
                    onClick={() => toggleSubject(subj)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '} {subj}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="Add other subject (e.g. Abstract Algebra)..."
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomSubject())}
                className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 flex-1 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={addCustomSubject}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Projections & Strategy Output (Right Column) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Projection Card */}
          <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-5">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-indigo-300 font-bold block mb-1">
                    Projected Monthly Income
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    ${projectedMonthlyIncome.toLocaleString()}
                    <span className="text-sm font-normal text-indigo-200 ml-1">/ month</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">Est. Effective Rate</span>
                  <span className="text-base font-bold text-emerald-400">${effectiveHourly} / hr</span>
                </div>
              </div>

              {/* Realistic Range */}
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs border border-white/10 flex justify-between items-center text-xs">
                <div>
                  <span className="text-slate-300 block text-[11px]">Conservative</span>
                  <span className="font-bold text-amber-300">${minProjected.toLocaleString()}</span>
                </div>
                <div className="text-center">
                  <span className="text-indigo-200 block text-[11px]">Expected Average</span>
                  <span className="font-bold text-white">${projectedMonthlyIncome.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-300 block text-[11px]">Optimized Peak</span>
                  <span className="font-bold text-emerald-300">${maxProjected.toLocaleString()}</span>
                </div>
              </div>

              {/* Goal Feasibility Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-indigo-200">Goal Target: ${targetIncome.toLocaleString()}</span>
                  <span className={feasibilityRatio >= 1 ? 'text-emerald-400' : 'text-amber-300'}>
                    {Math.round(feasibilityRatio * 100)}% of Target
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      feasibilityRatio >= 1 ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                    style={{ width: `${Math.min(feasibilityRatio * 100, 100)}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-300 pt-1">
                  {feasibilityRatio >= 1 ? (
                    <span className="text-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Goal easily achievable with {weeklyHours} hrs/week!
                    </span>
                  ) : (
                    <span className="text-amber-200">
                      Tip: Need ~{hoursNeededForGoal} hrs/week to hit ${targetIncome} at ${effectiveHourly}/hr.
                    </span>
                  )}
                </p>
              </div>

              {/* Task Breakdown Simulation */}
              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="text-xs font-bold text-indigo-200 uppercase tracking-wider">
                  Recommended Weekly Allocation
                </div>
                {strategyMode === 'hybrid' && (
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center text-slate-200">
                      <span>• AI Math Queue (Outlier/DataAnnotation):</span>
                      <span className="font-semibold text-white">{Math.round(weeklyHours * 0.6)} hrs/wk (~${Math.round(weeklyHours * 0.6 * levelRate.avg * 4.2)}/mo)</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-200">
                      <span>• 1-on-1 AP/College Tutoring (2-3 students):</span>
                      <span className="font-semibold text-white">{Math.round(weeklyHours * 0.4)} hrs/wk (~${Math.round(weeklyHours * 0.4 * (levelRate.avg + 10) * 4.2)}/mo)</span>
                    </div>
                  </div>
                )}
                {strategyMode === 'ai_focus' && (
                  <div className="text-xs text-slate-200">
                    <p className="leading-relaxed">
                      Complete <strong className="text-white">{weeklyHours} hours/week</strong> of asynchronous proof and reasoning reviews on Outlier / DataAnnotation at ~${effectiveHourly}/hr.
                    </p>
                  </div>
                )}
                {strategyMode === 'tutoring_focus' && (
                  <div className="text-xs text-slate-200">
                    <p className="leading-relaxed">
                      Maintain <strong className="text-white">{Math.max(2, Math.round(weeklyHours / 2))} recurring weekly students</strong> (2 sessions each) at ${effectiveHourly}/hr.
                    </p>
                  </div>
                )}
                {strategyMode === 'quant_focus' && (
                  <div className="text-xs text-slate-200">
                    <p className="leading-relaxed">
                      Execute <strong className="text-white">2-3 freelance gigs per month</strong> (statistical modeling, LaTeX thesis typesetting, or Python optimization) at ~$300-$500 per project.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick AI Strategy Trigger */}
          {onGenerateCustomPlan && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-indigo-900 font-bold text-sm">
                <Award className="w-4 h-4 text-indigo-600" />
                <span>Need a Personalized Step-by-Step Blueprint?</span>
              </div>
              <p className="text-xs text-indigo-800 leading-relaxed">
                Feed your exact parameters ({baseRates[mathLevel].label}, {weeklyHours} hrs/wk, ${targetIncome}/mo) into our AI Career Strategist to generate an application checklist and pitch templates.
              </p>
              <button
                type="button"
                onClick={() => onGenerateCustomPlan({
                  mathLevel: baseRates[mathLevel].label,
                  weeklyHours,
                  targetMonthlyIncome: targetIncome,
                  strongSubjects: strongSubjects.join(', '),
                  technicalSkills: 'LaTeX, Python, Excel, Mathematical Proofs',
                  preferredMode: strategyMode
                })}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2.5 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center space-x-1.5"
              >
                <span>Generate Custom AI Strategy Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
