<script setup lang="ts">
// The full-stack position published on 19 June 2026 is filled (see the
// rentrée 2026 post: one permanent hire, one apprentice, two interns stayed).
// This page now takes spontaneous applications until a new offer opens.
useSeoMeta({
  title: 'Travailler chez Dokos',
  ogTitle: 'Travailler chez Dokos',
  description: 'Aucun poste ouvert pour le moment. Dokos SAS lit les candidatures spontanées des développeurs qui aiment le logiciel libre et la gestion d\'entreprise.',
  ogDescription: 'Aucun poste ouvert pour le moment. Dokos SAS lit les candidatures spontanées.',
})

const stack = ['Python', 'JavaScript', 'Vue', 'Linux', 'Git', 'MariaDB']

const facts = [
  {
    icon: 'i-heroicons-code-bracket',
    title: 'Du code publié',
    description: 'Dodock, Dokos et nos applications sont publiés sur gitlab.com/dokos. Vous pouvez lire ce sur quoi nous travaillons avant de nous écrire.',
    to: 'https://gitlab.com/dokos',
  },
  {
    icon: 'i-heroicons-map-pin',
    title: 'À Nancy',
    description: 'Le bureau est au 59 rue du Vieil Aître, à Nancy. Le télétravail fait partie du quotidien de l\'équipe.',
  },
  {
    icon: 'i-heroicons-newspaper',
    title: 'L\'équipe à la rentrée 2026',
    description: 'Un CDI, un apprenti et deux anciens stagiaires ont rejoint l\'équipe en 2026. Le billet de rentrée raconte ce que nous construisons.',
    to: '/fr/blog/2026/rentree-2026',
  },
]
</script>

<template>
  <UPage>
    <UPageHero
      title="Travailler chez Dokos"
      description="Nous n'avons pas de poste ouvert en ce moment. Nous lisons quand même les candidatures spontanées, et nous gardons celles qui correspondent pour le prochain recrutement."
      :links="[{ label: 'Envoyer une candidature', to: 'mailto:celine@dokos.io?subject=Candidature%20spontan%C3%A9e', icon: 'i-heroicons-paper-airplane', size: 'lg', class: 'dk-btn' }]"
    />

    <UPageSection
      title="Ce que nous faisons"
      description="Nous développons Dodock et Dokos, nos versions de Frappe et d'ERPNext, et les applications qui s'y branchent. Nous les adaptons aux règles françaises et nous les exploitons pour nos clients."
    >
      <UPageGrid>
        <UPageCard
          v-for="fact in facts"
          :key="fact.title"
          v-bind="fact"
          variant="subtle"
          :target="fact.to?.startsWith('http') ? '_blank' : undefined"
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      title="Les outils de l'équipe"
      description="Le quotidien se passe dans ces outils. Une candidature qui montre du code écrit avec eux nous parle davantage qu'un CV."
    >
      <div class="flex flex-wrap justify-center gap-2">
        <UBadge
          v-for="item in stack"
          :key="item"
          :label="item"
          variant="subtle"
          size="lg"
        />
      </div>
    </UPageSection>

    <UPageSection
      title="Comment candidater"
      description="Écrivez à celine@dokos.io avec un lien vers du code, un CV si vous en avez un, et quelques lignes sur ce qui vous attire dans notre travail. Nous répondons à chaque message."
      :links="[{ label: 'celine@dokos.io', to: 'mailto:celine@dokos.io?subject=Candidature%20spontan%C3%A9e', icon: 'i-heroicons-envelope', class: 'dk-btn' }]"
    />
  </UPage>
</template>
