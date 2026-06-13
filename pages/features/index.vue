<script setup lang="ts">
const { t } = useI18n({
    useScope: "local",
});

const { Features, fetchList } = useFeatures();

const title = "Fonctionnalités";
const description = "Liste des fonctionnalités de l'éco-système Dokos";
useSeoMeta({
    titleTemplate: "%s · Fonctionnalités",
    title,
    description,
    ogDescription: description,
    ogTitle: `${title} · Fonctionnalités`,
});

await fetchList();
</script>

<template>
    <UPage id="smooth" class="pt-20 -mt-20">
        <UPageHero
            :title="t('hero_title')"
            :ui="{
                root: 'bg-gradient-to-b from-green-400/10 from-90%',
                title: 'text-emerald-500',
            }"
        >
            <template #description>
                <span v-html="t('hero_description')"></span>
            </template>
        </UPageHero>
        <UPageBody>
            <UContainer>
                <UPageGrid>
                    <UPageCard
                        v-for="(feature, index) in Features"
                        :key="index"
                        :to="feature.path"
                        :title="feature.title"
                        :description="feature.description"
                        :ui="{
                            title: 'text-lg',
                            description: 'line-clamp-3',
                        }"
                    >
                        <template #footer>
                            <UBadge :label="feature.application as string" color="neutral" />
                        </template>
                    </UPageCard>
                </UPageGrid>
            </UContainer>
        </UPageBody>
    </UPage>
</template>

<i18n lang="yaml">
  en:
    go_to_label: "Read more"
    hero_title: "Available features by module"
    hero_description: "Each module is consituted by a set of features for different needs of any organisation"
  fr:
    go_to_label: "En savoir plus"
    hero_title: "Les fonctionnalités disponibles par module"
    hero_description: "Chaque module est constitué d'un ensemble de fonctionnalités répondant aux différents besoin d'une organisation"
</i18n>
