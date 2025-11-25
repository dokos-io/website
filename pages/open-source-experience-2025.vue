<script setup>
import ContactForm from '~/components/ContactForm.vue'

const form = {
  title: 'Contactez-nous',
  description: "Vous vous demandez si Dokos est adapté à vos besoins ? Vous souhaitez souscrire à une offre d'accompagnement ? Vous avez des questions sur l'offre d'hébergement ? Envoyez nous un message.",
  name: {
    label: 'Nom',
    placeholder: 'Martine Dupond',
  },
  email: {
    label: 'Email',
    placeholder: 'martine@dokos.io',
  },
  company: {
    label: 'Société',
    placeholder: 'Votre société/association',
  },
  body: {
    label: 'Comment pouvons-nous vous aider ?',
    placeholder: 'Expliquez-nous votre projet ou votre besoin',
  },
  info: '',
  button: {
    icon: "i-ph-paper-plane-right",
    label: 'Envoyer mon message',
  },
}

const pillars = [
  {
    icon: '★',
    title: 'Qualité',
    description: 'Des standards élevés pour vos processus métiers'
  },
  {
    icon: '⬡',
    title: 'Sécurité',
    description: 'Protection de vos données et de votre infrastructure'
  },
  {
    icon: '✓',
    title: 'Conformité',
    description: 'Respect des réglementations françaises et européennes'
  },
  {
    icon: '⟷',
    title: 'Engagement',
    description: 'Un partenariat durable pour votre réussite'
  }
]

const features = [
  {
    icon: 'i-heroicons-wrench-screwdriver',
    title: "Maîtrise d'ERPNext",
    description: "Notre expertise approfondie d'ERPNext, le projet source de Dokos, nous permet de répondre aux besoins les plus complexes."
  },
  {
    icon: 'i-heroicons-squares-2x2',
    title: 'Double compétence',
    description: 'Vision métier des flux de gestion ET architecture technique pour une solution vraiment complète.'
  },
  {
    icon: 'i-heroicons-lock-open',
    title: 'Open source & souverain',
    description: "Notre engagement pour la souveraineté numérique et la transparence de vos outils de gestion."
  },
  {
    icon: 'i-heroicons-bolt',
    title: 'Agilité technique',
    description: 'Notre capacité à transformer rapidement les besoins en solutions concrètes et opérationnelles.'
  }
]

const solutions = [
  {
    title: 'Adapter sans développer',
    description: "Dokos vous offre toute la richesse fonctionnelle d'un ERP complet, tout en vous permettant de l'ajuster à vos processus métier sans semaines de développement personnalisé."
  },
  {
    title: 'Une flexibilité pensée pour vous',
    description: "Dokos s'adapte à votre organisation, et non l'inverse. Chaque module peut être configuré précisément selon vos besoins réels, vos processus existants, votre culture d'entreprise."
  },
  {
    title: 'Open source et souverain',
    description: "Dokos est une adaptation française d'ERPNext, conçue pour les entreprises qui souhaitent retrouver la maîtrise de leurs outils de gestion."
  }
]

const iaFeatures = [
  {
    icon: 'i-heroicons-light-bulb',
    title: 'Suggestions intelligentes',
    description: 'qui accélèrent la saisie et réduisent les erreurs',
    to: 'https://youtube.com/',
  },
  {
    icon: 'i-heroicons-chart-bar',
    title: 'Analyse automatique de rapports',
    description: 'pour identifier rapidement les tendances de votre activité',
    to: 'https://youtube.com/',
  },
  {
    icon: 'i-heroicons-cog-6-tooth',
    title: 'Automatisations pertinentes',
    description: 'accessibles sans compétences en développement',
    to: 'https://youtube.com/',
  }
]

useSeoMeta({
    title: "Open Source Experience 2025",
    ogTitle: "Open Source Experience 2025 - Dokos",
    description: "Nous accompagnons Orange sur plusieurs projets stratégiques qui prouvent qu'un ERP open source peut répondre aux plus hautes exigences des grandes entreprises françaises",
    ogDescription: "Nous accompagnons Orange sur plusieurs projets stratégiques qui prouvent qu'un ERP open source peut répondre aux plus hautes exigences des grandes entreprises françaises",
});
</script>

