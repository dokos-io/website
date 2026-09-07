<script setup lang="ts">
const { t, locale } = useI18n({
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

// One page per business theme, grouping the flat module list below by
// proposed value rather than alphabetically. See content/fr/ecosysteme/*.yml.
const themeSlugs = [
    "vente-relation-client",
    "finance-comptabilite",
    "achats-stocks-production",
    "projets-ressources-humaines",
    "support-collaboration",
    "site-web-outils-numeriques",
    "intelligence-artificielle",
];

const { data: themes } = await useAsyncData("ecosysteme-themes", () =>
    Promise.all(
        themeSlugs.map((slug) =>
            queryCollection("pages").path(`/${locale.value}/ecosysteme/${slug}`).first(),
        ),
    ),
);
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
            <UContainer class="space-y-16">
                <section>
                    <h2 class="text-xl font-semibold text-highlighted mb-6">
                        {{ t("themes_title") }}
                    </h2>
                    <UPageGrid class="sm:grid-cols-2 lg:grid-cols-3">
                        <UPageCard
                            v-for="theme in themes"
                            :key="(theme as any)?.path"
                            :title="(theme as any)?.navigation?.title || (theme as any)?.title"
                            :description="(theme as any)?.description"
                            :to="(theme as any)?.path"
                            variant="subtle"
                        >
                            <template #leading>
                                <span class="inline-flex p-1 rounded-lg bg-accent/10">
                                    <UIcon
                                        :name="(theme as any)?.navigation?.icon || 'i-heroicons-squares-2x2'"
                                        class="w-8 h-8 flex-shrink-0 text-accent"
                                    />
                                </span>
                            </template>
                        </UPageCard>
                    </UPageGrid>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-highlighted mb-6">
                        {{ t("all_modules_title") }}
                    </h2>
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
                </section>
            </UContainer>
        </UPageBody>
    </UPage>
</template>

<i18n lang="yaml">
  en:
    go_to_label: "Read more"
    hero_title: "Discover all available modules"
    hero_description: Our ecosystem is composed of a set of modules that can be deployed on your Dokos site
    themes_title: "Browse by business theme"
    all_modules_title: "All modules"
  fr:
    go_to_label: "En savoir plus"
    hero_title: "Découvrez les modules disponibles"
    hero_description: "Notre écosystème est constitué d'un ensemble de modules déployables sur votre site Dokos"
    themes_title: "Parcourir par thème métier"
    all_modules_title: "Tous les modules"
</i18n>
