<script setup lang="ts">
/**
 * Event page for Open Source Experience 2026 (Paris Expo Porte de Versailles,
 * Hall 5.2, 9–10 December 2026). Dokos is on Orange's stand and speaks in two
 * sessions, both taken from the official programme on eventmaker.io.
 *
 * This page names Orange and the Conectt project with the client's agreement;
 * the copy lint does not scan pages/, see docs/editorial-guidelines.md.
 */
definePageMeta({ layout: 'default' })

const localePath = useLocalePath()

const title = 'Dokos à Open Source Experience 2026'
const description = 'Les 9 et 10 décembre 2026 à Paris, venez voir comment nous bâtissons et garantissons des applications métier sur Dokos et ERPNext, avec Conectt, la plateforme de raccordements réseau construite avec Orange.'

useSeoMeta({
  titleTemplate: '%s',
  title,
  ogTitle: title,
  description,
  ogDescription: description,
})
defineOgImage('OgImageSaas' as any, { title, description })

const event = {
  dates: '9 et 10 décembre 2026',
  venue: 'Paris Expo Porte de Versailles, Hall 5.2',
  address: '1 place de la Porte de Versailles, 75015 Paris',
  stand: 'Avec Orange, sur son stand',
  registration: 'https://www.opensource-experience.com/',
}

const talks = [
  {
    title: 'Facturation électronique : on est en prod ! Retour des communautés Dolibarr, Odoo OCA et Dokos',
    when: 'Mercredi 9 décembre, 14 h 25 à 15 h 10',
    room: 'Salle Dennis Ritchie',
    format: 'Table ronde',
    description: 'La facturation électronique est en production en France depuis septembre 2026. Trois communautés open source racontent comment elles l\'ont intégrée, comment elles ont financé le travail, ce qu\'elles ont mis en commun et ce que leurs utilisateurs en disent. Animée par Walid Nouh (Projets Libres), avec Alexis de Lattre (Akretion), Maxime Kohlhaas (ATM Consulting) et Charles-Henri Decultot (Dokos).',
    to: 'https://website-27805.eventmaker.io/fr/programme/6a96d852ac947f00e9590199',
    icon: 'i-heroicons-document-text',
  },
  {
    title: 'Orange et ses partenaires dans l\'écosystème open source',
    when: 'Jeudi 10 décembre, 14 h 00 à 14 h 20',
    room: 'Salle Kirk McKusick',
    format: 'Atelier',
    description: 'Gilles Viton, responsable du programme communautés open source d\'Orange France, présente la façon dont Orange travaille avec ses partenaires open source. Dokos y intervient aux côtés d\'Orange.',
    to: 'https://website-27805.eventmaker.io/fr/programme/6abfa3348a2dc0e857955484',
    icon: 'i-heroicons-user-group',
  },
]

const pillars = [
  {
    title: 'Éditeur open source',
    description: 'Nous maintenons Dodock, Dokos et quatorze applications, publiés sous licence GPLv3 sur notre GitLab.',
    icon: 'i-heroicons-code-bracket-square',
    to: localePath('/editeur'),
  },
  {
    title: 'Experts Frappe et ERPNext',
    description: 'Nous lisons et portons chaque version de Frappe et d\'ERPNext, et nous exploitons aussi des installations standard, comme celle d\'Orange.',
    icon: 'i-simple-icons-frappe',
    to: localePath('/exploitation/frappe-erpnext'),
  },
  {
    title: 'Nous bâtissons et garantissons vos applications métier',
    description: 'Nos ingénieurs construisent vos applications sur cette base, puis les exploitent sous contrat, avec des délais écrits.',
    icon: 'i-heroicons-wrench-screwdriver',
    to: localePath('/ingenierie'),
  },
]

const conecttFacts = [
  {
    title: 'Le besoin',
    description: 'L\'opérateur industriel Orange traite un volume important de demandes de raccordement réseau à l\'échelle nationale. L\'outil historique devait être remplacé.',
    icon: 'i-heroicons-signal',
  },
  {
    title: 'Ce que nous avons construit',
    description: 'Des modules métier sur mesure, écrits avec le cadre Frappe, qui s\'appuient sur ce qu\'ERPNext fournit déjà : API, flux de validation, attribution automatique, notifications.',
    icon: 'i-heroicons-wrench-screwdriver',
  },
  {
    title: 'Comment ça s\'intègre',
    description: 'La plateforme s\'insère dans le système d\'information d\'Orange par l\'API, avec les droits et la journalisation de la base. Les équipes back-office pilotent les raccordements depuis un seul écran.',
    icon: 'i-heroicons-arrows-right-left',
  },
  {
    title: 'Comment nous travaillons',
    description: 'En co-construction avec l\'équipe d\'Orange, à deux ingénieurs, sur ERPNext en production. Le code est livré dans leurs dépôts.',
    icon: 'i-heroicons-user-group',
  },
]

