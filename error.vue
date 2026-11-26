<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const { t } = useI18n({ useScope: 'local' })
const localePath = useLocalePath()

// The error page takes the 2026 look of the rest of the site, light only, even
// when the failing route is an event page in the older design or the visitor's
// system is in dark mode. Header and Footer read `design2026` from the route.
const route = useRoute()
route.meta.design2026 = true
const colorMode = useColorMode()
colorMode.forced = true
// Typed read-only, but it is the plain reactive state the color-mode plugin
// watches; `preference` would also be saved as the visitor's choice.
;(colorMode as { value: string }).value = 'light'

// Leaving the error page through a link resets the error state.
function leave() {
  clearError()
}

const notFound = computed(() => props.error.statusCode === 404)

useSeoMeta({
  title: () => notFound.value ? t('not_found_title') : t('error_title'),
  description: () => notFound.value ? t('not_found_description') : t('error_description'),
  robots: 'noindex',
})

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('pages'), { default: () => [] })
const { files } = useDeferredSearchIndex()

provide('navigation', navigation)
</script>

<template>
  <UApp>
    <Header />

    <UMain class="h26 bg-paper text-dokos-500">
      <Landing2026Header
        :kicker="`${t('error')} ${error.statusCode}`"
        :title="notFound ? t('not_found_title') : t('error_title')"
        :description="notFound ? t('not_found_description') : t('error_description')"
      >
        <div class="flex flex-wrap gap-3 pt-4">
          <NuxtLink :to="localePath('/')" class="h26-lift rounded-lg bg-dokos-500 px-6 py-3.5 font-bold text-white" @click="leave">
            {{ t('home') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/contact')" class="h26-lift rounded-lg border-[1.5px] border-dokos-500 px-6 py-3.5 font-bold" @click="leave">
            {{ t('contact') }}
          </NuxtLink>
        </div>
      </Landing2026Header>
    </UMain>

    <Footer />

    <ClientOnly>
      <LazyUContentSearch :files="files" :navigation="navigation" />
    </ClientOnly>
  </UApp>
</template>

<i18n lang="yaml">
en:
  error: Error
  not_found_title: Page not found
  not_found_description: This page does not exist, or no longer does. The menu above leads to the rest of the site.
  error_title: Something went wrong
  error_description: The page could not be shown. Try again in a moment, or write to us.
  home: Back to the homepage
  contact: Contact us
fr:
  error: Erreur
  not_found_title: Page introuvable
  not_found_description: Cette page n'existe pas, ou plus. Le menu ci-dessus mène au reste du site.
  error_title: Une erreur est survenue
  error_description: La page n'a pas pu s'afficher. Réessayez dans un instant, ou écrivez-nous.
  home: Retour à l'accueil
  contact: Nous écrire
</i18n>
