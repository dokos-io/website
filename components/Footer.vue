<script setup lang="ts">

const { t } = useI18n({
  useScope: 'local'
})

const localePath = useLocalePath()

const links = computed(() => {
  return [{
    label: t('resources'),
    children: [{
      label: t('documentation'),
      to: "https://doc.dokos.io"
    }, {
      label: t('forum'),
      to: "https://community.dokos.io"
    }, {
      label: t('gitlab'),
      to: "https://gitlab.com/dokos"
    }]
  }, {
    label: t('ecosystem'),
    children: [{
      label: t('partners'),
      to: localePath('/partners')
    }, {
      label: t('frappeverse'),
      to: "https://frappe.io"
    }]
  }, {
    label: t('company'),
    children: [{
      label: t('about'),
      to: localePath('/about')
    }, {
      label: t('termsandconditions'),
      to: localePath('/termsandconditions')
    }, {
      label: t('securityandprivacy'),
      to: localePath('/securityandprivacy')
    }, {
      label: t('legal'),
      to: localePath('/legal')
    }]
  }]
});

</script>

<template>
  <UFooter>
    <template #top>
      <UFooterColumns :links="links" />
    </template>

    <template #left>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Dokos SAS © {{ new Date().getFullYear() }}. {{ t("all_rights_reserved") }}.
      </p>
    </template>
    <template #right>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        <NuxtLink to="https://nuxt.com" target="_blank">{{ t("built_with") }}.</NuxtLink>
      </p>
    </template>
  </UFooter>
</template>

<i18n lang="yaml">
  en:
    all_rights_reserved: "All rights reserved"
    resources: Resources
    documentation: Documentation
    forum: "Community Forum"
    company: Company
    ecosystem: "Ecosystem"
    partners: Partners
    about: About Us
    services: Services
    termsandconditions: Terms and Conditions
    securityandprivacy: Security and Privacy
    legal: Legal Mentions
    frappeverse: Frappe Applications
    gitlab: Gitlab
    built_with: Website built with Nuxt and Nuxt UI
  fr:
    all_rights_reserved: "Tous droits réservés"
    resources: Ressources
    documentation: Documentation
    forum: Forum Communautaire
    company: Société
    ecosystem: Ecosystème
    partners: Partenaires
    about: Notre Equipe
    services: Services
    termsandconditions: Conditions Générales de Ventes
    securityandprivacy: Sécurité et Confidentialité
    legal: Mentions Légales
    frappeverse: Applications Frappe
    gitlab: Gitlab
    built_with: Site créé avec Nuxt et Nuxt UI
</i18n>