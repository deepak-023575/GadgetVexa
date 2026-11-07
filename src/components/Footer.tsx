import React, { useState } from 'react';
import { ShieldCheck, Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { settings, categories, setSelectedCategory } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="w-full bg-zinc-900 text-zinc-300 border-t border-zinc-800 text-xs">
      {/* Newsletter Section */}
      <div className="border-b border-zinc-800 py-8 bg-zinc-950/60">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-black text-white uppercase tracking-tight">
              Get Daily Price Drop & Tech Deal Alerts
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Join 45,000+ tech enthusiasts saving an average of 28% on verified electronics deals.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full max-w-md flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="email"
                placeholder="Enter your email for price drops..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-orange-500"
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              {subscribed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Subscribed!</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center font-extrabold text-white text-xs">
                GV
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">GadgetVexa</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {settings.tagline}. Curated real-time electronics deals, specifications comparisons, and discount monitoring.
            </p>
            <div className="pt-2 text-zinc-400 space-y-1">
              <p className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Retail Partner Links</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                <span>{settings.supportEmail}</span>
              </p>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-white mb-3">
              Popular Categories
            </h4>
            <ul className="space-y-2 text-zinc-400">
              {categories.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(c.id);
                      window.scrollTo({ top: 750, behavior: 'smooth' });
                    }}
                    className="hover:text-orange-400 transition-colors cursor-pointer text-left"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Supported Retailers */}
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-white mb-3">
              Monitored Stores
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li>Amazon India Associates Verified</li>
              <li>Flipkart Official Partner</li>
              <li>Croma Electronics Network</li>
              <li>Reliance Digital Store Partner</li>
              <li>Apple India Authorized Stores</li>
            </ul>
          </div>

          {/* FTC Affiliate Disclaimer (Strict compliance for affiliate stores) */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-white mb-3">
              Affiliate Disclosure
            </h4>
            <div className="p-3 rounded-xl bg-zinc-800/80 border border-zinc-700/60 text-[11px] text-zinc-400 leading-relaxed">
              {settings.affiliateDisclosure}
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 mt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} GadgetVexa Electronics. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">FTC Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
