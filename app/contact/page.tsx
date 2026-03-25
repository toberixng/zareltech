'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24">
      <section className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
            Let's build something <span className="text-[#CEFF00] italic">great.</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Whether you have a clear vision or just a rough idea, we'd love to discuss how Zarel can help bring your digital product to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-[#050505] border border-white/10 p-8 md:p-12 rounded-4xl">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">First Name</label>
                  <input type="text" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50 transition-colors" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Last Name</label>
                  <input type="text" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50 transition-colors" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email Address</label>
                <input type="email" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50 transition-colors" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Project Type</label>
                <select className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50 transition-colors appearance-none">
                  <option>Web Application</option>
                  <option>Mobile App</option>
                  <option>System Architecture</option>
                  <option>Performance Audit</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Message</label>
                <textarea rows={4} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50 transition-colors resize-none" placeholder="Tell us about your project..."></textarea>
              </div>
              <button type="button" className="w-full group flex items-center justify-center gap-2 bg-[#CEFF00] text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#b3ff00] transition-all hover:shadow-[0_0_30px_rgba(206,255,0,0.3)]">
                Send Message <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col justify-between">
            <div className="space-y-12">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-[#CEFF00]/10 rounded-2xl flex items-center justify-center shrink-0 text-[#CEFF00]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                  <p className="text-slate-400 mb-2">Our friendly team is here to help.</p>
                  <a href="mailto:hello@zareltech.com" className="text-[#CEFF00] font-medium hover:underline">hello@zareltech.com</a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-[#CEFF00]/10 rounded-2xl flex items-center justify-center shrink-0 text-[#CEFF00]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Visit Us</h3>
                  <p className="text-slate-400 mb-2">Come say hello at our office HQ.</p>
                  <address className="text-slate-300 not-italic leading-relaxed">
                    100 Tech Innovation Way<br />
                    San Francisco, CA 94105<br />
                    United States
                  </address>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
