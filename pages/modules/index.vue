<script setup lang="ts">
const { t } = useI18n({
    useScope: "local",
});

const { Modules, fetchList } = useModules();

const title = "Modules Dokos";
const description = "Liste des modules Dokos";
useSeoMeta({
    titleTemplate: "%s · Modules",
    title,
    description,
    ogDescription: description,
    ogTitle: `${title} · Modules`,
});

await fetchList();
</script>

<template>
    <UPage id="smooth" class="pt-20 -mt-20">
        <UPageHero
            :title="t('hero_title')"
            :ui="{
                root: 'bg-gradient-to-b from-yellow-400/10 from-90%',
                title: 'text-amber-500',
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
                        v-for="(module, index) in Modules"
                        :key="index"
                        :title="module.title"
                        :description="module.description"
                        :to="module.path"
                    >
                        <template #leading>
                            <span
                                class="inline-flex p-1 rounded-lg bg-amber-600/5"
                            >
                                <UIcon
                                    :name="
                                        module.icon ||
                                        'i-heroicons-cube'
                                    "
                                    class="w-10 h-10 flex-shrink-0 text-amber-600"
                                />
                            </span>
                        </template>

                        <template #header>
                            <UBadge :label="module.application as string" color="neutral" />
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
    hero_title: "Discover all available modules"
    hero_description: Our ecosystem is composed of a set of modules that can be deployed on your Dokos site
  fr:
    go_to_label: "En savoir plus"
    hero_title: "Découvrez les modules disponibles"
    hero_description: "Notre écosystème est constitué d'un ensemble de modules déployables sur votre site Dokos"
</i18n>
