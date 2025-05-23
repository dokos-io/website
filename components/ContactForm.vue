<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '#ui/types'

defineProps({
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

const toast = useToast()

const loading = ref<boolean>(false)
const turnstile = ref()
const token = ref()

const state = reactive({
  name: undefined,
  email: undefined,
  company: undefined,
  body: undefined
})

const showTurnstile = computed(() => validate(state)?.length === 0)
const canSend = computed(() => {
  return Boolean(state.name && state.email && state.company && state.body && token.value)
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Obligatoire' })
  if (!state.email) errors.push({ path: 'email', message: 'Obligatoire' })
  if (!state.company) errors.push({ path: 'company', message: 'Obligatoire' })
  if (!state.body) errors.push({ path: 'body', message: 'Obligatoire' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  if (!event.data) return
  if (loading.value || !canSend.value) return

  loading.value = true

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
      toast.add({ title: 'Email envoyé', description: 'Nous faison notre possible pour vous répondre dans les meilleurs délais', color: 'green' })
    })
    .catch((e) => {
      const description = e.data?.message || 'Un erreur a empêché l\'envoi de votre message. Veuilez réessayer dans quelques instants ou nous envoyer un email.'
      toast.add({ title: 'Echec de l\'envoi du message', description, color: 'red' })
    })
    .finally(() => {
      loading.value = false
      // reset turnstile token
      turnstile.value?.reset()
    })
}
</script>

<template>
  <div class="w-full max-w-[640px] z-20">
    <UCard :ui="{ background: 'form-bg', body: { base: 'flex flex-col space-y-6 w-full', padding: 'px-4 py-5 sm:p-8' } }">
      <UForm :validate="validate" :state="state" class="space-y-6" @submit="onSubmit">
        <UFormGroup :label="form.name.label" name="name" required>
          <UInput v-model="state.name" :placeholder="form.name.placeholder" />
        </UFormGroup>

        <UFormGroup :label="form.email.label" name="email" required>
          <UInput v-model="state.email" type="email" :placeholder="form.email.placeholder" />
        </UFormGroup>

        <UFormGroup :label="form.company.label" name="company" required>
          <UInput v-model="state.company" :placeholder="form.company.placeholder" />
        </UFormGroup>

        <UFormGroup :label="form.body.label" name="body" required>
          <UTextarea v-model="state.body" autoresize :placeholder="form.body.placeholder" :rows="6" />
        </UFormGroup>

        <ClientOnly>
          <NuxtTurnstile v-if="showTurnstile" ref="turnstile" v-model="token" :options="{ theme: $colorMode.value as 'auto' | 'light' | 'dark' }" />
        </ClientOnly>

        <UButton
          v-bind="form.button"
          type="submit"
          color="gray"
          class="w-fit pt-2"
          :loading="loading"
          :disabled="!canSend"
        />
      </UForm>
    </UCard>
  </div>
</template>

<style scoped lang="postcss">
.dark .form-bg {
  background: linear-gradient(0deg, rgba(15, 23, 42, 0.50) 0%, rgba(15, 23, 42, 0.50) 100%), linear-gradient(180deg, rgba(51, 65, 85, 0.50) 0%, rgba(2, 4, 32, 0.50) 33.92%) !important;
}
</style>