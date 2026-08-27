import React, { useState, useEffect } from 'react';
import { SEVEN_DAY_ROADMAP } from '../data/mathEarningData';
import { CheckSquare, Square, ExternalLink, Sparkles, Award, Clock } from 'lucide-react';

export const ActionRoadmap: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('math_roadmap_tasks');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('math_roadmap_tasks', JSON.stringify(completedTasks));
    } catch (e) {
      console.error(e);
    }
  }, [completedTasks]);

  const toggleTask = (id: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totalTasks = SEVEN_DAY_ROADMAP.length;
  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
          7-Day Fast Cash Action Sprint
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm">
          A step-by-step daily execution checklist to secure your first paid math client or start earning from AI annotation in under one week.
        </p>
      </div>

      {/* Progress Card */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Sprint Completion</div>
            <div className="text-base font-bold text-slate-900">
              {completedCount} of {totalTasks} Days Completed ({progressPercent}%)
            </div>
          </div>
        </div>

        <div className="w-full sm:w-64 space-y-1.5">
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-right text-[11px] text-slate-400 font-medium">
            {completedCount === totalTasks ? '🎉 All tasks completed! You are ready to earn.' : 'Keep taking daily action!'}
          </div>
        </div>
      </div>

      {/* Daily Roadmap List */}
      <div className="space-y-4">
        {SEVEN_DAY_ROADMAP.map((item, idx) => {
          const isDone = !!completedTasks[item.id];
          return (
            <div
              key={item.id}
              className={`p-5 rounded-xl border transition-all flex items-start space-x-4 ${
                isDone
                  ? 'bg-emerald-50/40 border-emerald-200 text-slate-700'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleTask(item.id)}
                className="mt-0.5 text-indigo-600 hover:text-indigo-800 transition-colors shrink-0"
              >
                {isDone ? (
                  <CheckSquare className="w-6 h-6 text-emerald-600" />
                ) : (
                  <Square className="w-6 h-6 text-slate-300 hover:text-slate-400" />
                )}
              </button>

              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-0.5 rounded">
                      {item.day}
                    </span>
                    <h3 className={`text-sm font-bold ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                      <Clock className="w-3.5 h-3.5" />
                      ~{item.estimatedMinutes} mins
                    </span>
                    <span className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                </div>

                <p className={`text-xs leading-relaxed ${isDone ? 'text-slate-400' : 'text-slate-600'}`}>
                  {item.description}
                </p>

                {item.actionUrl && (
                  <div className="pt-1">
                    <a
                      href={item.actionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                    >
                      <span>{item.actionText || 'Execute Task'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
