import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, FileText, Compass, Settings, Sparkles, Home, 
  CreditCard, Users, ShieldAlert, ChevronLeft, ChevronRight, Sliders, LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type NavigationTab = 'landing' | 'dashboard' | 'review' | 'reference' | 'design-system' | 'settings';

interface SidebarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  hasActiveReport: boolean;
  isCollapsed: boolean;
  onCollapseChange: (collapsed: boolean) => void;
}

export function Sidebar({ activeTab, onTabChange, hasActiveReport, isCollapsed, onCollapseChange }: SidebarProps) {
  const [isHovered, setIsHovered] = useState(false);

  // We expand if either the user explicitly toggled expanded OR they are hovering over the mini sidebar (Hover Expansion!)
  const isExpanded = !isCollapsed || isHovered;

  const primaryMenu = [
    { id: 'landing' as const, label: 'Overview', icon: Home },
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'review' as const, label: 'Design Workspace', icon: Sparkles, badge: hasActiveReport ? 'Report' : undefined },
    { id: 'design-system' as const, label: 'Design System Lab', icon: Sliders },
    { id: 'reference' as const, label: 'Design Library', icon: Compass },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  return (
    <motion.aside
      id="sidebar-navigation"
      onMouseEnter={() => isCollapsed && setIsHovered(true)}
      onMouseLeave={() => isCollapsed && setIsHovered(false)}
      animate={{ width: isExpanded ? 240 : 64 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 220, damping: 25 }}
      className="border-r border-subtle bg-white flex flex-col h-screen fixed left-0 top-0 z-40 overflow-hidden shadow-soft shrink-0"
    >
      {/* Brand Header */}
      <div className="px-4 py-5 flex items-center justify-between border-b border-gray-50 h-16 shrink-0">
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="brand-expanded"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center relative overflow-hidden shrink-0">
                <div className="w-4 h-4 bg-white rounded-full z-10 flex items-center justify-center">
                  <div className="w-2 h-2 bg-black rounded-full" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#6C63FF] to-[#A855F7] opacity-30" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-black tracking-tight text-black leading-tight">Review.AI</span>
                <span className="text-[9px] text-gray-400 font-extrabold uppercase">Intelligence</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="brand-collapsed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-8 h-8 bg-black rounded-xl flex items-center justify-center relative overflow-hidden mx-auto shrink-0"
            >
              <div className="w-4 h-4 bg-white rounded-full z-10 flex items-center justify-center">
                <div className="w-2 h-2 bg-black rounded-full" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#6C63FF] to-[#A855F7] opacity-30" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed Toggle Button */}
        {isExpanded && (
          <button
            onClick={() => onCollapseChange(!isCollapsed)}
            className="p-1 border border-subtle bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer text-gray-400 hover:text-black hidden md:block"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 flex flex-col space-y-6 p-3 overflow-y-auto overflow-x-hidden">
        <div>
          {isExpanded && (
            <span className="px-3 text-[9px] font-extrabold tracking-wider text-gray-400 uppercase block mb-3 animate-[fadeIn_0.2s]">
              Navigation
            </span>
          )}
          <nav className="space-y-1">
            {primaryMenu.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gray-50 text-[#6C63FF] border border-[#6C63FF]/15 shadow-sm'
                      : 'text-gray-500 hover:text-black hover:bg-gray-50'
                  }`}
                  title={!isExpanded ? item.label : undefined}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#6C63FF]' : 'text-gray-400'}`} />
                    <AnimatePresence mode="wait">
                      {isExpanded && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          className="truncate"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  {item.badge && isExpanded && (
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-extrabold tracking-tight uppercase leading-none shrink-0 ${
                      isActive ? 'bg-[#6C63FF] text-white' : 'bg-[#6C63FF]/10 text-[#6C63FF]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Dynamic Context Panel */}
        {hasActiveReport && activeTab !== 'review' && isExpanded && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100 mt-4 space-y-2"
          >
            <div className="flex items-center gap-1.5 text-rose-600">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span className="text-[9px] font-bold tracking-tight uppercase">Active Audit</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-normal">
              You have an active review ready for inspection.
            </p>
            <button
              onClick={() => onTabChange('review')}
              className="w-full py-2 bg-black hover:bg-zinc-800 text-white rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
            >
              Resume Workspace
            </button>
          </motion.div>
        )}

        {/* Static project status indicator as shown in Design aside layout */}
        {isExpanded && (
          <div className="mt-auto pt-4 border-t border-gray-50">
            <div className="p-3.5 bg-gray-50 border border-subtle rounded-2xl space-y-1.5">
              <h4 className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider">Project Quality Target</h4>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-gray-700">Audit Coverage</span>
                <span className="text-[11px] text-black font-extrabold">84%</span>
              </div>
              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-[#6C63FF] h-full w-[84%] rounded-full" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer System Version */}
      <div className="p-4 border-t border-gray-50 mt-auto shrink-0 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
          {isExpanded && (
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
              Review.AI Core v2.4
            </span>
          )}
        </div>
        {/* Toggle to expand again if collapsed */}
        {isCollapsed && !isExpanded && (
          <button
            onClick={() => onCollapseChange(false)}
            className="p-1 border border-subtle bg-gray-50 rounded-lg text-gray-400 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </motion.aside>
  );
}
