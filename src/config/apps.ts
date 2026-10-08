/**
 * Single source of truth for the hub.
 * Tabs, home cards and routes are all generated from this array.
 * To change a URL or add/remove a tab, edit only this file.
 */
import type { LucideIcon } from 'lucide-react'
import { CarFront, Headset, RadioTower, ServerCog, Truck, Wrench } from 'lucide-react'

export type Owner = 'Savio' | 'Fathima'

export interface AppConfig {
  /** URL slug, used as the hash route (#/<id>) */
  id: string
  label: string
  /** Compact label for the tab bar */
  shortLabel: string
  /** One plain sentence */
  description: string
  /** Deployed *.vercel.app URL of the child app */
  url: string
  owner: Owner
  /** Hex colour used only as a small marker on the tab and home card */
  accent: string
  /** lucide-react icon shown on the home card */
  icon: LucideIcon
}

// TODO: replace every url with the real deployment URL.
export const apps: AppConfig[] = [
  {
    id: 'new-vehicle-sales',
    label: 'New Vehicle Sales',
    shortLabel: 'Sales',
    description: 'Follow new vehicle leads and sales.',
    url: 'https://new-vehicle-sales.vercel.app/',
    owner: 'Fathima',
    accent: '#e4572e',
    icon: CarFront,
  },
  {
    id: 'logistics',
    label: 'Logistics',
    shortLabel: 'Logistics',
    description: 'Track vehicles and parts as they move through the supply chain.',
    url: 'https://logisticsdashboard-ruddy.vercel.app/',
    owner: 'Fathima',
    accent: '#d99a00',
    icon: Truck,
  },
  {
    id: 'telematics',
    label: 'Telematics',
    shortLabel: 'Telematics',
    description: 'Monitor connected vehicle data, location and driving behaviour.',
    url: 'https://auc-telematics.vercel.app/',
    owner: 'Savio',
    accent: '#14a38b',
    icon: RadioTower,
  },
  {
    id: 'customer-services',
    label: 'Customer Services',
    shortLabel: 'Customer',
    description: 'Handle owner enquiries, service bookings and follow-ups in one place.',
    url: 'https://customer-service-topaz.vercel.app/',
    owner: 'Fathima',
    accent: '#2f80ed',
    icon: Headset,
  },
  
  
  {
    id: 'warranty-field-services',
    label: 'Warranty and Field Services',
    shortLabel: 'Warranty',
    description: 'Manage warranty claims and field technician visits.',
    url: 'https://aucwarrantandfieldservices.vercel.app/overview',
    owner: 'Savio',
    accent: '#a855c7',
    icon: Wrench,
  },
  {
    id: 'it',
    label: 'IT',
    shortLabel: 'IT',
    description: 'Oversee the systems, access and tooling behind the dealership network.',
    url: 'https://auc-it.vercel.app/',
    owner: 'Savio',
    accent: '#e0507a',
    icon: ServerCog,
  },
]

export const projectName = 'Automotive Use Cases'
