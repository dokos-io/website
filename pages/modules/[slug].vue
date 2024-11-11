<script setup lang="ts">
// import type { module } from '~/types'

const route = useRoute();
const {
    params: { slug },
} = useRoute();

const { t, locale } = useI18n({
    useScope: "local",
});

const localePath = useLocalePath();

const path_without_locale = route;
path_without_locale.path.replace(`/^(/${locale}\.)/,"")`, "");

const { data: module } = await useAsyncData(path_without_locale.path, () =>
    queryContent(`/${locale.value}/modules/${slug}`).findOne()
);

if (!module.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "module not found",
        fatal: true,
    });
}

const title = module.value.head?.title || module.value.title;
const description = module.value.head?.description || module.value.description;

useSeoMeta({
    titleTemplate: "%s · Module Dokos",
    title,
    description,
    ogDescription: description,
    ogTitle: `${title} · Module Dokos`,
});
</script>

<template>
    <UPage v-if="module">
        <UPageBody prose class="prose-lg dark:text-gray-300 mt-0">
            <ULandingHero
                :links="module.hero.links"
                orientation="vertical"
                :ui="{
                    wrapper: 'bg-gradient-to-b from-green-400/5 from-90%',
                }"
                v-if="module.hero"
            >
                <template #headline>
                    <UBadge
                        v-if="module.hero.headline"
                        :color="module.hero.headline.color || 'green'"
                        :variant="module.hero.headline.variant || 'subtle'"
                        size="lg"
                        class="relative rounded-full font-semibold"
                    >
                        <UIcon
                            v-if="module.hero.headline.left_icon"
                            :name="module.hero.headline.left_icon"
                            class="mr-1 w-4 h-4 pointer-events-none"
                        />
                        <NuxtLink
                            :to="module.hero.headline.to"
                            :target="module.hero.headline.target || '_self'"
                            class="focus:outline-none"
                            tabindex="-1"
                        >
                            <span class="absolute inset-0" aria-hidden="true" />
                        </NuxtLink>

                        {{ module.hero.headline.label }}

                        <UIcon
                            v-if="module.hero.headline.right_icon"
                            :name="module.hero.headline.right_icon"
                            class="ml-1 w-4 h-4 pointer-events-none"
                        />
                    </UBadge>
                </template>

                <template #title>
                    <span v-html="module.hero.title"></span>
                </template>

                <template #description>
                    <span v-html="module.hero.description"></span>
                </template>
                <template #default>
                    <div class="absolute top-[24px] left-[12px] hidden lg:flex">
                        <UTooltip :text="t('back_button')">
                            <UButton
                                :to="localePath('/modules')"
                                icon="i-ph-caret-left"
                                color="gray"
                                :ui="{ rounded: 'rounded-full' }"
                                size="lg"
                                class=""
                            />
                        </UTooltip>
                    </div>
                    <ClientOnly>
                        <HomeTetris/>
                    </ClientOnly>
                </template>
            </ULandingHero>

            <ULandingSection
                v-bind="module.bridge_before_colored_section"
                v-if="module.bridge_before_colored_section"
            >
                <template #title>
                    <span v-html="module.bridge_before_colored_section.title"></span>
                </template>

                <template #description>
                    <span v-html="module.bridge_before_colored_section.description"></span>
                </template>
            </ULandingSection>

            <ULandingSection
                v-bind="module.features_before_colored_section"
                v-if="module.features_before_colored_section"
            >
                <ULandingGrid
                    v-if="module.features_before_colored_section.cards"
                >
                    <ULandingCard
                        v-for="(feat, index) in module
                            .features_before_colored_section.cards"
                        :key="index"
                        v-bind="feat"
                    />
                </ULandingGrid>
            </ULandingSection>

            <ULandingSection
                v-bind="module.colored_section"
                v-if="module.colored_section"
                :ui="{
                    container: 'bg-blue-950 rounded-3xl p-5',
                    title: 'mt-2 text-green-500',
                    description: 'text-white',
                }"
            >
                <template #title>
                    <span v-html="module.colored_section.title"></span>
                </template>

                <template #description>
                    <span v-html="module.colored_section.description"></span>
                </template>

                <template #headline>
                    <UBadge
                        v-if="module.colored_section.badge"
                        :variant="
                            module.colored_section.badge.variant || 'subtle'
                        "
                        :size="module.colored_section.badge.size || 'lg'"
                        :color="module.colored_section.badge.color || 'primary'"
                        class="relative rounded-full font-semibold"
                    >
                        <UIcon
                            v-if="module.colored_section.badge.left_icon"
                            :name="module.colored_section.badge.left_icon"
                            class="mr-1 w-4 h-4 pointer-events-none"
                        />
                        <NuxtLink
                            :to="module.colored_section.badge.to"
                            target="_blank"
                            class="focus:outline-none"
                            tabindex="-1"
                        >
                            <span class="absolute inset-0" aria-hidden="true" />
                        </NuxtLink>

                        {{ module.colored_section.badge.label }}

                        <UIcon
                            v-if="module.colored_section.badge.right_icon"
                            :name="module.colored_section.badge.right_icon"
                            class="ml-1 w-4 h-4 pointer-events-none"
                        />
                    </UBadge>
                </template>

                <div
                    class="px-3 rounded-lg"
                    :class="[
                        module.colored_section.image_bg_color,
                        module.colored_section.align == 'left'
                            ? 'pl-8'
                            : 'pr-8',
                    ]"
                    v-if="
                        module.colored_section.image ||
                        module.colored_section.video
                    "
                >
                    <NuxtImg
                        :src="module.colored_section.image"
                        class="shadow-xl rounded"
                        v-if="module.colored_section.image"
                        loading="lazy"
                    />
                    <video
                        class="w-full shadow-xl rounded bg-white/75"
                        v-else-if="module.colored_section.video"
                        autoplay
                        loop
                        :class="[
                            module.colored_section.align == 'left'
                                ? 'ml-7'
                                : 'mr-7',
                            module.colored_section.image_bg_color
                                ? 'shadow-2xl'
                                : '',
                        ]"
                        :style="
                            module.colored_section.align == 'right' &&
                            'margin-left: -15px;'
                        "
                    >
                        <source
                            :src="module.colored_section.video"
                            type="video/mp4"
                        />
                    </video>
                </div>
                <Placeholder v-else class="bg-green-500" />
            </ULandingSection>

            <div v-if="module.main_features">
                <ULandingSection
                    v-for="(section, index) in module.main_features"
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
                        class="py-8 rounded-lg"
                        :class="[
                            section.image_bg_color,
                            section.align == 'left' ? 'pl-8' : 'pr-8',
                        ]"
                        v-if="section.image || section.video"
                    >
                        <NuxtImg
                            :src="section.image"
                            class="shadow-lg"
                            :class="
                                section.align == 'left'
                                    ? 'rounded-s-lg'
                                    : 'rounded-e-lg'
                            "
                            v-if="section.image"
                            loading="lazy"
                        />
                        <video
                            class="w-full shadow-xl rounded bg-white/75"
                            v-else-if="section.video"
                            autoplay
                            loop
                            :class="[
                                section.align == 'left' ? 'ml-7' : 'mr-7',
                                section.image_bg_color ? 'shadow-2xl' : '',
                            ]"
                            :style="
                                section.align == 'right' &&
                                'margin-left: -15px;'
                            "
                        >
                            <source :src="section.video" type="video/mp4" />
                        </video>
                    </div>
                    <Placeholder v-else />
                </ULandingSection>
            </div>

            <ULandingSection v-bind="module.bridge" v-if="module.bridge">
                <template #title>
                    <span v-html="module.bridge.title"></span>
                </template>

                <template #description>
                    <span v-html="module.bridge.description"></span>
                </template>
            </ULandingSection>

            <ULandingSection :title="module.carousel.title" v-if="module.carousel">
                <UCarousel
                    v-slot="{ item }"
                    :items="module.carousel.cards"
                    :ui="{
                                item: 'w-full',
                                container: 'rounded-3xl bg-sky-50 dark:bg-sky-600',
                                indicators: {
                                    active: 'bg-green-500 dark:bg-green-400',
                                    inactive: 'bg-stone-300 dark:bg-stone-900'
                                }
                            }"
                    indicators
                >
                    <div class="text-center mx-auto p-10">
                        <h2 class="font-bold text-xl"><span v-html="item.title"></span></h2>
                        <p class="pb-8">
                            <span v-html="item.description"></span>
                        </p>
                    </div>
                </UCarousel>
            </ULandingSection>

            <ULandingSection
                v-bind="module.bridge_after_carousel"
                v-if="module.bridge_after_carousel"
            />

            <div v-if="module.features">
                <ULandingSection
                    v-for="(feat, index) in module.features"
                    :key="index"
                    v-bind="feat"
                    :ui="{ title: 'mt-2' }"
                >
                    <template #headline>
                        <UBadge
                            v-if="feat.badge"
                            :color="feat.badge.color || 'green'"
                            :variant="feat.badge.variant || 'subtle'"
                            size="lg"
                            class="relative rounded-full font-semibold"
                        >
                            <UIcon
                                v-if="feat.badge.left_icon"
                                :name="feat.badge.left_icon"
                                class="mr-1 w-4 h-4 pointer-events-none"
                            />
                            <NuxtLink
                                :to="feat.badge.to"
                                target="_blank"
                                class="focus:outline-none"
                                tabindex="-1"
                            >
                                <span
                                    class="absolute inset-0"
                                    aria-hidden="true"
                                />
                            </NuxtLink>

                            {{ feat.badge.label }}

                            <UIcon
                                v-if="feat.badge.right_icon"
                                :name="feat.badge.right_icon"
                                class="ml-1 w-4 h-4 pointer-events-none"
                            />
                        </UBadge>
                    </template>

                    <template #description>
                        <span v-html="feat.description"></span>
                    </template>

                    <div
                        class="pt-24 pb-12 rounded-lg"
                        :class="[
                            feat.image_bg_color,
                            feat.align == 'left' ? 'pl-8 mr-7' : 'pr-8 ml-7',
                        ]"
                    >
                        <NuxtImg
                            :src="feat.image"
                            class="w-full rounded-md bg-white/75"
                            placeholder
                            v-if="feat.image"
                            :class="[
                                feat.align == 'left' ? 'ml-7' : 'mr-7',
                                feat.image_bg_color ? 'shadow-2xl' : '',
                            ]"
                            :style="
                                feat.align == 'right' && 'margin-left: -15px;'
                            "
                            loading="lazy"
                        />
                        <video
                            class="w-full rounded-md bg-white/75"
                            v-else-if="feat.video"
                            autoplay
                            loop
                            :class="[
                                feat.align == 'left' ? 'ml-7' : 'mr-7',
                                feat.image_bg_color ? 'shadow-2xl' : '',
                            ]"
                            :style="
                                feat.align == 'right' && 'margin-left: -15px;'
                            "
                        >
                            <source :src="feat.video" type="video/mp4" />
                        </video>
                        <Placeholder v-else />
                    </div>
                </ULandingSection>
            </div>

            <ULandingSection v-bind="module.bottom_section">
                <ULandingGrid v-if="module.bottom_section?.cards">
                    <ULandingCard
                        v-for="(feat, index) in module.bottom_section.cards"
                        :key="index"
                        v-bind="feat"
                    />
                </ULandingGrid>

                <UButton
                    v-bind="module.plus_button"
                    class="max-w-fit mx-auto"
                    v-if="module.plus_button"
                />
            </ULandingSection>

            <UContainer>
                <ULandingCTA
                    v-bind="module.bottom_cta"
                    :class="module.bottom_cta.class"
                    v-if="module.bottom_cta"
                >
                    <template #title>
                        <span v-html="module.bottom_cta.title"></span>
                    </template>

                    <template #description>
                        <span v-html="module.bottom_cta.description"></span>
                    </template>
                </ULandingCTA>
            </UContainer>
        </UPageBody>
    </UPage>
</template>

<i18n lang="yaml">
  en:
    back_button: "Back to modules"
    modules: Modules
    website: Website
    useful_links: Liens utiles
    resources: Resources
  fr:
    back_button: "Retour aux modules"
    modules: Modules
    website: Site web
    useful_links: Liens utiles
    resources: Ressources
</i18n>