<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
const colorMode = useColorMode()

// The 2026 variant lays the form as a white sheet with typewriter labels and
// a Dokos blue button; the default keeps the current look (OSXP 2025, Faire Festival).
const props = defineProps({
  variant: {
    type: String as PropType<'default' | '2026'>,
    default: 'default'
  },
  form: {
    type: Object as PropType<{
      name: { label: string, placeholder: string }
      email: { label: string, placeholder: string }
      company: { label: string, placeholder: string }
      body: { label: string, placeholder: string }
      info: string
      button: any
    }
    >,
    default: () => ({})
  }
})

const UCard = resolveComponent('UCard')
const is2026 = computed(() => props.variant === '2026')
const fieldUi = computed(() => is2026.value ? { label: 'font-typed text-sm font-normal text-stone-600' } : undefined)
const inputUi = computed(() => is2026.value ? { base: 'rounded-lg bg-paper text-dokos-500 ring-dokos-500/25 focus-visible:ring-2 focus-visible:ring-dokos-500' } : undefined)
const inputSize = computed(() => is2026.value ? 'xl' : undefined)

const toast = useToast()
const { t } = useI18n({ useScope: 'local' })

const loading = ref<boolean>(false)
const turnstile = ref()
const token = ref()

const state = reactive<{
  name?: string
  email?: string
  company?: string
  body?: string
}>({
  name: undefined,
  email: undefined,
  company: undefined,
  body: undefined
})

// The Turnstile check (Cloudflare) only loads once the form is filled in, so
// visitors who only read the page make no request to Cloudflare.
const showTurnstile = computed(() => validate(state)?.length === 0)
const canSend = computed(() => {
  return Boolean(state.name && state.email && state.company && state.body && token.value)
})

// Announced to screen readers, and shown under the form: why it is not sent yet.
const status = ref('')
watch(token, (value) => {
  if (value && status.value === t('verify')) status.value = ''
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({ name: 'name', message: t('required') })
  if (!state.email) errors.push({ name: 'email', message: t('required') })
  if (!state.company) errors.push({ name: 'company', message: t('required') })
  if (!state.body) errors.push({ name: 'body', message: t('required') })
  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  if (!event.data) return
  if (loading.value) return
  // The form is valid (UForm only submits then), but the anti-spam check has
  // not answered yet: say so rather than leaving a dead button.
  if (!canSend.value) {
    status.value = t('verify')
    return
  }

  loading.value = true
  status.value = t('sending')

  await $fetch('https://dashboard.dokos.io/api/method/new-website-contact-form', {
    method: 'POST',
    body: {
      ...event.data,
      token: token.value
    }
  })
    .then(() => {
      state.company = ''
      state.name = ''
      state.email = ''
      state.body = ''
      status.value = t('sent_title')
      toast.add({ title: t('sent_title'), description: t('sent_description'), color: 'success' })
    })
    .catch((e) => {
      const description = e.data?.message || t('failed_description')
      status.value = `${t('failed_title')}. ${description}`
      toast.add({ title: t('failed_title'), description, color: 'error' })
    })
    .finally(() => {
      loading.value = false
      // reset turnstile token
      turnstile.value?.reset()
    })
}
</script>

<template>
  <div :class="is2026 ? 'w-full' : 'w-full max-w-[640px] z-20'">
    <component
      :is="is2026 ? 'div' : UCard"
      :class="is2026 ? 'bg-white px-6 py-8 shadow-[0_18px_40px_rgba(43,42,39,0.16)] sm:px-10 sm:py-10' : 'form-bg'"
      :ui="is2026 ? undefined : { body: 'flex flex-col space-y-6 w-full px-4 py-5 sm:p-8' }"
    >
      <UForm :validate="validate" :state="state" class="space-y-6" @submit="onSubmit">
        <UFormField :label="form.name.label" name="name" required :ui="fieldUi">
          <UInput v-model="state.name" autocomplete="name" :placeholder="form.name.placeholder" class="w-full" :size="inputSize" :ui="inputUi" />
        </UFormField>

        <UFormField :label="form.email.label" name="email" required :ui="fieldUi">
          <UInput v-model="state.email" type="email" autocomplete="email" :placeholder="form.email.placeholder" class="w-full" :size="inputSize" :ui="inputUi" />
        </UFormField>

        <UFormField :label="form.company.label" name="company" required :ui="fieldUi">
          <UInput v-model="state.company" autocomplete="organization" :placeholder="form.company.placeholder" class="w-full" :size="inputSize" :ui="inputUi" />
        </UFormField>

        <UFormField :label="form.body.label" name="body" required :ui="fieldUi">
          <UTextarea v-model="state.body" autoresize :placeholder="form.body.placeholder" :rows="6" class="w-full" :size="inputSize" :ui="inputUi" />
        </UFormField>

        <ClientOnly>
          <NuxtTurnstile v-if="showTurnstile" ref="turnstile" v-model="token" :options="{ theme: is2026 ? 'light' : colorMode.value as 'auto' | 'light' | 'dark' }" />
        </ClientOnly>

        <UButton
          v-bind="form.button"
          type="submit"
          :color="is2026 ? 'primary' : 'neutral'"
          :size="inputSize"
          :class="is2026 ? 'w-fit rounded-lg px-6 py-3.5 font-bold' : 'w-fit pt-2'"
          :loading="loading"
        />
        <p role="status" aria-live="polite" class="text-sm" :class="is2026 ? 'font-typed text-stone-600' : 'text-muted'">
          {{ status }}
        </p>
      </UForm>
    </component>
  </div>
</template>

<i18n lang="yaml">
en:
  required: Required
  verify: One moment, the anti-spam check above has not answered yet. Send again once it is ticked.
  sending: Sending…
  sent_title: Message sent
  sent_description: We will answer you as soon as we can.
  failed_title: The message could not be sent
  failed_description: An error stopped your message. Try again in a few moments, or send us an email.
fr:
  required: Obligatoire
  verify: Un instant, la vérification anti-spam ci-dessus n'a pas encore répondu. Renvoyez une fois qu'elle est cochée.
  sending: Envoi en cours…
  sent_title: Message envoyé
  sent_description: Nous faisons notre possible pour vous répondre dans les meilleurs délais.
  failed_title: Échec de l'envoi du message
  failed_description: Une erreur a empêché l'envoi de votre message. Réessayez dans quelques instants, ou envoyez-nous un e-mail.
</i18n>

<style scoped lang="postcss">
.dark .form-bg {
  background: linear-gradient(0deg, rgba(15, 23, 42, 0.50) 0%, rgba(15, 23, 42, 0.50) 100%), linear-gradient(180deg, rgba(51, 65, 85, 0.50) 0%, rgba(2, 4, 32, 0.50) 33.92%) !important;
}
</style>