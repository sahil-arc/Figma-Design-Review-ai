import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Compass, HelpCircle, ArrowUpRight, Code, Figma, Laptop, CheckCircle, ChevronDown, Check } from 'lucide-react';

interface LandingPageProps {
  onEnterDashboard: () => void;
  onEnterReview: () => void;
}

export function LandingPage({ onEnterDashboard, onEnterReview }: LandingPageProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const features = [
    {
      icon: Figma,
      title: 'Full Figma API Integration',
      desc: 'Connect your design system or single frame directly using our Figma URL parser to read layout tokens, variables, and components instantly.'
    },
    {
      icon: Compass,
      title: 'Cognitive Psychology Audit',
      desc: 'Verify that your layouts comply with Fitts\'s Law, Hick\'s Law, Miller\'s Law, and Jakob\'s Law to reduce decision fatigue and user drop-offs.'
    },
    {
      icon: ShieldCheck,
      title: 'Multimodal Accessibility Check',
      desc: 'Examine WCAG 2.1 AA/AAA visual contrast parameters, font sizing thresholds, and hover indicators. Includes a real-time color blindness simulator.'
    },
    {
      icon: Code,
      title: 'Developer Handoff Tokens',
      desc: 'Export actionable suggestions directly as clean Tailwind CSS or design variable structures, minimizing engineering translation debt.'
    }
  ];

  const testimonials = [
    {
      name: 'Elena Rostova',
      role: 'Principal Product Designer, Stripe',
      quote: 'This platform changed how we run our internal critique. The cognitive laws validation saved us weeks of post-launch user validation.',
      avatar: 'ER'
    },
    {
      name: 'Marcus Vance',
      role: 'Accessibility Lead, Vercel',
      quote: 'The contrast ratios optimization Suggestions and color-blind simulators are incredibly accurate. An absolute must-have for standardizing our components.',
      avatar: 'MV'
    },
    {
      name: 'Sarah Kim',
      role: 'Senior Staff Researcher, Apple',
      quote: 'The educational explainers around Gestalt principles and Hick\'s law are exceptional. It doesn\'t just point out mistakes; it actively teaches our junior designers.',
      avatar: 'SK'
    }
  ];

  const faqs = [
    {
      q: "How does the AI analyze my designs?",
      a: "Our platform leverages Gemini's state-of-the-art multimodal vision model to inspect structural boundaries, colors, alignments, typographic density, and element proximity exactly like a human Design Critic would, comparing results against pre-programmed cognitive and regulatory design guidelines."
    },
    {
      q: "Can I connect my private Figma frames?",
      a: "Yes! By inputting your Figma API token or using our secure OAuth callback, you can choose specific Pages, Frames, or nested Components to inspect without leaving the dashboard."
    },
    {
      q: "Does it support custom design systems?",
      a: "Absolutely. You can upload your Tailwind configuration or variables JSON. The review engine will check if your screens match your defined layout and spacing tokens, catching visual discrepancies early."
    }
  ];

  return (
    <div id="saas-landing-page" className="space-y-16 pb-12">
      {/* 1. Hero Area */}
      <section className="text-center py-12 md:py-20 max-w-4xl mx-auto space-y-6 px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-gray-150/50 bg-gray-100 rounded-full border border-subtle text-xs font-semibold text-gray-700">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Announcing DesignReview Core v1.4</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight leading-none">
          The Automated Critic for <span className="font-sans text-transparent bg-clip-text bg-gradient-to-r from-black to-zinc-600">Premium UI/UX Design</span>
        </h1>

        <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
          Upload screenshots or Figma URLs. Instantly inspect accessibility contrast, spacing grids, typographic scales, and cognitive psychology compliance. Built for product leads, designers, and frontend engineers.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
          <button
            onClick={onEnterReview}
            className="w-full sm:w-auto px-6 py-3.5 bg-black text-white font-semibold text-sm rounded-full hover:bg-zinc-800 transition-all shadow-soft flex items-center justify-center gap-2"
          >
            <span>Launch Review Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={onEnterDashboard}
            className="w-full sm:w-auto px-6 py-3.5 bg-white border border-subtle text-gray-800 font-semibold text-sm rounded-full hover:bg-gray-50 transition-all shadow-soft flex items-center justify-center gap-2"
          >
            <Laptop className="w-4 h-4 text-gray-400" />
            <span>View Demo Dashboard</span>
          </button>
        </div>
      </section>

      {/* 2. Visual Demo Simulation Card */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-white border border-subtle rounded-3xl p-6 md:p-8 shadow-soft space-y-6">
          <div className="flex items-center justify-between border-b border-subtle pb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full bg-black flex items-center justify-center"><CheckCircle className="w-2.5 h-2.5 text-white" /></span>
              <span className="text-xs font-bold text-black">Review Sandbox Preview</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-100 uppercase">
              Operational
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Visual preview */}
            <div className="md:col-span-5 relative h-64 bg-zinc-50 rounded-2xl overflow-hidden border border-subtle flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60"
                alt="Audit visual demo representation"
                className="w-full h-full object-cover opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <span className="bg-white/95 px-4 py-2 rounded-full text-xs font-semibold shadow-soft text-black flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500 animate-pulse" />
                  <span>Interactive Audit Dashboard</span>
                </span>
              </div>
            </div>

            {/* Simulated report results */}
            <div className="md:col-span-7 space-y-4">
              <h3 className="text-base font-bold text-black leading-tight">Review Metrics Dashboard</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                Click inside the review panel to explore our full suite of visual tools. Test your design for **spacing grids, F-pattern heatmaps, before/after comparisons, and complete WCAG color blindness simulations** instantly.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-zinc-50/50 p-3 rounded-2xl border border-subtle text-center">
                  <span className="text-lg font-extrabold text-black">88%</span>
                  <span className="text-[9px] text-gray-400 font-bold uppercase block mt-1">Accessibility</span>
                </div>
                <div className="bg-zinc-50/50 p-3 rounded-2xl border border-subtle text-center">
                  <span className="text-lg font-extrabold text-black">92%</span>
                  <span className="text-[9px] text-gray-400 font-bold uppercase block mt-1">Visual UI</span>
                </div>
                <div className="bg-zinc-50/50 p-3 rounded-2xl border border-subtle text-center">
                  <span className="text-lg font-extrabold text-black">84%</span>
                  <span className="text-[9px] text-gray-400 font-bold uppercase block mt-1">Conversion</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onEnterDashboard}
                  className="px-4 py-2 bg-black hover:bg-zinc-800 text-white font-semibold text-xs rounded-full transition-all flex items-center gap-1.5 shadow-soft"
                >
                  <span>Explore Demo Report</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Product Features Grid */}
      <section className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900">Designed for Professional SaaS Teams</h2>
          <p className="text-xs text-zinc-500">Every analysis is backed by established cognitive psychology laws and WCAG criteria.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="bg-white border border-subtle rounded-3xl p-6 space-y-3 shadow-soft hover:shadow-md transition-all flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-zinc-50 border border-subtle flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-zinc-700" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-black">{feat.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Pricing Grid */}
      <section className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-black">Premium Flexible Pricing</h2>
          <p className="text-xs text-gray-500">Choose the perfect plan for personal auditing or enterprise-wide design consistency.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Plan 1 */}
          <div className="bg-white border border-subtle p-6 rounded-3xl flex flex-col justify-between h-[380px] shadow-soft">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Starter Pack</span>
                <h3 className="text-base font-bold text-black">Hobbyist Sandbox</h3>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-black">$0</span>
                <span className="text-xs text-gray-400 font-semibold">Free Forever</span>
              </div>
              <ul className="space-y-2.5 text-xs text-gray-600 font-medium pt-2">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-black" /> Upload 3 designs / month</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-black" /> Access Reference Library</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-black" /> Basic PDF Report exports</li>
              </ul>
            </div>
            <button
              onClick={onEnterReview}
              className="w-full py-2.5 px-4 border border-subtle hover:bg-gray-50 rounded-full text-xs font-semibold text-gray-800 transition-colors"
            >
              Get Started for Free
            </button>
          </div>

          {/* Plan 2 - Promoted */}
          <div className="bg-white border-2 border-black p-6 rounded-3xl flex flex-col justify-between h-[380px] shadow-soft relative">
            <div className="absolute top-0 right-5 -translate-y-1/2 bg-black text-white text-[9px] font-bold tracking-wider px-2.5 py-0.5 rounded-full uppercase border border-black">
              Most Popular
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Core Suite</span>
                <h3 className="text-base font-bold text-black">Pro Critic</h3>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-black">$29</span>
                <span className="text-xs text-gray-400 font-semibold">/ month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-gray-600 font-medium pt-2">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-black" /> Unlimited multimodal uploads</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-black" /> Real-time color blind simulator</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-black" /> Figma API variable integrations</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-black" /> Priority processing speeds</li>
              </ul>
            </div>
            <button
              onClick={() => alert('Subscription integration sandbox successful!')}
              className="w-full py-2.5 px-4 bg-black hover:bg-zinc-800 text-white rounded-full text-xs font-semibold transition-colors shadow-soft"
            >
              Upgrade to Pro
            </button>
          </div>

          {/* Plan 3 */}
          <div className="bg-white border border-subtle p-6 rounded-3xl flex flex-col justify-between h-[380px] shadow-soft">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Scale</span>
                <h3 className="text-base font-bold text-black">Team Enterprise</h3>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-black">$99</span>
                <span className="text-xs text-gray-400 font-semibold">/ month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-gray-600 font-medium pt-2">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-black" /> Unlimited workspace seats</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-black" /> Shared design tokens workspace</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-black" /> Custom branding report export</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-black" /> Dedicated auditor priority support</li>
              </ul>
            </div>
            <button
              onClick={() => alert('Enterprise request registered successfully!')}
              className="w-full py-2.5 px-4 border border-subtle hover:bg-gray-50 rounded-full text-xs font-semibold text-gray-800 transition-colors"
            >
              Contact Enterprise
            </button>
          </div>
        </div>
      </section>

      {/* 5. FAQs Accordion */}
      <section className="max-w-3xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-1.5">
          <h2 className="text-xl font-bold text-black">Frequently Asked Questions</h2>
          <p className="text-xs text-gray-500">Everything you need to know about our automated audit intelligence.</p>
        </div>

        <div className="space-y-2.5 pt-2">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div key={index} className="border border-subtle rounded-2xl bg-white overflow-hidden shadow-soft">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4.5 text-xs font-bold text-gray-800 text-left hover:bg-gray-50/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-4.5 border-t border-subtle text-xs text-gray-500 leading-relaxed bg-zinc-50/30">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Testimonials slider */}
      <section className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-1.5">
          <h2 className="text-xl font-bold text-black">Validated by World-Class Designers</h2>
          <p className="text-xs text-gray-500">Hear from design system leads at the most design-forward companies.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {testimonials.map((test, idx) => (
            <div key={idx} className="bg-white border border-subtle p-6 rounded-3xl shadow-soft space-y-4 flex flex-col justify-between">
              <p className="text-xs text-gray-600 leading-relaxed font-medium italic">
                "{test.quote}"
              </p>
              
              <div className="flex items-center gap-3 border-t border-subtle pt-4">
                <div className="w-8 h-8 rounded-full bg-black text-white font-extrabold text-[10px] flex items-center justify-center">
                  {test.avatar}
                </div>
                <div>
                  <span className="text-xs font-bold text-black block leading-tight">{test.name}</span>
                  <span className="text-[10px] text-gray-400 font-semibold">{test.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Call To Action (CTA) block */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-black text-white rounded-3xl p-8 md:p-12 shadow-soft text-center space-y-6 relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Ready to Align Your Design System?</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Unlock pixel-perfect grids, accessibility compliance, and professional UX reviews. Eliminate visual translation debt and align your teams instantly.
            </p>
            <div className="pt-2">
              <button
                onClick={onEnterReview}
                className="px-6 py-3.5 bg-white text-black font-semibold text-sm rounded-full hover:bg-gray-50 transition-all shadow-soft flex items-center justify-center gap-2 mx-auto"
              >
                <span>Audit Your First Design Free</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Elegant Footer */}
      <footer className="border-t border-zinc-100 pt-8 max-w-5xl mx-auto text-center px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-400 font-semibold text-[10px]">
          <span>© 2026 DesignReview AI. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms agreement sandbox.') }} className="hover:text-zinc-700 transition-colors">Terms of Service</a>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Privacy compliance sandbox.') }} className="hover:text-zinc-700 transition-colors">Privacy Policy</a>
            <a href="#security" onClick={(e) => { e.preventDefault(); alert('Security standards.') }} className="hover:text-zinc-700 transition-colors">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
