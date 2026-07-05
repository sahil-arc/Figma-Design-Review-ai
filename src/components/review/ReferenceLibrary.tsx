import React, { useState } from 'react';
import { BookOpen, ShieldCheck, Compass, HelpCircle, CheckSquare, Search } from 'lucide-react';
import { PSYCHOLOGY_LAWS, WCAG_CRITERIA } from '../../constants/principles';

export function ReferenceLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'psychology' | 'accessibility'>('all');

  const filteredLaws = PSYCHOLOGY_LAWS.filter(law => 
    law.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    law.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredWCAG = WCAG_CRITERIA.filter(criterion =>
    criterion.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    criterion.requirement.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="reference-library-page" className="space-y-6">
      {/* Hero Banner Header */}
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-white/10 px-2 py-0.5 rounded-full inline-block">Heuristics & WCAG Database</span>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">Design System Reference Library</h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            The foundation of elite design audits. Explore cognitive psychology laws, WCAG 2.1 accessibility criteria, and human interface guidelines to back your design decisions with science.
          </p>
        </div>
        <div className="absolute right-6 bottom-0 translate-y-1/4 opacity-10 hidden md:block">
          <BookOpen className="w-56 h-56" />
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between bg-white p-4 rounded-xl border border-zinc-100 shadow-xs">
        <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
              activeCategory === 'all' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            All Resources
          </button>
          <button
            onClick={() => setActiveCategory('psychology')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
              activeCategory === 'psychology' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Cognitive Laws
          </button>
          <button
            onClick={() => setActiveCategory('accessibility')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
              activeCategory === 'accessibility' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            WCAG Standards
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search principles or rules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-950 bg-zinc-50/50"
          />
        </div>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Section: Cognitive Laws */}
        {(activeCategory === 'all' || activeCategory === 'psychology') && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-zinc-100">
              <Compass className="w-4 h-4 text-zinc-700" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700">Cognitive Psychology Laws</h3>
            </div>

            {filteredLaws.length === 0 ? (
              <div className="text-center py-10 bg-zinc-50/50 rounded-xl border border-zinc-100">
                <p className="text-xs text-zinc-500">No cognitive principles found matching search terms.</p>
              </div>
            ) : (
              filteredLaws.map((law, i) => (
                <div key={i} className="bg-white border border-zinc-100 rounded-xl p-5 space-y-3.5 shadow-xs hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-zinc-900">{law.name}</span>
                    <span className="text-[10px] text-zinc-400 font-semibold">{law.origin}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide block">Definition</span>
                    <p className="text-xs text-zinc-700 leading-relaxed font-medium bg-zinc-50 p-3 rounded-lg border border-zinc-100/60">{law.definition}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide block">Real-world Example</span>
                    <p className="text-xs text-zinc-500 leading-relaxed font-medium italic">{law.example}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-zinc-50">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide block">Actionable UX Guidelines</span>
                    <ul className="space-y-1.5 text-xs text-zinc-600 font-medium">
                      {law.practicalTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckSquare className="w-3.5 h-3.5 text-zinc-800 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Category Section: WCAG Accessibility Standards */}
        {(activeCategory === 'all' || activeCategory === 'accessibility') && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-zinc-100">
              <ShieldCheck className="w-4 h-4 text-zinc-700" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700">WCAG Accessibility Guidelines</h3>
            </div>

            {filteredWCAG.length === 0 ? (
              <div className="text-center py-10 bg-zinc-50/50 rounded-xl border border-zinc-100">
                <p className="text-xs text-zinc-500">No accessibility criteria found matching search terms.</p>
              </div>
            ) : (
              filteredWCAG.map((criterion, i) => (
                <div key={i} className="bg-white border border-zinc-100 rounded-xl p-5 space-y-3.5 shadow-xs hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
                        WCAG {criterion.id}
                      </span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Level {criterion.level}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-zinc-800">{criterion.category}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide block">Requirement</span>
                    <p className="text-xs text-zinc-700 leading-relaxed font-medium bg-zinc-50 p-3 rounded-lg border border-zinc-100/60">{criterion.requirement}</p>
                  </div>

                  <div className="space-y-1 bg-emerald-50/40 p-3 rounded-lg border border-emerald-100/60 space-y-1.5">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide block">How to verify and fix</span>
                    <p className="text-xs text-emerald-700 leading-normal font-medium">{criterion.howToFix}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
