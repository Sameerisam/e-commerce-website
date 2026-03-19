"use client";

import { Mail, Phone, Clock, Shield, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MotionDiv} from "../ui/motions";

export function ContactSections() {
  return (
    <>
      <main className="container mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Contact Info & Values */}
          <div className="space-y-16">
            <div className="space-y-6">
              <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.4em]">Get in Touch</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Let's Start a <br /> Conversation.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed font-medium">
                Experience personal support tailored to your needs. We're committed to providing the fastest response times in the industry.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: Mail, title: "Email Us", info: "[EMAIL_ADDRESS]", desc: "24/7 Priority Support" },
                { icon: Phone, title: "Call Us", info: "+92 321 710 4112", desc: "Mon-Fri, 9am - 6pm EST" },
                { icon: Clock, title: "Response Time", info: "Under 1 Hour", desc: "For all support tickets" },
                { icon: Shield, title: "Secure Data", info: "Encrypted Communication", desc: "Your privacy is our priority" }
              ].map((item, i) => (
                <MotionDiv
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 space-y-4 hover:bg-white hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600">
                    <item.icon size={22} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-slate-900">{item.title}</h3>
                    <p className="text-indigo-600 font-bold text-sm tracking-tight">{item.info}</p>
                    <p className="text-[11px] font-black uppercase text-slate-400 tracking-widest">{item.desc}</p>
                  </div>
                </MotionDiv>
              ))}
            </div>

            <div className="p-10 rounded-[40px] bg-indigo-600 text-white space-y-6 relative overflow-hidden shadow-2xl shadow-indigo-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <h3 className="text-2xl font-black relative z-10">Visit Our Flagship Store</h3>
              <p className="text-indigo-100 relative z-10 leading-relaxed font-medium">
                123 Commerce Avenue, Digital Suite 405<br />
                Tech City, Silicon Valley 90210
              </p>
              <Button className="bg-white text-indigo-600 hover:bg-white hover:text-indigo-600 transition-all font-black px-8 rounded-xl relative z-10">
                Get Directions
              </Button>
            </div>
          </div>

          {/* Professional Contact Form */}
          <MotionDiv
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[50px] p-10 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-slate-50 border-t-8 border-t-indigo-600"
          >
            <div className="mb-12">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Send Us a Message</h2>
              <p className="text-slate-400 font-medium mt-2 text-sm italic">Expect a response within 60 minutes.</p>
            </div>

            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Full Name</label>
                  <Input placeholder="E.g. Alexander Pierce" className="h-16 rounded-[20px] bg-slate-50 border-none px-8 focus:ring-2 focus:ring-indigo-600 font-medium" />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Email Address</label>
                  <Input placeholder="alex@company.com" type="email" className="h-16 rounded-[20px] bg-slate-50 border-none px-8 focus:ring-2 focus:ring-indigo-600 font-medium" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Detailed Inquiry</label>
                <textarea
                  placeholder="How can we assist you today?"
                  className="w-full min-h-[180px] rounded-[24px] bg-slate-50 border-none p-8 focus:ring-2 focus:ring-indigo-600 outline-none transition-all font-medium text-slate-700 resize-none"
                />
              </div>

              <Button className="w-full h-18 py-8 rounded-[24px] bg-indigo-600 text-white  hover:text-indigo-600 border-2 border-transparent hover:border-indigo-600 transition-all text-xl font-black shadow-2xl shadow-indigo-100 gap-3 group">
                Dispatch Message
                <Send size={22} className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </form>
          </MotionDiv>
        </div>
      </main>

      {/* Global Presence Section */}
      <section className="pb-32 container mx-auto px-6">
        <div className="rounded-[60px] bg-slate-50 py-24 text-center space-y-12 border border-slate-100">
          <div className="space-y-4">
            <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.4em]">Global Presence</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Our Support Offices</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto px-12">
            {[
              { city: "New York", country: "United States" },
              { city: "London", country: "United Kingdom" },
              { city: "Lahore", country: "Pakistan" }
            ].map((loc, i) => (
              <div key={i} className="space-y-2">
                <p className="text-2xl font-black text-slate-900">{loc.city}</p>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{loc.country}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
