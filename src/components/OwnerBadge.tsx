import { Building2, Handshake } from 'lucide-react'
import type { Owner } from '../config/apps'

export default function OwnerBadge({ owner }: { owner: Owner }) {
  const Icon = owner === 'mine' ? Building2 : Handshake
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-line bg-bg px-2 py-0.5 text-xs font-medium text-muted">
      <Icon aria-hidden className="size-3" />
      {owner === 'Savio' ? 'Savio' : 'Fathima'}
    </span>
  )
}
