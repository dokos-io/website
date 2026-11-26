<script setup lang="ts">
const { t } = useI18n({
    useScope: 'local',
})

const localePath = useLocalePath()
const route = useRoute()

// Pages in the 2026 design (definePageMeta({ design2026: true })) get the 2026 footer: cream like the page, the logo
// and its name, column titles in the typewriter face, links in Dokos blue.
// Every other page keeps the current footer until the site moves over.
const is2026 = computed(() => !!route.meta.design2026)

// The columns take the whole width and long labels wrap: by default the library
// keeps a third of the row for a side slot we do not use, and truncates labels
// ("Conditions général…" twice) while the room is there.
const COLUMNS_UI = {
    root: 'xl:block',
    linkLabel: 'overflow-visible whitespace-normal',
}
const COLUMNS_UI_2026 = {
    ...COLUMNS_UI,
    root: 'xl:grid xl:grid-cols-[16rem_1fr] xl:gap-16',
    label: 'font-typed text-sm font-normal text-dokos-500',
    link: 'text-[15px] text-dokos-500/80 hover:text-dokos-500',
}

const links = computed(() => {
    return [
        {
            label: t('dokos'),
            children: [
                { label: t('ecosystem'), to: localePath('/modules') },
                { label: t('ai_agents'), to: localePath('/ecosysteme/intelligence-artificielle') },
                { label: t('open_source'), to: localePath('/editeur') },
                { label: t('certifications'), to: localePath('/certifications') },
            ],
        },
        {
            label: t('services'),
            children: [
                { label: t('engineering'), to: localePath('/ingenierie') },
                { label: t('operations'), to: localePath('/exploitation') },
                { label: t('managed_frappe'), to: localePath('/exploitation/frappe-erpnext') },
                { label: t('hosting_data'), to: localePath('/souverainete') },
                { label: t('pricing'), to: localePath('/tarifs') },
            ],
        },
        {
            // Also the only inbound link to /solutions/* — without it those
            // pages are orphaned and `crawlLinks` never prerenders them.
            label: t('industries'),
            children: [
                { label: t('manufacturing'), to: localePath('/solutions/industrie') },
                { label: t('construction'), to: localePath('/solutions/construction') },
                { label: t('networks'), to: localePath('/solutions/reseaux') },
                { label: t('logistics'), to: localePath('/solutions/logistique') },
                { label: t('service-companies'), to: localePath('/solutions/entreprises-de-services') },
                // Secondary audience: kept last on purpose.
                { label: t('thirdplaces'), to: localePath('/solutions/tiers-lieux') },
            ],
        },
        {
            label: t('resources'),
            children: [
                { label: t('documentation'), to: 'https://doc.dokos.io' },
                { label: t('forum'), to: 'https://community.dokos.io' },
                { label: t('gitlab'), to: 'https://gitlab.com/dokos' },
                { label: t('partners'), to: localePath('/partners') },
            ],
        },
        {
            label: t('company'),
            children: [
                { label: t('contact'), to: localePath('/contact') },
                { label: t('termsandconditions'), to: '/fr/termsandconditions' },
                { label: t('hostingconditions'), to: '/fr/hostingconditions' },
                { label: t('securityandprivacy'), to: '/fr/securityandprivacy' },
                { label: t('legal'), to: '/fr/legal' },
            ],
        },
    ]
})
</script>

<template>
    <UFooter :ui="is2026 ? { root: 'bg-paper border-t border-dokos-500/10' } : undefined">
        <template #top>
            <UContainer>
                <UFooterColumns :columns="links" :ui="is2026 ? COLUMNS_UI_2026 : COLUMNS_UI">
                    <template v-if="is2026" #left>
                        <NuxtLink :to="localePath('/')" class="flex items-center gap-2.5">
                            <img width="40" height="39" src="/dokos_logo_rect.svg" alt="Dokos" loading="lazy">
                            <img width="83" height="24" src="/dokos_wordmark.svg" alt="" aria-hidden="true" class="h-6 w-auto" loading="lazy">
                        </NuxtLink>
                    </template>
                </UFooterColumns>
            </UContainer>
        </template>

        <template #left>
            <p class="text-sm" :class="is2026 ? 'text-stone-600' : 'text-stone-500 dark:text-stone-400'">
                Dokos SAS © {{ new Date().getFullYear() }}.
                {{ t("all_rights_reserved") }}.
            </p>
        </template>
        <template #right>
            <p class="text-sm" :class="is2026 ? 'font-typed text-stone-600' : 'text-stone-500 dark:text-stone-400'">
                {{ t("gplv3") }}
            </p>
        </template>
    </UFooter>
</template>

<i18n lang="yaml">
  en:
    all_rights_reserved: "All rights reserved"
    gplv3: "Software published under GPLv3"
    dokos: Dokos
    ecosystem: The ecosystem
    ai_agents: AI & agents
    open_source: Open source publisher
    certifications: Certifications & compliance
    services: Services
    engineering: Engineering
    operations: Operations
    managed_frappe: Frappe & ERPNext experts
    hosting_data: Hosting & data
    pricing: Pricing
    industries: Industries
    service-companies: Service companies
    manufacturing: Manufacturing
    construction: Construction
    networks: Networks and telecoms
    logistics: Logistics and delivery
    thirdplaces: Third places and associations
    resources: Resources
    documentation: Documentation
    forum: "Community Forum"
    gitlab: Gitlab
    partners: Partners
    company: Company
    contact: Contact Us
    termsandconditions: Terms and Conditions
    hostingconditions: Hosting Terms
    securityandprivacy: Security and Privacy
    legal: Legal Mentions
  fr:
    all_rights_reserved: "Tous droits réservés"
    gplv3: "Logiciel publié sous licence GPLv3"
    dokos: Dokos
    ecosystem: L'écosystème
    ai_agents: IA & agents
    open_source: Éditeur open source
    certifications: Certifications & conformité
    services: Services
    engineering: Ingénierie
    operations: Exploitation
    managed_frappe: Experts Frappe & ERPNext
    hosting_data: Hébergement et données
    pricing: Tarifs
    industries: Secteurs d'activité
    service-companies: Entreprises de services
    manufacturing: Industrie
    construction: Construction
    networks: Réseaux et télécoms
    logistics: Logistique et livraison
    thirdplaces: Tiers-lieux et associations
    resources: Ressources
    documentation: Documentation
    forum: Forum communautaire
    gitlab: Gitlab
    partners: Partenaires
    company: Société
    contact: Contactez-nous
    termsandconditions: Conditions générales de vente
    hostingconditions: Conditions générales d'hébergement
    securityandprivacy: Sécurité et confidentialité
    legal: Mentions légales
</i18n>
