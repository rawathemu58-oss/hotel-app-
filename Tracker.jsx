import { Check } from 'lucide-react'
import { STEPS } from '../hooks/useStore'
export default function Tracker({ status }) {
  const cur = STEPS.indexOf(status)
  return (
    <ol className="flex flex-col md:flex-row">
      {STEPS.map((s, i) => {
        const done = i < cur || status === 'Delivered', active = i === cur && status !== 'Delivered'
        return (
          <li key={s} className="relative flex flex-1 items-start gap-3 pb-6 md:flex-col md:items-center md:gap-2 md:pb-0 md:text-center">
            {i > 0 && <span className={`absolute left-4 top-[-1.5rem] h-6 w-0.5 md:left-[-50%] md:top-4 md:h-0.5 md:w-full ${i <= cur || status === 'Delivered' ? 'bg-brand' : 'bg-stone-200'} transition-colors duration-500`} />}
            <span className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 text-sm transition-colors duration-500 ${done ? 'border-brand bg-brand text-white' : active ? 'border-brand bg-white text-brand ring-4 ring-brand/15' : 'border-stone-300 bg-white text-stone-400'}`}>
              {done ? <Check size={16} /> : i + 1}
            </span>
            <span className={`text-sm ${active || done ? 'font-semibold text-ink' : 'text-ink/50'}`}>{s}</span>
          </li>
        )
      })}
    </ol>
  )
}
