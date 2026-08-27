import React, { useState } from 'react';
import { VETTED_PLATFORMS } from '../data/mathEarningData';
import { ExternalLink, DollarSign, Clock, ShieldCheck, CheckCircle2, Search, Filter } from 'lucide-react';

export const PlatformDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPlatforms = VETTED_PLATFORMS.filter((plat) => {
    const matchesSearch =
      plat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plat.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plat.qualificationRequirements.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || plat.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
          Vetted Math Earning Platforms Directory
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm">
          Direct applications, verified pay scales, payment schedules, and test survival tips for math students.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search platforms (e.g. Outlier, Wyzant, Calculus, PayPal)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500 text-slate-800"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {['all', 'AI Annotation', 'Tutoring', 'Freelance'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Types' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPlatforms.map((platform) => (
          <div
            key={platform.id}
            className="bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-bold text-slate-900">{platform.name}</h3>
                    {platform.featured && (
                      <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        Top Pick
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{platform.category}</span>
                </div>
                <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                  {platform.typicalPay}
                </span>
              </div>

              {/* Specs Pills */}
              <div className="grid grid-cols-2 gap-2 my-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div>
                  <span className="text-slate-400 text-[11px] block">Payment Frequency:</span>
                  <span className="font-semibold text-slate-700">{platform.payoutFrequency}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Payment Method:</span>
                  <span className="font-semibold text-slate-700">{platform.paymentMethod}</span>
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-2 mb-4">
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Qualifications Required
                  </div>
                  <p className="text-xs text-slate-700 mt-0.5">{platform.qualificationRequirements}</p>
                </div>

                {/* Test Survival Tips */}
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-3 text-xs">
                  <div className="flex items-center space-x-1.5 text-amber-900 font-bold mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span>How to Pass the Entry Screening</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-[11px]">{platform.testTips}</p>
                </div>
              </div>
            </div>

            {/* Action Link */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Difficulty: {platform.difficultyToEnter}</span>
              <a
                href={platform.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
              >
                <span>Apply / Open Platform</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
