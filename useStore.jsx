import { createContext, useContext, useState, useCallback } from 'react'
import { MENU, SEED_ORDERS } from '../data/menu'

export const STEPS = ['Confirmed', 'Preparing', 'Ready', 'Out for Delivery', 'Delivered']
export const FLOW = ['Pending', ...STEPS]
export const ETA = { Pending: 40, Confirmed: 35, Preparing: 25, Ready: 15, 'Out for Delivery': 8 }
export const DELIVERY_FEE = 40
const Ctx = createContext()
export const useStore = () => useContext(Ctx)

export function StoreProvider({ children }) {
  const [menu, setMenu] = useState(MENU)
  const [cart, setCart] = useState({})
  const [orders, setOrders] = useState(SEED_ORDERS)
  const [toasts, setToasts] = useState([])
  const [seq, setSeq] = useState(1025)

  const toast = useCallback((message) => {
    const id = Math.random()
    setToasts((t) => [...t, { id, message }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600)
  }, [])

  const lines = Object.entries(cart).map(([id, qty]) => ({ ...menu.find((m) => m.id === +id), qty })).filter((l) => l.name)
  const count = lines.reduce((s, l) => s + l.qty, 0)
  const subtotal = lines.reduce((s, l) => s + l.qty * l.price, 0)
  const delivery = lines.length ? DELIVERY_FEE : 0

  const addToCart = (p) => { setCart((c) => ({ ...c, [p.id]: (c[p.id] || 0) + 1 })); toast(`${p.name} added to cart`) }
  const setQty = (id, q) => setCart((c) => { const n = { ...c }; if (q <= 0) delete n[id]; else n[id] = q; return n })
  const removeItem = (p) => { setQty(p.id, 0); toast(`${p.name} removed`) }

  const placeOrder = (details) => {
    const id = `RF${seq}`
    setSeq(seq + 1)
    setOrders((o) => [{ id, mine: true, customer: details.name, ...details, status: 'Pending', amount: subtotal + delivery,
      items: lines.map((l) => ({ name: l.name, qty: l.qty, price: l.price })) }, ...o])
    setCart({})
    return id
  }
  const setStatus = (id, status) => { setOrders((o) => o.map((x) => (x.id === id ? { ...x, status } : x))); toast(`Order ${id}: ${status}`) }

  const saveProduct = (p) => {
    setMenu((m) => (p.id ? m.map((x) => (x.id === p.id ? p : x)) : [...m, { ...p, id: Date.now(), rating: 4.5, veg: true }]))
    toast(p.id ? 'Product updated' : 'Product added')
  }
  const deleteProduct = (p) => { setMenu((m) => m.filter((x) => x.id !== p.id)); setCart((c) => { const n = { ...c }; delete n[p.id]; return n }); toast(`${p.name} deleted`) }

  return (
    <Ctx.Provider value={{ menu, lines, count, subtotal, delivery, orders, toasts, toast, addToCart, setQty, removeItem, placeOrder, setStatus, saveProduct, deleteProduct }}>
      {children}
    </Ctx.Provider>
  )
}
