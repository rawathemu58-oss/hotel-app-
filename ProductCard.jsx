import { Star, Plus } from 'lucide-react'
import Img from './Img'
import { useStore } from '../hooks/useStore'
export default function ProductCard({ p }) {
  const { addToCart } = useStore()
  return (
    <article className={`card group flex flex-col overflow-hidden transition hover:shadow-lg ${p.available ? '' : 'opacity-60'}`}>
      <div className="relative overflow-hidden">
        <Img src={p.image} alt={p.name} className="h-44 w-full transition duration-500 group-hover:scale-105" />
        <span className={`absolute left-3 top-3 grid h-5 w-5 place-items-center rounded-sm border-2 bg-white ${p.veg ? 'border-green-600' : 'border-red-600'}`} title={p.veg ? 'Vegetarian' : 'Non-vegetarian'}>
          <span className={`h-2.5 w-2.5 rounded-full ${p.veg ? 'bg-green-600' : 'bg-red-600'}`} />
        </span>
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-xs font-semibold"><Star size={12} className="fill-amber-400 text-amber-400" />{p.rating}</span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-semibold leading-tight">{p.name}</h3>
        <p className="mt-1 flex-1 text-sm text-ink/60">{p.desc}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold">₹{p.price}</span>
          <button className="btn-primary" disabled={!p.available} onClick={() => addToCart(p)}><Plus size={16} />{p.available ? 'Add to Cart' : 'Sold out'}</button>
        </div>
      </div>
    </article>
  )
}
