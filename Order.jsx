import { Link, useParams } from 'react-router-dom'
import { Bike, ChefHat, Clock, FastForward, Hourglass } from 'lucide-react'
import { useStore, FLOW, ETA } from '../hooks/useStore'
import Tracker from '../components/Tracker'

const MSG = {
  Pending: 'Waiting for Hotel Royal Feast to accept your order.',
  Confirmed: 'Hotel Royal Feast has confirmed your order.',
  Preparing: 'Your order is being prepared by Hotel Royal Feast.',
  Ready: 'Your order is packed and ready for pickup.',
  'Out for Delivery': 'Your order is on its way.',
  Delivered: 'Delivered. Enjoy your meal!',
  Rejected: 'Sorry, the restaurant could not take this order.',
}
export default function Order() {
  const { orderId } = useParams()
  const { orders, setStatus } = useStore()
  const o = orders.find((x) => x.id === orderId)
  if (!o) return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Order not found</h1>
      <p className="mt-2 text-ink/60">We couldn't find {orderId}. Demo orders reset when the page reloads.</p>
      <Link to="/orders/RF1024" className="btn-primary mt-6">Open demo order RF1024</Link>
    </div>
  )
  const next = FLOW[FLOW.indexOf(o.status) + 1]
  const eta = ETA[o.status]
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-3xl font-bold">Order #{o.id}</h1>
        <div className="flex items-center gap-2 text-sm"><Clock size={16} className="text-brand" />Estimated delivery: <b>{eta ? `${eta} minutes` : o.status === 'Delivered' ? 'Arrived' : '—'}</b></div>
      </div>
      <div className="card mt-6 p-6">
        {o.status === 'Pending' && <p className="mb-5 flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800"><Hourglass size={16} />Waiting for acceptance. Open Hotel Admin to accept this order.</p>}
        <Tracker status={o.status} />
        <p className="mt-6 flex items-center gap-2 rounded-xl bg-brand-soft px-4 py-3 text-sm font-medium text-brand-dark"><ChefHat size={16} />{MSG[o.status]}</p>
        {next && <button className="btn-ghost mt-4" onClick={() => setStatus(o.id, next)}><FastForward size={16} />Simulate Next Status</button>}
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="card p-5">
          <h2 className="text-lg font-bold">Order summary</h2>
          <ul className="mt-3 space-y-1.5 text-sm">{o.items.map((i) => <li key={i.name} className="flex justify-between"><span>{i.name} × {i.qty}</span><span>₹{i.price * i.qty}</span></li>)}</ul>
          <p className="mt-3 flex justify-between border-t border-stone-200 pt-3 font-semibold"><span>Total</span><span>₹{o.amount}</span></p>
        </div>
        <div className="card p-5">
          <h2 className="text-lg font-bold">Delivery partner</h2>
          <div className="mt-3 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-soft text-brand"><Bike size={20} /></span>
            <div><p className="font-semibold">Rahul Sharma</p><p className="text-xs text-ink/60">Hotel Royal Feast rider</p></div>
          </div>
          <p className="mt-3 text-sm text-ink/70">Your delivery partner will pick up your order once it is ready.</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/" className="btn-primary">Back to Menu</Link>
        <Link to="/orders" className="btn-ghost">View Order Details</Link>
      </div>
    </div>
  )
}
