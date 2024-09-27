<script setup lang="ts">
import type { Partner } from '~/types'

const route = useRoute();
const {
  params: { slug },
} = useRoute();
const { locale } = useI18n()

const localePath = useLocalePath()

const path_without_locale = route
path_without_locale.path.replace(`/^(/${locale}\.)/,"")`, '')

const { data: partner } = await useAsyncData(path_without_locale.path, () => queryContent<Partner>(`/${locale.value}/partners/${slug}`).findOne())

if (!partner.value) {
  throw createError({ statusCode: 404, statusMessage: 'Partner not found', fatal: true })
}

const links = computed(() => [{
  label: `${t('visit')} ${partner.value.title}`,
  color: 'black' as const,
  size: 'md' as const,
  icon: 'i-ph-arrow-square-out',
  trailing: true,
  to: partner.value.link,
  target: '_blank'
}])

// const title = partner.value.head?.title || partner.value.title
// const description = partner.value.head?.description || partner.value.description
// useSeoMeta({
//   titleTemplate: '%s · Nuxt Agencies',
//   title,
//   description,
//   ogDescription: description,
//   ogTitle: `${title} · Nuxt Agencies`
// })

const { t } = useI18n({
  useScope: 'local'
})

</script>

<template>
  <UContainer>
    <UPageHeader :description="partner.description" :links="links" :headline="t('partners')">
      <template #title>
        <div class="flex items-center gap-4">
          <UColorModeAvatar :light="partner.logo.light" :dark="partner.logo.dark" size="lg" :ui="{ rounded: 'rounded-sm' }" class="-m-[4px]" />

          <span>{{ partner.title }}</span>
        </div>
      </template>

      <div class="absolute top-[68px] -left-[64px] hidden lg:flex">
        <UTooltip :text="t('back_button')">
          <UButton
            :to="localePath('/partners')"
            icon="i-ph-caret-left"
            color="gray"
            :ui="{ rounded: 'rounded-full' }"
            size="lg"
            class=""
          />
        </UTooltip>
      </div>

      <div class="flex flex-col lg:flex-row lg:items-center gap-3 mt-4">
        <div class="flex items-center gap-1.5">
          <UIcon name="i-ph-map-pin" class="w-5 h-5 flex-shrink-0" />
          <span class="text-sm font-medium">{{ partner.location }}</span>
        </div>

        <span v-if="partner.twitter" class="hidden lg:block text-gray-500 dark:text-gray-400">&bull;</span>

        <NuxtLink v-if="partner.twitter" :to="`https://twitter.com/${partner.twitter}`" target="_blank" class="flex items-center gap-1.5 hover:text-primary">
          <UIcon name="i-simple-icons-twitter" class="w-5 h-5" />
          <span class="text-sm font-medium">Twitter</span>
        </NuxtLink>

        <span v-if="partner.github" class="hidden lg:block text-gray-500 dark:text-gray-400">&bull;</span>

        <NuxtLink v-if="partner.github" :to="`https://github.com/${partner.github}`" target="_blank" class="flex items-center gap-1.5 hover:text-primary">
          <UIcon name="i-simple-icons-github" class="w-5 h-5" />
          <span class="text-sm font-medium">GitHub</span>
        </NuxtLink>

        <NuxtLink v-if="partner.gitlab" :to="`https://gitlab.com/${partner.gitlab}`" target="_blank" class="flex items-center gap-1.5 hover:text-primary">
          <UIcon name="i-simple-icons-gitlab" class="w-5 h-5" />
          <span class="text-sm font-medium">Gitlab</span>
        </NuxtLink>

        <span v-if="partner.link" class="hidden lg:block text-gray-500 dark:text-gray-400">&bull;</span>

        <NuxtLink v-if="partner.link" :to="partner.link" target="_blank" class="flex items-center gap-1.5 hover:text-primary">
          <UIcon name="i-ph-link-duotone" class="w-5 h-5" />
          <span class="text-sm font-medium">{{ t('website') }}</span>
        </NuxtLink>
      </div>
    </UPageHeader>

    <UPage :ui="{ right: 'my-8' }">
      <UPageBody prose class="prose-lg dark:text-gray-300">
        <ContentRenderer v-if="partner && partner.body" :value="partner" />
      </UPageBody>

      <template #right>
        <UPageLinks v-if="partner.services?.length" :title="t('technical_expertise')">
          <div class="prose dark:prose-invert -ml-1.5">
            <ul class="space-y-3">
              <li v-for="(service, index) in partner.services" :key="index" class="text-sm text-gray-500 dark:text-gray-400">
                {{ service }}
              </li>
            </ul>
          </div>
        </UPageLinks>

        <div v-if="partner.resources?.length">
          <UDivider type="dashed" class="my-6" />

          <UPageLinks :title="t('resources')" :links="partner.resources" />
        </div>
      </template>
    </UPage>
  </UContainer>
</template>

<i18n lang="yaml">
  en:
    back_button: "Back to partners"
    visit: Visit
    partners: Partners
    website: Website
    technical_expertise: Technical Expertise
    resources: Resources
  fr:
    back_button: "Retour aux partenaires"
    visit: Aller sur
    partners: Partenaires
    website: Site web
    technical_expertise: Expertise Technique
    resources: Ressources
</i18n>