<script setup lang="ts">
const { t, locale } = useI18n({
    useScope: "local",
});

const { Partners, fetchList } = usePartners();

const { data: page } = await useAsyncData<any>("partners", () =>
    queryCollection("pages").path(`/${locale.value}/partners`).first()
);

const title = page.value?.title;
const description = page.value?.description;
useSeoMeta({
    titleTemplate: "%s · Partenaires",
    title,
    description,
    ogDescription: description,
    ogTitle: `${title} · Partenaires`,
});

await fetchList();
</script>

<template>
    <UContainer>
        <UPageHero
            :title="page?.title"
            :description="page?.description"
            :links="(page as any)?.links"
        />

        <UPage id="smooth" class="pt-20 -mt-20">
            <UPageBody>
                <UPageGrid v-if="Partners?.length">
                    <UPageCard
                        v-for="(agency, index) in Partners"
                        :key="index"
                        :to="agency.path"
                        :title="agency.title"
                        :description="agency.description"
                        :ui="{
                            title: 'text-lg',
                            description: 'line-clamp-3',
                        }"
                    >
                        <template #leading>
                            <UColorModeAvatar
                                :light="agency.logo?.light || ''"
                                :dark="agency.logo?.dark || ''"
                                size="lg"
                                class="rounded-sm"
                            />
                        </template>

                        <template #footer>
                            <UBadge
                                v-if="agency.location"
                                :label="agency.location.label"
                                color="neutral"
                            />
                        </template>
                    </UPageCard>
                </UPageGrid>

                <EmptyCard v-else :label="t('empty_page')" />
            </UPageBody>
        </UPage>
    </UContainer>
</template>

<i18n lang="yaml">
  en:
      empty_page: "We don't have any english speaking partner yet."
  fr:
      empty_page: "Nous n'avons pas encore de partenaire francophone."
</i18n>