<template>
  <div class="landing-page">
    <!-- HERO SECTION -->
    <section class="hero-section">
      <div class="hero-background">
        <!-- <img src="/osxp/logo-orange.png" alt="" class="hero-bg-image" /> -->
        <div class="hero-overlay" />
      </div>

      <UContainer>
        <div class="hero-content">
          <!-- Badge Partenaire -->
          <div class="partner-badge">
            <Icon name="i-heroicons-star-solid" class="w-4 h-4" />
            <span class="leading-none">Partenaire Orange</span>
          </div>

          <!-- Logos -->
          <div class="logos-section">
            <div class="logo-card">
              <img src="/osxp/logo-orange.png" alt="Orange" class="logo-orange" />
            </div>
            <div class="logo-separator">×</div>
            <div class="logo-card">
              <img src="/dokos_logo_rect.svg" alt="Dokos" class="logo-dokos" />
            </div>
          </div>

          <!-- Titre -->
          <h1 class="hero-title">
            Orange nous confie le développement<br class="hidden md:block" />
            de ses modules métiers
          </h1>

          <p class="hero-subtitle">
            De la gestion qualité aux fonctionnalités commerciales,<br class="hidden md:block" />
            nous créons les outils dont votre entreprise a vraiment besoin
          </p>

          <!-- CTAs -->
          <div class="cta-group">
            <UButton
              size="xl"
              color="white"
              variant="solid"
              to="#qualeo"
            >
              Découvrir Qualéo (2 min)
            </UButton>
            <UButton
              size="xl"
              color="cyan"
              variant="soft"
              to="https://www.dokos.io"
              target="_blank"
            >
              En savoir plus sur Dokos
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- PILLARS SECTION -->
    <section class="pillars-section">
      <UContainer>
        <div class="pillars-grid">
          <div v-for="pillar in pillars" :key="pillar.title" class="pillar-item">
            <div class="pillar-icon">
              <span>{{ pillar.icon }}</span>
            </div>
            <h3 class="pillar-title">{{ pillar.title }}</h3>
            <p class="pillar-description">{{ pillar.description }}</p>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- PROJECTS SECTION -->
    <section class="projects-section" id="qualeo">
      <UContainer>
        <!-- Titre de section -->
        <div class="section-header">
          <h2 class="section-title">
            Nous accompagnons Orange sur plusieurs projets stratégiques qui prouvent qu'un ERP open source peut répondre aux plus hautes exigences des grandes entreprises françaises
          </h2>
        </div>

        <!-- Séparateur -->
        <div class="separator-line" />

        <!-- Qualéo -->
        <div class="project-block">
          <div class="flex flex-col gap-4">
            <div class="project-image">
              <div class="image-placeholder">
                <Icon name="i-heroicons-photo" class="placeholder-icon" />
                <span>Image Qualéo</span>
              </div>
            </div>
            <div class="project-image">
              <div class="image-placeholder">
                <Icon name="i-heroicons-photo" class="placeholder-icon" />
                <span>Image Qualéo</span>
              </div>
            </div>
          </div>
          <div class="project-content">
            <h3>Qualéo : de la co-création avec Orange à un module open source complet</h3>
            <p>
              Orange souhaitait une solution pour <strong>évaluer objectivement la qualité de leurs interactions clients</strong> selon leurs propres critères métier. L'objectif ? Donner aux équipes support les moyens de progresser en continu grâce à des évaluations structurées et un suivi précis des axes d'amélioration.
            </p>
            <UCard class="highlight-card">
              <p>
                <strong>En 20 jours de collaboration</strong>, nous avons co-construit avec leurs équipes un premier MVP fonctionnel. Fort de cette base solide, nous avons poursuivi le développement pour transformer cette preuve de concept en un module professionnel complet.
              </p>
            </UCard>
            <p>
              <strong>Le résultat ?</strong> Qualéo est aujourd'hui un outil mature qui permet aux managers d'évaluer, d'accompagner et de faire grandir leurs équipes avec méthode.
            </p>
            <UButton
              variant="solid"
              color="primary"
              trailing-icon="i-heroicons-arrow-right"
              to="#"
              size="xl"
            >
              Voir Qualéo en action
            </UButton>
          </div>
        </div>

        <!-- Expertise Cards -->
        <div class="section-header" style="margin-top: 5rem;">
          <h2 class="section-title-medium">Une expertise reconnue</h2>
          <p class="section-subtitle">Pourquoi Orange a-t-il fait le choix de nous confier ces projets ?</p>
        </div>

        <div class="features-grid">
          <UCard v-for="feature in features" :key="feature.title" class="feature-card">
            <template #header>
              <div class="feature-icon">
                <Icon :name="feature.icon" class="w-6 h-6" />
              </div>
            </template>
            <h4 class="feature-title">{{ feature.title }}</h4>
            <p class="feature-text">{{ feature.description }}</p>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- SOLUTION SECTION -->
    <section class="solution-section">
      <UContainer>
        <div class="section-header">
          <h2 class="section-title-medium">Le défi des grandes entreprises : dépasser la rigidité des ERP traditionnels</h2>
        </div>

        <div class="problem-content">
          <p>
            Les directions informatiques et métier le constatent quotidiennement : l'ERP impose ses règles. Chaque adaptation devient un projet en soi. <strong>3 à 6 mois de développement</strong>. <strong>Des dizaines de milliers d'euros mobilisés</strong>. Des équipes entières concentrées sur des ajustements qui devraient être simples.
          </p>
          <p>
            Et pendant ce temps ? Vos collaborateurs trouvent des solutions de contournement. Les fichiers Excel se multiplient. Les processus se fragmentent.
          </p>
          <p class="problem-conclusion">
            <strong>Le constat :</strong> vous disposez d'un outil puissant... qui ne reflète pas vraiment votre réalité métier.
          </p>
        </div>

        <div class="section-header" style="margin-top: 4rem;">
          <h2 class="section-title-medium">Dokos : toute la puissance d'un ERP, avec l'agilité que vous attendiez</h2>
        </div>

        <div class="solution-grid">
          <UCard v-for="solution in solutions" :key="solution.title" class="solution-card">
            <h4 class="solution-title">{{ solution.title }}</h4>
            <p class="solution-text">{{ solution.description }}</p>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- IA SECTION -->
    <section class="ia-section">
      <UContainer>
        <div class="section-header">
          <h2 class="section-title-medium">L'intelligence artificielle au service de votre efficacité</h2>
          <p class="section-subtitle">
            L'IA dans Dokos, ce n'est pas de la technologie pour la technologie. Ce sont des fonctionnalités concrètes qui simplifient le quotidien de vos équipes dès les premiers jours.
          </p>
        </div>

        <div class="ia-grid">
          <UCard v-for="ia in iaFeatures" :key="ia.title" class="ia-card">
            <template #header>
              <div class="ia-icon">
                <Icon :name="ia.icon" class="w-7 h-7" />
              </div>
            </template>
            <h4 class="ia-title">{{ ia.title }}</h4>
            <p class="ia-text">{{ ia.description }}</p>
            <UButton class="w-full p-8 rounded-lg" size="xl" variant="solid" color="gray" :to="ia.to" target="_blank">
              <Icon name="i-heroicons-play-circle" class="w-12 h-12 mr-2" />
              <span class="text-3xl font-light">
                Voir la vidéo
              </span>
            </UButton>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- SALON SECTION -->
    <section class="salon-section" id="salon">
      <div class="salon-background">
        <div class="salon-overlay" />
      </div>
      <UContainer>
        <div class="salon-content">
          <div class="salon-header">
            <Icon name="i-heroicons-bolt" class="w-8 h-8" />
            <h2>Rencontrez-nous à l'Open Source Experience 2025</h2>
          </div>

          <UBadge color="orange" size="lg" class="salon-badge">
            Stand Orange - Pupitre 3
          </UBadge>

          <div class="salon-info">
            <div class="info-item">
              <Icon name="i-heroicons-calendar" class="w-5 h-5" />
              <span>10 et 11 décembre 2025</span>
            </div>
            <div class="info-item">
              <Icon name="i-heroicons-map-pin" class="w-5 h-5" />
              <span>Cité des sciences et de l'industrie, Paris</span>
            </div>
          </div>

          <UCard class="salon-features-card">
            <h3>🎯 Nous présenterons en exclusivité</h3>
            <ul class="salon-list">
              <li>La démo complète de Qualéo : comment nous avons construit cette solution avec Orange</li>
              <li>Nos avancées sur l'IA : cas d'usage concrets et démos en direct</li>
              <li>Notre méthodologie pour adapter Dokos à vos enjeux spécifiques</li>
              <li>Des échanges directs avec notre équipe sur vos projets</li>
            </ul>
          </UCard>

          <UButton
            size="xl"
            color="white"
            to="#contact"
            class="salon-cta"
          >
            Nous contacter
          </UButton>

          <p class="salon-note">
            <Icon name="i-heroicons-qr-code" class="w-5 h-5" />
            Scannez le QR code sur notre pupitre pour accéder à cette page et rester en contact
          </p>
        </div>
      </UContainer>
    </section>

    <!-- CONTACT SECTION -->
    <section class="contact-section" id="contact">
      <UContainer>
        <UCard class="contact-card">
          <h2 class="contact-title">Vous ne pouvez pas venir nous rencontrer ?</h2>
          <p class="contact-description">
            Nous serions ravis d'échanger avec vous sur vos enjeux de gestion d'entreprise et vos besoins en développements métiers. Sans engagement, sans discours commercial.
          </p>

          <div class="pt-8 w-full flex justify-center">
            <ContactForm :form="form" />
          </div>
        </UCard>
      </UContainer>
    </section>

    <!-- FOOTER -->
    <footer class="footer-section">
      <UContainer>
        <div class="footer-content">
          <h3>Dokos</h3>
          <p>L'ERP open source qui s'adapte vraiment à votre entreprise</p>
          <p class="footer-tagline">Expertise métier • Agilité technique • Souveraineté numérique</p>
        </div>
      </UContainer>
    </footer>
  </div>