const expertise = [
  { title: 'Un fork maintenu depuis la première version', description: 'Dodock et Dokos suivent Frappe et ERPNext version après version. Nous savons ce qu\'une montée de version change, et ce qu\'elle casse.', icon: 'i-heroicons-arrow-trending-up' },
  { title: 'Des délais écrits', description: 'Prise en charge d\'une anomalie bloquante en 3 heures, rétablissement en 6, du lundi au vendredi de 8h à 20h, inscrits à nos conditions générales d\'hébergement.', icon: 'i-heroicons-clock' },
  { title: 'Hébergement en Europe', description: 'Production et sauvegardes en France et en Allemagne, chez OVHcloud et Hetzner. Le code reste sous GPLv3 et votre base s\'exporte à tout moment.', icon: 'i-circle-flags-european-union' },
  { title: 'Un harnais pour les agents IA', description: 'Dokos AI répond à partir de vos documents et demande confirmation avant d\'écrire. Le serveur MCP de Dokos CLI connecte vos propres agents au site, avec les droits d\'un utilisateur.', icon: 'i-heroicons-cpu-chip' },
]

const demos = [
  'Conectt : le parcours d\'une demande de raccordement, de la réception à la clôture',
  'Qualéo : l\'évaluation de la qualité des interactions clients, co-construite avec Orange',
  'Dokos 5 : la caisse certifiée LNE, la réception de factures électroniques, le rapprochement bancaire',
  'Dokos AI et le serveur MCP : un agent qui prépare une écriture et attend votre validation',
]
</script>

