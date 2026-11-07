import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Zap, DollarSign, Store } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FaqItem[] = [
  {
    category: 'Deals & Pricing',
    question: 'GadgetVexa par electronics ke prices kaise update hote hain?',
    answer: 'GadgetVexa India ke leading e-commerce platforms (Amazon India, Flipkart, Croma, Reliance Digital) ke verified prices ko continuously track karta hai. Hamara system latest discount offers, bank cashbacks, aur deal drops ko curate karke real-time display karta hai.',
  },
  {
    category: 'Price Comparison',
    question: 'Kya hum ek sath multiple stores ke price compare kar sakte hain?',
    answer: 'Haan! Har product card aur product detail page par live store comparison table di gayi hai jahan aap Amazon India, Flipkart, aur Croma ke current sale prices aur savings ek hi jagah dekh sakte hain.',
  },
  {
    category: 'Affiliate & Trust',
    question: 'Kya GadgetVexa ke links se khareedne par extra charge lagta hai?',
    answer: 'Nahi, bilkul nahi! Jab aap hamare affiliate links par click karke khareedte hain, toh aapko wohi original ya discounted deal price milti hai. Retailer se milne wala chhota sa affiliate referral commission website ke operations aur research ko support karta hai, bina aapke koi extra paise kharche.',
  },
  {
    category: 'Warranty & Genuine Products',
    question: 'Kya featured electronics par brand warranty milti hai?',
    answer: 'Haan! GadgetVexa par sirf authorized sellers aur verified brands (Sony, Samsung, Apple, Nikon, Acer, Instant Pot) ke products link hote hain, jinpar full 1-year ya 2-year manufacturer official India warranty milti hai.',
  },
  {
    category: 'Admin Control',
    question: 'Admin panel se new products aur custom price kaise add karein?',
    answer: 'Website ke top header ya bottom floating button par "Admin Portal" par click karein. Wahan se aap kisi bhi product ya category ko add, edit, ya delete kar sakte hain, custom Indian Rupee (₹) pricing set kar sakte hain aur outbound clicks dekh sakte hain.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 border-t border-zinc-200 dark:border-zinc-800">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
          Everything You Need to Know About GadgetVexa
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2">
          Transparent, verified price comparisons and tech deal tracking across top Indian retailers.
        </p>
      </div>

      <div className="max-w-3xl mx-auto divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="transition-colors">
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-950/70 text-orange-600 dark:text-orange-400 text-xs font-black flex items-center justify-center shrink-0">
                    Q{idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-orange-500' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-800/20">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