</template>

<style scoped>
/* HERO SECTION */
.hero-section {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.15;
  filter: blur(2px);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg,
    rgba(8, 27, 56, 0.96) 0%,
    rgba(15, 23, 42, 0.94) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 3rem 0;
}

.partner-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.95);
  color: #0e7490;
  padding: 0.625rem 1.25rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.logos-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.logo-card {
  border-radius: 1rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.45);
  transition: all 0.3s ease;
}

.logo-orange,
.logo-dokos {
  height: 120px;
  width: auto;
  max-width: 160px;
  object-fit: contain;
}

.logo-separator {
  font-size: 5.5rem;
  font-weight: 100;
  color: white;
  opacity: 0.7;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
  font-size: 1.375rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 3rem;
  line-height: 1.6;
}

.cta-group {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta-primary,
.cta-secondary {
  min-width: 220px;
}

/* PILLARS SECTION */
.pillars-section {
  padding: 2.5rem 0;
  background: white;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
}

.pillars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
}

.pillar-item {
  text-align: center;
  padding: 1rem;
}

.pillar-icon {
  width: 50px;
  height: 50px;
  margin: 0 auto 1rem;
  border: 2px solid #0e7490;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.375rem;
  color: #0e7490;
  transition: all 0.3s ease;
}

/* .pillar-item:hover .pillar-icon {
  background: #0e7490;
  color: white;
  transform: scale(1.1);
} */

