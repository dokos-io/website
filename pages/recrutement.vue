<script setup lang="ts">
// French only: no /en/ copy of this page is generated (no hreflang to a
// French text under lang="en").
defineI18nRoute({ locales: ['fr'] })
// The full-stack position published on 19 June 2026 is filled (see the
// rentrée 2026 post: one permanent hire, one apprentice, two interns stayed).
// This page now takes spontaneous applications until a new offer opens.
// 2026 design: cream header and footer, light only, French only.
definePageMeta({ design2026: true, frenchOnly: true, colorMode: 'light' })

const NuxtLink = resolveComponent('NuxtLink')
const APPLY = 'mailto:celine@dokos.io?subject=Candidature%20spontan%C3%A9e'
useSeoMeta({
  title: 'Travailler chez Dokos',
  ogTitle: 'Travailler chez Dokos',
  description: 'Aucun poste ouvert pour le moment. Dokos SAS lit les candidatures spontanées des développeurs qui aiment le logiciel libre et la gestion d\'entreprise.',
  ogDescription: 'Aucun poste ouvert pour le moment. Dokos SAS lit les candidatures spontanées.',
})

const stack = ['Python', 'JavaScript', 'Vue', 'Linux', 'Git', 'MariaDB']

const facts = [
  {
    title: 'Du code publié',
    description: 'Dodock, Dokos et nos applications sont publiés sur gitlab.com/dokos. Vous pouvez lire ce sur quoi nous travaillons avant de nous écrire.',
    to: 'https://gitlab.com/dokos',
  },
  {
    title: 'À Nancy',
    description: 'Le bureau est au 59 rue du Vieil Aître, à Nancy. Le télétravail fait partie du quotidien de l\'équipe.',
  },
  {
    title: 'L\'équipe à la rentrée 2026',
    description: 'Un CDI, un apprenti et deux anciens stagiaires ont rejoint l\'équipe en 2026. Le billet de rentrée raconte ce que nous construisons.',
    to: '/blog/2026/rentree-2026',
  },
]
</script>

<template>
  <div class="h26 overflow-x-clip bg-paper text-dokos-500">
    <Landing2026Hero
      title="Travailler chez Dokos"
      description="Nous n'avons pas de poste ouvert en ce moment. Nous lisons quand même les candidatures spontanées, et nous gardons celles qui correspondent pour le prochain recrutement."
      :links="[{ label: 'Envoyer une candidature', to: APPLY }]"
    />

    <section class="mx-auto flex max-w-[1360px] flex-col gap-12 px-4 py-24 sm:px-8 sm:py-32">
      <Landing2026Heading
        title="Ce que nous faisons"
        description="Nous développons Dodock et Dokos, nos versions de Frappe et d'ERPNext, et les applications qui s'y branchent. Nous les adaptons aux règles françaises et nous les exploitons pour nos clients."
      />
      <ol class="h26-reveal grid gap-x-10 lg:grid-cols-3">
        <li v-for="(fact, i) in facts" :key="fact.title" class="border-t-[1.5px] border-dokos-500">
          <component
            :is="fact.to ? NuxtLink : 'div'"
            :to="fact.to"
            :target="fact.to?.startsWith('http') ? '_blank' : undefined"
            class="group grid grid-cols-[2.5rem_1fr] gap-x-4 py-6"
          >
            <span class="font-typed text-lg text-accent">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="flex flex-col gap-2">
              <b class="text-2xl font-extrabold tracking-[-0.02em] group-hover:underline">{{ fact.title }}<template v-if="fact.to"> →</template></b>
              <span class="text-lg leading-relaxed text-stone-600">{{ fact.description }}</span>
            </span>
          </component>
        </li>
      </ol>
    </section>

    <!-- The team's tools, typed in the deep blue card. -->
    <section class="px-2 pb-10 sm:px-6 sm:pb-14 lg:px-14">
      <div class="rounded-2xl bg-dokos-900 text-white">
        <div class="mx-auto flex max-w-[1360px] flex-col gap-10 px-4 py-20 sm:px-8 sm:py-24">
          <Landing2026Heading
            title="Les outils de l'équipe"
            description="Le quotidien se passe dans ces outils. Une candidature qui montre du code écrit avec eux nous parle davantage qu'un CV."
            tone="dark"
          />
          <p class="h26-reveal font-typed text-[clamp(1.25rem,2.5vw,2rem)]">{{ stack.join(' · ') }}</p>
        </div>
      </div>
    </section>

    <Landing2026Cta
      title="Comment candidater"
      description="Écrivez à celine@dokos.io avec un lien vers du code, un CV si vous en avez un, et quelques lignes sur ce qui vous attire dans notre travail. Nous répondons à chaque message."
      :links="[{ label: 'celine@dokos.io', to: APPLY }]"
    />
  </div>
</template>
