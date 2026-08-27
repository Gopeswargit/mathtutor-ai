import React, { useState } from 'react';
import { Send, Copy, Check, Sparkles, RefreshCw, Layers, UserCheck } from 'lucide-react';
import { SAMPLE_PITCH_PROMPTS } from '../data/mathEarningData';

export const AIPitchGenerator: React.FC = () => {
  const [pitchType, setPitchType] = useState<string>(SAMPLE_PITCH_PROMPTS[0].type);
  const [targetAudience, setTargetAudience] = useState<string>(SAMPLE_PITCH_PROMPTS[0].target);
  const [subjectArea, setSubjectArea] = useState<string>(SAMPLE_PITCH_PROMPTS[0].subject);
  const [background, setBackground] = useState<string>(SAMPLE_PITCH_PROMPTS[0].background);
  const [desiredRate, setDesiredRate] = useState<number>(45);

  const [generatedPitch, setGeneratedPitch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectPreset = (preset: typeof SAMPLE_PITCH_PROMPTS[0]) => {
    setPitchType(preset.type);
    setTargetAudience(preset.target);
    setSubjectArea(preset.subject);
    setBackground(preset.background);
    setDesiredRate(preset.rate);
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/gemini/generate-pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pitchType,
          targetAudience,
          subjectArea,
          background,
          desiredRate,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate pitch');
      }

      setGeneratedPitch(data.pitch || 'No pitch returned.');
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Error generating pitch');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedPitch) {
      navigator.clipboard.writeText(generatedPitch);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          AI Pitch & Client Proposal Generator
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm">
          Generate irresistible, mathematically credible outreach messages, parent emails, and freelance proposals in seconds.
        </p>
      </div>

      {/* Quick Preset Buttons */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Quick Math Major Presets
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {SAMPLE_PITCH_PROMPTS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className="text-left p-2.5 rounded-lg bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 text-xs transition-all"
            >
              <div className="font-bold text-slate-900 mb-0.5">{preset.title}</div>
              <div className="text-[11px] text-slate-500 truncate">{preset.subject}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Inputs */}
        <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              Pitch Category / Format
            </label>
            <select
              value={pitchType}
              onChange={(e) => setPitchType(e.target.value)}
              className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-white text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Tutoring Parent Outreach">Tutoring Parent Outreach (Facebook Group / Email)</option>
              <option value="University Peer Tutoring">University Peer Tutoring (Discord / Campus Flyer)</option>
              <option value="Upwork Freelance Proposal for Math/Data/LaTeX">Upwork Freelance Proposal (Math / Data / LaTeX)</option>
              <option value="Outlier/DataAnnotation Math Specialist Application Statement">AI Specialist Application Bio (Outlier / DataAnnotation)</option>
              <option value="Fiverr Gig Description">Fiverr Math / LaTeX Gig Description</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              Target Audience
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Parents of high schoolers taking AP Calculus"
              className="w-full text-xs border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              Specific Math Subject / Topic Area
            </label>
            <input
              type="text"
              value={subjectArea}
              onChange={(e) => setSubjectArea(e.target.value)}
              placeholder="e.g. AP Calculus AB/BC, Linear Algebra, SAT Math"
              className="w-full text-xs border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              Your Background & Key Credentials
            </label>
            <textarea
              rows={3}
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              placeholder="e.g. Sophomore Math Major at state university, scored 5 on AP Calc BC, love breaking down complex chain rule proofs into visual steps"
              className="w-full text-xs border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              Hourly Rate / Value ($/hr)
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold text-slate-500">$</span>
              <input
                type="number"
                min="15"
                max="150"
                value={desiredRate}
                onChange={(e) => setDesiredRate(Number(e.target.value))}
                className="w-24 text-xs border border-slate-300 rounded-lg p-2.5 text-slate-800 font-bold focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              />
              <span className="text-xs text-slate-500">/ hour or equivalent project fee</span>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold text-xs py-3 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Crafting High-Converting Pitch...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Tailored Pitch with Gemini</span>
              </>
            )}
          </button>
        </div>

        {/* Output Column */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  Generated Pitch & Outreach Copy
                </span>
                {generatedPitch && (
                  <button
                    onClick={copyToClipboard}
                    className="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy All</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-lg mb-3">
                  {error}
                </div>
              )}

              {generatedPitch ? (
                <div className="prose prose-slate max-w-none text-xs leading-relaxed text-slate-800 whitespace-pre-wrap font-sans bg-slate-50/60 p-4 rounded-xl border border-slate-100 max-h-[500px] overflow-y-auto">
                  {generatedPitch}
                </div>
              ) : (
                <div className="text-center py-16 px-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                  <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs text-slate-500 font-medium">
                    Configure your parameters on the left and click "Generate Tailored Pitch" to see persuasive, ready-to-send copy.
                  </p>
                </div>
              )}
            </div>

            {generatedPitch && (
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Tip: Tailor the bracketed names before sending.</span>
                <span className="font-semibold text-emerald-700">Ready to Send</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