.pillar-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.pillar-description {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
}

/* PROJECTS SECTION */
.projects-section {
  padding: 5rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.4;
  max-width: 900px;
  margin: 0 auto;
}

.section-title-medium {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.solution-section .section-title-medium {
  color: rgb(21, 50, 83);
}

.section-subtitle {
  font-size: 1.125rem;
  margin-top: 1rem;
}

.separator-line {
  height: 2px;
  max-width: 300px;
  margin: 3rem auto 4rem;
  background: linear-gradient(
    to right,
    transparent,
    #0e7490 30%,
    #0e7490 70%,
    transparent
  );
}

.project-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 5rem;
}

.project-image {
  background: linear-gradient(135deg, #0e7490 0%, #164e63 100%);
  border-radius: 1rem;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  gap: 1rem;
}

.placeholder-icon {
  width: 4rem;
  height: 4rem;
  opacity: 0.5;
}

.project-content h3 {
  font-size: 1.625rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.project-content p {
  font-size: 1.0625rem;
  /* color: #4b5563; */
  line-height: 1.7;
  margin-bottom: 1rem;
}

.highlight-card {
  margin: 1.5rem 0;
  border-left: 4px solid #0e7490;
  border-top-left-radius: 1px;
  border-bottom-left-radius: 1px;
}

.project-link {
  margin-top: 1rem;
}

/* FEATURES GRID */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-card {
  transition: all 0.3s ease;
}

/* .feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(14, 116, 144, 0.15);
} */

.feature-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #0e7490 0%, #164e63 100%);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.feature-title {
  font-size: 1.125rem;
  font-weight: 600;
  /* color: #1f2937; */
  margin: 1rem 0;
}

.feature-text {
  /* color: #4b5563; */
  opacity: 0.7;
  line-height: 1.6;
}

/* SOLUTION SECTION */
.solution-section {
  background: #f9fafb;
  columns: black;
  padding: 5rem 0;
}

.problem-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.problem-content p {
  font-size: 1.0625rem;
  color: #4b5563;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.problem-conclusion {
  font-size: 1.125rem;
  color: #1f2937;
  margin-top: 2rem;
}

.solution-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.solution-card {
  background: white;
  transition: all 0.3s ease;
}

/* .solution-card:hover {
  box-shadow: 0 12px 40px rgba(14, 116, 144, 0.1);
} */

.solution-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.solution-text {
  color: #4b5563;
  line-height: 1.6;
}

/* IA SECTION */
.ia-section {
  padding: 5rem 0;
}

.ia-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.ia-card {
  text-align: center;
}

.ia-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 1rem;
  background: linear-gradient(135deg, #0e7490 0%, #164e63 100%);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.ia-title {
  font-size: 1.125rem;
  font-weight: 600;
  /* color: #1f2937; */
  margin-bottom: 0.75rem;
}

.ia-text {
  /* color: #6b7280; */
  opacity: 0.7;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.video-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* .video-placeholder:hover {
  background: #f3f4f6;
  transform: scale(1.02);
} */

/* SALON SECTION */
.salon-section {
  position: relative;
  padding: 5rem 0;
  color: white;
  overflow: hidden;
}

.salon-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.salon-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #0e7490 0%, #164e63 100%);
}

.salon-content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

.salon-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.salon-header h2 {
  font-size: 2.25rem;
  font-weight: 700;
}

.salon-badge {
  margin-bottom: 1.5rem;
}

.salon-info {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
}

.salon-features-card {
  margin: 2rem auto;
  max-width: 700px;
  background: rgba(255, 255, 255, 0.95);
  color: #1f2937;
  text-align: left;
}

.salon-features-card h3 {
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.salon-list {
  list-style: none;
  padding: 0;
}

.salon-list li {
  padding: 0.75rem 0;
  padding-left: 2rem;
  position: relative;
}

.salon-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
  font-size: 1.25rem;
}

.salon-cta {
  margin: 2rem auto;
}

.salon-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
  opacity: 0.9;
  font-size: 0.9375rem;
}

