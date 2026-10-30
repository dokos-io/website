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

// Hero: the point the visitor hovers highlights the matching layer of HomeStack.
const stackFocus = ref<"core" | "apps" | "access" | null>(null);
const POINT_MARKS: Record<string, string> = {
    core: "bg-dokos-500",
    apps: "bg-white dark:bg-stone-900 bg-[radial-gradient(circle,#FF6B6B_3px,transparent_3.5px),radial-gradient(circle,#8C7AE6_3px,transparent_3.5px),radial-gradient(circle,#4AA3DF_3px,transparent_3.5px),radial-gradient(circle,#E0A43A_3px,transparent_3.5px)] bg-[length:10px_10px] bg-[position:2px_2px,9px_2px,2px_9px,9px_9px] bg-no-repeat",
    access: "bg-accent",
};

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
            :orientation="page.hero.stack ? 'horizontal' : 'vertical'"
            class="relative z-[1]"
            :class="page.hero.stack ? '' : 'pb-0 sm:pb-0 md:pb-0'"
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
                <!-- One line per layer of the stack; hovering a line highlights its layer. -->
                <ul v-if="page.hero.points" class="grid gap-1 text-left">
                    <li
                        v-for="point in page.hero.points"
                        :key="point.layer"
                        class="grid grid-cols-[1.75rem_1fr] gap-3 -mx-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-sand-200 dark:hover:bg-stone-800"
                        @mouseenter="stackFocus = point.layer"
                        @mouseleave="stackFocus = null"
                    >
                        <span
                            class="mt-1 size-7 rounded-md border-[2.5px] border-dokos-500 dark:border-dokos-300"
                            :class="POINT_MARKS[point.layer]"
                            aria-hidden="true"
                        />
                        <span>
                            <strong class="block text-lg text-highlighted">{{ point.title }}</strong>
                            <span class="block text-base leading-snug mt-0.5">{{ point.description }}</span>
                        </span>
                    </li>
                </ul>
                <span v-else v-html="page.hero.description" />
            </template>

            <template #default>
                <HomeStack
                    v-if="page.hero.stack"
                    :stack="page.hero.stack"
                    :focus="stackFocus"
                />
                <AppImage
                    v-else-if="page.hero.image"
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

        <!-- The positioning sentence and the three pillars behind it. -->
        <UPageSection
            v-if="page.pillars"
            :description="page.pillars.description"
            class="bg-sand-200/60 dark:bg-stone-900"
        >
            <template #title>
                <span v-html="page.pillars.title" />
            </template>
            <UPageGrid class="sm:grid-cols-2 lg:grid-cols-3">
                <UPageCard
                    v-for="(item, index) in page.pillars.items"
                    :key="index"
                    v-bind="item"
                    orientation="vertical"
                    variant="subtle"
                />
            </UPageGrid>
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
            <AppImage
                v-if="section.image"
                :src="section.image"
                class="rounded-lg ring ring-default"
                loading="lazy"
            />
            <Placeholder v-else />
        </UPageSection>

        <UPageSection v-if="page.integrations">
            <UPageLogos :title="page.integrations.title" class="justify-center">
                <UIcon
                    v-for="icon in page.integrations.icons"
                    :key="icon"
                    :name="icon"
                    class="size-16 shrink-0 text-muted"
                />
                <AppImage
                    v-for="image in page.integrations.images"
                    :key="image"
                    :src="image"
                    class="max-h-20"
                    loading="lazy"
                />
            </UPageLogos>
        </UPageSection>

        <UPageSection
            v-if="page.modules"
            :title="page.modules.title"
            :description="page.modules.description"
            :links="page.modules.links"
            class="bg-sand-200/60 dark:bg-stone-900"
        >
            <UPageGrid class="sm:grid-cols-2 lg:grid-cols-3">
                <UPageCard
                    v-for="(item, index) in sorted_modules"
                    :key="index"
                    v-bind="item"
                    orientation="vertical"
                    variant="subtle"
                />
            </UPageGrid>
        </UPageSection>

        <UPageSection v-if="page.applications" :links="page.applications.links">
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
                        <AppImage
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
