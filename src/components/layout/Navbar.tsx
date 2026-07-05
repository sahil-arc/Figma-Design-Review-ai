import React, { useState } from 'react';
import { 
  Layers, ChevronDown, Bell, LogOut, CheckCircle, Search, 
  HelpCircle, Sparkles, Inbox, RefreshCw, User, Settings, CreditCard 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentWorkspace: string;
  onWorkspaceChange: (workspace: string) => void;
  userEmail?: string;
  onOpenSearch: () => void;
  onLogout: () => void;
}

export function Navbar({ currentWorkspace, onWorkspaceChange, userEmail = 'me.sahilkumarverma@gmail.com', onOpenSearch, onLogout }: NavbarProps) {
  const workspaces = ['Acme Corp Design', 'Personal Projects', 'FinTech Mobile App', 'Design System Library'];
  const [showWorkspaceDropdown, setShowWorkspaceDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Mock Notifications
  const [notifications, setNotifications] = useState([
    { id: 'n1', text: 'Low-contrast barrier flagged in Acme Pro checkout', read: false, time: '2h ago', category: 'accessibility' },
    { id: 'n2', text: 'Fitts\'s Law test successfully completed on marketing header', read: false, time: '1d ago', category: 'ux' },
    { id: 'n3', text: 'New design system tokens uploaded by Jane Doe', read: true, time: '2d ago', category: 'tokens' },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClearNotify = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <header 
      id="top-navbar" 
      className="h-16 border-b border-subtle bg-white/80 backdrop-blur-md px-6 md:px-8 flex items-center justify-between sticky top-0 z-30 shrink-0"
    >
      {/* LEFT: Workspace Selector */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => {
              setShowWorkspaceDropdown(!showWorkspaceDropdown);
              setShowNotificationDropdown(false);
              setShowProfileDropdown(false);
            }}
            className="flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-500 hover:text-black transition-colors px-3 py-1.5 rounded-full hover:bg-gray-50 cursor-pointer"
          >
            <Layers className="w-4 h-4 text-gray-400" />
            <span className="max-w-[120px] md:max-w-none truncate">{currentWorkspace}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          <AnimatePresence>
            {showWorkspaceDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowWorkspaceDropdown(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute left-0 mt-2 w-56 bg-white border border-subtle rounded-2xl shadow-xl py-2 z-50 overflow-hidden"
                >
                  <div className="px-4 py-1.5 text-[9px] font-extrabold tracking-wider text-gray-400 uppercase">
                    Active Workspaces
                  </div>
                  <div className="p-1 space-y-0.5">
                    {workspaces.map((ws) => (
                      <button
                        key={ws}
                        onClick={() => {
                          onWorkspaceChange(ws);
                          setShowWorkspaceDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between rounded-xl transition-all cursor-pointer ${
                          ws === currentWorkspace ? 'text-[#6C63FF] font-bold bg-gray-50' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <span>{ws}</span>
                        {ws === currentWorkspace && <CheckCircle className="w-3.5 h-3.5 text-[#6C63FF]" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* CENTER: Floating search mock hotkey bar */}
      <div className="flex-1 max-w-md mx-6 hidden md:block">
        <button 
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-2 border border-subtle bg-gray-50 hover:bg-gray-100 hover:border-black/20 text-gray-400 rounded-2xl transition-all cursor-pointer text-xs"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <span>Search workspace, templates, heuristics...</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[10px] font-bold text-gray-400 bg-white border border-subtle px-1.5 py-0.5 rounded-lg shadow-sm shrink-0">
            <span>⌘</span>
            <span>K</span>
          </div>
        </button>
      </div>

      {/* RIGHT: Notifications & Profile controls */}
      <div className="flex items-center gap-3">
        
        {/* Mobile Search button */}
        <button 
          onClick={onOpenSearch}
          className="p-2 text-gray-400 hover:text-black hover:bg-gray-50 rounded-xl transition-all md:hidden cursor-pointer"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notifications Icon with active badge indicator */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotificationDropdown(!showNotificationDropdown);
              setShowWorkspaceDropdown(false);
              setShowProfileDropdown(false);
            }}
            className="p-2 text-gray-400 hover:text-black hover:bg-gray-50 rounded-xl transition-all cursor-pointer relative"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full border border-white animate-pulse" />
            )}
          </button>

          <AnimatePresence>
            {showNotificationDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotificationDropdown(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute right-0 mt-2 w-80 bg-white border border-subtle rounded-3xl shadow-xl z-50 overflow-hidden"
                >
                  <div className="px-4 py-3 bg-gray-50 border-b border-subtle flex items-center justify-between">
                    <span className="text-xs font-bold text-black">Workspace Notifications</span>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-[10px] text-[#6C63FF] hover:underline font-bold"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((n) => (
                        <div 
                          key={n.id} 
                          className={`p-3.5 text-xs flex items-start gap-2.5 transition-all relative group ${
                            !n.read ? 'bg-[#6C63FF]/5' : 'bg-white'
                          }`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${
                            n.category === 'accessibility' ? 'bg-rose-500' :
                            n.category === 'ux' ? 'bg-amber-400' : 'bg-[#6C63FF]'
                          }`} />
                          <div className="flex-1 min-w-0 pr-4">
                            <p className="text-gray-700 font-medium leading-normal pr-1">{n.text}</p>
                            <span className="text-[10px] text-gray-400 font-semibold mt-1 block">{n.time}</span>
                          </div>
                          <button 
                            onClick={() => handleClearNotify(n.id)}
                            className="absolute top-2 right-2 text-gray-300 hover:text-black opacity-0 group-hover:opacity-100 transition-all text-[9px] font-bold cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-gray-400 font-semibold">
                        <Inbox className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <span>All caught up.</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* User Account with rich Dropdown */}
        <div className="relative pl-3 border-l border-subtle flex items-center gap-2">
          <button
            onClick={() => {
              setShowProfileDropdown(!showProfileDropdown);
              setShowWorkspaceDropdown(false);
              setShowNotificationDropdown(false);
            }}
            className="flex items-center gap-2 hover:bg-gray-50 p-1.5 rounded-full transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white border border-gray-100 flex items-center justify-center text-xs font-bold uppercase relative overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#6C63FF]/20 to-[#A855F7]/20" />
              <span>SV</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          <AnimatePresence>
            {showProfileDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowProfileDropdown(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-white border border-subtle rounded-2xl shadow-xl py-1.5 z-50 overflow-hidden text-xs"
                >
                  {/* Summary card */}
                  <div className="px-3.5 py-3 border-b border-gray-50">
                    <span className="font-bold text-black block leading-tight">Sahil Verma</span>
                    <span className="text-[10px] text-gray-400 font-semibold truncate block mt-0.5">{userEmail}</span>
                  </div>

                  <div className="p-1 space-y-0.5 font-semibold">
                    <button 
                      onClick={() => { setShowProfileDropdown(false); }}
                      className="w-full text-left px-3 py-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-xl transition-colors flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-gray-400" />
                      <span>My Profile</span>
                    </button>
                    <button 
                      onClick={() => { setShowProfileDropdown(false); }}
                      className="w-full text-left px-3 py-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-xl transition-colors flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4 text-gray-400" />
                      <span>Workspace Setup</span>
                    </button>
                    <button 
                      onClick={() => { setShowProfileDropdown(false); }}
                      className="w-full text-left px-3 py-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-xl transition-colors flex items-center gap-2"
                    >
                      <CreditCard className="w-4 h-4 text-gray-400" />
                      <span>Billing & Plans</span>
                    </button>
                    
                    <div className="border-t border-gray-50 my-1" />

                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  );
}
