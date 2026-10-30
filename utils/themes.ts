/**
 * The business themes that group the ecosystem's apps. One list, shared by
 * the header menu, the ecosystem index and the copy lint, so a theme cannot
 * exist in one place and not the others. The theme pages themselves live in
 * content/<locale>/ecosysteme/<slug>.yml.
 */
export interface Theme {
  slug: string
  icon: string
  label: { fr: string; en: string }
}

export const THEMES: Theme[] = [
  { slug: 'vente-relation-client', icon: 'i-heroicons-shopping-cart', label: { fr: 'Vente & relation client', en: 'Sales & customer relations' } },
  { slug: 'finance-comptabilite', icon: 'i-heroicons-banknotes', label: { fr: 'Finance & comptabilité', en: 'Finance & accounting' } },
  { slug: 'achats-stocks-production', icon: 'i-heroicons-cube', label: { fr: 'Achats, stocks & production', en: 'Purchasing, stock & production' } },
  { slug: 'projets-ressources-humaines', icon: 'i-heroicons-user-group', label: { fr: 'Projets & ressources humaines', en: 'Projects & HR' } },
  { slug: 'support-collaboration', icon: 'i-heroicons-chat-bubble-left-right', label: { fr: 'Support & collaboration', en: 'Support & collaboration' } },
  { slug: 'site-web-outils-numeriques', icon: 'i-heroicons-globe-alt', label: { fr: 'Site web & outils numériques', en: 'Website & digital tools' } },
  { slug: 'intelligence-artificielle', icon: 'i-heroicons-cpu-chip', label: { fr: 'IA & agents', en: 'AI & agents' } },
]

export const AI_THEME_SLUG = 'intelligence-artificielle'
