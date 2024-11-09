<script setup lang="ts">

const { locale } = useI18n()

const route = useRoute()
console.log(route.path)

const { data: page } = await useAsyncData(route.path, () => queryContent(`/${locale.value}${route.path}`).findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})

defineOgImage({
  component: 'Saas',
  title: page.value.title,
  description: page.value.description
})

</script>

<template>
  <UPage v-if="page">
    <ClientOnly>
        <HomeTetris />
    </ClientOnly>
    <ULandingSection :ui="{ container: 'gap-y-0 sm:gap-y-0', base: 'z-10' }">
        <template #title>
            <span v-html="page.form.title"></span>
        </template>

        <template #description>
            <span v-html="page.form.description"></span>
        </template>
        <div class="pt-8 w-full flex justify-center">
            <ContactForm :form="page.form"/>
        </div>
    </ULandingSection>
    <ULandingSection>
        <UPageGrid>
            <UPageCard v-for="(info, index) in page.contact_info" :key="index" v-bind="info" target="_blank" />
    </UPageGrid>
    </ULandingSection>
  </UPage>
</template>