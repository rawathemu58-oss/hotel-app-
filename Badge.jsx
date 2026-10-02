const C = {
  Pending: 'bg-amber-100 text-amber-800', Confirmed: 'bg-sky-100 text-sky-800', Preparing: 'bg-orange-100 text-orange-800',
  Ready: 'bg-violet-100 text-violet-800', 'Out for Delivery': 'bg-blue-100 text-blue-800', Delivered: 'bg-green-100 text-green-800', Rejected: 'bg-red-100 text-red-800',
}
export default function Badge({ status }) {
  return <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${C[status]}`}>{status}</span>
}
