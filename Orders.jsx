import { Link } from 'react-router-dom'
import { ReceiptText } from 'lucide-react'
import { useStore } from '../hooks/useStore'
import Badge from '../components/Badge'

export default function Orders() {
  const { orders } = useStore()
  const mine = orders.filter((o) => o.mine)
  if (!mine.length) return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <ReceiptText size={48} className="mx-auto text-brand/40" />
      <h1 className="mt-4 text-2xl font-bold">No orders yet</h1>
      <p className="mt-2 text-ink/60">Orders you place will show up here.</p>
      <Link to="/" className="btn-primary mt-6">Browse menu</Link>
    </div>
  )
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">My orders</h1>
      <ul className="mt-6 space-y-3">
        {mine.map((o) => (
          <li key={o.id}>
            <Link to={`/orders/${o.id}`} className="card flex items-center justify-between gap-4 p-4 transition hover:border-brand hover:shadow">
              <div><p className="font-semibold">#{o.id}</p><p className="text-sm text-ink/60">{o.items.map((i) => `${i.name} × ${i.qty}`).join(', ')}</p></div>
              <div className="text-right"><p className="font-semibold">₹{o.amount}</p><Badge status={o.status} /></div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
