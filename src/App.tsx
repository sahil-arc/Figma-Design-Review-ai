import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Home, CreditCard, Users, HelpCircle, ShieldAlert, Key } from 'lucide-react';
import { NavigationTab, Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { LandingPage } from './components/common/LandingPage';
import { AnalyticsDashboard } from './components/dashboard/AnalyticsDashboard';
import { UploadPanel } from './components/review/UploadPanel';
import { ReviewResults } from './components/review/ReviewResults';
import { ReferenceLibrary } from './components/review/ReferenceLibrary';
import { ReviewReport } from './types';

// Standard demo reports to populate the history on start
const DEMO_REPORTS: ReviewReport[] = [
  {
    id: 'sample-landing',
    title: 'Acme SaaS Pro: Mobile Landing Page',
    platform: 'Mobile Web / iOS',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60',
    scores: {
      overall: { score: 64, why: "Visually polished, but violates crucial mobile design guidelines such as touch targets and typographic contrast." },
      ui: { score: 72, why: "Attractive minimal layout, but uses soft gray colors that make text hard to read on smaller screens." },
      ux: { score: 58, why: "Violates Hick's Law by throwing 8 different premium options immediately, causing extreme decision fatigue." },
      accessibility: { score: 48, why: "Severe WCAG 1.4.3 (Contrast) violations. Smallest CTA touches are only 28px, presenting a major barrier." },
      visual: { score: 80, why: "Excellent whitespace distribution, elegant geometric lines, and beautiful placeholder layout." },
      modernDesign: { score: 75, why: "Features Linear-style minimal dark-on-light grids, but misses responsive states." },
      trust: { score: 65, why: "Missing customer testimonials or trust Badges above the fold. Pricing details feel slightly obscure." },
      conversion: { score: 55, why: "Call to Action has low color priority, and fields are nested within complex interactions." },
      performance: { score: 85, why: "Light vector assets, but heavy initial JS bundle sizes predicted from the animation triggers." },
      developer: { score: 60, why: "Uses custom non-standard spacing units. High handoff complexity without documented tokens." },
      maintainability: { score: 70, why: "Good component separation, but inline typography rules will cause styling drift." }
    },
    executiveSummary: "Acme SaaS Pro features a modern, clean Vercel/Linear aesthetic with balanced grid segments and spacious layouts. However, a deep UX audit reveals significant accessibility barriers. The primary Call-to-Action (CTA) buttons feature low-contrast text (3.1:1 ratio) on soft pastel surfaces, which fails to meet the WCAG 2.1 AA requirement of 4.5:1. Mobile navigation buttons are scaled at 28px, violating Fitts's Law regarding touch targets, which causes frustration for users with varied motor abilities. Additionally, the hero interface displays excessive option noise, resulting in an high Hick's Law cognitive overload.",
    suggestions: [
      {
        id: 's1',
        issue: 'Sub-optimal Touch Target Size for Navigation Buttons',
        reason: 'The icon buttons on the primary header layout measure only 28px wide. This is extremely small for standard thumb presses, leading to accidental trigger events.',
        impact: 'High interactive friction, particularly for mobile or motor-impaired users.',
        severity: 'critical',
        heuristic: "Fitts's Law & WCAG 2.5.5 (44px target)",
        fix: 'Increase button container size to a minimum of 44x44px padding, while keeping the interior icon at 20px. Adjust Tailwind class to `p-3 min-w-[44px] min-h-[44px]`.',
        previewCode: '<button className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-gray-100">\n  <Menu className="w-5 h-5" />\n</button>',
        expectedImprovement: 'Accidental click rates will drop by up to 78%, and overall task success rate will rise.',
        priority: 'high',
        timeToFix: 5,
        difficulty: 'easy',
        category: 'accessibility'
      },
      {
        id: 's2',
        issue: 'Low Contrast on Primary Call-To-Action (CTA)',
        reason: 'The white text on a soft green background (#A3E635) has a contrast ratio of only 2.4:1. This is virtually invisible to users with mild visual impairments or in outdoor lighting.',
        impact: 'Massive conversion drop-offs. Users struggle to identify where to take the core platform action.',
        severity: 'critical',
        heuristic: 'WCAG 1.4.3 Contrast (Minimum 4.5:1)',
        fix: 'Replace the green button background with a deep charcoal shade (#09090B) with white text, or use high-contrast black text on the light green.',
        previewCode: '<button className="bg-zinc-900 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-zinc-800 transition-colors">\n  Get Started for Free\n</button>',
        expectedImprovement: 'Ensures 100% WCAG AA compliance and increases click-through conversions by up to 24%.',
        priority: 'high',
        timeToFix: 3,
        difficulty: 'easy',
        category: 'color'
      },
      {
        id: 's3',
        issue: 'Hick\'s Law Infraction: Feature Selection Overload',
        reason: 'The hero section offers 8 equal-weight links. This creates high choice density, increasing cognitive friction and decision latency.',
        impact: 'Users exit or freeze. Decision paralysis leads to page abandonment.',
        severity: 'high',
        heuristic: "Hick's Law",
        fix: 'Collapse secondary features into a single hoverable product dropdown, exposing only two prominent options: "Start Trial" (Primary) and "View Demo" (Secondary).',
        previewCode: '<div className="flex gap-3">\n  <Button variant="primary">Start Free Trial</Button>\n  <Button variant="outline">View Demo</Button>\n</div>',
        expectedImprovement: 'Reduces time-to-decision by 45% and directs 90% of traffic to the main onboarding funnel.',
        priority: 'high',
        timeToFix: 15,
        difficulty: 'medium',
        category: 'ux'
      }
    ],
    colorAnalysis: {
      palette: [
        { name: 'Primary Dark', originalHex: '#4B5563', optimizedHex: '#18181B', reason: 'Better visual hierarchy and AAA contrast compliance.', contrastWithBg: 12.5, accessible: true },
        { name: 'Accent Light', originalHex: '#A3E635', optimizedHex: '#047857', reason: 'Using charcoal text with this soft green makes it accessible, or darken to deep green if using white text.', contrastWithBg: 4.8, accessible: true },
        { name: 'Neutral Gray', originalHex: '#F3F4F6', optimizedHex: '#F4F4F5', reason: 'Slightly cooler neutral that blends seamlessly into minimalist Vercel-like design tokens.', contrastWithBg: 1.1, accessible: true }
      ],
      harmonies: [
        { type: 'Monochromatic Dark + Emerald', description: 'Maintains high contrast neutral backdrops with elegant jewel accents for interactive components.', colors: ['#18181B', '#27272A', '#047857', '#F4F4F5'] }
      ],
      contrastRatioFeedback: "Your current primary text color (#4B5563) on white features a 4.1:1 ratio, which narrowly misses the standard 4.5:1 limit. Darkening this to #18181B resolves this immediately.",
      generalSuggestions: "Use deep solid fills for clickable button states, and stick to monochromatic colors for secondary cards to focus customer eyes on key actions."
    },
    typographyAnalysis: {
      scaleConsistency: "Typography scale is highly uniform, but font sizing drops directly from 32px to 14px, missing a comfortable medium-weight sub-heading (18px or 20px).",
      lineHeightFeedback: "Body paragraph uses 14px font size with only 16px line height, leading to overlapping descenders. Increase line height to 20px (1.5x) to enhance readability.",
      readabilityFeedback: "Line-lengths are excellent. Paragraph containers are restricted to a maximum width of 65 characters.",
      pairingSuggestion: {
        headingFont: "Geist Sans or Space Grotesk",
        bodyFont: "Inter",
        vibe: "Modern Tech / High-Performance Developer SaaS",
        rationale: "Geist Sans brings a gorgeous geometric, tight letter-spaced appearance for headings, while Inter remains standard-bearer for legible body copy."
      }
    },
    components: [
      { name: 'Header Navigation', detected: true, score: 70, issues: ['Sub-optimal target bounds', 'Low border contrast'], suggestions: ['Increase heights to 44px', 'Add 1px border using zinc-200'] },
      { name: 'Form Inputs', detected: true, score: 55, issues: ['Missing focused outline state', 'No explicit error support label'], suggestions: ['Add ring-2 ring-zinc-500 on focus', 'Provide custom microcopy for validation error helper text'] }
    ],
    designSystem: {
      duplicateColorsDetected: ['#4B5563', '#4A5568'],
      unusedTypographyRules: ['h3 (24px - Unused across layout)'],
      namingConventionScore: 85,
      tokenConsistencyIssues: ['Spacing varies between 12px, 14px, and 16px instead of aligning on 4pt/8pt increments.'],
      variantsCountFeedback: "Button variants contain duplicate definition styles for outlines and subtle states. Combine into simple boolean parameters.",
      designDebtEstimate: "Medium - Estimated 2 days to align completely on Tailwind 8pt system rules."
    }
  },
  {
    id: 'sample-billing',
    title: 'Enterprise Billing Portal Form',
    platform: 'Desktop Dashboard Web',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
    scores: {
      overall: { score: 78, why: "Excellent alignment, but exhibits extremely high cognitive load due to multi-column input patterns." },
      ui: { score: 82, why: "Crisp form layouts, clear grids, and professional look-and-feel." },
      ux: { score: 65, why: "Multi-column layouts create reading confusion (Z-pattern disruption), and fields lack smart inline help indicators." },
      accessibility: { score: 80, why: "Good contrast ratios, but forms rely on placeholder text for instructions, failing WCAG accessibility guidelines." },
      visual: { score: 88, why: "Perfect alignment, neat spacing, Apple-style soft drop shadows." },
      modernDesign: { score: 85, why: "Clean layout, uses beautiful modern fonts and neutral slate backgrounds." },
      trust: { score: 78, why: "Secure symbols are included, but payment guarantee indicators are relegated to small print." },
      conversion: { score: 70, why: "Form completion friction points can be reduced by using smart autofills and country selectors." },
      performance: { score: 90, why: "Static inputs with zero external bundle costs. Light loading footprints." },
      developer: { score: 75, why: "Clear labels, standard inputs, but missing error-state documentation in specs." },
      maintainability: { score: 80, why: "Good layout reuse potential, but form state logic will be complex." }
    },
    executiveSummary: "The Enterprise Billing Portal Form demonstrates solid execution with neat, modular cards, uniform spacing, and high alignment fidelity. The primary opportunities lie in the cognitive experience. The layout breaks the traditional single-column reading pattern by stacking input fields into multiple adjacent columns, which forces the user's eye to travel horizontally (disrupting the standard vertical F-pattern reading flow) and increases form completion friction. Furthermore, placeholder text is used in lieu of persistent labels, which violates Miller's Law by forcing users to remember the field's purpose once they start typing.",
    suggestions: [
      {
        id: 'b1',
        issue: 'Multi-column Form Layout Disrupts F-Pattern Reading Flow',
        reason: 'Stacking fields side-by-side (e.g., First Name, Last Name, Email, Phone) forces visual zigzagging, which increases cognitive friction and completion errors.',
        impact: 'Slower form completion times and increased drop-off rates.',
        severity: 'high',
        heuristic: "Gestalt Reading Patterns & Vertical Alignment",
        fix: 'Structure the form into a single-column linear layout. Group only tightly related fields like expiry date and CVV onto the same line.',
        previewCode: '<div className="grid grid-cols-1 gap-4 max-w-md">\n  <Input label="Full Name" />\n  <Input label="Email Address" />\n</div>',
        expectedImprovement: 'Forms arranged vertically are completed up to 34% faster with fewer field omissions.',
        priority: 'medium',
        timeToFix: 15,
        difficulty: 'easy',
        category: 'ux'
      },
      {
        id: 'b2',
        issue: 'Missing Persistent Labels (Placeholder Reliance)',
        reason: 'Using placeholders inside input boxes to label fields causes users to lose context as soon as they focus and start typing, as the text disappears.',
        impact: 'High interactive cost, errors, and memory tax (violating Miller\'s Law).',
        severity: 'high',
        heuristic: 'WCAG 3.3.2 Labels or Instructions',
        fix: 'Render persistent labels above the input boxes, and reserve placeholders exclusively for sample data representation (e.g., "jane.doe@company.com").',
        previewCode: '<div className="flex flex-col gap-1.5">\n  <label className="text-sm font-medium text-zinc-700">Email Address</label>\n  <input type="email" placeholder="e.g. name@company.com" className="border p-2 rounded" />\n</div>',
        expectedImprovement: 'Ensures screen-reader compatibility and prevents memory-recall validation errors.',
        priority: 'high',
        timeToFix: 10,
        difficulty: 'easy',
        category: 'accessibility'
      }
    ],
    colorAnalysis: {
      palette: [
        { name: 'Primary Slate', originalHex: '#0F172A', optimizedHex: '#0F172A', reason: 'Perfect rich slate dark for premium UI context.', contrastWithBg: 15.1, accessible: true },
        { name: 'Border Gray', originalHex: '#E2E8F0', optimizedHex: '#E4E4E7', reason: 'Crisper border color that is compliant with visual grid parameters.', contrastWithBg: 1.5, accessible: true }
      ],
      harmonies: [
        { type: 'Corporate Monochromatic Slate', description: 'Clean, reliable, secure slate colors reflecting corporate accounting reliability and professional trust.', colors: ['#0F172A', '#334155', '#64748B', '#F8FAFC'] }
      ],
      contrastRatioFeedback: "Forms and text meet WCAG contrast regulations perfectly. Border lines can be thickened to 1.5px for increased readability under active focus.",
      generalSuggestions: "Add a success accent color (e.g., #10B981) for valid entries to provide immediate positive encouragement."
    },
    typographyAnalysis: {
      scaleConsistency: "Typography scales neatly from 24px headings to 14px labels. No redundant font sizes.",
      lineHeightFeedback: "Excellent tracking and line lengths. Easy to read.",
      readabilityFeedback: "Strong hierarchy helps visual scanning, but label text sizes could be emboldened (font-medium) to pop out from input values.",
      pairingSuggestion: {
        headingFont: "Inter",
        bodyFont: "Inter",
        vibe: "Corporate Precision / Clean Utility",
        rationale: "Using Inter for both headlines and copy establishes uniform corporate efficiency and maximum cross-device rendering predictability."
      }
    },
    components: [
      { name: 'Text Inputs', detected: true, score: 80, issues: ['Placeholder relies on label', 'No focus state outline'], suggestions: ['Add floating label script', 'Provide clear ring outline state'] },
      { name: 'Payment Method Buttons', detected: true, score: 85, issues: ['Subtle hover is laggy'], suggestions: ['Add 100ms spring motion parameters'] }
    ],
    designSystem: {
      duplicateColorsDetected: [],
      unusedTypographyRules: [],
      namingConventionScore: 92,
      tokenConsistencyIssues: [],
      variantsCountFeedback: "Clean styling components.",
      designDebtEstimate: "Low"
    }
  }
];

import { SplashAndOnboarding } from './components/common/SplashAndOnboarding';
import { AuthFlow } from './components/common/AuthFlow';
import { CommandPalette } from './components/common/CommandPalette';
import { DesignSystemLab } from './components/common/DesignSystemLab';

export default function App() {
  const [onboardingComplete, setOnboardingComplete] = useState<boolean>(() => {
    return localStorage.getItem('review_onboarding_completed') === 'true';
  });

  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem('review_user_email');
  });

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('review_sidebar_collapsed') === 'true';
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<NavigationTab>('landing');
  const [currentWorkspace, setCurrentWorkspace] = useState('Acme Corp Design');
  const [reports, setReports] = useState<ReviewReport[]>(DEMO_REPORTS);
  const [selectedReport, setSelectedReport] = useState<ReviewReport | null>(null);

  // Monitor keyboard Cmd+K or Ctrl+K triggers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('review_onboarding_completed', 'true');
    setOnboardingComplete(true);
  };

  const handleAuthSuccess = (email: string) => {
    localStorage.setItem('review_user_email', email);
    setUserEmail(email);
  };

  const handleLogout = () => {
    localStorage.removeItem('review_user_email');
    setUserEmail(null);
    setActiveTab('landing');
    setSelectedReport(null);
  };

  const handleCollapseChange = (collapsed: boolean) => {
    localStorage.setItem('review_sidebar_collapsed', String(collapsed));
    setIsSidebarCollapsed(collapsed);
  };

  const handleWorkspaceChange = (ws: string) => {
    setCurrentWorkspace(ws);
    setSelectedReport(null);
    if (activeTab === 'review') {
      setActiveTab('dashboard');
    }
  };

  const handleAnalysisComplete = (newReport: ReviewReport) => {
    setReports((prev) => [newReport, ...prev]);
    setSelectedReport(newReport);
    setActiveTab('review');
  };

  const handleSelectSample = (sampleId: string) => {
    const found = DEMO_REPORTS.find(r => r.id === sampleId);
    if (found) {
      setSelectedReport(found);
      setActiveTab('review');
    }
  };

  // 1. First Experience: Splash Screen and Onboarding Check
  if (!onboardingComplete) {
    return <SplashAndOnboarding onComplete={handleOnboardingComplete} />;
  }

  // 2. Second Experience: Authentication Flow
  if (!userEmail) {
    return <AuthFlow onSuccess={handleAuthSuccess} />;
  }

  return (
    <div id="application-root" className="min-h-screen bg-[#F9FAFB] text-[#111827] font-sans antialiased flex relative">
      {/* Collapsible and Hover-expanding Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab !== 'review') setSelectedReport(null);
        }} 
        hasActiveReport={!!selectedReport}
        isCollapsed={isSidebarCollapsed}
        onCollapseChange={handleCollapseChange}
      />

      {/* Main Dynamic Viewport */}
      <div className={`flex-1 min-w-0 flex flex-col min-h-screen transition-all duration-300 ${isSidebarCollapsed ? 'pl-16' : 'pl-[240px]'}`}>
        <Navbar 
          currentWorkspace={currentWorkspace} 
          onWorkspaceChange={handleWorkspaceChange} 
          userEmail={userEmail}
          onOpenSearch={() => setIsSearchOpen(true)}
          onLogout={handleLogout}
        />

        {/* Workspace Main Content View */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${selectedReport?.id || 'none'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {/* TAB: Landing */}
              {activeTab === 'landing' && (
                <LandingPage 
                  onEnterDashboard={() => setActiveTab('dashboard')} 
                  onEnterReview={() => setActiveTab('review')}
                />
              )}

              {/* TAB: Dashboard */}
              {activeTab === 'dashboard' && (
                <AnalyticsDashboard 
                  reports={reports} 
                  onSelectReport={(id) => {
                    const found = reports.find(r => r.id === id);
                    if (found) {
                      setSelectedReport(found);
                      setActiveTab('review');
                    }
                  }}
                  onNavigateToUpload={() => {
                    setSelectedReport(null);
                    setActiveTab('review');
                  }}
                />
              )}

              {/* TAB: Design System Component Lab */}
              {activeTab === 'design-system' && (
                <DesignSystemLab />
              )}

              {/* TAB: Review Workspace */}
              {activeTab === 'review' && (
                selectedReport ? (
                  <ReviewResults 
                    report={selectedReport} 
                    onBack={() => {
                      setSelectedReport(null);
                      setActiveTab('dashboard');
                    }}
                  />
                ) : (
                  <UploadPanel 
                    onAnalysisComplete={handleAnalysisComplete}
                    onSelectSample={handleSelectSample}
                  />
                )
              )}

              {/* TAB: Reference Library */}
              {activeTab === 'reference' && (
                <ReferenceLibrary />
              )}

              {/* TAB: Settings */}
              {activeTab === 'settings' && (
                <div id="settings-page" className="max-w-3xl space-y-8">
                  <div>
                    <h2 className="text-base font-bold text-zinc-900 tracking-tight">System Settings</h2>
                    <p className="text-xs text-zinc-500">Configure your workspace integrations, team workspace variables, and billing specifications.</p>
                  </div>

                  <div className="bg-white border border-zinc-150 p-5 rounded-2xl shadow-xs space-y-4">
                    <div className="flex items-center gap-2 text-zinc-800">
                      <Key className="w-4 h-4 text-zinc-500" />
                      <span className="text-xs font-bold">Secure API Credentials Setup</span>
                    </div>

                    <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                      DesignReview AI operates on a secure server-side infrastructure to protect user secrets. For standard execution, the **Gemini API Key** is injected automatically at runtime. 
                    </p>

                    <div className="bg-zinc-50 border border-zinc-200/60 p-4 rounded-xl space-y-2">
                      <span className="text-[10px] font-bold text-zinc-800 uppercase block">How to configure your secrets:</span>
                      <ol className="list-decimal pl-4 space-y-1.5 text-xs text-zinc-600 font-medium">
                        <li>Navigate to the **Settings &gt; Secrets** panel in the Google AI Studio UI.</li>
                        <li>Add your `GEMINI_API_KEY` token as a user secret.</li>
                        <li>The system automatically binds the secret server-side without exposing it to the client bundle.</li>
                      </ol>
                    </div>
                  </div>

                  <div className="bg-white border border-zinc-150 rounded-2xl overflow-hidden shadow-xs">
                    <div className="px-5 py-4 border-b border-zinc-100">
                      <span className="text-xs font-bold text-zinc-900">Workspace Members</span>
                    </div>
                    <div className="divide-y divide-zinc-100 text-xs font-medium">
                      <div className="px-5 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-zinc-900 text-white font-bold text-[10px] flex items-center justify-center">SV</div>
                          <div>
                            <span className="font-bold text-zinc-800 block leading-tight">Sahil Verma</span>
                            <span className="text-[10px] text-zinc-400">me.sahilkumarverma@gmail.com</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-zinc-500 font-bold bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">Owner</span>
                      </div>

                      <div className="px-5 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3 font-semibold">
                          <div className="w-7 h-7 rounded-full bg-zinc-400 text-white font-bold text-[10px] flex items-center justify-center">JD</div>
                          <div>
                            <span className="font-bold text-zinc-800 block leading-tight">Jane Doe</span>
                            <span className="text-[10px] text-zinc-400">jane.doe@company.com</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-zinc-500 font-bold bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">Product Manager</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-zinc-150 p-5 rounded-2xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Billing Profile</span>
                      <h3 className="text-sm font-bold text-zinc-900">Enterprise Starter Plan</h3>
                      <p className="text-xs text-zinc-500 leading-normal font-medium">Your next billing cycle triggers on August 4, 2026 for $0.00.</p>
                    </div>

                    <button
                      onClick={() => alert('Subscription modifications sandbox triggered successfully!')}
                      className="px-3.5 py-2 bg-zinc-900 text-white rounded-lg text-xs font-bold hover:bg-zinc-800 transition-colors shadow-sm uppercase shrink-0"
                    >
                      Manage Plan
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Global Interactive Command Palette Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <CommandPalette 
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onNavigate={(tab) => {
              setActiveTab(tab);
              setSelectedReport(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
