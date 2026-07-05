import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Image as ImageIcon, Eye } from 'lucide-react';

interface BeforeAfterViewProps {
  originalImage: string;
}

export function BeforeAfterView({ originalImage }: BeforeAfterViewProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div id="before-after-view" className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-black">Before vs. Optimized Overlay</h3>
          <p className="text-xs text-gray-500 font-medium">Slide to compare original design with optimized layout spacing overlay rules.</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold text-gray-500">
          <span className="flex items-center gap-1"><ImageIcon className="w-3.5 h-3.5" /> Before (Original)</span>
          <span className="flex items-center gap-1 text-black"><Sparkles className="w-3.5 h-3.5 text-amber-500" /> AI Spacing Grid</span>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="relative h-[480px] w-full bg-gray-50 rounded-3xl overflow-hidden select-none cursor-ew-resize border border-subtle shadow-soft"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* Underlay: AI Optimized Spacing Overlay */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={originalImage} 
            alt="Optimized" 
            className="w-full h-full object-contain pointer-events-none"
            referrerPolicy="no-referrer"
          />
          {/* Spacing Guide Overlay */}
          <div className="absolute inset-0 bg-blue-500/5 backdrop-blur-[1px] grid grid-cols-12 gap-4 p-8 pointer-events-none">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-full bg-blue-500/10 border-x border-blue-400/20 flex flex-col justify-between p-2">
                <span className="text-[9px] font-mono text-blue-600 font-semibold bg-white/90 px-1 py-0.5 rounded shadow-soft self-center">Col {i+1}</span>
                <span className="text-[8px] font-mono text-blue-500 text-center font-semibold">8pt Grid</span>
              </div>
            ))}
          </div>
          {/* Hover highlight markers for spacing rules */}
          <div className="absolute top-[25%] left-[20%] w-32 h-10 border border-emerald-500 bg-emerald-500/10 flex items-center justify-center pointer-events-none">
            <span className="text-[10px] font-mono text-emerald-700 font-semibold bg-white/90 px-1 rounded shadow-soft">Adjust pad to 16px</span>
          </div>
          <div className="absolute bottom-[20%] right-[30%] w-44 h-12 border border-rose-500 bg-rose-500/10 flex items-center justify-center pointer-events-none">
            <span className="text-[10px] font-mono text-rose-700 font-semibold bg-white/90 px-1 rounded shadow-soft">Target &lt; 44px</span>
          </div>
        </div>

        {/* Overlay: Original Image (Slices width based on slider position) */}
        <div 
          className="absolute inset-0 h-full overflow-hidden border-r-2 border-white pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="absolute inset-0 h-full w-[1000px]" style={{ width: containerRef.current?.getBoundingClientRect().width }}>
            <img 
              src={originalImage} 
              alt="Original" 
              className="w-full h-full object-contain pointer-events-none"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Handle slider */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize pointer-events-none z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-black border-2 border-white shadow-soft flex items-center justify-center pointer-events-none">
            <Eye className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
