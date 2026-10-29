<script setup lang="ts">
const { t } = useI18n({
    useScope: "local",
});

const localePath = useLocalePath();

const links = computed(() => {
    return [
        {
            label: t("dokos"),
            children: [
                { label: t("ecosystem"), to: localePath("/modules") },
                { label: t("ai_agents"), to: localePath("/ecosysteme/intelligence-artificielle") },
                { label: t("open_source"), to: localePath("/editeur") },
                { label: t("certifications"), to: localePath("/certifications") },
            ],
        },
        {
            label: t("services"),
            children: [
                { label: t("engineering"), to: localePath("/ingenierie") },
                { label: t("operations"), to: localePath("/exploitation") },
                { label: t("managed_frappe"), to: localePath("/exploitation/frappe-erpnext") },
                { label: t("hosting_data"), to: localePath("/souverainete") },
                { label: t("pricing"), to: localePath("/tarifs") },
            ],
        },
        {
            // Also the only inbound link to /solutions/* — without it those
            // pages are orphaned and `crawlLinks` never prerenders them.
            label: t("industries"),
            children: [
                { label: t("service-companies"), to: localePath("/solutions/entreprises-de-services") },
                { label: t("manufacturing"), to: localePath("/solutions/industrie") },
                { label: t("thirdplaces"), to: localePath("/solutions/tiers-lieux") },
            ],
        },
        {
            label: t("resources"),
            children: [
                { label: t("documentation"), to: "https://doc.dokos.io" },
                { label: t("forum"), to: "https://community.dokos.io" },
                { label: t("gitlab"), to: "https://gitlab.com/dokos" },
                { label: t("partners"), to: localePath("/partners") },
            ],
        },
        {
            label: t("company"),
            children: [
                { label: t("contact"), to: localePath("/contact") },
                { label: t("termsandconditions"), to: localePath("/termsandconditions") },
                { label: t("hostingconditions"), to: localePath("/hostingconditions") },
                { label: t("securityandprivacy"), to: localePath("/securityandprivacy") },
                { label: t("legal"), to: localePath("/legal") },
            ],
        },
    ];
});
</script>

<template>
    <UFooter>
        <template #top>
            <UContainer>
                <UFooterColumns :columns="links" />
            </UContainer>
        </template>

        <template #left>
            <p class="text-gray-500 dark:text-gray-400 text-sm">
                Dokos SAS © {{ new Date().getFullYear() }}.
                {{ t("all_rights_reserved") }}.
            </p>
        </template>
        <template #right>
            <p class="text-gray-500 dark:text-gray-400 text-sm">
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
    thirdplaces: Third places
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
    service-companies: Sociétés de service
    manufacturing: Industrie
    thirdplaces: Tiers-Lieux
    resources: Ressources
    documentation: Documentation
    forum: Forum Communautaire
    gitlab: Gitlab
    partners: Partenaires
    company: Société
    contact: Contactez-nous
    termsandconditions: Conditions Générales de Ventes
    hostingconditions: Conditions Générales d'Hébergement
    securityandprivacy: Sécurité et Confidentialité
    legal: Mentions Légales
</i18n>
