import { useState } from 'react'
import { Clock, Bike, ChefHat } from 'lucide-react'
import { CATEGORIES } from '../data/menu'
import { useStore } from '../hooks/useStore'
import ProductCard from '../components/ProductCard'
import Img from '../components/Img'

export default function Home() {
  const { menu } = useStore()
  const [cat, setCat] = useState('All')
  const items = menu.filter((m) => cat === 'All' || m.category === cat)
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
        <div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Delicious Food, Delivered to Your Door</h1>
          <p className="mt-4 max-w-md text-lg text-ink/70">Order your favourite meals from Hotel Royal Feast.</p>
          <button className="btn-primary mt-8 !px-7 !py-3.5 !text-base" onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}>Order Now</button>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink/70">
            <li className="flex items-center gap-2"><Clock size={16} className="text-brand" />Average 35 min delivery</li>
            <li className="flex items-center gap-2"><ChefHat size={16} className="text-brand" />Cooked fresh in our kitchen</li>
            <li className="flex items-center gap-2"><Bike size={16} className="text-brand" />Live order tracking</li>
          </ul>
        </div>
        <Img src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1000&q=70" alt="Indian thali" className="h-72 w-full rounded-3xl md:h-[420px]" />
      </section>
      <section id="menu" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-16">
        <h2 className="text-3xl font-bold">Our menu</h2>
        <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition ${cat === c ? 'border-brand bg-brand text-white' : 'border-stone-300 bg-white hover:border-brand'}`}>{c}</button>
          ))}
        </div>
        {items.length ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        ) : <p className="mt-10 text-ink/60">Nothing in {cat} right now. Try another category.</p>}
      </section>
    </>
  )
}
