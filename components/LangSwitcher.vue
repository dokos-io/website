<script setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()

// Pages that exist only in French: the legal pages, the partner pages,
// the recruitment page and the event pages. Their English URL would 404,
// so the switcher is hidden there.
const FRENCH_ONLY = [
  /^\/(fr\/)?(termsandconditions|hostingconditions|securityandprivacy|rgpdandeprivacy|legal|recrutement|faire-festival-2026|open-source-experience-\d{4})\/?$/,
  /^\/(fr\/)?partners\/[^/]+\/?$/,
]

const frenchOnly = computed(() =>
  locale.value === 'fr' && FRENCH_ONLY.some(pattern => pattern.test(route.path))
)

const availableLocales = computed(() => {
  if (frenchOnly.value) return []
  return locales.value.filter(i => i.code !== locale.value)
})
</script>

<template>
  <NuxtLink v-for="item in availableLocales" :key="item.code" :to="switchLocalePath(item.code)">
    {{ item.name }}
  </NuxtLink>
</template>
