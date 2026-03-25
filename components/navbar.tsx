'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PrimaryButton } from './ui/button'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  // Prevent scrolling when the mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#0A0A0B]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-tighter text-white relative z-50" onClick={() => setIsOpen(false)}>
            ZAREL<span className="text-[#CEFF00]">.</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/portfolio" className="hover:text-white transition-colors">Work</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Insights</Link>
          </div>
          
          <div className="flex items-center gap-4 relative z-50">
            <PrimaryButton href="/contact" className="hidden md:flex px-5! py-2.5! text-sm!">
              Get Started <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </PrimaryButton>
            <button 
              className="md:hidden text-white p-2 -mr-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay & Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="fixed top-0 right-0 w-3/4 max-w-sm h-full bg-[#050505] border-l border-white/10 z-40 md:hidden flex flex-col pt-28 px-6 pb-6"
            >
              <div className="flex flex-col gap-6 text-xl font-medium text-slate-300">
                <Link href="/services" onClick={() => setIsOpen(false)} className="hover:text-[#CEFF00] transition-colors">Services</Link>
                <Link href="/portfolio" onClick={() => setIsOpen(false)} className="hover:text-[#CEFF00] transition-colors">Work</Link>
                <Link href="/blog" onClick={() => setIsOpen(false)} className="hover:text-[#CEFF00] transition-colors">Insights</Link>
                <div className="pt-6 border-t border-white/10 mt-4">
                  <PrimaryButton href="/contact" className="w-full">
                    Get Started <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </PrimaryButton>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}