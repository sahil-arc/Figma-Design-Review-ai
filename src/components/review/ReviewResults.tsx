import React, { useState } from 'react';
import { Sparkles, HelpCircle, FileText, Compass, AlertTriangle, Layers, ArrowLeft, RefreshCw, Layers3, Activity, Eye, ShieldCheck, Download } from 'lucide-react';
import { ReviewReport, Severity, Difficulty, Priority, Suggestion } from '../../types';
import { SeverityBadge, PriorityBadge } from '../common/Badge';
import { BeforeAfterView } from './BeforeAfterView';
import { HeatmapView } from './HeatmapView';
import { ContrastSim } from './ContrastSim';
import { ExportReport } from './ExportReport';

interface ReviewResultsProps {
  report: ReviewReport;
  onBack: () => void;
}

export function ReviewResults({ report, onBack }: ReviewResultsProps) {
  const [activeTab, setActiveTab] = useState<'timeline' | 'visuals' | 'accessibility' | 'tokens' | 'export'>('timeline');
  const [severityFilter, setSeverityFilter] = useState<'all' | Severity>('all');
  const [expandedSuggestion, setExpandedSuggestion] = useState<string | null>(null);

  // Score metrics list
  const scoreKeys = [
    { key: 'overall' as const, label: 'Overall Rating' },
    { key: 'ui' as const, label: 'Visual UI' },
    { key: 'ux' as const, label: 'UX Flow' },
    { key: 'accessibility' as const, label: 'Accessibility' },
    { key: 'conversion' as const, label: 'Conversion' },
    { key: 'developer' as const, label: 'Dev Handoff' },
  ];

  // Filter suggestions
  const filteredSuggestions = report.suggestions.filter((s) => {
    if (severityFilter === 'all') return true;
    return s.severity === severityFilter;
  });

  return (
    <div id="review-results-workspace" className="space-y-6">
      {/* Back & Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-subtle p-6 rounded-3xl shadow-soft">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 border border-subtle rounded-full text-gray-500 hover:text-black hover:bg-gray-50 transition-all shadow-soft"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Design Review Report</span>
            <h2 className="text-sm font-bold text-black tracking-tight">{report.title}</h2>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-zinc-50 border border-subtle px-3.5 py-1.5 rounded-full shadow-soft">
          <span>Platform Target:</span>
          <span className="text-black">{report.platform}</span>
        </div>
      </div>

      {/* Scores Bento Grid with expanders */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {scoreKeys.map(({ key, label }) => {
          const detail = report.scores[key];
          const isOverall = key === 'overall';
          return (
            <div
              key={key}
              className={`border p-5 rounded-3xl shadow-soft flex flex-col justify-between h-28 relative group overflow-hidden ${
                isOverall 
                  ? 'bg-black border-black text-white col-span-2 sm:col-span-1' 
                  : 'bg-white border-subtle text-black'
              }`}
            >
              <div className="flex items-center justify-between text-gray-400">
                <span className="text-[10px] font-bold tracking-wider uppercase">{label}</span>
                <HelpCircle className="w-3.5 h-3.5 text-zinc-300 opacity-60 hover:opacity-100 cursor-help" title={detail.why} />
              </div>
              <div className="pt-2">
                <span className="text-2xl font-bold tracking-tight">{detail.score}</span>
                <span className="text-[10px] font-semibold opacity-65">/100</span>
              </div>
              <span className={`text-[9px] font-medium leading-tight truncate mt-1 ${isOverall ? 'text-gray-300' : 'text-gray-400'}`}>
                {detail.why}
              </span>
            </div>
          );
        })}
      </div>

      {/* Executive Summary Card */}
      <div className="bg-white border border-subtle p-6 rounded-3xl shadow-soft space-y-2">
        <div className="flex items-center gap-1.5 text-gray-400">
          <Activity className="w-4 h-4 text-gray-500" />
          <span className="text-[10px] font-bold tracking-wider uppercase">Executive UX Assessment</span>
        </div>
        <p className="text-xs text-gray-700 leading-relaxed font-medium">
          {report.executiveSummary}
        </p>
      </div>

      {/* Audit Navigation Tabs */}
      <div className="flex border-b border-subtle bg-gray-50 p-1 rounded-full shadow-soft">
        {[
          { id: 'timeline' as const, label: 'Suggestions Timeline', icon: AlertTriangle },
          { id: 'visuals' as const, label: 'Before/After & Heatmap', icon: Eye },
          { id: 'accessibility' as const, label: 'Accessibility & Color Sim', icon: ShieldCheck },
          { id: 'tokens' as const, label: 'Design System Tokens', icon: Layers },
          { id: 'export' as const, label: 'Export & Share', icon: Download },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-3 text-xs font-semibold rounded-full transition-all flex items-center justify-center gap-2 ${
                isActive
                  ? 'bg-white text-black shadow-soft border border-subtle'
                  : 'text-gray-500 hover:text-black hover:bg-gray-100/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="bg-white border border-subtle p-6 rounded-3xl shadow-soft min-h-[400px]">
        
        {/* TAB 1: Suggestions Timeline */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            {/* Header controls for filtering */}
            <div className="flex items-center justify-between border-b border-subtle pb-4">
              <div>
                <h3 className="text-sm font-bold text-black">Interactive Suggestions Timeline</h3>
                <p className="text-xs text-gray-500 font-medium">Chronological checklist of issues ranked by impact and severity.</p>
              </div>

              <div className="flex items-center gap-1.5 bg-gray-50 border border-subtle p-1 rounded-full shadow-soft">
                <button
                  onClick={() => setSeverityFilter('all')}
                  className={`px-3 py-1.5 text-[10px] font-semibold rounded-full transition-all ${
                    severityFilter === 'all' ? 'bg-black text-white shadow-soft' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  All Issues
                </button>
                <button
                  onClick={() => setSeverityFilter('critical')}
                  className={`px-3 py-1.5 text-[10px] font-semibold rounded-full transition-all ${
                    severityFilter === 'critical' ? 'bg-rose-600 text-white shadow-soft' : 'text-rose-600 hover:bg-rose-50'
                  }`}
                >
                  Critical Only
                </button>
                <button
                  onClick={() => setSeverityFilter('high')}
                  className={`px-3 py-1.5 text-[10px] font-semibold rounded-full transition-all ${
                    severityFilter === 'high' ? 'bg-black text-white shadow-soft' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  High Severity
                </button>
              </div>
            </div>

            {/* Suggestions Checklist cards */}
            <div className="space-y-4">
              {filteredSuggestions.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-xs font-medium">No active design findings found matching this filter criteria.</p>
                </div>
              ) : (
                filteredSuggestions.map((suggestion, idx) => {
                  const isExpanded = expandedSuggestion === suggestion.id;
                  return (
                    <div 
                      key={suggestion.id}
                      className="border border-subtle rounded-3xl overflow-hidden hover:border-black transition-all shadow-soft"
                    >
                      {/* Interactive Header summary */}
                      <div 
                        onClick={() => setExpandedSuggestion(isExpanded ? null : suggestion.id)}
                        className="p-5 bg-gray-50/30 flex items-center justify-between cursor-pointer hover:bg-gray-50/60 transition-colors select-none"
                      >
                        <div className="space-y-1.5 max-w-2xl">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-gray-400 font-mono">0{idx + 1}</span>
                            <span className="text-xs font-bold text-black">{suggestion.issue}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{suggestion.heuristic}</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{suggestion.category}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <SeverityBadge severity={suggestion.severity} />
                          <PriorityBadge priority={suggestion.priority} />
                        </div>
                      </div>

                      {/* Expandable details content block */}
                      {isExpanded && (
                        <div className="p-6 border-t border-subtle bg-white grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Finding description columns */}
                          <div className="md:col-span-2 space-y-4">
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide block">Problem & Rationale</span>
                              <p className="text-xs text-zinc-700 leading-relaxed font-medium">{suggestion.reason}</p>
                            </div>

                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide block">Friction / Impact</span>
                              <p className="text-xs text-rose-700 font-medium leading-relaxed">{suggestion.impact}</p>
                            </div>

                            <div className="space-y-1.5 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                              <span className="text-[10px] font-bold text-zinc-800 uppercase tracking-wide block">AI Suggested Fix (Developer-ready)</span>
                              <p className="text-xs text-zinc-800 leading-relaxed font-semibold">{suggestion.fix}</p>
                              
                              {suggestion.previewCode && (
                                <div className="mt-3 bg-zinc-900 rounded-lg p-3 font-mono text-[10px] text-zinc-200 overflow-x-auto shadow-sm relative">
                                  <pre>{suggestion.previewCode}</pre>
                                  <span className="absolute top-2 right-2 text-[8px] font-bold tracking-widest text-zinc-500 uppercase bg-zinc-800 px-1 rounded">Tailwind React</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Efficiency parameters right col */}
                          <div className="bg-zinc-50/50 p-4 rounded-xl border border-zinc-100 flex flex-col justify-between space-y-4 h-full">
                            <div className="space-y-3.5 text-xs">
                              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Diagnostics</span>
                              
                              <div className="flex items-center justify-between border-b border-zinc-100 pb-1.5">
                                <span className="text-zinc-500 font-medium">Expected Improvement</span>
                                <span className="font-bold text-zinc-800 text-right text-[11px]">{suggestion.expectedImprovement}</span>
                              </div>

                              <div className="flex items-center justify-between border-b border-zinc-100 pb-1.5">
                                <span className="text-zinc-500 font-medium">Estimated Time to Fix</span>
                                <span className="font-bold text-zinc-800">{suggestion.timeToFix} mins</span>
                              </div>

                              <div className="flex items-center justify-between pb-1">
                                <span className="text-zinc-500 font-medium">Implementation Complexity</span>
                                <span className="font-bold text-zinc-800 capitalize">{suggestion.difficulty}</span>
                              </div>
                            </div>

                            <div className="pt-2 border-t border-zinc-100">
                              <button 
                                onClick={() => alert('Diagnostic task exported to linear workspace mock successful!')}
                                className="w-full py-2 px-3 bg-zinc-900 text-white rounded-lg text-[10px] font-bold tracking-tight hover:bg-zinc-800 transition-colors uppercase"
                              >
                                Export to Linear/Jira
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 2: Visual comparison before/after & heatmapping */}
        {activeTab === 'visuals' && (
          <div className="space-y-12">
            <BeforeAfterView originalImage={report.imageUrl} />
            <div className="border-t border-zinc-100 pt-8">
              <HeatmapView originalImage={report.imageUrl} />
            </div>
          </div>
        )}

        {/* TAB 3: Accessibility check and chromatic simulations */}
        {activeTab === 'accessibility' && (
          <div className="space-y-8">
            <ContrastSim originalImage={report.imageUrl} colorAnalysis={report.colorAnalysis} />
          </div>
        )}

        {/* TAB 4: Design system component analysis and typography tokens */}
        {activeTab === 'tokens' && (
          <div className="space-y-8">
            {/* Top row: Typography pairing suggs & diagnostics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Typography */}
              <div className="bg-white border border-zinc-100 p-5 rounded-2xl shadow-xs space-y-4">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Typographic Audit</span>
                
                <div className="space-y-3.5 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-zinc-400 block uppercase">Hierarchy Scale Consistency</span>
                    <p className="text-zinc-700 leading-relaxed font-medium">{report.typographyAnalysis.scaleConsistency}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-zinc-400 block uppercase">Line-Height Ratio & Lengths</span>
                    <p className="text-zinc-700 leading-relaxed font-medium">{report.typographyAnalysis.lineHeightFeedback}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-zinc-400 block uppercase">General Readability Summary</span>
                    <p className="text-zinc-700 leading-relaxed font-medium">{report.typographyAnalysis.readabilityFeedback}</p>
                  </div>
                </div>

                <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100 space-y-2">
                  <span className="text-[10px] font-bold text-zinc-800 uppercase block">AI Recommended Font Pairing</span>
                  <div className="flex items-center justify-between text-xs border-b border-zinc-200/60 pb-1.5">
                    <span className="text-zinc-500 font-semibold">Heading / UI Display</span>
                    <span className="font-bold text-zinc-800">{report.typographyAnalysis.pairingSuggestion.headingFont}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-b border-zinc-200/60 pb-1.5">
                    <span className="text-zinc-500 font-semibold">Body Copy</span>
                    <span className="font-bold text-zinc-800">{report.typographyAnalysis.pairingSuggestion.bodyFont}</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-relaxed pt-1">
                    **Rationale**: {report.typographyAnalysis.pairingSuggestion.rationale}
                  </p>
                </div>
              </div>

              {/* Design system debt audit */}
              <div className="bg-white border border-zinc-100 p-5 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Design System Debt Audit</span>
                  
                  <div className="space-y-4 text-xs pt-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-zinc-400 block uppercase">Grid & Spacing Tokens</span>
                      <ul className="list-disc pl-4 space-y-1 text-zinc-700 leading-normal font-medium">
                        {report.designSystem.tokenConsistencyIssues.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-zinc-400 block uppercase">Component Variant Redundancies</span>
                      <p className="text-zinc-700 leading-relaxed font-medium">{report.designSystem.variantsCountFeedback}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-zinc-100 pt-3">
                      <span className="text-zinc-500 font-semibold">Naming Convention Compliance</span>
                      <span className="font-bold text-zinc-800">{report.designSystem.namingConventionScore}/100</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                      <span className="text-zinc-500 font-semibold">Accumulated Design Debt</span>
                      <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100 uppercase text-[10px]">
                        {report.designSystem.designDebtEstimate} Debt
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => alert('Figma Design Tokens synchronization successfully mapped!')}
                  className="w-full py-2 px-3 bg-zinc-900 text-white rounded-lg text-[10px] font-bold tracking-tight hover:bg-zinc-800 transition-colors uppercase"
                >
                  Sync Tokens to Figma Variable API
                </button>
              </div>
            </div>

            {/* Component diagnostics tree */}
            <div className="bg-white border border-zinc-100 rounded-2xl shadow-xs overflow-hidden">
              <div className="px-5 py-4 border-b border-zinc-100">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Component Tree Diagnostics</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-zinc-50 text-zinc-400 font-bold uppercase border-b border-zinc-150">
                      <th className="py-2.5 px-5">Detected Component</th>
                      <th className="py-2.5 px-5">Confidence score</th>
                      <th className="py-2.5 px-5">Identified Friction</th>
                      <th className="py-2.5 px-5 text-right">Recommendation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 font-medium">
                    {report.components.map((comp, idx) => (
                      <tr key={idx} className="hover:bg-zinc-50/40">
                        <td className="py-3 px-5 text-zinc-900 font-bold">{comp.name}</td>
                        <td className="py-3 px-5">
                          <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-150 text-[10px] font-semibold">
                            {comp.score}%
                          </span>
                        </td>
                        <td className="py-3 px-5 text-zinc-600">
                          {comp.issues.length > 0 ? comp.issues.join(', ') : 'None detected'}
                        </td>
                        <td className="py-3 px-5 text-zinc-800 font-semibold text-right">
                          {comp.suggestions.length > 0 ? comp.suggestions[0] : 'Fully compliant'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Exporting Reports */}
        {activeTab === 'export' && (
          <ExportReport report={report} />
        )}
      </div>
    </div>
  );
}
