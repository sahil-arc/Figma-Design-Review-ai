import React, { useState } from 'react';
import { ShieldCheck, Eye, RefreshCw, AlertTriangle } from 'lucide-react';
import { ColorAnalysis } from '../../types';

interface ContrastSimProps {
  originalImage: string;
  colorAnalysis: ColorAnalysis;
}

export function ContrastSim({ originalImage, colorAnalysis }: ContrastSimProps) {
  const [activeSimulation, setActiveSimulation] = useState<'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia'>('normal');

  const simulations = [
    { id: 'normal' as const, label: 'Normal Vision', desc: 'Full chromatic range' },
    { id: 'protanopia' as const, label: 'Protanopia', desc: 'Red-weakness / blind (1.0% of males)' },
    { id: 'deuteranopia' as const, label: 'Deuteranopia', desc: 'Green-weakness / blind (1.1% of males)' },
    { id: 'tritanopia' as const, label: 'Tritanopia', desc: 'Blue-weakness / blind (rare)' },
    { id: 'achromatopsia' as const, label: 'Achromatopsia', desc: 'Complete monochromatic / color blind (very rare)' }
  ];

  // Map simulation to specific SVG filter ID
  const filterStyle = activeSimulation !== 'normal' ? { filter: `url(#${activeSimulation}-filter)` } : {};

  return (
    <div id="contrast-simulator" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* SVG Filters for Color Blindness Matrices */}
      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id="protanopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.567, 0.433, 0, 0, 0, 
                      0.558, 0.442, 0, 0, 0, 
                      0, 0.242, 0.758, 0, 0, 
                      0, 0, 0, 1, 0"
            />
          </filter>
          <filter id="deuteranopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.625, 0.375, 0, 0, 0, 
                      0.70, 0.30, 0, 0, 0, 
                      0, 0.30, 0.70, 0, 0, 
                      0, 0, 0, 1, 0"
            />
          </filter>
          <filter id="tritanopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.95, 0.05, 0, 0, 0, 
                      0, 0.433, 0.567, 0, 0, 
                      0, 0.475, 0.525, 0, 0, 
                      0, 0, 0, 1, 0"
            />
          </filter>
          <filter id="achromatopsia-filter">
            <feColorMatrix
              type="matrix"
              values="0.299, 0.587, 0.114, 0, 0, 
                      0.299, 0.587, 0.114, 0, 0, 
                      0.299, 0.587, 0.114, 0, 0, 
                      0, 0, 0, 1, 0"
            />
          </filter>
        </defs>
      </svg>

      {/* Simulator Workspace (Left 2/3) */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-black">Color Blindness Workspace</h3>
            <p className="text-xs text-gray-500 font-medium">Render the design through chromatic filter transformations to verify readability.</p>
          </div>
        </div>

        {/* Live Filter Screen */}
        <div className="relative h-[480px] w-full bg-gray-50 rounded-3xl overflow-hidden border border-subtle flex items-center justify-center shadow-soft">
          <img
            src={originalImage}
            alt="Simulated design frame"
            className="w-full h-full object-contain transition-all duration-300"
            style={filterStyle}
            referrerPolicy="no-referrer"
          />

          <div className="absolute top-4 right-4 bg-black/90 text-white border border-neutral-800 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-semibold tracking-tight shadow-soft uppercase">
            Viewing: {activeSimulation === 'normal' ? 'Standard Vision' : activeSimulation}
          </div>
        </div>

        {/* Filter Controls Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {simulations.map((sim) => (
            <button
              key={sim.id}
              onClick={() => setActiveSimulation(sim.id)}
              className={`p-3 rounded-2xl border text-left flex flex-col justify-between h-20 transition-all ${
                activeSimulation === sim.id
                  ? 'bg-black border-black text-white shadow-soft'
                  : 'bg-white border-subtle text-black hover:bg-gray-50'
              }`}
            >
              <span className="text-[11px] font-semibold tracking-tight block">{sim.label}</span>
              <span className={`text-[9px] block leading-tight ${activeSimulation === sim.id ? 'text-gray-400' : 'text-gray-500'}`}>
                {sim.desc.split(' (')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Recommended Adjustments (Right 1/3) */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-bold text-black">Hex Optimization Recommendations</h3>
          <p className="text-xs text-gray-500 font-medium">AI suggested color tokens to align your palette with WCAG accessibility laws.</p>
        </div>

        {/* Suggestions Card List */}
        <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
          {colorAnalysis.palette.map((color, i) => (
            <div key={i} className="bg-white border border-subtle rounded-3xl p-4 space-y-3 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-black">{color.name}</span>
                {color.contrastWithBg >= 4.5 ? (
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                    Accessible ({color.contrastWithBg.toFixed(1)}:1)
                  </span>
                ) : (
                  <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100 flex items-center gap-1">
                    <AlertTriangle className="w-2.5 h-2.5" /> Low Contrast ({color.contrastWithBg.toFixed(1)}:1)
                  </span>
                )}
              </div>

              {/* Hex comparison block */}
              <div className="flex items-center gap-3">
                <div className="flex-1 space-y-1">
                  <span className="text-[9px] text-gray-400 font-bold block uppercase">Original</span>
                  <div className="flex items-center gap-1.5 bg-gray-50 p-1.5 rounded-full border border-subtle">
                    <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: color.originalHex }} />
                    <span className="text-[10px] font-mono font-bold text-gray-500">{color.originalHex}</span>
                  </div>
                </div>

                <div className="flex-1 space-y-1">
                  <span className="text-[9px] text-gray-400 font-bold block uppercase">AI Optimized</span>
                  <div className="flex items-center gap-1.5 bg-gray-50 p-1.5 rounded-full border border-subtle">
                    <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: color.optimizedHex }} />
                    <span className="text-[10px] font-mono font-bold text-black">{color.optimizedHex}</span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-gray-550 leading-normal bg-gray-50/50 p-3 rounded-2xl border border-subtle">
                {color.reason}
              </p>
            </div>
          ))}

          {/* Color Harmony Box */}
          {colorAnalysis.harmonies.map((harmony, i) => (
            <div key={i} className="bg-gray-50 border border-subtle rounded-3xl p-4 space-y-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Recommended Harmony: {harmony.type}</span>
              <p className="text-[11px] text-gray-600 leading-normal font-medium">{harmony.description}</p>
              <div className="flex items-center gap-1.5 pt-1">
                {harmony.colors.map((c, idx) => (
                  <div 
                    key={idx} 
                    className="w-6 h-6 rounded-full border border-white shadow-soft group relative cursor-help"
                    style={{ backgroundColor: c }}
                    title={c}
                  >
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 bg-black text-white text-[9px] font-mono px-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity mb-1 whitespace-nowrap">
                      {c}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
