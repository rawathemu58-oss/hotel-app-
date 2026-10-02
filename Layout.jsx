import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu as MenuIcon, X, Crown, CheckCircle2 } from 'lucide-react'
import { useStore } from '../hooks/useStore'

export default function Layout() {
  const { count, toasts } = useStore()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const link = ({ isActive }) => `text-sm font-medium transition hover:text-brand ${isActive ? 'text-brand' : 'text-ink/70'}`
  const go = (id) => () => { setOpen(false); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50) }
  const nav = (
    <>
      <NavLink to="/" end className={link} onClick={() => setOpen(false)}>Home</NavLink>
      <Link to="/" onClick={go('menu')} className="text-sm font-medium text-ink/70 hover:text-brand">Menu</Link>
      <NavLink to="/orders" className={link} onClick={() => setOpen(false)}>My Orders</NavLink>
    </>
  )
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-paper/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white"><Crown size={18} /></span>Hotel Royal Feast
          </Link>
          <nav className="hidden items-center gap-7 md:flex">{nav}</nav>
          <div className="flex items-center gap-2">
            <Link to="/cart" aria-label="Cart" className="btn-ghost relative !px-3">
              <ShoppingBag size={18} />
              {count > 0 && <span key={count} className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-xs text-white [animation:pop_.3s]">{count}</span>}
            </Link>
            <button className="btn-ghost !px-3 md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X size={18} /> : <MenuIcon size={18} />}</button>
          </div>
        </div>
        {open && <nav className="flex flex-col gap-4 border-t border-stone-200 bg-paper px-4 py-4 md:hidden">{nav}</nav>}
      </header>
      <main className="flex-1"><Outlet key={pathname} /></main>
      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-ink/60 sm:flex-row">
          <span>© 2026 Hotel Royal Feast · Demo storefront</span>
          <Link to="/admin" className="font-medium text-brand hover:underline">Hotel Admin</Link>
        </div>
      </footer>
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <div key={t.id} className="flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm text-white shadow-lg [animation:toast-in_.2s]"><CheckCircle2 size={16} className="text-green-400" />{t.message}</div>
        ))}
      </div>
    </div>
  )
}
