import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, Sliders, Compass, Settings, Home, LayoutDashboard, ChevronRight, CornerDownLeft } from 'lucide-react';
import { NavigationTab } from '../layout/Sidebar';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavigationTab) => void;
}

export function CommandPalette({ isOpen, onClose, onNavigate }: CommandPaletteProps) {
  const [search, setSearch] = useState('');

  const commands = [
    { id: 'landing', label: 'Go to Overview Hub', desc: 'Main product intro and workspace launch guides', icon: Home, tab: 'landing' as const },
    { id: 'dashboard', label: 'Launch Dashboard Analytics', desc: 'Check design scores, debt levels, and audit logs', icon: LayoutDashboard, tab: 'dashboard' as const },
    { id: 'design-system', label: 'Explore Design System Lab', desc: 'Browse, interact with, and copy 32+ custom UI components', icon: Sliders, tab: 'design-system' as const },
    { id: 'review', label: 'Launch Design Workspace', desc: 'Upload mockups and evaluate Fitts\'s Law & contrast compliance', icon: Sparkles, tab: 'review' as const },
    { id: 'reference', label: 'Access Design Library & Laws', desc: 'Read heuristics including Hick\'s, Miller\'s, and Fitts\'s Laws', icon: Compass, tab: 'reference' as const },
    { id: 'settings', label: 'Modify System Settings', desc: 'API secret credentials configuration, team members, and billing', icon: Settings, tab: 'settings' as const },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.desc.toLowerCase().includes(search.toLowerCase())
  );

  // Keyboard navigation and ESC listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div id="command-palette-overlay" className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      {/* Background overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs"
      />

      {/* Main palette wrapper */}
      <motion.div 
        initial={{ opacity: 0, y: -15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -15, scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-white border border-subtle w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col min-h-[360px]"
      >
        {/* Search Input block */}
        <div className="p-4 border-b border-gray-50 flex items-center gap-3 shrink-0 h-14">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Search commands, views, or system layouts..."
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-xs text-black font-semibold focus:outline-none placeholder-gray-400"
          />
          <button 
            onClick={onClose}
            className="text-[10px] text-gray-450 text-gray-400 border border-subtle rounded-lg px-2 py-0.5 font-bold shadow-sm"
          >
            ESC
          </button>
        </div>

        {/* Results layout */}
        <div className="flex-1 p-2 overflow-y-auto space-y-1">
          <span className="px-3 text-[9px] font-extrabold tracking-wider text-gray-400 uppercase block my-2">
            System Commands & Navigation
          </span>

          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={() => {
                    onNavigate(cmd.tab);
                    onClose();
                  }}
                  className="w-full flex items-center gap-3.5 p-3 rounded-2xl hover:bg-gray-50 text-left transition-all cursor-pointer group"
                >
                  <div className="p-2.5 rounded-xl bg-gray-50 text-gray-500 group-hover:bg-[#6C63FF]/10 group-hover:text-[#6C63FF] transition-all shrink-0">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-bold text-black block leading-tight">{cmd.label}</span>
                    <span className="text-[10px] text-gray-450 text-gray-400 font-semibold truncate block mt-0.5">{cmd.desc}</span>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity pr-2 shrink-0 flex items-center gap-1.5">
                    <span className="text-[9px] text-[#6C63FF] font-bold uppercase tracking-wide">Execute</span>
                    <CornerDownLeft className="w-3 h-3 text-[#6C63FF]" />
                  </div>
                </button>
              );
            })
          ) : (
            <div className="p-8 text-center text-gray-400 font-semibold flex flex-col items-center justify-center space-y-2">
              <span className="text-sm">No corresponding commands found.</span>
              <span className="text-[10px] text-gray-400">Try typing "Lab", "Dashboard", or "Settings"</span>
            </div>
          )}
        </div>

        {/* Hotkeys footer */}
        <div className="p-3 bg-gray-50 border-t border-subtle shrink-0 h-11 flex items-center justify-between text-[10px] text-gray-400 font-semibold">
          <div className="flex items-center gap-1">
            <span>Use</span>
            <span className="px-1.5 py-0.5 bg-white border border-subtle rounded-md font-mono font-bold shadow-sm text-[8px] text-black">↑↓</span>
            <span>to navigate, and</span>
            <span className="px-1.5 py-0.5 bg-white border border-subtle rounded-md font-mono font-bold shadow-sm text-[8px] text-black">Enter</span>
            <span>to execute.</span>
          </div>
          <span>Review.AI Commands</span>
        </div>
      </motion.div>
    </div>
  );
}
