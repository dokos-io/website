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
        <!-- Content-driven; used to be hardcoded in this template. -->
        <NuxtLink
            v-if="page.announcement"
            :to="page.announcement.to"
            class="block bg-sand-200 dark:bg-stone-800 py-2.5 text-center text-sm text-highlighted hover:bg-sand-300 dark:hover:bg-stone-700 transition-colors"
        >
            <span class="font-medium">{{ page.announcement.label }}</span>
            <span
                v-if="page.announcement.cta"
                class="ml-2 text-primary underline underline-offset-4"
            >
                {{ page.announcement.cta }}
            </span>
        </NuxtLink>

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
                    class="font-medium"
                >
                    <UIcon
                        v-if="page.hero.headline.icon"
                        :name="page.hero.headline.icon"
                        class="mr-1.5 size-4"
                    />
                    {{ page.hero.headline.label }}
                </UBadge>
            </template>

            <template #title>
                <span v-html="page.hero.title" />
            </template>

            <template #description>
                <span v-html="page.hero.description" />
            </template>

            <template #default>
                <NuxtImg
                    v-if="page.hero.image"
                    :src="'/home/' + page.hero.image"
                    class="w-full rounded-md"
                    loading="lazy"
                    placeholder
                />

                <ClientOnly>
                    <HomeTetris />
                </ClientOnly>
            </template>
        </UPageHero>

        <!-- Operating facts rather than vanity counts. -->
        <UPageSection v-if="page.proof" class="pt-10 sm:pt-16">
            <dl
                class="grid grid-cols-1 sm:grid-cols-3 gap-px bg-default/10 rounded-lg overflow-hidden ring ring-default"
            >
                <div
                    v-for="(item, index) in page.proof.items"
                    :key="index"
                    class="bg-sand-100 dark:bg-stone-900 px-6 py-7"
                >
                    <dt class="text-sm text-muted">{{ item.label }}</dt>
                    <dd
                        class="mt-2 text-3xl font-semibold text-highlighted tabular-nums"
                    >
                        {{ item.value }}
                    </dd>
                    <dd v-if="item.note" class="mt-1.5 text-sm text-muted">
                        {{ item.note }}
                    </dd>
                </div>
            </dl>
        </UPageSection>

        <UPageSection
            v-for="(section, index) in page.sections"
            :key="index"
            :links="section.links"
            :features="section.features"
            orientation="horizontal"
            :reverse="section.align === 'left'"
        >
            <template #title>
                <span v-html="section.title" />
            </template>
            <template #description>
                <span v-html="section.description" />
            </template>
            <NuxtImg
                v-if="section.image"
                :src="section.image"
                class="rounded-lg ring ring-default"
                loading="lazy"
            />
            <Placeholder v-else />
        </UPageSection>

        <UPageSection>
            <UPageLogos :title="page.integrations.title" class="justify-center">
                <UIcon
                    v-for="icon in page.integrations.icons"
                    :key="icon"
                    :name="icon"
                    class="size-16 shrink-0 text-muted"
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
            :title="page.modules.title"
            :description="page.modules.description"
            :links="page.modules.links"
            class="bg-sand-200/60 dark:bg-stone-900"
        >
            <UPageGrid class="sm:grid-cols-3 xl:grid-cols-4">
                <UPageCard
                    v-for="(item, index) in sorted_modules"
                    :key="index"
                    v-bind="item"
                    orientation="vertical"
                    variant="subtle"
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
            <UPageGrid class="sm:grid-cols-2 lg:grid-cols-3">
                <UPageCard
                    v-for="(item, index) in page.applications.items"
                    :key="index"
                    v-bind="item"
                    variant="outline"
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
                variant="subtle"
                class="bg-sand-200 dark:bg-stone-900 ring ring-default"
            />
        </UPageSection>
    </div>
</template>
