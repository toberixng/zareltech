import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import { ArrowUpRight, Menu } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Zarel Technologies | Engineering Growth',
  description: 'High-performance technology partner for ambitious brands.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* selection:bg-[#CEFF00] makes highlighted text look awesome */}
      <body className="min-h-screen bg-[#0A0A0B] text-slate-50 font-sans selection:bg-[#CEFF00] selection:text-black antialiased flex flex-col">
        
        {/* Global Navbar */}
        <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#0A0A0B]/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="text-2xl font-black tracking-tighter text-white">
              ZAREL<span className="text-[#CEFF00]">.</span>
            </Link>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
              <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              <Link href="/portfolio" className="hover:text-white transition-colors">Work</Link>
              <Link href="/blog" className="hover:text-white transition-colors">Insights</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/contact" className="hidden md:flex items-center gap-2 bg-[#CEFF00] text-black px-5 py-2.5 rounded-full font-bold hover:bg-[#b3ff00] transition-colors">
                Get Started <ArrowUpRight className="w-4 h-4" />
              </Link>
              <button className="md:hidden text-white"><Menu /></button>
            </div>
          </div>
        </nav>

        {/* Main Page Content */}
        <main className="flex-1 pt-20">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-white/10 bg-[#050505] pt-20 pb-10 mt-auto">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <Link href="/" className="text-3xl font-black tracking-tighter text-white">
                ZAREL<span className="text-[#CEFF00]">.</span>
              </Link>
              <p className="mt-6 text-slate-400 max-w-sm text-lg">
                The technology partner you'd rather be working with. We build scalable systems and digital platforms for market leaders.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">Platform</h4>
              <ul className="space-y-4 text-slate-400">
                <li><Link href="/services" className="hover:text-[#CEFF00] transition-colors">Services</Link></li>
                <li><Link href="/portfolio" className="hover:text-[#CEFF00] transition-colors">Case Studies</Link></li>
                <li><Link href="/blog" className="hover:text-[#CEFF00] transition-colors">Insights</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">Connect</h4>
              <ul className="space-y-4 text-slate-400">
                <li><Link href="/contact" className="hover:text-[#CEFF00] transition-colors">Contact Us</Link></li>
                <li><a href="#" className="hover:text-[#CEFF00] transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-[#CEFF00] transition-colors">Twitter / X</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 pt-8 border-t border-white/10">
            <p>© {new Date().getFullYear()} Zarel Technologies. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}