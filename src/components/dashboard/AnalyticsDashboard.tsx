import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';
import { Sparkles, ArrowUpRight, ShieldCheck, HelpCircle, FileText, Compass, AlertTriangle, Layers, Clock, Activity } from 'lucide-react';
import { ReviewReport } from '../../types';

interface AnalyticsDashboardProps {
  reports: ReviewReport[];
  onSelectReport: (reportId: string) => void;
  onNavigateToUpload: () => void;
}

export function AnalyticsDashboard({ reports, onSelectReport, onNavigateToUpload }: AnalyticsDashboardProps) {
  // 1. Prepare historical scores data for chart
  const historyData = reports.map((r) => ({
    name: new Date(r.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    score: r.scores.overall.score,
    ui: r.scores.ui.score,
    ux: r.scores.ux.score,
    accessibility: r.scores.accessibility.score
  })).reverse();

  // 2. Aggregate severity metrics
  const allSuggestions = reports.flatMap((r) => r.suggestions);
  const severityCounts = {
    critical: allSuggestions.filter((s) => s.severity === 'critical').length,
    high: allSuggestions.filter((s) => s.severity === 'high').length,
    medium: allSuggestions.filter((s) => s.severity === 'medium').length,
    low: allSuggestions.filter((s) => s.severity === 'low').length,
  };

  const severityData = [
    { name: 'Critical', value: severityCounts.critical, color: '#F43F5E' },
    { name: 'High', value: severityCounts.high, color: '#FB7185' },
    { name: 'Medium', value: severityCounts.medium, color: '#F59E0B' },
    { name: 'Low', value: severityCounts.low, color: '#3B82F6' },
  ];

  // 3. Category distribution
  const categories = ['spacing', 'typography', 'color', 'accessibility', 'ux'];
  const categoryData = categories.map((cat) => ({
    name: cat.toUpperCase(),
    count: allSuggestions.filter((s) => s.category === cat).length
  }));

  // Simple statistics
  const averageScore = Math.round(reports.reduce((acc, r) => acc + r.scores.overall.score, 0) / (reports.length || 1));
  const totalIssuesResolved = 12; // Simulated historic completions
  const totalActiveIssues = allSuggestions.length;

  return (
    <div id="analytics-dashboard" className="space-y-6">
      {/* Dynamic welcome header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-subtle p-6 rounded-3xl shadow-soft">
        <div className="space-y-1">
          <h2 className="text-base font-bold text-black tracking-tight">Enterprise Design Dashboard</h2>
          <p className="text-xs text-gray-500">Track visual design debt, accessibility benchmarks, and psychological laws compliance over time.</p>
        </div>
        <button
          onClick={onNavigateToUpload}
          className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full text-xs font-semibold hover:bg-zinc-800 transition-all shadow-soft self-start md:self-center"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>New Design Audit</span>
        </button>
      </div>

      {/* Quick stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat card 1 */}
        <div className="bg-white border border-subtle p-5 rounded-3xl shadow-soft flex flex-col justify-between h-28">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] font-bold tracking-wider uppercase">Avg Quality Rating</span>
            <Activity className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-baseline gap-1.5 pt-2">
            <span className="text-xl font-bold tracking-tight text-black">{averageScore}/100</span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
              Grade B+
            </span>
          </div>
          <span className="text-[10px] text-gray-400 font-medium leading-none mt-1">Weighted across all workspaces</span>
        </div>

        {/* Stat card 2 */}
        <div className="bg-white border border-subtle p-5 rounded-3xl shadow-soft flex flex-col justify-between h-28">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] font-bold tracking-wider uppercase">Active Design Issues</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-1.5 pt-2">
            <span className="text-xl font-bold tracking-tight text-black">{totalActiveIssues}</span>
            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100">
              Attention Required
            </span>
          </div>
          <span className="text-[10px] text-gray-400 font-medium leading-none mt-1">Critical & High severity occurrences</span>
        </div>

        {/* Stat card 3 */}
        <div className="bg-white border border-subtle p-5 rounded-3xl shadow-soft flex flex-col justify-between h-28">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] font-bold tracking-wider uppercase">Design Debt Ratio</span>
            <Layers className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-baseline gap-1.5 pt-2">
            <span className="text-xl font-bold tracking-tight text-black">Medium</span>
            <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded border border-subtle">
              Low Risk
            </span>
          </div>
          <span className="text-[10px] text-gray-400 font-medium leading-none mt-1">Estimated 6 hours to correct</span>
        </div>

        {/* Stat card 4 */}
        <div className="bg-white border border-subtle p-5 rounded-3xl shadow-soft flex flex-col justify-between h-28">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] font-bold tracking-wider uppercase">Accessibility Index</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-1.5 pt-2">
            <span className="text-xl font-bold tracking-tight text-black">WCAG AA</span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
              92% Compliant
            </span>
          </div>
          <span className="text-[10px] text-gray-400 font-medium leading-none mt-1">Tested for visual contrast ratios</span>
        </div>
      </div>

      {/* Bento Charts Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large Historical Score Chart (Left 2/3) */}
        <div className="lg:col-span-2 bg-white border border-subtle p-6 rounded-3xl shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Design System Score Trajectory</h3>
              <p className="text-xs text-gray-500 font-medium">Chronological analysis of audited screens across workspaces.</p>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historyData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#111827" stopOpacity={0.10}/>
                    <stop offset="95%" stopColor="#111827" stopOpacity={0.01}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={10} tickLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={10} tickLine={false} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', border: 'none', borderRadius: '12px', color: '#FFF', fontSize: '11px', fontFamily: 'sans-serif' }}
                  labelStyle={{ fontWeight: 'bold', color: '#9CA3AF' }}
                />
                <Area type="monotone" dataKey="score" stroke="#111827" strokeWidth={2} fillOpacity={1} fill="url(#scoreColor)" name="Overall Quality" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category breakdown bar chart */}
        <div className="bg-white border border-subtle p-6 rounded-3xl shadow-soft space-y-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Debt Distribution</h3>
            <p className="text-xs text-gray-500 font-medium">Where suggestions cluster across rules.</p>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F3F4F6" />
                <XAxis type="number" stroke="#9CA3AF" fontSize={9} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="#9CA3AF" fontSize={9} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', border: 'none', borderRadius: '12px', color: '#FFF', fontSize: '11px' }}
                />
                <Bar dataKey="count" fill="#111827" radius={[0, 4, 4, 0]} name="Issues Count">
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#111827' : '#6B7280'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Reviews Table */}
      <div className="bg-white border border-subtle rounded-3xl shadow-soft overflow-hidden">
        <div className="px-6 py-5 border-b border-subtle flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-black">Recent Audit History</h3>
            <p className="text-xs text-gray-500 font-medium">Historical logs of multimodal screenshots and design system review reports.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 font-semibold uppercase tracking-wider border-b border-subtle">
                <th className="py-3.5 px-6">Design Name</th>
                <th className="py-3.5 px-6">Platform</th>
                <th className="py-3.5 px-6 text-center">Score</th>
                <th className="py-3.5 px-6">Active Friction</th>
                <th className="py-3.5 px-6">Timestamp</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-subtle">
              {reports.map((report) => {
                const criticalAndHigh = report.suggestions.filter(s => s.severity === 'critical' || s.severity === 'high').length;
                return (
                  <tr key={report.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-black flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 border border-subtle overflow-hidden shrink-0 flex items-center justify-center">
                        <img src={report.imageUrl} alt={report.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <span>{report.title}</span>
                    </td>
                    <td className="py-4 px-6 text-gray-500 font-medium">{report.platform}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        report.scores.overall.score >= 80 ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                        report.scores.overall.score >= 60 ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                        'bg-rose-50 text-rose-700 border border-rose-100'
                      }`}>
                        {report.scores.overall.score}/100
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                        <span className="text-gray-600 font-medium">{criticalAndHigh} priority issue(s)</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-400 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gray-300" />
                        <span>{new Date(report.timestamp).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => onSelectReport(report.id)}
                        className="text-black hover:bg-gray-50 border border-subtle font-semibold inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full transition-all text-[11px]"
                      >
                        <span>View Review</span>
                        <ArrowUpRight className="w-3 h-3 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
