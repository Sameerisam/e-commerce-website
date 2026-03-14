"use client";

import { SectionHero } from "@/components/ui/section-hero";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <SectionHero 
        title="Get in Touch" 
        subtitle="Have a question or need assistance? Our support team is here to help you 24/7."
        gradient="from-blue-600 to-indigo-600"
      />

      <main className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl font-black text-foreground">We'd Love to Hear From You.</h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Whether you have a question about products, shipping, returns, or anything else, our team is ready to answer all your questions.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: Mail, title: "Email Us", info: "support@mystore.com", desc: "Response within 24 hours" },
                { icon: Phone, title: "Call Us", info: "+1 (555) 000-0000", desc: "Mon-Fri from 9am to 6pm" },
                { icon: MapPin, title: "Visit Us", info: "123 Commerce St, Tech City", desc: "Main HQ & Showroom" }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                    <item.icon size={26} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                    <p className="text-slate-900 font-bold">{item.info}</p>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl shadow-indigo-100 border border-slate-100">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                  <Input placeholder="John Doe" className="h-14 rounded-2xl bg-slate-50 border-none px-6" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                  <Input placeholder="john@example.com" type="email" className="h-14 rounded-2xl bg-slate-50 border-none px-6" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                <Input placeholder="How can we help?" className="h-14 rounded-2xl bg-slate-50 border-none px-6" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                <textarea 
                  placeholder="Tell us more about your inquiry..." 
                  className="w-full min-h-[200px] rounded-3xl bg-slate-50 border-none p-6 focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                />
              </div>
              <Button className="w-full h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-xl shadow-indigo-100 gap-2">
                Send Message <Send size={20} />
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
