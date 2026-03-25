import Link from 'next/link'
import { ReactNode } from 'react'

interface ButtonProps {
  href: string
  children: ReactNode
  className?: string
}

export function PrimaryButton({ href, children, className = '' }: ButtonProps) {
  return (
    <Link 
      href={href} 
      className={`group flex items-center justify-center gap-2 bg-[#CEFF00] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-[#b3ff00] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(206,255,0,0.3)] ${className}`}
    >
      {children}
    </Link>
  )
}

export function SecondaryButton({ href, children, className = '' }: ButtonProps) {
  return (
    <Link 
      href={href} 
      className={`flex items-center justify-center gap-2 bg-white/5 text-white border border-white/10 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] ${className}`}
    >
      {children}
    </Link>
  )
}