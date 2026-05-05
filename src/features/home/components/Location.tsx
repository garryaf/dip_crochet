"use client";

import React from "react";
import { MapPin, ExternalLink } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function Location() {
  return (
    <section className="py-24 px-6 md:px-20 border-t border-border/50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent rounded-full text-primary font-bold text-xs uppercase tracking-widest mb-6">
            <MapPin className="w-3.5 h-3.5" />
            Our Studio
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Visit us in <br /><span className="text-primary">Bekasi.</span></h2>
          <p className="text-lg text-muted-foreground font-medium mb-8 leading-relaxed max-w-md">
            Want to see our characters in person? Visit our handmade studio in the heart of Bekasi. We're open for consultations and custom orders.
          </p>
          
          <div className="space-y-6 mb-10">
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-accent rounded-2xl text-primary shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Address</h4>
                <p className="text-muted-foreground font-medium">{BRAND.address}</p>
              </div>
            </div>
            <a 
              href={BRAND.googleMaps} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white border border-border rounded-2xl font-bold hover:bg-accent/50 transition-colors group"
            >
              Open in Google Maps
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
        
        <div className="h-[450px] rounded-[3rem] overflow-hidden border border-border shadow-2xl relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15860.916892305886!2d106.9150!3d-6.3688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69930773998f45%3A0x6b876fc162e249b6!2sJatisampurna%2C%20Bekasi%20City%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1714467200000!5m2!1sen!2sid" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale contrast-110"
          />
        </div>
      </div>
    </section>
  );
}