/* CONTACT SECTION */
.contact-section {
  padding: 5rem 0;
  /* background: #f9fafb; */
}

.contact-card {
  max-width: 600px;
  margin: 0 auto;
}

.contact-title {
  font-size: 2rem;
  font-weight: 700;
  /* color: #1f2937; */
  text-align: center;
  margin-bottom: 1rem;
}

.contact-description {
  text-align: center;
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.submit-button {
  margin-top: 1rem;
}

.form-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 1rem;
}

/* FOOTER */
.footer-section {
  background: #1f2937;
  color: white;
  padding: 3rem 0;
  text-align: center;
}

.footer-content h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.footer-content p {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
}

.footer-tagline {
  font-size: 0.875rem;
  margin-top: 1rem;
  opacity: 0.7;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.125rem;
  }

  .logos-section {
    gap: 1.5rem;
  }

  .logo-orange,
  .logo-dokos {
    height: 50px;
    max-width: 120px;
  }

  .cta-group {
    flex-direction: column;
    width: 100%;
  }

  .cta-primary,
  .cta-secondary {
    width: 100%;
  }

  .pillars-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .section-title-medium {
    font-size: 1.625rem;
  }

  .project-block {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .features-grid,
  .solution-grid,
  .ia-grid {
    grid-template-columns: 1fr;
  }

  .salon-header h2 {
    font-size: 1.75rem;
  }

  .salon-info {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>