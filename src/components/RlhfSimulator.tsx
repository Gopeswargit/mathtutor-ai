import React, { useState } from 'react';
import { PRACTICE_PROBLEMS } from '../data/mathEarningData';
import { PracticeProblem } from '../types';
import { Sparkles, CheckCircle2, AlertTriangle, Eye, RefreshCw, Award, BookCheck } from 'lucide-react';

export const RlhfSimulator: React.FC = () => {
  const [selectedProblem, setSelectedProblem] = useState<PracticeProblem>(PRACTICE_PROBLEMS[0]);
  const [userCritique, setUserCritique] = useState<string>('');
  const [userCorrection, setUserCorrection] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [aiEvaluation, setAiEvaluation] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evalError, setEvalError] = useState<string | null>(null);

  const handleSelectProblem = (prob: PracticeProblem) => {
    setSelectedProblem(prob);
    setUserCritique('');
    setUserCorrection('');
    setShowAnswer(false);
    setAiEvaluation(null);
    setEvalError(null);
  };

  const handleGradeWithAI = async () => {
    if (!userCritique.trim()) {
      setEvalError('Please write your critique of the AI response before submitting for grading.');
      return;
    }

    setIsEvaluating(true);
    setEvalError(null);
    setAiEvaluation(null);

    try {
      const response = await fetch('/api/gemini/evaluate-annotation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemStatement: selectedProblem.problemStatement,
          modelAnswer: selectedProblem.aiProposedSolution,
          userCritique,
          userCorrection,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to evaluate response');
      }

      setAiEvaluation(data.evaluation);
    } catch (err: unknown) {
      console.error(err);
      setEvalError(err instanceof Error ? err.message : 'Error evaluating submission');
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center space-x-2">
          <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            High-Paying ($30-$55/hr) Skill Practice
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 mb-1 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          AI Math Specialist Screening Test Simulator
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm">
          Practice evaluating flawed AI mathematical solutions against strict industry rubrics used by Outlier, Scale AI, and DataAnnotation.
        </p>
      </div>

      {/* Problem Selector Bar */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {PRACTICE_PROBLEMS.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => handleSelectProblem(p)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border text-left ${
              selectedProblem.id === p.id
                ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="text-[11px] opacity-80">Challenge #{idx + 1} ({p.topic})</div>
            <div className="font-bold truncate max-w-[200px]">{p.title.split(':')[1] || p.title}</div>
          </button>
        ))}
      </div>

      {/* Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Problem & AI Candidate Solution */}
        <div className="lg:col-span-6 space-y-4">
          {/* Problem Statement Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
              <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                {selectedProblem.topic}
              </span>
              <span>Level: {selectedProblem.difficulty}</span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">{selectedProblem.title}</h3>
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 font-mono text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
              {selectedProblem.problemStatement}
            </div>
          </div>

          {/* AI-Generated Response (Flawed) */}
          <div className="bg-white p-5 rounded-xl border border-amber-200 shadow-xs space-y-2">
            <div className="flex items-center space-x-1.5 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>AI Candidate Output to Evaluate (Contains Flaws)</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Identify where the AI’s deduction fails, what mathematical rule was violated, and why the final conclusion is invalid.
            </p>
            <div className="bg-amber-50/50 p-3.5 rounded-lg border border-amber-100 font-mono text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
              {selectedProblem.aiProposedSolution}
            </div>
          </div>
        </div>

        {/* Right Column: User Reviewer Submission & Rubric Evaluation */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <BookCheck className="w-4 h-4 text-purple-600" />
                Your Reviewer Evaluation
              </span>
              <span className="text-[11px] text-slate-400">Outlier / Scale AI Rubric Format</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                1. Error Analysis & Justification (Why is the model wrong?)
              </label>
              <textarea
                rows={4}
                value={userCritique}
                onChange={(e) => setUserCritique(e.target.value)}
                placeholder="Explain the specific mathematical error (e.g. 'In step 4, the model ignores the constant of integration, falsely creating a 0=1 contradiction...')"
                className="w-full text-xs border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-purple-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                2. Correct Mathematical Solution / Method (Optional but Recommended)
              </label>
              <textarea
                rows={3}
                value={userCorrection}
                onChange={(e) => setUserCorrection(e.target.value)}
                placeholder="Provide the correct step-by-step resolution or formula..."
                className="w-full text-xs border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-purple-500 font-mono"
              />
            </div>

            {evalError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-2.5 rounded-lg">
                {evalError}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={handleGradeWithAI}
                disabled={isEvaluating}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors flex items-center space-x-1.5 shadow-xs"
              >
                {isEvaluating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Grading with Senior RLHF Lead...</span>
                  </>
                ) : (
                  <>
                    <Award className="w-3.5 h-3.5" />
                    <span>Grade My Review with Gemini</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2.5 rounded-lg transition-colors flex items-center space-x-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showAnswer ? 'Hide' : 'Reveal'} Official Rubric</span>
              </button>
            </div>
          </div>

          {/* AI Lead Evaluation Result */}
          {aiEvaluation && (
            <div className="bg-purple-50 border border-purple-200 p-5 rounded-xl space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center space-x-2 text-purple-900 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Senior RLHF Quality Score & Feedback</span>
              </div>
              <div className="prose prose-purple max-w-none text-xs leading-relaxed text-purple-950 whitespace-pre-wrap">
                {aiEvaluation}
              </div>
            </div>
          )}

          {/* Official Rubric Reveal */}
          {showAnswer && (
            <div className="bg-slate-900 text-white p-5 rounded-xl space-y-3 animate-in fade-in duration-200">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Official Grading Rubric & Reference Solution
                </span>
              </div>

              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase mb-1">Core Flaw Breakdown</div>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">{selectedProblem.actualFlaw}</p>
              </div>

              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase mb-1">Key Rubric Requirements</div>
                <ul className="space-y-1 text-xs text-slate-300">
                  {selectedProblem.rubricHints.map((hint, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400">•</span>
                      <span>{hint}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase mb-1">Sample 10/10 Critique</div>
                <div className="bg-slate-800/80 p-3 rounded-lg text-xs text-emerald-200 font-mono whitespace-pre-wrap">
                  {selectedProblem.sampleCritique}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
