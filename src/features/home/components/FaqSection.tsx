"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

/**
 * CRO Logic:
 * Addressing common objections (Durability, Safety, Shipping) reduces friction.
 */

const FAQS = [
  {
    question: "Is it safe for children?",
    answer: "Absolutely. We use premium non-toxic milk cotton and 'safety eyes' that are securely fastened from the inside. However, for infants, we recommend our 'Sleepy Style' (embroidered eyes) for maximum safety."
  },
  {
    question: "How do I take care of my companion?",
    answer: "Think of them as delicate art. We recommend a gentle hand wash with mild soap and air drying. Avoid machine washing to keep the fiber texture soft and the shape intact."
  },
  {
    question: "Do you ship outside of Bekasi?",
    answer: "Yes! We ship across Indonesia via JNE/J&T. Every soul is packed in a premium gift box to ensure they arrive safely and ready for adoption."
  },
  {
    question: "Can I request a custom design not in the builder?",
    answer: "We love a challenge! If you have a specific character or idea in mind, chat with us on WhatsApp. Our master artisan will see if we can bring your vision to life."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 md:px-20 bg-white border-t border-border/50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-accent rounded-full text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-4">
            <HelpCircle className="w-3 h-3" /> Common Questions
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#4a3a35] tracking-tight">Curious about <br /> the <span className="text-primary italic font-light">details?</span></h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className="group border border-border rounded-[2rem] overflow-hidden hover:border-primary/30 transition-colors bg-[#fffbf9]"
            >
              <button 
                onClick={() => setOpenIndex(index === openIndex ? null : index)}
                className="w-full p-8 flex items-center justify-between text-left"
              >
                <span className="text-lg font-black text-[#4a3a35]">{faq.question}</span>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                  openIndex === index ? "bg-primary text-white rotate-180" : "bg-accent text-primary"
                )}>
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-8 pb-8 text-muted-foreground font-medium leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
