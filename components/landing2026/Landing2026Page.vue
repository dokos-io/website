<script setup lang="ts">
/**
 * The content-driven pages (éditeur, ingénierie, souveraineté, exploitation,
 * écosystème, solutions) in the 2026 design. Same YAML as the former LandingPage: every
 * block is optional and rendered only when the content file declares it.
 * Cream paper, huge uppercase titles with a coral dot, ruled numbered lists,
 * Dokos blue and deep blue cards inset from the edges; icons are left out.
 * The page opts into the 2026 header and footer with
 * definePageMeta({ design2026: true, colorMode: 'light' }).
 */
const props = defineProps<{ page: any }>()

const page = computed(() => props.page)

type Link = { label: string; to: string; target?: string }
const isExternal = (to: string) => /^https?:/.test(to)
const target = (link: Link) => link.target || (isExternal(link.to) ? '_blank' : undefined)
const num = (i: number) => String(i + 1).padStart(2, '0')
// YAML titles may end with a period; the coral dot replaces it.
const clean = (title?: string) => (title || '').trim().replace(/\.(\s*(<\/[a-z]+>)*)$/i, '$1')
const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
    <div v-if="page" class="h26 overflow-x-clip bg-paper text-dokos-500">
        <!-- Optional campaign bar. -->
        <NuxtLink
            v-if="page.announcement"
            :to="page.announcement.to"
            class="block py-2.5 text-center font-typed text-sm hover:underline"
        >
            {{ page.announcement.label }}<span v-if="page.announcement.cta" class="ml-2 font-bold">{{ page.announcement.cta }} →</span>
        </NuxtLink>

        <Landing2026Hero
            v-if="page.hero"
            :headline="page.hero.headline"
            :title="page.hero.title"
            :description="page.hero.description"
            :links="page.hero.links"
        />

        <!-- Operating facts, as a ruled row of figures. -->
        <section v-if="page.proof" class="mx-auto max-w-[1360px] px-4 pt-16 sm:px-8 sm:pt-20">
            <dl class="h26-reveal grid gap-x-10 sm:grid-cols-3">
                <div v-for="(item, i) in page.proof.items" :key="i" class="flex flex-col gap-2 border-t-[1.5px] border-dokos-500 py-6">
                    <dt class="font-typed text-sm text-stone-600">{{ item.label }}</dt>
                    <dd class="text-4xl font-extrabold tracking-[-0.03em] tabular-nums">{{ item.value }}</dd>
                    <dd v-if="item.note" class="text-stone-600">{{ item.note }}</dd>
                </div>
            </dl>
        </section>

        <!-- AI assistants that connect to Dokos AI (IA page). -->
        <section v-if="page.assistants" class="mx-auto max-w-[1360px] px-4 py-24 sm:px-8 sm:py-32">
            <AiAssistants :block="page.assistants" />
        </section>

        <!-- Logo wall (tiers-lieux page). -->
        <section v-if="page.logos" class="mx-auto flex max-w-[1360px] flex-col gap-10 px-4 py-20 sm:px-8">
            <p class="h26-reveal font-typed text-lg">{{ page.logos.title }}</p>
            <div class="h26-reveal flex flex-wrap items-center gap-x-12 gap-y-8">
                <UIcon v-for="icon in page.logos.icons" :key="icon" :name="icon" class="size-14 shrink-0 text-stone-500" />
                <AppImage v-for="image in page.logos.images" :key="image" :src="image" class="max-h-16 w-auto" loading="lazy" />
            </div>
        </section>

        <!-- Emphasis band, in the deep blue card. -->
        <section v-if="page.colored_section" class="px-2 py-10 sm:px-6 lg:px-14">
            <div class="rounded-2xl bg-dokos-900 text-white">
                <div
                    class="mx-auto flex max-w-[1360px] flex-wrap items-center gap-12 px-4 py-20 sm:px-8 sm:py-24"
                    :class="{ 'flex-row-reverse': page.colored_section.align === 'left' }"
                >
                    <div class="flex min-w-0 flex-[1_1_480px] flex-col gap-6">
                        <h2 class="h26-reveal-x text-[clamp(2.25rem,4.5vw,3.75rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] [&_.text-primary]:text-inherit">
                            <span v-html="clean(page.colored_section.title)" /><span class="text-accent">.</span>
                        </h2>
                        <p class="h26-reveal text-lg leading-relaxed text-dokos-100" v-html="page.colored_section.description" />
                    </div>
                    <div v-if="page.colored_section.image || page.colored_section.video" class="h26-reveal min-w-0 flex-[1_1_420px]">
                        <AppImage v-if="page.colored_section.image" :src="page.colored_section.image" class="w-full rounded-xl" loading="lazy" />
                        <InViewVideo v-else class="w-full rounded-xl" :src="page.colored_section.video" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Commercial lanes (kept for compatibility; no page uses them today). -->
        <section v-if="page.lanes" class="mx-auto flex max-w-[1360px] flex-col gap-12 px-4 py-24 sm:px-8">
            <Landing2026Heading :title="page.lanes.title" :description="page.lanes.description" />
            <div v-for="lane in page.lanes.items" :key="lane.id" class="h26-reveal bg-white px-6 py-8 shadow-[0_18px_40px_rgba(43,42,39,0.16)] sm:px-10">
                <h3 class="text-2xl font-extrabold">{{ lane.name }}</h3>
                <p class="mt-1 text-stone-600">{{ lane.tagline }}</p>
                <p v-if="lane.footnote" class="mt-4 text-sm text-stone-600">{{ lane.footnote }}</p>
            </div>
        </section>

        <!-- What we operate / what the offer covers: a ruled numbered list. -->
        <section v-if="page.scope" class="mx-auto flex max-w-[1360px] flex-col gap-12 px-4 py-24 sm:px-8 sm:py-32">
            <Landing2026Heading :title="page.scope.title" :description="page.scope.description" />
            <ol class="h26-reveal grid gap-x-10" :class="page.scope.items.length % 3 === 0 || page.scope.items.length > 4 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'">
                <li v-for="(item, i) in page.scope.items" :key="i" class="border-t-[1.5px] border-dokos-500">
                    <component
                        :is="item.to ? NuxtLink : 'div'"
                        :to="item.to"
                        class="grid h-full grid-cols-[2.5rem_1fr] gap-x-4 py-6"
                        :class="{ 'group': item.to }"
                    >
                        <span class="font-typed text-lg text-accent">{{ num(i) }}</span>
                        <span class="flex flex-col gap-2">
                            <b class="text-2xl font-extrabold tracking-[-0.02em] group-hover:underline">{{ item.title }}<template v-if="item.to"> →</template></b>
                            <span class="text-lg leading-relaxed text-stone-600">{{ item.description }}</span>
                            <span v-if="item.badge" class="font-typed text-sm text-dokos-500">{{ item.badge }}</span>
                        </span>
                    </component>
                </li>
            </ol>
            <div v-if="page.scope.links?.length" class="flex flex-wrap gap-x-8 gap-y-2">
                <NuxtLink v-for="link in page.scope.links" :key="link.label" :to="link.to" :target="target(link)" class="h26-reveal w-fit py-2 font-bold hover:underline">
                    {{ link.label }} →
                </NuxtLink>
            </div>
        </section>

        <!-- The contractual SLA tables, each on a white sheet. -->
        <section v-if="page.guarantees" class="mx-auto flex max-w-[1360px] flex-col gap-12 px-4 py-24 sm:px-8 sm:py-32">
            <Landing2026Heading :title="page.guarantees.title" :description="page.guarantees.description" />
            <div class="grid gap-8 lg:grid-cols-2">
                <div
                    v-for="(level, i) in page.guarantees.levels"
                    :key="i"
                    class="h26-reveal flex flex-col gap-5 bg-white px-6 py-8 shadow-[0_18px_40px_rgba(43,42,39,0.16)] sm:px-9"
                >
                    <div class="flex flex-wrap items-baseline justify-between gap-3">
                        <h3 class="text-2xl font-extrabold tracking-[-0.02em]">{{ level.name }}</h3>
                        <span v-if="level.badge" class="font-typed text-sm">{{ level.badge }}</span>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <caption class="sr-only">{{ level.name }}</caption>
                            <thead>
                                <tr class="font-typed text-sm text-stone-600">
                                    <th scope="col" class="py-2 pr-4 text-left font-normal">{{ page.guarantees.labels?.anomaly }}</th>
                                    <th scope="col" class="px-2 py-2 text-right font-normal">{{ page.guarantees.labels?.intervention }}</th>
                                    <th scope="col" class="py-2 pl-2 text-right font-normal">{{ page.guarantees.labels?.resolution }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row, j) in level.rows" :key="j" class="border-t-[1.5px] border-dokos-500/25">
                                    <th scope="row" class="py-3 pr-4 text-left font-bold">{{ row.type }}</th>
                                    <td class="px-2 py-3 text-right tabular-nums">{{ row.intervention }}</td>
                                    <td class="py-3 pl-2 text-right tabular-nums">{{ row.resolution }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <p v-if="page.guarantees.note" class="h26-reveal max-w-3xl text-stone-600">{{ page.guarantees.note }}</p>
        </section>

        <!-- How the service is actually run: ruled list in two columns. -->
        <section v-if="page.operations" class="mx-auto flex max-w-[1360px] flex-col gap-12 px-4 py-24 sm:px-8 sm:py-32">
            <Landing2026Heading :title="page.operations.title" :description="page.operations.description" />
            <ol class="h26-reveal grid gap-x-10 lg:grid-cols-2">
                <li v-for="(item, i) in page.operations.items" :key="i" class="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t-[1.5px] border-dokos-500 py-6">
                    <span class="font-typed text-lg text-accent">{{ num(i) }}</span>
                    <span class="flex flex-col gap-2">
                        <b class="text-2xl font-extrabold tracking-[-0.02em]">{{ item.title }}</b>
                        <span class="text-lg leading-relaxed text-stone-600">{{ item.description }}</span>
                    </span>
                </li>
            </ol>
            <div v-if="page.operations.links?.length" class="h26-reveal flex flex-wrap gap-3">
                <NuxtLink
                    v-for="link in page.operations.links"
                    :key="link.label"
                    :to="link.to"
                    :target="target(link)"
                    class="h26-lift rounded-lg bg-dokos-500 px-6 py-3.5 font-bold text-white"
                >
                    {{ link.label }}
                </NuxtLink>
            </div>
        </section>

        <!-- The no-lock-in answer, in the deep blue card. -->
        <section v-if="page.reversibility" class="px-2 pb-10 sm:px-6 sm:pb-14 lg:px-14">
            <div class="rounded-2xl bg-dokos-900 text-white">
                <div class="mx-auto flex max-w-[1360px] flex-col gap-12 px-4 py-24 sm:px-8 sm:py-28">
                    <Landing2026Heading :title="page.reversibility.title" :description="page.reversibility.description" tone="dark" />
                    <ol class="h26-reveal grid gap-x-10" :class="page.reversibility.items.length === 4 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'">
                        <li v-for="(item, i) in page.reversibility.items" :key="i" class="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t-[1.5px] border-white/40 py-6">
                            <span class="font-typed text-lg text-accent">{{ num(i) }}</span>
                            <span class="flex flex-col gap-2">
                                <b class="text-2xl font-extrabold tracking-[-0.02em]">{{ item.title }}</b>
                                <span class="text-lg leading-relaxed text-dokos-100">{{ item.description }}</span>
                            </span>
                        </li>
                    </ol>
                    <div v-if="page.reversibility.links?.length" class="flex flex-wrap gap-x-8 gap-y-2">
                        <NuxtLink v-for="link in page.reversibility.links" :key="link.label" :to="link.to" :target="target(link)" class="w-fit py-2 font-bold hover:underline">
                            {{ link.label }} →
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>

        <!-- Narrative sections: text beside an image, alternating sides. -->
        <section
            v-for="(section, i) in page.sections"
            :key="`section-${i}`"
            class="mx-auto flex max-w-[1360px] flex-wrap items-center gap-x-16 gap-y-12 px-4 py-20 sm:px-8 sm:py-28"
            :class="{ 'flex-row-reverse': section.align === 'left' }"
        >
            <div class="flex min-w-0 flex-col gap-6" :class="section.image || section.video ? 'flex-[1_1_480px]' : 'flex-[1_1_100%]'">
                <h2 class="h26-reveal-x text-[clamp(2.25rem,4.5vw,3.75rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] [&_.text-primary]:text-inherit">
                    <span v-html="clean(section.title)" /><span class="text-accent">.</span>
                </h2>
                <p class="h26-reveal max-w-2xl text-lg leading-relaxed text-stone-600 [&_strong]:font-bold [&_strong]:text-dokos-500" v-html="section.description" />
                <ul v-if="section.features?.length" class="h26-reveal">
                    <li v-for="feature in section.features" :key="feature.title" class="flex flex-col gap-1 border-t-[1.5px] border-dokos-500/30 py-4">
                        <b class="text-lg font-extrabold">{{ feature.title }}</b>
                        <span class="leading-relaxed text-stone-600">{{ feature.description }}</span>
                    </li>
                </ul>
                <div v-if="section.links?.length" class="flex flex-wrap gap-x-8 gap-y-2">
                    <NuxtLink v-for="link in section.links" :key="link.label" :to="link.to" :target="target(link)" class="h26-reveal w-fit py-2 font-bold hover:underline">
                        {{ link.label }} →
                    </NuxtLink>
                </div>
            </div>
            <div v-if="section.image || section.video" class="h26-reveal min-w-0 flex-[1_1_480px]">
                <AppImage v-if="section.image" :src="section.image" class="w-full rounded-xl shadow-[0_18px_40px_rgba(43,42,39,0.16)]" loading="lazy" />
                <InViewVideo v-else class="w-full rounded-xl shadow-[0_18px_40px_rgba(43,42,39,0.16)]" :src="section.video" />
            </div>
        </section>

        <!-- Short value statements, ruled in three columns. -->
        <section v-if="page.carousel" class="mx-auto max-w-[1360px] px-4 py-20 sm:px-8">
            <ol class="h26-reveal grid gap-x-10 lg:grid-cols-3">
                <li v-for="(item, i) in page.carousel" :key="i" class="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t-[1.5px] border-dokos-500 py-6">
                    <span class="font-typed text-lg text-accent">{{ num(i) }}</span>
                    <span class="flex flex-col gap-2">
                        <b class="text-2xl font-extrabold tracking-[-0.02em]">{{ item.title }}</b>
                        <span class="text-lg leading-relaxed text-stone-600">{{ item.description }}</span>
                    </span>
                </li>
            </ol>
        </section>

        <!-- Apps of the theme (ecosystem pages), each on a white sheet. -->
        <section v-if="page.modules" class="mx-auto flex max-w-[1360px] flex-col gap-12 px-4 py-24 sm:px-8 sm:py-32">
            <Landing2026Heading :title="page.modules.title" :description="page.modules.description" />
            <div class="h26-reveal grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <component
                    :is="item.to ? NuxtLink : 'div'"
                    v-for="(item, i) in page.modules.items"
                    :key="i"
                    :to="item.to"
                    class="flex flex-col gap-3 bg-white p-6 shadow-[0_12px_30px_rgba(43,42,39,0.12)]"
                    :class="{ 'h26-lift': item.to }"
                >
                    <div class="flex items-center gap-3">
                        <img v-if="item.logo" :src="item.logo.light" alt="" class="size-10 rounded-sm" loading="lazy">
                        <UIcon v-else :name="item.icon || 'i-heroicons-cube'" class="size-9 shrink-0 text-dokos-500" />
                        <b class="text-2xl font-extrabold tracking-[-0.02em]">{{ item.title }}</b>
                    </div>
                    <p class="leading-relaxed text-stone-600">{{ item.description }}</p>
                    <AppImage v-if="item.screenshot" :src="item.screenshot" class="mt-auto w-full rounded-lg" loading="lazy" />
                </component>
            </div>
            <div v-if="page.modules.links?.length" class="flex flex-wrap gap-x-8 gap-y-2">
                <NuxtLink v-for="link in page.modules.links" :key="link.label" :to="link.to" :target="target(link)" class="w-fit py-2 font-bold hover:underline">
                    {{ link.label }} →
                </NuxtLink>
            </div>
        </section>

        <Landing2026Faq v-if="page.faq" :title="page.faq.title" :description="page.faq.description" :items="page.faq.items" />

        <Landing2026Cta v-if="page.cta" :title="page.cta.title" :description="page.cta.description" :links="page.cta.links" />
    </div>
</template>
