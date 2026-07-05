import React, { useState, useEffect, useRef } from 'react';
import { Eye, Layers, Compass } from 'lucide-react';

interface HeatmapViewProps {
  originalImage: string;
}

export function HeatmapView({ originalImage }: HeatmapViewProps) {
  const [heatmapType, setHeatmapType] = useState<'f-pattern' | 'z-pattern' | 'contrast'>('f-pattern');
  const [intensity, setIntensity] = useState(0.65);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions matching its rendering size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dynamic points based on selected human reading pattern
    let points: { x: number; y: number; r: number; val: number }[] = [];

    if (heatmapType === 'f-pattern') {
      // Standard visual scanning: Heavy focus top-left, horizontal sweep, vertical down, smaller sweep
      points = [
        { x: canvas.width * 0.15, y: canvas.height * 0.12, r: 90, val: 1.0 }, // Primary logo/header focal spot
        { x: canvas.width * 0.45, y: canvas.height * 0.12, r: 75, val: 0.8 }, // Nav center
        { x: canvas.width * 0.85, y: canvas.height * 0.12, r: 60, val: 0.5 }, // Top right CTA
        { x: canvas.width * 0.15, y: canvas.height * 0.28, r: 110, val: 0.9 }, // Hero Headline start
        { x: canvas.width * 0.50, y: canvas.height * 0.28, r: 85, val: 0.75 }, // Hero Headline end
        { x: canvas.width * 0.15, y: canvas.height * 0.45, r: 70, val: 0.7 }, // Subheading start
        { x: canvas.width * 0.35, y: canvas.height * 0.45, r: 60, val: 0.5 }, // Subheading sweep
        { x: canvas.width * 0.15, y: canvas.height * 0.62, r: 55, val: 0.5 }, // Secondary block start
        { x: canvas.width * 0.15, y: canvas.height * 0.82, r: 45, val: 0.3 }  // Footer start
      ];
    } else if (heatmapType === 'z-pattern') {
      // Ideal for promotional pages: top horizontal, diagonal sweep across body, bottom horizontal CTA
      points = [
        { x: canvas.width * 0.12, y: canvas.height * 0.12, r: 80, val: 0.9 }, // Top left
        { x: canvas.width * 0.50, y: canvas.height * 0.12, r: 65, val: 0.6 }, // Top mid
        { x: canvas.width * 0.88, y: canvas.height * 0.12, r: 90, val: 0.95 }, // Top right CTA
        { x: canvas.width * 0.65, y: canvas.height * 0.35, r: 105, val: 0.85 }, // Hero visual anchor
        { x: canvas.width * 0.35, y: canvas.height * 0.58, r: 85, val: 0.7 },  // Secondary descriptions
        { x: canvas.width * 0.15, y: canvas.height * 0.80, r: 95, val: 0.9 },  // Bottom left CTA trigger
        { x: canvas.width * 0.85, y: canvas.height * 0.80, r: 80, val: 0.6 }   // Bottom right backup
      ];
    } else {
      // Contrast Anchors: Emphasizes intense high-density visual components and colors
      points = [
        { x: canvas.width * 0.25, y: canvas.height * 0.32, r: 110, val: 1.0 }, // Big bold text blocks
        { x: canvas.width * 0.78, y: canvas.height * 0.48, r: 120, val: 0.95 }, // High-contrast images or illustrations
        { x: canvas.width * 0.15, y: canvas.height * 0.12, r: 50, val: 0.4 },  // Active tags
        { x: canvas.width * 0.88, y: canvas.height * 0.12, r: 85, val: 0.85 }  // Contrast buttons
      ];
    }

    // Render radial blur blobs onto the canvas
    points.forEach((p) => {
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      // Beautiful alpha mapping matching eye-tracking spectrum (Red -> Yellow -> Blue/Green -> Transparent)
      const maxAlpha = p.val * intensity;
      grad.addColorStop(0, `rgba(239, 68, 68, ${maxAlpha})`);    // Hot Red
      grad.addColorStop(0.25, `rgba(245, 158, 11, ${maxAlpha * 0.85})`); // Yellow
      grad.addColorStop(0.55, `rgba(16, 185, 129, ${maxAlpha * 0.5})`);  // Green
      grad.addColorStop(0.85, `rgba(59, 130, 246, ${maxAlpha * 0.15})`); // Cool Blue
      grad.addColorStop(1, 'rgba(59, 130, 246, 0)');           // Transparent

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = grad;
      ctx.fill();
    });
  }, [heatmapType, intensity, originalImage]);

  return (
    <div id="heatmap-view" className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50 p-4 rounded-3xl border border-subtle shadow-soft">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-gray-500" />
          <span className="text-xs font-bold text-black">Visual Pattern Mapping</span>
        </div>
        
        {/* Toggle Reading Patterns */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-full border border-subtle self-start shadow-soft">
          <button
            onClick={() => setHeatmapType('f-pattern')}
            className={`px-3 py-1.5 text-[10px] font-semibold rounded-full transition-all ${
              heatmapType === 'f-pattern' ? 'bg-black text-white shadow-soft' : 'text-gray-500 hover:text-black'
            }`}
          >
            F-Pattern (Dashboard)
          </button>
          <button
            onClick={() => setHeatmapType('z-pattern')}
            className={`px-3 py-1.5 text-[10px] font-semibold rounded-full transition-all ${
              heatmapType === 'z-pattern' ? 'bg-black text-white shadow-soft' : 'text-gray-500 hover:text-black'
            }`}
          >
            Z-Pattern (Landing)
          </button>
          <button
            onClick={() => setHeatmapType('contrast')}
            className={`px-3 py-1.5 text-[10px] font-semibold rounded-full transition-all ${
              heatmapType === 'contrast' ? 'bg-black text-white shadow-soft' : 'text-gray-500 hover:text-black'
            }`}
          >
            Contrast Anchors
          </button>
        </div>

        {/* Intensity slider */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase">Intensity</span>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={intensity}
            onChange={(e) => setIntensity(parseFloat(e.target.value))}
            className="w-24 accent-black cursor-pointer"
          />
        </div>
      </div>

      <div 
        ref={containerRef}
        className="relative h-[480px] w-full bg-black rounded-3xl overflow-hidden border border-black shadow-soft flex items-center justify-center"
      >
        <img 
          src={originalImage} 
          alt="Original design under heatmap" 
          className="w-full h-full object-contain opacity-85 select-none pointer-events-none"
          referrerPolicy="no-referrer"
        />
        {/* Canvas heatmap overlay */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none blend-mode-multiply"
        />

        {/* Legend card */}
        <div className="absolute bottom-4 left-4 bg-black/90 border border-neutral-800 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-lg text-[10px] space-y-1.5 z-10 pointer-events-none">
          <span className="font-bold text-neutral-400 block uppercase tracking-wider">Visual Attention Score</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded bg-red-500 border border-red-600 shadow-xs" />
              <span className="text-neutral-200 font-semibold">High (CTA/Logo)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded bg-amber-400 border border-amber-500 shadow-xs" />
              <span className="text-neutral-200 font-semibold">Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded bg-blue-500 border border-blue-600 shadow-xs" />
              <span className="text-neutral-200 font-semibold">Idle</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