<template>
  <div>
    <UPageHero orientation="horizontal">
      <template #headline>
        <UBadge variant="subtle" size="lg" class="font-medium">
          <UIcon name="i-heroicons-calendar-days" class="mr-1.5 size-4" />
          Open Source Experience · {{ event.dates }} · Paris
        </UBadge>
      </template>
      <template #title>
        Nous bâtissons et garantissons<br>vos <span class="text-primary">applications métier</span>.
      </template>
      <template #description>
        Éditeur open source, experts Frappe et ERPNext, nous serons à Open Source Experience les {{ event.dates }}, Hall 5.2 de Paris Expo Porte de Versailles, sur le stand d'Orange. Venez voir Conectt, la plateforme de raccordements réseau construite avec Orange sur ERPNext, et ce que Dokos 5 apporte aux PME.
      </template>
      <template #links>
        <UButton to="#rendez-vous" size="xl" color="primary" icon="i-heroicons-chat-bubble-left-right" label="Prendre rendez-vous sur le stand" />
        <UButton :to="event.registration" target="_blank" size="xl" color="neutral" variant="outline" icon="i-heroicons-ticket" label="S'inscrire au salon" />
      </template>
      <div class="rounded-lg ring ring-default bg-sand-100 dark:bg-stone-900 p-6 sm:p-8 space-y-5">
        <div class="flex items-center gap-4">
          <img src="/dokos_logo_rect.svg" alt="Dokos" width="48" height="48">
          <span class="text-muted">avec</span>
          <img src="/osxp/logo-orange.png" alt="Orange" class="h-10 w-auto">
        </div>
        <dl class="grid gap-3 text-sm">
          <div class="flex gap-3"><dt class="w-28 shrink-0 text-muted">Dates</dt><dd class="font-medium text-highlighted">{{ event.dates }}</dd></div>
          <div class="flex gap-3"><dt class="w-28 shrink-0 text-muted">Lieu</dt><dd class="font-medium text-highlighted">{{ event.venue }}<br><span class="font-normal text-muted">{{ event.address }}</span></dd></div>
          <div class="flex gap-3"><dt class="w-28 shrink-0 text-muted">Stand</dt><dd class="font-medium text-highlighted">{{ event.stand }}</dd></div>
          <div class="flex gap-3"><dt class="w-28 shrink-0 text-muted">Conférences</dt><dd class="font-medium text-highlighted"><a href="#conferences" class="hover:text-primary">9 décembre à 14 h 25<br>10 décembre à 14 h 00</a></dd></div>
        </dl>
      </div>
    </UPageHero>

    <UPageSection
      title="Trois choses à savoir sur nous"
      description="Dokos SAS, à Nancy, est l'équipe qui écrit, adapte et exploite Dokos."
      class="bg-sand-200/60 dark:bg-stone-900"
    >
      <UPageGrid class="sm:grid-cols-2 lg:grid-cols-3">
        <UPageCard v-for="pillar in pillars" :key="pillar.title" v-bind="pillar" variant="subtle" />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      id="conectt"
      orientation="horizontal"
    >
      <template #headline>
        <UBadge variant="subtle" label="Projet Orange" />
      </template>
      <template #title>
        Conectt : les raccordements réseau d'Orange, pilotés sur ERPNext
      </template>
      <template #description>
        Orange a choisi l'open source pour ses logiciels métier. Avec son équipe, nous co-construisons Conectt, la plateforme qui remplace l'outil historique de gestion des raccordements réseau. Dokos intervient comme intégrateur et expert d'ERPNext, du développement des modules métier à l'exploitation en production.
      </template>
      <div class="aspect-video rounded-lg overflow-hidden ring ring-default">
        <iframe
          class="w-full h-full"
          src="https://www.youtube.com/embed/tzY6ybHaX6U"
          title="Conectt, gestion des raccordements"
          frameborder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>
    </UPageSection>

    <UPageSection class="pt-0 sm:pt-0">
      <UPageGrid class="sm:grid-cols-2 lg:grid-cols-4">
        <UPageCard v-for="fact in conecttFacts" :key="fact.title" v-bind="fact" variant="outline" />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      orientation="horizontal"
      reverse
      class="bg-sand-200/60 dark:bg-stone-900"
    >
      <template #headline>
        <UBadge variant="subtle" label="Projet Orange" />
      </template>
      <template #title>
        Qualéo : évaluer la qualité des interactions clients
      </template>
      <template #description>
        Orange voulait évaluer la qualité de ses interactions clients selon ses propres critères métier, et donner aux équipes support un suivi précis de leurs axes de progrès. En vingt jours de collaboration, un premier prototype fonctionnel était en place. Qualéo est devenu un module complet, que les managers utilisent pour évaluer et accompagner leurs équipes.
      </template>
      <div class="aspect-video rounded-lg overflow-hidden ring ring-default">
        <iframe
          class="w-full h-full"
          src="https://www.youtube.com/embed/ooMT65Uxy5s"
          title="Qualéo, gestion de la qualité"
          frameborder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>
    </UPageSection>

    <UPageSection
      title="Ce qui a fait la différence pour Orange"
      description="Les mêmes raisons valent pour une PME. Elles sont écrites dans nos conditions générales et sur notre GitLab."
    >
      <div class="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        <div v-for="item in expertise" :key="item.title" class="flex gap-4">
          <UIcon :name="item.icon" class="size-5 shrink-0 mt-1 text-primary" />
          <div>
            <p class="font-medium text-highlighted">{{ item.title }}</p>
            <p class="mt-1 text-sm text-muted">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </UPageSection>

    <UPageSection
      id="conferences"
      title="Nos deux conférences"
      description="Deux sessions au programme officiel du salon."
    >
      <UPageGrid class="lg:grid-cols-2">
        <UPageCard
          v-for="talk in talks"
          :key="talk.to"
          :title="talk.title"
          :description="talk.description"
          :icon="talk.icon"
          :to="talk.to"
          target="_blank"
          variant="outline"
        >
          <template #footer>
            <div class="flex flex-wrap gap-2">
              <UBadge :label="talk.format" variant="subtle" size="sm" />
              <UBadge :label="talk.when" color="neutral" variant="subtle" size="sm" />
              <UBadge :label="talk.room" color="neutral" variant="subtle" size="sm" />
            </div>
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageSection>

    <UPageSection
      title="Sur le stand d'Orange"
      description="Quatre démonstrations en continu, sur des données réelles de démonstration."
      class="bg-sand-200/60 dark:bg-stone-900"
    >
      <ul class="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
        <li v-for="demo in demos" :key="demo" class="flex gap-3 rounded-lg ring ring-default bg-default p-4">
          <UIcon name="i-heroicons-play-circle" class="size-5 shrink-0 mt-0.5 text-primary" />
          <span class="text-highlighted">{{ demo }}</span>
        </li>
      </ul>
    </UPageSection>

    <UPageSection id="rendez-vous">
      <UPageCTA
        title="Réservez un créneau sur le stand"
        description="Dites-nous ce que vous gérez aujourd'hui et ce qui coince. Nous préparons la démonstration qui vous concerne, Conectt compris."
        :links="[
          { label: 'Nous écrire', to: localePath('/contact'), size: 'xl', color: 'primary' },
          { label: 'Voir l\'écosystème Dokos', to: localePath('/modules'), size: 'xl', color: 'neutral', variant: 'outline' },
        ]"
        variant="subtle"
        class="bg-sand-200 dark:bg-stone-900 ring ring-default"
      />
    </UPageSection>
  </div>
</template>
