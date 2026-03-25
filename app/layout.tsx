import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import { Navbar } from '../components/navbar'

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
        <Navbar />

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