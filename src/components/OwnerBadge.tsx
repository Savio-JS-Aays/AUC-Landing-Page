import type { Owner } from '../config/apps'

export default function OwnerBadge({ owner }: { owner: Owner }) {
  return (
    <span className="inline-block border border-current px-1.5 py-0.5 font-mono text-[11px] leading-none text-muted">
      {owner === 'mine' ? 'Savio Joseph' : 'Fathima Farhaan'}
    </span>
  )
}
