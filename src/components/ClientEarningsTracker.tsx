import React, { useState, useEffect } from 'react';
import { DollarSign, Plus, Trash2, Calendar, TrendingUp, User, Briefcase, FileText } from 'lucide-react';
import { ClientLog } from '../types';

export const ClientEarningsTracker: React.FC = () => {
  const [logs, setLogs] = useState<ClientLog[]>(() => {
    try {
      const saved = localStorage.getItem('math_earning_logs');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'sample-1',
              nameOrPlatform: 'Outlier.ai (Math RLHF Review)',
              type: 'AI Annotation',
              hourlyRate: 40,
              hoursWorked: 8.5,
              totalEarned: 340,
              date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              notes: 'Reviewed 6 multivariable calculus solutions and rubric scoring.',
            },
            {
              id: 'sample-2',
              nameOrPlatform: 'Sarah M. (AP Calculus AB)',
              type: 'Tutoring',
              hourlyRate: 50,
              hoursWorked: 2.0,
              totalEarned: 100,
              date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              notes: 'Implicit differentiation and related rates review before midterm.',
            },
          ];
    } catch {
      return [];
    }
  });

  const [monthlyTarget, setMonthlyTarget] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('math_monthly_target');
      return saved ? Number(saved) : 1000;
    } catch {
      return 1000;
    }
  });

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [nameOrPlatform, setNameOrPlatform] = useState<string>('');
  const [type, setType] = useState<ClientLog['type']>('Tutoring');
  const [hourlyRate, setHourlyRate] = useState<number>(45);
  const [hoursWorked, setHoursWorked] = useState<number>(2);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    try {
      localStorage.setItem('math_earning_logs', JSON.stringify(logs));
    } catch (e) {
      console.error(e);
    }
  }, [logs]);

  useEffect(() => {
    try {
      localStorage.setItem('math_monthly_target', String(monthlyTarget));
    } catch (e) {
      console.error(e);
    }
  }, [monthlyTarget]);

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameOrPlatform.trim()) return;

    const newLog: ClientLog = {
      id: `log-${Date.now()}`,
      nameOrPlatform: nameOrPlatform.trim(),
      type,
      hourlyRate: Number(hourlyRate),
      hoursWorked: Number(hoursWorked),
      totalEarned: Math.round(Number(hourlyRate) * Number(hoursWorked)),
      date,
      notes: notes.trim(),
    };

    setLogs([newLog, ...logs]);
    setNameOrPlatform('');
    setHoursWorked(2);
    setNotes('');
    setIsAdding(false);
  };

  const handleDeleteLog = (id: string) => {
    setLogs(logs.filter((l) => l.id !== id));
  };

  const totalEarned = logs.reduce((sum, l) => sum + l.totalEarned, 0);
  const totalHours = logs.reduce((sum, l) => sum + l.hoursWorked, 0);
  const avgRate = totalHours > 0 ? Math.round(totalEarned / totalHours) : 0;
  const progressRatio = Math.min(totalEarned / (monthlyTarget || 1), 1);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
            Math Income & Client Work Log
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Track your hours, tutoring clients, AI annotation payouts, and progress towards your monthly goal.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors flex items-center space-x-1.5 self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Log Income / Session</span>
        </button>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Logged Income</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">${totalEarned.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Across {logs.length} logged sessions</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Hours Worked</span>
          <div className="text-2xl font-extrabold text-indigo-600 mt-1">{totalHours.toFixed(1)} hrs</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Logged math time</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Effective Rate</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">${avgRate} / hr</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Average across all streams</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Goal Progress</span>
            <input
              type="number"
              value={monthlyTarget}
              onChange={(e) => setMonthlyTarget(Number(e.target.value))}
              className="w-16 text-right font-bold text-xs border border-slate-200 rounded px-1.5 py-0.5"
            />
          </div>
          <div className="text-xl font-extrabold text-slate-900 mt-1">
            {Math.round(progressRatio * 100)}%
            <span className="text-xs font-normal text-slate-400 ml-1">of ${monthlyTarget}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${progressRatio * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Add Log Form Modal / Box */}
      {isAdding && (
        <form
          onSubmit={handleAddLog}
          className="bg-white p-5 rounded-xl border border-indigo-200 shadow-md space-y-4 animate-in fade-in duration-150"
        >
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
              Log Math Income Session
            </span>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Client or Platform Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Outlier.ai or John Doe (AP Calc)"
                value={nameOrPlatform}
                onChange={(e) => setNameOrPlatform(e.target.value)}
                className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Earning Stream</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full text-xs border border-slate-300 rounded-lg p-2 bg-white"
              >
                <option value="Tutoring">1-on-1 Tutoring</option>
                <option value="AI Annotation">AI Math Annotation</option>
                <option value="Freelance">Quant / Data Freelance</option>
                <option value="LaTeX">LaTeX Typesetting</option>
                <option value="Other">Other Math Gig</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Hourly Rate ($/hr)</label>
              <input
                type="number"
                min="10"
                max="200"
                required
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full text-xs border border-slate-300 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Hours Logged</label>
              <input
                type="number"
                step="0.25"
                min="0.25"
                max="40"
                required
                value={hoursWorked}
                onChange={(e) => setHoursWorked(Number(e.target.value))}
                className="w-full text-xs border border-slate-300 rounded-lg p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Session Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-xs border border-slate-300 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Notes / Subject Area</label>
              <input
                type="text"
                placeholder="e.g. Worked through Taylor series and integration by parts"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs border border-slate-300 rounded-lg p-2"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="text-xs font-bold text-emerald-700">
              Total to Log: ${Math.round(hourlyRate * hoursWorked)}
            </div>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg"
            >
              Save Entry
            </button>
          </div>
        </form>
      )}

      {/* Log List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-bold text-sm text-slate-900">Earnings History</h3>
          <span className="text-xs text-slate-500">{logs.length} logged entries</span>
        </div>

        {logs.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            No entries logged yet. Click "Log Income / Session" above to start recording your math earnings!
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {logs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 text-xs">{log.nameOrPlatform}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      log.type === 'Tutoring' ? 'bg-emerald-100 text-emerald-800' :
                      log.type === 'AI Annotation' ? 'bg-purple-100 text-purple-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {log.type}
                    </span>
                  </div>
                  {log.notes && <p className="text-[11px] text-slate-500">{log.notes}</p>}
                  <div className="text-[10px] text-slate-400 flex items-center gap-2">
                    <span>{log.date}</span>
                    <span>•</span>
                    <span>{log.hoursWorked} hrs @ ${log.hourlyRate}/hr</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-sm font-extrabold text-emerald-600">
                    +${log.totalEarned}
                  </span>
                  <button
                    onClick={() => handleDeleteLog(log.id)}
                    className="text-slate-300 hover:text-rose-600 p-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
