<script setup lang="ts">
const { locale } = useI18n();

const { data: page } = await useAsyncData<any>("index", () =>
    queryCollection("pages").path(`/${locale.value}`).first()
);

if (!page.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "Page not found",
        fatal: true,
    });
}

const sorted_modules = computed(() => {
    return [...(page.value!.modules?.items ?? [])].sort((a: any, b: any) =>
        a.title.localeCompare(b.title)
    );
});

useSeoMeta({
    titleTemplate: "",
    title: page.value.title,
    ogTitle: page.value.title,
    description: page.value.description,
    ogDescription: page.value.description,
});
</script>

<template>
    <div v-if="page">
        <div class="bg-yellow-400 py-2 text-center text-black font-semibold">Rejoignez-nous à Toulouse, au Faire Festival, les 28, 29 et 30 Mai 2026.
            <div>
                <NuxtLink to="/faire-festival-2026" class="text-grey font-normal">En savoir plus <Icon name="i-mdi-arrow-top-right"/></NuxtLink>
            </div>
        </div>
        <UPageHero
            :links="page.hero.links"
            orientation="vertical"
            class="relative z-[1] pb-0 sm:pb-0 md:pb-0"
        >
            <template #headline>
                <UBadge
                    v-if="page.hero.headline"
                    variant="subtle"
                    size="lg"
                    class="relative rounded-full font-semibold"
                >
                    <UIcon
                        v-if="page.hero.headline.left_icon"
                        :name="page.hero.headline.left_icon"
                        class="mr-1 w-4 h-4 pointer-events-none"
                    />
                    <NuxtLink
                        :to="page.hero.headline.to"
                        target="_blank"
                        class="focus:outline-none"
                        tabindex="-1"
                    >
                        <span class="absolute inset-0" aria-hidden="true" />
                    </NuxtLink>

                    {{ page.hero.headline.label }}

                    <UIcon
                        v-if="page.hero.headline.right_icon"
                        :name="page.hero.headline.right_icon"
                        class="ml-1 w-4 h-4 pointer-events-none"
                    />
                </UBadge>
            </template>

            <template #title>
                <span v-html="page.hero.title"></span>
            </template>

            <template #description>
                <span v-html="page.hero.description"></span>
            </template>

            <template #default>
                <NuxtImg
                    :src="'/home/' + page.hero.image"
                    class="w-full rounded-md bg-white/75"
                    loading="lazy"
                    placeholder
                />

                <ClientOnly>
                    <HomeTetris />
                </ClientOnly>
            </template>
        </UPageHero>

        <UPageSection class="pt-0 sm:pt-0 md:pt-0">
            <UCard
                class="bg-yellow-500/10 ring-0"
                :ui="{ body: 'grid grid-cols-3 gap-4 py-10 sm:py-20' }"
            >
                <div
                    v-for="(item, index) in page.metrics.items"
                    :key="index"
                    class="flex-1"
                >
                    <div class="mb-6 flex">
                        <UIcon
                            :name="item.icon"
                            class="w-10 h-10 flex-shrink-0 text-primary"
                        />
                    </div>
                    <p
                        class="text-gray-900 dark:text-white text-base font-semibold truncate flex items-center gap-1.5"
                    >
                        {{ item.title }}
                    </p>
                    <div
                        class="text-[15px] text-gray-500 dark:text-gray-400 mt-1"
                    >
                        {{ item.description }}
                    </div>
                </div>
            </UCard>
        </UPageSection>

        <UPageSection
            v-for="(section, index) in page.sections"
            :key="index"
            v-bind="section"
        >
            <template #title>
                <span v-html="section.title" />
            </template>
            <template #description>
                <span v-html="section.description" />
            </template>
            <div
                v-if="section.image"
                class="pt-24 pb-12 rounded-lg"
                :class="[
                    section.image_bg_color,
                    section.align == 'left' ? 'pl-8 mr-7' : 'pr-8 ml-7',
                ]"
            >
                <NuxtImg
                    :src="section.image"
                    class="rounded-lg"
                    :class="[
                        section.align == 'left' ? 'ml-7' : 'mr-7',
                        section.image_bg_color ? 'shadow-2xl' : '',
                    ]"
                    :style="section.align == 'right' && 'margin-left: -15px;'"
                    loading="lazy"
                />
            </div>
            <Placeholder v-else />
        </UPageSection>

        <UPageSection>
            <UPageLogos :title="page.integrations.title" class="justify-center">
                <UIcon
                    v-for="icon in page.integrations.icons"
                    :key="icon"
                    :name="icon"
                    class="w-16 h-16 flex-shrink-0 text-gray-500 dark:text-gray-400"
                />
                <NuxtImg
                    v-for="image in page.integrations.images"
                    :key="image"
                    :src="image"
                    class="max-h-20"
                    loading="lazy"
                />
            </UPageLogos>
        </UPageSection>

        <UPageSection
            v-bind="page.modules"
            class="bg-green-400/10"
        >
            <template #title>
                <span v-html="page.modules.title" />
            </template>
            <template #description>
                <span v-html="page.modules.description" />
            </template>
            <UPageGrid class="sm:grid-cols-3 xl:grid-cols-4">
                <UPageCard
                    v-for="(item, index) in sorted_modules"
                    :key="index"
                    v-bind="item"
                    orientation="vertical"
                />
            </UPageGrid>
        </UPageSection>

        <UPageSection :links="page.applications.links">
            <template #title>
                <span v-html="page.applications.title" />
            </template>
            <template #description>
                <span v-html="page.applications.description" />
            </template>
            <UPageGrid>
                <UPageCard
                    v-for="(item, index) in page.applications.items"
                    :key="index"
                    v-bind="item"
                    class="col-span-4 row-span-3"
                >
                    <template #leading>
                        <NuxtImg
                            :src="'/frappe/' + item.icon"
                            class="max-h-10"
                            loading="lazy"
                        />
                    </template>
                </UPageCard>
            </UPageGrid>
        </UPageSection>

        <UPageSection>
            <UPageCTA
                v-bind="page.cta"
                class="bg-amber-100/50 dark:bg-amber-800/50"
            />
        </UPageSection>
    </div>
</template>
