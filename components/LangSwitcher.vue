<script setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})
</script>

<template>
  <NuxtLink v-for="item in availableLocales" :key="item.code" :to="switchLocalePath(item.code)">
    {{ item.name }}
  </NuxtLink>
</template>