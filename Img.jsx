import { useState } from 'react'
import { UtensilsCrossed } from 'lucide-react'
export default function Img({ src, alt, className = '' }) {
  const [bad, setBad] = useState(false)
  if (bad || !src) return <div className={`flex items-center justify-center bg-brand-soft text-brand/40 ${className}`}><UtensilsCrossed size={32} /></div>
  return <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} className={`object-cover ${className}`} />
}
