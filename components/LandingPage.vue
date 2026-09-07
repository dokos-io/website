<script setup lang="ts">
/**
 * Shared renderer for the positioning pages (exploitation, souveraineté,
 * éditeur, ingénierie…). Every block is optional and rendered only when the
 * content file declares it, so a page is defined entirely by its YAML.
 *
 * Content blocks are `passthrough()` in `content.config.ts` — a mistyped key
 * renders nothing instead of failing the build. Check pages visually.
 */
const props = defineProps<{ page: any }>()

const page = computed(() => props.page)
</script>

<template>
  <div v-if="page">
    <!-- Optional campaign bar, content-driven (it used to be hardcoded). -->
    <NuxtLink
      v-if="page.announcement"
      :to="page.announcement.to"
      class="block bg-sand-200 dark:bg-stone-800 py-2.5 text-center text-sm text-highlighted hover:bg-sand-300 dark:hover:bg-stone-700 transition-colors"
    >
      <span class="font-medium">{{ page.announcement.label }}</span>
      <span v-if="page.announcement.cta" class="ml-2 text-primary underline underline-offset-4">
        {{ page.announcement.cta }}
      </span>
    </NuxtLink>

    <UPageHero
      v-if="page.hero"
      :links="page.hero.links"
      orientation="vertical"
    >
      <template v-if="page.hero.headline" #headline>
        <UBadge variant="subtle" size="lg" class="font-medium">
          <UIcon v-if="page.hero.headline.icon" :name="page.hero.headline.icon" class="mr-1.5 size-4" />
          {{ page.hero.headline.label }}
        </UBadge>
      </template>

      <template #title>
        <span v-html="page.hero.title" />
      </template>

      <template #description>
        <span v-html="page.hero.description" />
      </template>
    </UPageHero>

    <!-- Operating facts. Deliberately not customer logos. -->
    <UPageSection v-if="page.proof" class="py-8 sm:py-12">
      <dl class="grid grid-cols-1 sm:grid-cols-3 gap-px bg-default/10 rounded-lg overflow-hidden ring ring-default">
        <div
          v-for="(item, i) in page.proof.items"
          :key="i"
          class="bg-sand-100 dark:bg-stone-900 px-6 py-7"
        >
          <dt class="text-sm text-muted">{{ item.label }}</dt>
          <dd class="mt-2 text-3xl font-semibold text-highlighted tabular-nums">{{ item.value }}</dd>
          <dd v-if="item.note" class="mt-1.5 text-sm text-muted">{{ item.note }}</dd>
        </div>
      </dl>
    </UPageSection>

    <!-- Logo wall (used by the sector pages). -->
    <UPageSection v-if="page.logos">
      <UPageLogos :title="page.logos.title" class="justify-center">
        <UIcon
          v-for="icon in page.logos.icons"
          :key="icon"
          :name="icon"
          class="size-16 shrink-0 text-muted"
        />
        <NuxtImg
          v-for="image in page.logos.images"
          :key="image"
          :src="image"
          class="max-h-20"
          loading="lazy"
        />
      </UPageLogos>
    </UPageSection>

    <!-- Emphasis band. Was a blue-950/orange-200 slab; now the brand petrol. -->
    <UPageSection
      v-if="page.colored_section"
      orientation="horizontal"
      :reverse="page.colored_section.align === 'left'"
      :ui="{
        container: 'bg-dokos-900 rounded-2xl p-6 sm:p-10',
        title: 'text-white',
        description: 'text-sand-200',
      }"
    >
      <template #title>
        <span v-html="page.colored_section.title" />
      </template>
      <template #description>
        <span v-html="page.colored_section.description" />
      </template>
      <NuxtImg
        v-if="page.colored_section.image"
        :src="page.colored_section.image"
        class="rounded-lg shadow-lg"
        loading="lazy"
      />
      <video
        v-else-if="page.colored_section.video"
        class="w-full rounded-lg shadow-lg"
        autoplay
        loop
        muted
        playsinline
      >
        <source :src="page.colored_section.video" type="video/mp4">
      </video>
      <Placeholder v-else />
    </UPageSection>

    <!-- Commercial lanes. Deliberately stacked and separated rather than shown
         as competing columns: the self-serve tiers carry no service guarantee
         and must not read as the bottom rung of the operated offer. -->
    <UPageSection
      v-if="page.lanes"
      :title="page.lanes.title || undefined"
      :description="page.lanes.description"
    >
      <div class="space-y-10">
        <section
          v-for="lane in page.lanes.items"
          :key="lane.id"
          class="rounded-lg ring bg-default overflow-hidden"
          :class="lane.highlight ? 'ring-2 ring-primary' : 'ring-default'"
        >
          <div class="px-6 py-5 border-b border-default">
            <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 class="text-lg font-semibold text-highlighted">{{ lane.name }}</h3>
              <UBadge v-if="lane.highlight" label="Avec engagements" variant="subtle" size="sm" />
            </div>
            <p class="mt-1 text-muted">{{ lane.tagline }}</p>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-sm min-w-lg">
              <thead>
                <tr class="text-muted">
                  <th
                    v-for="(col, i) in lane.columns"
                    :key="i"
                    scope="col"
                    class="font-medium px-6 py-3"
                    :class="i === 0 ? 'text-left' : 'text-right'"
                  >
                    {{ col }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in lane.rows" :key="i" class="border-t border-default">
                  <template v-for="(cell, j) in row" :key="j">
                    <th
                      v-if="j === 0"
                      scope="row"
                      class="text-left font-medium text-highlighted px-6 py-3 whitespace-nowrap"
                    >
                      {{ cell }}
                    </th>
                    <td v-else class="text-right px-6 py-3 tabular-nums">{{ cell }}</td>
                  </template>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="px-6 py-5 border-t border-default bg-sand-100 dark:bg-stone-900 space-y-4">
            <p v-if="lane.caution" class="text-sm text-muted">{{ lane.caution }}</p>
            <p v-if="lane.footnote" class="text-sm text-muted">{{ lane.footnote }}</p>
            <UButton v-if="lane.cta" v-bind="lane.cta" />
          </div>
        </section>
      </div>
    </UPageSection>

    <!-- What we operate / what the offer covers. -->
    <UPageSection
      v-if="page.scope"
      :title="page.scope.title"
      :description="page.scope.description"
      :links="page.scope.links"
    >
      <UPageGrid class="sm:grid-cols-2 lg:grid-cols-3">
        <UPageCard
          v-for="(item, i) in page.scope.items"
          :key="i"
          :title="item.title"
          :description="item.description"
          :icon="item.icon"
          variant="subtle"
        >
          <template v-if="item.badge" #footer>
            <UBadge :label="item.badge" variant="subtle" size="sm" />
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageSection>

    <!-- The contractual SLA table. This is the differentiating block. -->
    <UPageSection
      v-if="page.guarantees"
      :title="page.guarantees.title"
      :description="page.guarantees.description"
      class="bg-sand-200/60 dark:bg-stone-900"
    >
      <div class="grid gap-8 lg:grid-cols-2">
        <div
          v-for="(level, i) in page.guarantees.levels"
          :key="i"
          class="rounded-lg ring ring-default bg-default overflow-hidden"
        >
          <div class="px-5 py-4 border-b border-default flex items-center justify-between gap-3">
            <h3 class="font-semibold text-highlighted">{{ level.name }}</h3>
            <UBadge v-if="level.badge" :label="level.badge" variant="subtle" size="sm" />
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <caption class="sr-only">{{ level.name }}</caption>
              <thead>
                <tr class="text-muted">
                  <th scope="col" class="text-left font-medium px-5 py-3">
                    {{ page.guarantees.labels?.anomaly }}
                  </th>
                  <th scope="col" class="text-right font-medium px-5 py-3">
                    {{ page.guarantees.labels?.intervention }}
                  </th>
                  <th scope="col" class="text-right font-medium px-5 py-3">
                    {{ page.guarantees.labels?.resolution }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, j) in level.rows"
                  :key="j"
                  class="border-t border-default"
                >
                  <th scope="row" class="text-left font-normal text-highlighted px-5 py-3">
                    {{ row.type }}
                  </th>
                  <td class="text-right tabular-nums px-5 py-3">{{ row.intervention }}</td>
                  <td class="text-right tabular-nums px-5 py-3">{{ row.resolution }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <p v-if="page.guarantees.note" class="mt-6 text-sm text-muted max-w-3xl">
        {{ page.guarantees.note }}
      </p>
    </UPageSection>

    <!-- How the service is actually run. -->
    <UPageSection
      v-if="page.operations"
      :title="page.operations.title"
      :description="page.operations.description"
    >
      <div class="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        <div v-for="(item, i) in page.operations.items" :key="i" class="flex gap-4">
          <UIcon :name="item.icon" class="size-5 shrink-0 mt-1 text-primary" />
          <div>
            <p class="font-medium text-highlighted">{{ item.title }}</p>
            <p class="mt-1 text-sm text-muted">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </UPageSection>

    <!-- The no-lock-in answer procurement asks for. -->
    <UPageSection
      v-if="page.reversibility"
      :title="page.reversibility.title"
      :description="page.reversibility.description"
      :links="page.reversibility.links"
      class="bg-sand-200/60 dark:bg-stone-900"
    >
      <UPageGrid class="sm:grid-cols-2 lg:grid-cols-4">
        <UPageCard
          v-for="(item, i) in page.reversibility.items"
          :key="i"
          :title="item.title"
          :description="item.description"
          :icon="item.icon"
          variant="outline"
        />
      </UPageGrid>
    </UPageSection>

    <!-- Narrative sections with imagery, same shape as the existing pages. -->
    <UPageSection
      v-for="(section, i) in page.sections"
      :key="i"
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
      <video
        v-else-if="section.video"
        class="w-full rounded-lg ring ring-default"
        autoplay
        loop
        muted
        playsinline
      >
        <source :src="section.video" type="video/mp4">
      </video>
      <Placeholder v-else />
    </UPageSection>

    <!-- Short value statements. Rendered as a grid, not a carousel: three cards
         behind a swipe interaction is worse than three cards. -->
    <UPageSection v-if="page.carousel">
      <UPageGrid class="sm:grid-cols-2 lg:grid-cols-3">
        <UPageCard
          v-for="(item, i) in page.carousel"
          :key="i"
          :title="item.title"
          :description="item.description"
          variant="subtle"
        />
      </UPageGrid>
    </UPageSection>

    <!-- Apps grouped into this theme (ecosystem pages). Same card shape as the
         home page's modules grid in pages/index.vue, so a module looks the
         same whether discovered from the home page or from a theme page. -->
    <UPageSection
      v-if="page.modules"
      :title="page.modules.title"
      :description="page.modules.description"
      :links="page.modules.links"
    >
      <UPageGrid class="sm:grid-cols-2 lg:grid-cols-3">
        <UPageCard
          v-for="(item, i) in page.modules.items"
          :key="i"
          :title="item.title"
          :description="item.description"
          :to="item.to"
          orientation="vertical"
          variant="subtle"
        >
          <template #leading>
            <UColorModeAvatar
              v-if="item.logo"
              :light="item.logo.light"
              :dark="item.logo.dark"
              size="lg"
              class="rounded-sm"
            />
            <span v-else class="inline-flex p-1 rounded-lg bg-amber-600/5">
              <UIcon :name="item.icon || 'i-heroicons-cube'" class="w-10 h-10 shrink-0 text-amber-600" />
            </span>
          </template>

          <!-- Screenshot, or a placeholder until one is shot for this app. -->
          <NuxtImg
            v-if="item.screenshot"
            :src="item.screenshot"
            class="w-full rounded-lg mt-3"
            loading="lazy"
          />
          <Placeholder v-else class="mt-3" />
        </UPageCard>
      </UPageGrid>
    </UPageSection>

    <UPageSection v-if="page.faq" :title="page.faq.title" :description="page.faq.description">
      <UPageAccordion :items="page.faq.items" type="multiple" class="max-w-4xl mx-auto">
        <template #body="{ item }">
          <MDC
            :value="(item as any).content || ''"
            class="prose prose-primary dark:prose-invert max-w-none text-muted"
          />
        </template>
      </UPageAccordion>
    </UPageSection>

    <UPageSection v-if="page.cta">
      <UPageCTA
        v-bind="page.cta"
        variant="subtle"
        class="bg-sand-200 dark:bg-stone-900 ring ring-default"
      />
    </UPageSection>
  </div>
</template>
