import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, ShieldAlert, CheckCircle, AlertTriangle, Info, Bell, Trash2, 
  ChevronRight, Copy, Check, Star, Plus, Minus, Search, Code, LayoutGrid, 
  Type, Layers, Sliders, AlertCircle, RefreshCw, ChevronDown, Inbox
} from 'lucide-react';

type DSLabCategory = 'tokens' | 'forms' | 'feedback' | 'structures';

export function DesignSystemLab() {
  const [activeCategory, setActiveCategory] = useState<DSLabCategory>('tokens');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // States for interactive components
  const [activeSwitch, setActiveSwitch] = useState(false);
  const [checkedItems, setCheckedItems] = useState({ item1: true, item2: false });
  const [activeRadio, setActiveRadio] = useState('option-a');
  const [inputText, setInputText] = useState('');
  const [selectedDropdown, setSelectedDropdown] = useState('Standard Option');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTabDemo, setActiveTabDemo] = useState('spec');
  const [stepperVal, setStepperVal] = useState(2);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [toasts, setToasts] = useState<{id: string, text: string, type: 'success' | 'info' | 'error'}[]>([]);

  // Sorting state for mock table
  const [tableSort, setTableSort] = useState<'name' | 'debt'>('name');
  const [tableSearch, setTableSearch] = useState('');
  const [tablePage, setTablePage] = useState(1);

  const triggerCopy = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedToken(val);
    setTimeout(() => setCopiedToken(null), 1500);
  };

  const triggerToast = (text: string, type: 'success' | 'info' | 'error') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // Mock datasets
  const colorsList = [
    { name: 'Primary Purple', hex: '#6C63FF', bgClass: 'bg-[#6C63FF]', desc: 'Core branding elements, primary CTAs, main action highlights.' },
    { name: 'Secondary Violet', hex: '#7C5CFF', bgClass: 'bg-[#7C5CFF]', desc: 'Secondary active indicators, focus boundaries, complementary widgets.' },
    { name: 'Accent Fuchsia', hex: '#A855F7', bgClass: 'bg-[#A855F7]', desc: 'AI suggestions, highlights, promotional gradients, special features.' },
    { name: 'Success Emerald', hex: '#16A34A', bgClass: 'bg-[#16A34A]', desc: 'Accessible warnings passed, success metrics, positive status indications.' },
    { name: 'Warning Amber', hex: '#F59E0B', bgClass: 'bg-[#F59E0B]', desc: 'Low-contrast warnings, moderate heuristic score alerts.' },
    { name: 'Danger Rose', hex: '#EF4444', bgClass: 'bg-[#EF4444]', desc: 'Severe accessibility barriers, critical structural design errors.' },
    { name: 'Background Tint', hex: '#FAFAFB', bgClass: 'bg-[#FAFAFB]', border: true, desc: 'Primary light body canvas. Soft off-white to eliminate glare.' },
    { name: 'Card White', hex: '#FFFFFF', bgClass: 'bg-[#FFFFFF]', border: true, desc: 'Base surface containers. Supports shadow-soft styling rules.' },
  ];

  const spacingScales = [
    { token: 'space-1', value: '4px', sizeClass: 'w-1 h-4' },
    { token: 'space-2', value: '8px', sizeClass: 'w-2 h-4' },
    { token: 'space-3', value: '12px', sizeClass: 'w-3 h-4' },
    { token: 'space-4', value: '16px', sizeClass: 'w-4 h-4' },
    { token: 'space-6', value: '24px', sizeClass: 'w-6 h-4' },
    { token: 'space-8', value: '32px', sizeClass: 'w-8 h-4' },
    { token: 'space-12', value: '48px', sizeClass: 'w-12 h-4' },
  ];

  const tableData = [
    { id: 1, name: 'Main Hero Frame', score: 64, type: 'Mobile Page', debt: 'High Debt', author: 'Jane Doe' },
    { id: 2, name: 'Billing Checkout Portal', score: 78, type: 'Desktop Dashboard', debt: 'Medium Debt', author: 'Sahil Verma' },
    { id: 3, name: 'Marketing Splash Page', score: 92, type: 'Desktop Web', debt: 'Low Debt', author: 'Jane Doe' },
    { id: 4, name: 'Settings Token Editor', score: 85, type: 'Desktop Admin', debt: 'Low Debt', author: 'Sahil Verma' },
  ];

  // Simple sorting & filter on mock table
  const sortedTableData = [...tableData]
    .filter(row => row.name.toLowerCase().includes(tableSearch.toLowerCase()))
    .sort((a, b) => {
      if (tableSort === 'name') return a.name.localeCompare(b.name);
      return a.debt.localeCompare(b.debt);
    });

  return (
    <div id="design-system-lab-root" className="space-y-8 pb-16">
      {/* Dynamic Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-subtle pb-6">
        <div>
          <h2 className="text-xl font-bold text-black tracking-tight flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#6C63FF]" />
            <span>Design System Lab</span>
          </h2>
          <p className="text-xs text-gray-400 font-medium">
            Strict Satoshi-compliant component workbench with interactive presets and copyable utility tokens.
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-gray-50 border border-subtle p-0.5 rounded-full shadow-soft max-w-sm">
          {(['tokens', 'forms', 'feedback', 'structures'] as DSLabCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-[11px] font-bold rounded-full uppercase tracking-wider transition-all ${
                activeCategory === cat 
                  ? 'bg-black text-white shadow-soft' 
                  : 'text-gray-400 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Categories Content Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 gap-8"
        >

          {/* ================= CATEGORY 1: TOKENS ================= */}
          {activeCategory === 'tokens' && (
            <div className="space-y-8">
              {/* Grid 1: Colors & Radii */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Colors section */}
                <div className="bg-white border border-subtle rounded-3xl p-6 shadow-soft space-y-4">
                  <span className="text-[10px] font-bold text-[#6C63FF] uppercase tracking-widest block">Color Palette Matrix</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {colorsList.map((c) => (
                      <div 
                        key={c.hex} 
                        onClick={() => triggerCopy(c.hex)}
                        className="group flex items-center gap-3 p-2.5 rounded-2xl border border-subtle hover:border-black/20 hover:bg-gray-50/50 cursor-pointer transition-all"
                      >
                        <div className={`w-10 h-10 rounded-xl ${c.bgClass} shrink-0 shadow-sm ${c.border ? 'border border-gray-250/20' : ''}`} />
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-black block leading-tight truncate">{c.name}</span>
                          <span className="text-[10px] font-mono text-gray-400 font-semibold uppercase">{c.hex}</span>
                        </div>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                          {copiedToken === c.hex ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3 h-3 text-gray-400" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Typography scale */}
                <div className="bg-white border border-subtle rounded-3xl p-6 shadow-soft space-y-4">
                  <span className="text-[10px] font-bold text-[#6C63FF] uppercase tracking-widest block">Satoshi Typographic Hierarchy</span>
                  <div className="space-y-4 divide-y divide-gray-50">
                    <div className="pt-0">
                      <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider mb-1">Display Hero - 32px / Bold / Tracking tight</span>
                      <h1 className="text-2xl font-bold tracking-tight text-black">Aesthetic Spacing System</h1>
                    </div>
                    <div className="pt-3">
                      <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider mb-1">Secondary Heading - 18px / SemiBold</span>
                      <h3 className="text-sm font-bold text-black tracking-tight">Executive Summary Report</h3>
                    </div>
                    <div className="pt-3">
                      <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider mb-1">Paragraph Copy - 13px / Normal</span>
                      <p className="text-xs text-gray-500 leading-relaxed font-medium">
                        Our algorithm measures visual micro-interactions and touch targets automatically to avoid friction events.
                      </p>
                    </div>
                    <div className="pt-3">
                      <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider mb-1">Mono Metadata - 11px / JetBrains Mono</span>
                      <p className="font-mono text-[11px] text-gray-400">
                        HASH: f9a1_cf3b_wcag_passed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid 2: Spacing & Elevation / Borders */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Spacing widget */}
                <div className="bg-white border border-subtle rounded-3xl p-6 shadow-soft space-y-4">
                  <span className="text-[10px] font-bold text-[#6C63FF] uppercase tracking-widest block">Spacing Tokens (8pt Layout Rules)</span>
                  <div className="space-y-3">
                    {spacingScales.map((sp) => (
                      <div key={sp.token} className="flex items-center gap-3">
                        <span className="w-16 text-xs font-mono font-bold text-gray-400 text-left">{sp.token}</span>
                        <div className="flex-1 bg-gray-50 border border-subtle h-6 rounded-lg overflow-hidden flex items-center px-1">
                          <div className={`bg-[#6C63FF]/30 border border-[#6C63FF]/50 rounded ${sp.sizeClass}`} />
                        </div>
                        <span className="w-12 text-xs font-semibold text-black text-right">{sp.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Elevation & Border Radius showcase */}
                <div className="bg-white border border-subtle rounded-3xl p-6 shadow-soft space-y-4">
                  <span className="text-[10px] font-bold text-[#6C63FF] uppercase tracking-widest block">Elevation & Border Radius Tokens</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-subtle p-4 rounded-xl shadow-sm text-center space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">rounded-xl / shadow-sm</span>
                      <p className="text-xs text-black font-semibold">Standard Card Element</p>
                    </div>
                    <div className="bg-white border border-subtle p-4 rounded-2xl shadow-md text-center space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">rounded-2xl / shadow-md</span>
                      <p className="text-xs text-black font-semibold">Medium Dialog Frame</p>
                    </div>
                    <div className="bg-white border border-subtle p-4 rounded-3xl shadow-soft text-center space-y-1 col-span-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">rounded-3xl / shadow-soft</span>
                      <p className="text-xs text-black font-semibold">High-Fidelity Workspace Containment Panel</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= CATEGORY 2: FORMS ================= */}
          {activeCategory === 'forms' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Inputs, Swatches, buttons */}
              <div className="bg-white border border-subtle rounded-3xl p-6 shadow-soft space-y-6">
                <div>
                  <span className="text-[10px] font-bold text-[#6C63FF] uppercase tracking-widest block">Interactive Action Handles</span>
                  <h3 className="text-sm font-bold text-black tracking-tight mt-1">Buttons & Fields States</h3>
                </div>

                {/* Buttons matrix */}
                <div className="space-y-3">
                  <span className="text-[9px] text-gray-400 font-bold uppercase block tracking-wider">Button Variations</span>
                  <div className="flex flex-wrap gap-2.5">
                    <button className="px-4 py-2 bg-[#6C63FF] hover:bg-[#7C5CFF] text-white rounded-full text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Primary CTA</span>
                    </button>
                    <button className="px-4 py-2 bg-white border border-subtle hover:border-black text-black rounded-full text-xs font-semibold transition-all shadow-soft">
                      Outline Handle
                    </button>
                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs font-semibold transition-all">
                      Secondary Light
                    </button>
                    <button className="px-3 py-2 text-[#6C63FF] hover:text-[#7C5CFF] rounded-full text-xs font-semibold transition-all flex items-center gap-1">
                      <span>Quiet Text</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Loading state buttons */}
                <div className="space-y-3">
                  <span className="text-[9px] text-gray-400 font-bold uppercase block tracking-wider">Interactive Trigger state</span>
                  <div className="flex flex-wrap gap-2.5">
                    <button className="px-4 py-2 bg-black text-white rounded-full text-xs font-semibold flex items-center gap-2 opacity-80 cursor-wait">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Updating Schema...</span>
                    </button>
                    <button className="p-2 bg-gray-50 border border-subtle hover:border-rose-400 hover:text-rose-500 rounded-xl transition-all shadow-soft" title="Delete record">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-gray-50 border border-subtle hover:border-[#6C63FF] hover:text-[#6C63FF] rounded-xl transition-all shadow-soft" title="Add record">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-3">
                  <span className="text-[9px] text-gray-400 font-bold uppercase block tracking-wider">Input Field States</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase block">Standard Input</label>
                      <input 
                        type="text" 
                        placeholder="Type anything..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 border border-subtle rounded-2xl bg-gray-50/50 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase block">Active Search Icon</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                          type="text" 
                          placeholder="Search workspace..."
                          disabled
                          className="w-full text-xs pl-9 pr-3 py-2.5 border border-subtle rounded-2xl bg-gray-100 cursor-not-allowed opacity-70"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Switches, Checkbox, Radio, Dropdown, Stepper */}
              <div className="bg-white border border-subtle rounded-3xl p-6 shadow-soft space-y-6">
                <div>
                  <span className="text-[10px] font-bold text-[#7C5CFF] uppercase tracking-widest block">Boolean Selectors</span>
                  <h3 className="text-sm font-bold text-black tracking-tight mt-1">Multi-state Toggles</h3>
                </div>

                {/* Switches and Steppers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Switch */}
                  <div className="space-y-2">
                    <span className="text-[9px] text-gray-400 font-bold uppercase block">Toggle Switch</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setActiveSwitch(!activeSwitch)}
                        className={`w-11 h-6 rounded-full transition-all relative ${
                          activeSwitch ? 'bg-[#6C63FF]' : 'bg-gray-200'
                        }`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${
                          activeSwitch ? 'right-1' : 'left-1'
                        }`} />
                      </button>
                      <span className="text-xs font-semibold text-black">
                        {activeSwitch ? 'Telemetry Active' : 'Offline Mode'}
                      </span>
                    </div>
                  </div>

                  {/* Stepper */}
                  <div className="space-y-2">
                    <span className="text-[9px] text-gray-400 font-bold uppercase block">Interactive Stepper</span>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setStepperVal(Math.max(1, stepperVal - 1))}
                        className="p-1.5 bg-gray-50 border border-subtle hover:bg-gray-100 rounded-xl transition-all"
                      >
                        <Minus className="w-3.5 h-3.5 text-gray-600" />
                      </button>
                      <span className="w-10 text-center text-xs font-bold text-black">{stepperVal} iterations</span>
                      <button 
                        onClick={() => setStepperVal(Math.min(10, stepperVal + 1))}
                        className="p-1.5 bg-gray-50 border border-subtle hover:bg-gray-100 rounded-xl transition-all"
                      >
                        <Plus className="w-3.5 h-3.5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Checkboxes and Radios */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Checkbox */}
                  <div className="space-y-2">
                    <span className="text-[9px] text-gray-400 font-bold uppercase block">Select Checkbox</span>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-medium text-black select-none cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={checkedItems.item1}
                          onChange={(e) => setCheckedItems({ ...checkedItems, item1: e.target.checked })}
                          className="rounded text-[#6C63FF] focus:ring-[#6C63FF]" 
                        />
                        <span>Check accessibility AA (4.5:1)</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs font-medium text-black select-none cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={checkedItems.item2}
                          onChange={(e) => setCheckedItems({ ...checkedItems, item2: e.target.checked })}
                          className="rounded text-[#6C63FF] focus:ring-[#6C63FF]" 
                        />
                        <span>Check layout grids spacing AA</span>
                      </label>
                    </div>
                  </div>

                  {/* Radio */}
                  <div className="space-y-2">
                    <span className="text-[9px] text-gray-400 font-bold uppercase block">Pick Radio Group</span>
                    <div className="space-y-2">
                      {['option-a', 'option-b'].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 text-xs font-medium text-black select-none cursor-pointer capitalize">
                          <input 
                            type="radio" 
                            name="demo-radio"
                            value={opt}
                            checked={activeRadio === opt}
                            onChange={() => setActiveRadio(opt)}
                            className="text-[#6C63FF] focus:ring-[#6C63FF]"
                          />
                          <span>{opt.replace('-', ' ')}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Custom dropdown list */}
                <div className="space-y-1.5 relative">
                  <span className="text-[9px] text-gray-400 font-bold uppercase block">Interactive Custom Dropdown</span>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 border border-subtle bg-gray-50/50 rounded-2xl text-xs font-semibold text-black hover:bg-gray-100/50 transition-all"
                  >
                    <span>{selectedDropdown}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute z-20 top-full left-0 right-0 mt-1.5 bg-white border border-subtle rounded-2xl shadow-xl p-1.5 space-y-1"
                      >
                        {['Standard Option', 'Expert Analysis Model', 'Lightweight Check'].map((itm) => (
                          <button
                            key={itm}
                            onClick={() => {
                              setSelectedDropdown(itm);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-xs rounded-xl font-medium transition-all ${
                              selectedDropdown === itm ? 'bg-gray-100 font-semibold text-[#6C63FF]' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {itm}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}

          {/* ================= CATEGORY 3: FEEDBACK ================= */}
          {activeCategory === 'feedback' && (
            <div className="space-y-8">
              {/* Toasts, Badges, Alert showcases */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Toasts and Alerts triggers */}
                <div className="bg-white border border-subtle rounded-3xl p-6 shadow-soft space-y-6">
                  <div>
                    <span className="text-[10px] font-bold text-[#A855F7] uppercase tracking-widest block">Runtime Notification State</span>
                    <h3 className="text-sm font-bold text-black tracking-tight mt-1">Toasts & Alert Blocks</h3>
                  </div>

                  {/* Toast triggers */}
                  <div className="space-y-2.5">
                    <span className="text-[9px] text-gray-400 font-bold uppercase block">Interactive Micro-Toasts Trigger</span>
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => triggerToast('Analysis complete: 84% score.', 'success')}
                        className="px-3.5 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-xs font-bold hover:bg-emerald-100 transition-all shadow-sm"
                      >
                        Success Toast
                      </button>
                      <button 
                        onClick={() => triggerToast('Awaiting image upload files.', 'info')}
                        className="px-3.5 py-2 bg-[#6C63FF]/10 text-[#6C63FF] border border-[#6C63FF]/20 rounded-full text-xs font-bold hover:bg-[#6C63FF]/20 transition-all shadow-sm"
                      >
                        Info Toast
                      </button>
                      <button 
                        onClick={() => triggerToast('Low contrast detected on button.', 'error')}
                        className="px-3.5 py-2 bg-rose-50 text-rose-700 border border-rose-100 rounded-full text-xs font-bold hover:bg-rose-100 transition-all shadow-sm"
                      >
                        Error Toast
                      </button>
                    </div>
                  </div>

                  {/* Alert Boxes showcase */}
                  <div className="space-y-3">
                    <span className="text-[9px] text-gray-400 font-bold uppercase block">Static Alert Banners</span>
                    <div className="space-y-2.5">
                      <div className="bg-amber-50 border border-amber-100 text-amber-800 p-3.5 rounded-2xl text-xs flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                        <div className="space-y-0.5">
                          <span className="font-bold">Missing WCAG Color Compliancy</span>
                          <p className="text-[11px] text-amber-700 font-medium">Several CTA background and foreground color pairings display contrast less than 4.5:1 ratio rules.</p>
                        </div>
                      </div>
                      <div className="bg-[#6C63FF]/5 border border-[#6C63FF]/10 text-black p-3.5 rounded-2xl text-xs flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 shrink-0 text-[#6C63FF] mt-0.5" />
                        <div className="space-y-0.5">
                          <span className="font-bold">AI Recommendation Available</span>
                          <p className="text-[11px] text-gray-500 font-medium">Generate structured JSON layouts and optimized token equivalents automatically with our compiler.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skeletons, Avatars, Badges, Progress Bars */}
                <div className="bg-white border border-subtle rounded-3xl p-6 shadow-soft space-y-6">
                  <div>
                    <span className="text-[10px] font-bold text-[#6C63FF] uppercase tracking-widest block">Structural Indicators</span>
                    <h3 className="text-sm font-bold text-black tracking-tight mt-1">Avatars, Badges & Progress Bars</h3>
                  </div>

                  {/* Avatars & Badges */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="text-[9px] text-gray-400 font-bold uppercase block">Design Avatars Group</span>
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-black border-2 border-white text-white font-bold text-[10px] flex items-center justify-center shadow-md">SV</div>
                        <div className="w-8 h-8 rounded-full bg-[#6C63FF] border-2 border-white text-white font-bold text-[10px] flex items-center justify-center shadow-md">JD</div>
                        <div className="w-8 h-8 rounded-full bg-slate-400 border-2 border-white text-white font-bold text-[10px] flex items-center justify-center shadow-md">+3</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[9px] text-gray-400 font-bold uppercase block">Badges Matrix</span>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 rounded-full bg-rose-50 border border-rose-100 text-[9px] font-bold text-rose-600 uppercase tracking-tight">Critical</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-[9px] font-bold text-emerald-600 uppercase tracking-tight">Passed</span>
                        <span className="px-2 py-0.5 rounded-full bg-gray-100 border border-subtle text-[9px] font-bold text-gray-600 uppercase tracking-tight">Draft</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Indicators */}
                  <div className="space-y-3">
                    <span className="text-[9px] text-gray-400 font-bold uppercase block">Layout Progress metrics</span>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500">
                          <span>Accessibility Score Target</span>
                          <span className="font-bold text-black">84%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-[#6C63FF] h-full rounded-full" style={{ width: '84%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Loading Skeletons */}
                  <div className="space-y-2.5 pt-1">
                    <span className="text-[9px] text-gray-400 font-bold uppercase block">Async Skeleton Skeletons</span>
                    <div className="border border-subtle p-3 rounded-2xl space-y-2 bg-gray-50/50 animate-pulse">
                      <div className="h-3 w-1/3 bg-gray-200 rounded-full" />
                      <div className="h-2 w-3/4 bg-gray-200 rounded-full" />
                      <div className="h-2 w-1/2 bg-gray-200 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Toast Render Overlay relative container */}
              {toasts.length > 0 && (
                <div className="fixed bottom-4 right-4 z-50 space-y-2">
                  <AnimatePresence>
                    {toasts.map((t) => (
                      <motion.div
                        key={t.id}
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className={`p-3.5 rounded-2xl shadow-xl border text-xs font-semibold flex items-center gap-2.5 min-w-[280px] bg-white ${
                          t.type === 'success' ? 'border-emerald-100 text-emerald-800' :
                          t.type === 'error' ? 'border-rose-100 text-rose-700' : 'border-[#6C63FF]/20 text-black'
                        }`}
                      >
                        {t.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                        {t.type === 'error' && <ShieldAlert className="w-4 h-4 text-rose-600" />}
                        {t.type === 'info' && <Info className="w-4 h-4 text-[#6C63FF]" />}
                        <span>{t.text}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          )}

          {/* ================= CATEGORY 4: STRUCTURES ================= */}
          {activeCategory === 'structures' && (
            <div className="space-y-8">
              {/* Responsive Table, Tabs, Dialog triggers */}
              <div className="bg-white border border-subtle rounded-3xl p-6 shadow-soft space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#6C63FF] uppercase tracking-widest block">Structural components</span>
                    <h3 className="text-sm font-bold text-black tracking-tight mt-1">SaaS Table, Sorting, & Filter Rows</h3>
                  </div>
                  {/* Floating search within the documentation table */}
                  <div className="relative max-w-xs w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Filter test items..."
                      value={tableSearch}
                      onChange={(e) => setTableSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-subtle rounded-2xl text-xs bg-gray-50 focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                {/* Sorting Actions */}
                <div className="flex items-center gap-1.5 border-b border-gray-50 pb-3 text-xs">
                  <span className="text-gray-400 font-semibold uppercase text-[9px] tracking-wider mr-2">Sort Criteria:</span>
                  <button 
                    onClick={() => setTableSort('name')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${tableSort === 'name' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    Name
                  </button>
                  <button 
                    onClick={() => setTableSort('debt')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${tableSort === 'debt' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    Design Debt Level
                  </button>
                </div>

                {/* Table containment */}
                <div className="overflow-x-auto border border-subtle rounded-2xl">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50 border-b border-subtle font-bold text-gray-400 uppercase tracking-wider text-[9px]">
                        <th className="p-3">Audit Item Name</th>
                        <th className="p-3">Interactive Score</th>
                        <th className="p-3">Layout Type</th>
                        <th className="p-3">Design Debt</th>
                        <th className="p-3">Assigned Auditor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 font-medium">
                      {sortedTableData.length > 0 ? (
                        sortedTableData.map((row) => (
                          <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="p-3 font-bold text-black">{row.name}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                row.score >= 80 ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                              }`}>
                                {row.score}%
                              </span>
                            </td>
                            <td className="p-3 text-gray-500">{row.type}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-[9px] ${
                                row.debt === 'Low Debt' ? 'text-emerald-600 bg-emerald-50' : 
                                row.debt === 'Medium Debt' ? 'text-amber-600 bg-amber-50' : 'text-rose-600 bg-rose-50'
                              }`}>
                                {row.debt}
                              </span>
                            </td>
                            <td className="p-3 text-gray-600">{row.author}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-gray-400 font-semibold">
                            <Inbox className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                            <span>No corresponding elements found.</span>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Table Pagination */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-gray-400 font-semibold">Displaying 1-{sortedTableData.length} of {tableData.length} entries</span>
                  <div className="flex gap-1.5">
                    <button className="px-3 py-1.5 border border-subtle rounded-lg text-[10px] font-bold bg-gray-100 text-gray-400 cursor-not-allowed">
                      Prev
                    </button>
                    <button className="px-3 py-1.5 border border-subtle rounded-lg text-[10px] font-bold bg-white text-black hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>

              {/* Stepper, Timeline, Dialog Workspace */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Timeline and Stepper */}
                <div className="bg-white border border-subtle rounded-3xl p-6 shadow-soft space-y-6">
                  <div>
                    <span className="text-[10px] font-bold text-[#6C63FF] uppercase tracking-widest block">Event Sequences</span>
                    <h3 className="text-sm font-bold text-black tracking-tight mt-1">Steppers & Timelines</h3>
                  </div>

                  {/* Breadcrumbs */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] text-gray-400 font-bold uppercase block">Aesthetic Breadcrumbs</span>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold">
                      <span className="hover:text-black cursor-pointer">Workspaces</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                      <span className="hover:text-black cursor-pointer">Acme Corp</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                      <span className="text-black font-bold">Audit Details</span>
                    </div>
                  </div>

                  {/* Static Timeline */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[9px] text-gray-400 font-bold uppercase block">Progress Timeline</span>
                    <div className="space-y-4 pl-2 border-l-2 border-gray-100 text-xs">
                      <div className="relative pl-4">
                        <div className="absolute -left-[21px] top-0 w-2.5 h-2.5 rounded-full bg-[#6C63FF] border-2 border-white shadow-sm" />
                        <span className="text-[10px] text-gray-400 font-bold">Today, 10:00 AM</span>
                        <p className="font-bold text-black leading-tight mt-0.5">Scanned Acme SaaS Pro Checkout</p>
                        <p className="text-[11px] text-gray-500 leading-normal">Identified 3 high severity color contrast and layout rule issues.</p>
                      </div>
                      <div className="relative pl-4">
                        <div className="absolute -left-[21px] top-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
                        <span className="text-[10px] text-gray-400 font-bold">Yesterday</span>
                        <p className="font-bold text-black leading-tight mt-0.5">Workspace Schema Synchronized</p>
                        <p className="text-[11px] text-gray-500 leading-normal">Optimized typography pairing and spacing metrics successfully.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dialog Workspace and Accordions */}
                <div className="bg-white border border-subtle rounded-3xl p-6 shadow-soft space-y-6">
                  <div>
                    <span className="text-[10px] font-bold text-[#A855F7] uppercase tracking-widest block">Interactive Modals</span>
                    <h3 className="text-sm font-bold text-black tracking-tight mt-1">Dialogs & Popovers</h3>
                  </div>

                  {/* Dialog triggering button */}
                  <div className="space-y-3">
                    <span className="text-[9px] text-gray-400 font-bold uppercase block">Interactive Dialog workspace</span>
                    <button 
                      onClick={() => setIsDialogOpen(true)}
                      className="px-4 py-2.5 bg-black text-white text-xs font-semibold rounded-full hover:bg-zinc-800 transition-all flex items-center gap-1.5 shadow-soft"
                    >
                      <span>Trigger Audit Dialog</span>
                    </button>
                  </div>

                  {/* Accordion / Tab selectors preview */}
                  <div className="space-y-2">
                    <span className="text-[9px] text-gray-400 font-bold uppercase block">Interactive Segmented Accordion</span>
                    <div className="border border-subtle rounded-2xl overflow-hidden text-xs">
                      <div className="border-b border-subtle p-3 bg-gray-50 flex items-center justify-between font-bold text-black">
                        <span>How are WCAG scores calculated?</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="p-3 bg-white text-[11px] text-gray-500 leading-normal font-medium">
                        Our scanner measures pixel RGB components at coordinates. It validates the exact luminosity math of primary backgrounds and text strings to enforce 4.5:1 ratio boundaries.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </motion.div>
      </AnimatePresence>

      {/* Interactive Dialog Modal */}
      <AnimatePresence>
        {isDialogOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDialogOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-subtle max-w-md w-full rounded-3xl p-6 shadow-2xl relative z-10 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#6C63FF]/10 text-[#6C63FF] flex items-center justify-center text-xs font-bold">
                    i
                  </div>
                  <h4 className="text-sm font-bold text-black">Core Workspace Metadata</h4>
                </div>
                <button 
                  onClick={() => setIsDialogOpen(false)}
                  className="text-gray-400 hover:text-black font-bold text-xs"
                >
                  Close
                </button>
              </div>

              <div className="text-xs text-gray-500 leading-normal space-y-2 font-medium">
                <p>
                  You are previewing a high-performance design system component built on modern Web Components principles.
                </p>
                <div className="bg-gray-50 p-3 rounded-2xl border border-subtle space-y-1 text-[11px] font-semibold text-gray-650">
                  <div className="flex justify-between">
                    <span>Active Workspace:</span>
                    <span className="text-black font-bold">Acme Corp Design</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Audit Score Limit:</span>
                    <span className="text-black font-bold">80% Minimum Passed</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  onClick={() => setIsDialogOpen(false)}
                  className="px-3.5 py-2 border border-subtle rounded-full text-xs font-semibold text-black hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setIsDialogOpen(false);
                    triggerToast('Workspace properties updated.', 'success');
                  }}
                  className="px-4 py-2 bg-black text-white rounded-full text-xs font-semibold hover:bg-zinc-800 transition-all shadow-soft"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
