import React, { useEffect, useState } from 'react';
import { Sparkles, X, Check, Copy, RefreshCw, Award } from 'lucide-react';

interface AIPlanModalProps {
  params: {
    mathLevel: string;
    weeklyHours: number;
    targetMonthlyIncome: number;
    strongSubjects: string;
    technicalSkills: string;
    preferredMode: string;
  } | null;
  onClose: () => void;
}

export const AIPlanModal: React.FC<AIPlanModalProps> = ({ params, onClose }) => {
  const [plan, setPlan] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!params) return;

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    fetch('/api/gemini/generate-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((d) => {
            throw new Error(d.error || 'Failed to generate plan');
          });
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setPlan(data.plan || 'No strategy returned.');
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [params]);

  if (!params) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(plan);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-indigo-600 text-white rounded-lg">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Personalized Math Monetization Blueprint
              </h3>
              <p className="text-[11px] text-slate-500">
                Tailored for {params.mathLevel} • {params.weeklyHours} hrs/wk • ${params.targetMonthlyIncome}/mo
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 font-bold"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          {isLoading ? (
            <div className="text-center py-16 space-y-3">
              <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
              <div className="text-sm font-bold text-slate-900">
                Computing Your Mathematical Earning Roadmap...
              </div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Analyzing AI specialist queues, AP/SAT tutoring market demand, and freelance quantitative avenues.
              </p>
            </div>
          ) : error ? (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-4 rounded-xl">
              {error}
            </div>
          ) : (
            <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-800 whitespace-pre-wrap font-sans bg-slate-50 p-5 rounded-xl border border-slate-100">
              {plan}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Powered by Gemini 3.7 Flash
          </div>
          <div className="flex items-center space-x-2">
            {plan && (
              <button
                onClick={copyToClipboard}
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg transition-colors flex items-center space-x-1"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Blueprint</span>
                  </>
                )}
              </button>
            )}
            <button
              onClick={onClose}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
