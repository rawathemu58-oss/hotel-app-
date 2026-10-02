import { useState } from 'react'
import { Pencil, Trash2, Plus, X } from 'lucide-react'
import { CATEGORIES } from '../data/menu'
import { useStore, ETA } from '../hooks/useStore'
import Badge from '../components/Badge'
import Img from '../components/Img'

// [label, status required, status it moves to, style]
const ACTIONS = [
  ['Accept', 'Pending', 'Confirmed', 'btn-primary'], ['Reject', 'Pending', 'Rejected', 'btn-ghost'],
  ['Mark Preparing', 'Confirmed', 'Preparing', 'btn-ghost'], ['Mark Ready', 'Preparing', 'Ready', 'btn-ghost'],
  ['Out for Delivery', 'Ready', 'Out for Delivery', 'btn-ghost'], ['Delivered', 'Out for Delivery', 'Delivered', 'btn-ghost'],
]
const blank = { name: '', desc: '', price: '', category: 'Main Course', image: '', available: true }

export default function Admin() {
  const { orders, menu, setStatus, saveProduct, deleteProduct } = useStore()
  const [edit, setEdit] = useState(null)
  const live = orders.filter((o) => !['Delivered', 'Rejected'].includes(o.status)).length
  const stats = [
    ['Orders Today', 21 + orders.length], ['Revenue Today', `₹${(8450 - 1290 + orders.filter((o) => o.status !== 'Rejected').reduce((s, o) => s + o.amount, 0)).toLocaleString('en-IN')}`],
    ['Pending Orders', 1 + live], ['Completed Orders', 20 + orders.filter((o) => o.status === 'Delivered').length],
  ]
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Hotel Admin</h1>
      <p className="text-ink/60">Hotel Royal Feast · live kitchen dashboard (demo data)</p>
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(([k, v]) => <div key={k} className="card p-5"><p className="text-sm text-ink/60">{k}</p><p className="mt-1 font-display text-3xl font-bold">{v}</p></div>)}
      </div>

      <h2 className="mt-10 text-xl font-bold">Recent orders</h2>
      <div className="card mt-3 overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="border-b border-stone-200 bg-stone-50 text-ink/60"><tr>{['Order ID', 'Customer', 'Items', 'Amount', 'Status', 'ETA', 'Actions'].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-stone-100">
            {orders.map((o) => (
              <tr key={o.id} className="align-top">
                <td className="px-4 py-3 font-semibold">{o.id}</td><td className="px-4 py-3">{o.customer}</td>
                <td className="px-4 py-3">{o.items.length} items</td><td className="px-4 py-3">₹{o.amount}</td>
                <td className="px-4 py-3"><Badge status={o.status} /></td>
                <td className="px-4 py-3">{ETA[o.status] ? `${ETA[o.status]} min` : '—'}</td>
                <td className="px-4 py-3"><div className="flex flex-wrap gap-1.5">
                  {ACTIONS.map(([label, from, to, cls]) => <button key={label} disabled={o.status !== from} onClick={() => setStatus(o.id, to)} className={`${cls} !px-2.5 !py-1 !text-xs`}>{label}</button>)}
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 flex items-center justify-between">
        <h2 className="text-xl font-bold">Menu management</h2>
        <button className="btn-primary" onClick={() => setEdit({ ...blank })}><Plus size={16} />Add New Product</button>
      </div>
      <ul className="mt-3 space-y-3">
        {menu.map((p) => (
          <li key={p.id} className="card flex flex-wrap items-center gap-4 p-3">
            <Img src={p.image} alt={p.name} className="h-16 w-16 shrink-0 rounded-xl" />
            <div className="min-w-[200px] flex-1"><p className="font-semibold">{p.name}</p><p className="line-clamp-1 text-sm text-ink/60">{p.desc}</p></div>
            <span className="text-sm text-ink/70">{p.category}</span><span className="w-14 font-semibold">₹{p.price}</span>
            <button onClick={() => saveProduct({ ...p, available: !p.available })} role="switch" aria-checked={p.available} className="flex items-center gap-2 text-sm">
              <span className={`relative h-6 w-11 rounded-full transition ${p.available ? 'bg-green-500' : 'bg-stone-300'}`}><span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${p.available ? 'left-[22px]' : 'left-0.5'}`} /></span>
              {p.available ? 'Available' : 'Unavailable'}
            </button>
            <button className="btn-ghost !px-3" onClick={() => setEdit(p)} aria-label="Edit"><Pencil size={15} /></button>
            <button className="btn-ghost !px-3 hover:!border-red-500 hover:!text-red-600" onClick={() => deleteProduct(p)} aria-label="Delete"><Trash2 size={15} /></button>
          </li>
        ))}
      </ul>
      {edit && <ProductModal initial={edit} onClose={() => setEdit(null)} onSave={(p) => { saveProduct(p); setEdit(null) }} />}
    </div>
  )
}

function ProductModal({ initial, onClose, onSave }) {
  const [p, setP] = useState(initial)
  const set = (k) => (e) => setP({ ...p, [k]: e.target.value })
  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/40 p-4" onClick={onClose}>
      <form onClick={(e) => e.stopPropagation()} onSubmit={(e) => { e.preventDefault(); onSave({ ...p, price: +p.price }) }} className="card max-h-[90vh] w-full max-w-md space-y-4 overflow-y-auto p-6 shadow-xl">
        <div className="flex items-center justify-between"><h3 className="text-xl font-bold">{p.id ? 'Edit product' : 'Add new product'}</h3><button type="button" onClick={onClose} aria-label="Close"><X size={18} /></button></div>
        <label className="block text-sm font-medium">Product image URL<input className="input mt-1" value={p.image} onChange={set('image')} placeholder="https://images.unsplash.com/…" /></label>
        <label className="block text-sm font-medium">Product name<input required className="input mt-1" value={p.name} onChange={set('name')} /></label>
        <label className="block text-sm font-medium">Description<textarea required rows={2} className="input mt-1" value={p.desc} onChange={set('desc')} /></label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm font-medium">Price (₹)<input required type="number" min="1" className="input mt-1" value={p.price} onChange={set('price')} /></label>
          <label className="block text-sm font-medium">Category<select className="input mt-1" value={p.category} onChange={set('category')}>{CATEGORIES.slice(1).map((c) => <option key={c}>{c}</option>)}</select></label>
        </div>
        <label className="block text-sm font-medium">Availability
          <select className="input mt-1" value={p.available ? 'y' : 'n'} onChange={(e) => setP({ ...p, available: e.target.value === 'y' })}><option value="y">Available</option><option value="n">Unavailable</option></select>
        </label>
        <div className="flex justify-end gap-2"><button type="button" className="btn-ghost" onClick={onClose}>Cancel</button><button className="btn-primary">Save product</button></div>
      </form>
    </div>
  )
}
