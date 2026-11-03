<script setup>
import ContactForm from '~/components/ContactForm.vue'

const form = {
  title: 'Contactez-nous',
  description: 'Vous vous demandez si Dokos est adapté à vos besoins ? Vous souhaitez souscrire à une offre d\'accompagnement ? Vous avez des questions sur l\'offre d\'hébergement ? Envoyez nous un message.',
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
    icon: 'i-ph-paper-plane-right',
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
    title: 'Maîtrise d\'ERPNext',
    description: 'Notre expertise approfondie d\'ERPNext, le projet source de Dokos, nous permet de répondre aux besoins les plus complexes.'
  },
  {
    icon: 'i-heroicons-squares-2x2',
    title: 'Double compétence',
    description: 'Vision métier des flux de gestion ET architecture technique pour une solution vraiment complète.'
  },
  {
    icon: 'i-heroicons-lock-open',
    title: 'Open source & souverain',
    description: 'Notre engagement pour la souveraineté numérique et la transparence de vos outils de gestion.'
  },
  {
    icon: 'i-heroicons-bolt',
    title: 'Agilité technique',
    description: 'Notre capacité à transformer rapidement les besoins en solutions concrètes et opérationnelles.'
  }
]


useSeoMeta({
    title: 'Open Source Experience 2025',
    ogTitle: 'Open Source Experience 2025 - Dokos',
    description: 'Nous accompagnons Orange sur plusieurs projets stratégiques qui prouvent qu\'un ERP open source peut répondre aux plus hautes exigences des grandes entreprises françaises',
    ogDescription: 'Nous accompagnons Orange sur plusieurs projets stratégiques qui prouvent qu\'un ERP open source peut répondre aux plus hautes exigences des grandes entreprises françaises',
})
</script>

<template>
  <div class="landing-page">
    <!-- HERO SECTION -->
    <section class="hero-section">
      <div class="hero-background">
        <div class="hero-overlay" />
      </div>

      <UContainer>
        <div class="hero-content">
          <!-- Badge Partenaire -->
          <div class="partner-badge">
            <Icon name="i-heroicons-star-solid" class="w-4 h-4 text-yellow-500" />
            <span class="leading-none">Partenaire Orange</span>
          </div>

          <!-- Logos -->
          <div class="logos-section">
            <div class="logo-card">
              <img src="/osxp/logo-orange.png" alt="Orange" class="logo-orange" >
            </div>
            <div class="logo-separator">×</div>
            <div class="logo-card">
              <img src="/osxp/dokos_logo.svg" alt="Dokos" class="logo-dokos" >
            </div>
          </div>

          <!-- Titre -->
          <h1 class="hero-title">
            L'open-source comme fondation,<br class="hidden md:block" >
            l'expertise métier comme moteur
          </h1>

          <p class="hero-subtitle">
            Orange l'a compris : avec ERPNext, ils ont trouvé un socle open-source<br class="hidden md:block" >
            sur lequel construire leurs modules métiers. Et vous, qu'allez-vous créer ?
          </p>

          <!-- CTAs -->
          <div class="cta-group">
            <UButton
              size="xl"
              color="orange"
              variant="solid"
              to="https://qualeo.dokos.cloud"
              target="_blank"
            >
              Tester Qualéo
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
    <section id="video" class="projects-section">
      <UContainer>
        <!-- Titre de section -->
        <div class="section-header">
          <h2 class="section-title orange-text">
            Nous accompagnons Orange sur plusieurs projets stratégiques qui prouvent qu'un ERP open source peut répondre aux plus hautes exigences des grandes entreprises françaises
          </h2>
        </div>

        <!-- Séparateur -->
        <div class="separator-line" />

        <!-- Qualéo -->
        <div id="qualeo" class="project-block">
          <div class="flex flex-col gap-4">
            <div class="project-video">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/ooMT65Uxy5s?autoplay=1&loop=1&playlist=ooMT65Uxy5s" 
                title="Qualéo - Gestion de la qualité"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
                style="border-radius: 1rem;"
              />
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
              <strong>Le résultat ?</strong> Qualéo est aujourd'hui un outil qui permet aux managers d'évaluer, d'accompagner et de faire grandir leurs équipes avec méthode.
            </p>
          </div>
        </div>

        <!-- Conectt -->
        <div class="project-block">
          <div class="project-content">
            <h3>Conectt : orchestrer les raccordements réseau avec fluidité</h3>
            <p>
              L'opérateur industriel Orange pilote un volume important de demandes de raccordement réseau à l'échelle nationale. Pour remplacer leur solution historique et gagner en agilité, nous co-construisons avec leur équipe, <strong>Conectt</strong>, une plateforme qui répond aux enjeux d'un opérateur de cette envergure.
            </p>
            <p>
              Nous développons des modules métiers sur mesure tout en nous appuyant sur les forces natives d'ERPNext : API, workflows, attribution automatique, notifications…
            </p>
            <UCard class="highlight-card">
              <p>
                <strong>L'objectif ?</strong> Une solution qui s'intègre de manière sécurisée dans leur écosystème complexe et offre à leurs équipes back-office tous les outils pour piloter les raccordements.
              </p>
            </UCard>
          </div>
          <div class="flex flex-col gap-4">
            <div class="project-video">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://youtube.com/embed/tzY6ybHaX6U?autoplay=1&loop=1&playlist=tzY6ybHaX6U" 
                title="Conectt - Gestion des raccordements"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
                style="border-radius: 1rem;"
              />
            </div>
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

    <!-- SOUVERAINETÉ SECTION (fond noir) -->
    <section class="sovereignty-section">
      <UContainer>
        <div class="section-header">
          <h2 class="section-title-medium white-text">
            Souveraineté numérique :<br >
            un concept politique ou un avantage business ?
          </h2>
          <p class="section-subtitle white-text">
            Pour Orange, c'est un avantage stratégique mesurable. Pour vous aussi.
          </p>
        </div>

        <div class="sovereignty-intro">
          <p class="white-text">
            On entend beaucoup parler de souveraineté numérique. Mais concrètement, qu'est-ce que cela change ?
          </p>
        </div>

        <!-- Les 4 changements -->
        <div class="sovereignty-grid">
          <UCard class="sovereignty-card">
            <div class="sovereignty-icon">
              <Icon name="i-heroicons-arrows-right-left" class="w-6 h-6" />
            </div>
            <h4 class="sovereignty-card-title">Votre pouvoir de négociation</h4>
            <p class="sovereignty-card-text">
              Avec un ERP propriétaire, vous êtes captif. Avec l'open-source, vous pouvez changer de prestataire sans tout reconstruire.
            </p>
          </UCard>

          <UCard class="sovereignty-card">
            <div class="sovereignty-icon">
              <Icon name="i-heroicons-bolt" class="w-6 h-6" />
            </div>
            <h4 class="sovereignty-card-title">Votre agilité</h4>
            <p class="sovereignty-card-text">
              Vous développez une fonctionnalité stratégique en quelques semaines. Pas besoin d'attendre 18 mois qu'un éditeur l'inscrive à sa roadmap.
            </p>
          </UCard>

          <UCard class="sovereignty-card">
            <div class="sovereignty-icon">
              <Icon name="i-heroicons-banknotes" class="w-6 h-6" />
            </div>
            <h4 class="sovereignty-card-title">Votre maîtrise des coûts</h4>
            <p class="sovereignty-card-text">
              Pas de licence qui double d'un coup. Pas de maintenance forcée. Vous investissez où ça compte vraiment pour vous.
            </p>
          </UCard>

          <UCard class="sovereignty-card">
            <div class="sovereignty-icon">
              <Icon name="i-heroicons-shield-check" class="w-6 h-6" />
            </div>
            <h4 class="sovereignty-card-title">Votre sécurité</h4>
            <p class="sovereignty-card-text">
              Vos données restent chez vous. Votre code source est auditable. Vous savez exactement ce qui tourne sur vos serveurs.
            </p>
          </UCard>
        </div>

        <!-- Conclusion -->
        <div class="sovereignty-footer">
          <p class="white-text sovereignty-final">
            Et cela concerne toutes les entreprises.
          </p>
        </div>
      </UContainer>
    </section>

    <!-- SALON SECTION -->
    <section id="salon" class="salon-section">
      <div class="salon-background">
        <div class="salon-overlay" />
      </div>
      <UContainer>
        <div class="salon-content">
          <div class="salon-header">
            <Icon name="i-heroicons-bolt" class="w-8 h-8" />
            <h2>Nous étions à Open Source Experience 2025</h2>
          </div>

          <UBadge color="orange" size="lg" class="salon-badge">
            Stand Orange
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
            <h3>🎯 Ce que nous avons présenté</h3>
            <ul class="salon-list">
              <li>La démo complète de Qualéo : comment nous avons construit cette solution avec Orange</li>
              <li>Le projet Conectt : orchestrer les raccordements réseau à grande échelle</li>
              <li>Notre méthodologie pour adapter Dokos à vos enjeux spécifiques</li>
              <li>Des échanges directs avec notre équipe sur vos projets</li>
            </ul>
          </UCard>

          <UButton
            size="xl"
            color="orange"
            to="/fr/open-source-experience-2026"
            class="salon-cta"
          >
            Nous retrouver à l'édition 2026, les 9 et 10 décembre
          </UButton>
        </div>
      </UContainer>
    </section>

    <!-- CONTACT SECTION -->
    <section id="contact" class="contact-section">
      <UContainer>
        <UCard class="contact-card">
          <h2 class="contact-title">Parlons de votre projet</h2>
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
      <div class="footer-background">
        <div class="footer-overlay" />
      </div>
      <UContainer>
        <div class="footer-content">
          <div class="footer-logos">
            <img src="/osxp/dokos_logo.svg" alt="Dokos" class="footer-logo-dokos" >
            <div class="footer-badge">
              <Icon name="i-heroicons-star-solid" class="w-4 h-4" />
              <span>Partenaire Orange</span>
            </div>
          </div>
          <h3>Dokos</h3>
          <p>L'open-source comme fondation, l'expertise métier comme moteur</p>
          <p class="footer-tagline">Expertise ERPNext • Agilité technique • Souveraineté numérique</p>
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

.orange-text {
  color: #ff7900;
}

.white-text {
  color: white;
}

.section-title-medium {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
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

.project-block.reverse {
  direction: rtl;
}

.project-block.reverse > * {
  direction: ltr;
}

.project-video {
  background: linear-gradient(135deg, #0e7490 0%, #164e63 100%);
  border-radius: 1rem;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

.project-content h3 {
  font-size: 1.625rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.project-content p {
  font-size: 1.0625rem;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.highlight-card {
  margin: 1.5rem 0;
  border-left: 4px solid #0e7490;
  border-top-left-radius: 1px;
  border-bottom-left-radius: 1px;
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
  margin: 1rem 0;
}

.feature-text {
  opacity: 0.7;
  line-height: 1.6;
}

/* SOUVERAINETÉ SECTION (fond noir) */
.sovereignty-section {
  background: #1f2937;
  color: white;
  padding: 5rem 0;
}

.sovereignty-intro {
  max-width: 700px;
  margin: 0 auto 3rem;
  text-align: center;
}

.sovereignty-intro p {
  font-size: 1.25rem;
  line-height: 1.6;
  opacity: 0.95;
}

.sovereignty-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.sovereignty-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.sovereignty-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.sovereignty-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 1.5rem;
}

.sovereignty-card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
}

.sovereignty-card-text {
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  font-size: 1rem;
}

.sovereignty-highlight {
  max-width: 800px;
  margin: 4rem auto 0;
  background: rgba(255, 121, 0, 0.15);
  border: 2px solid rgba(255, 121, 0, 0.3);
}

.sovereignty-highlight-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
}

.sovereignty-highlight-content p {
  font-size: 1.0625rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
}

.sovereignty-conclusion {
  margin-top: 1.5rem;
  font-size: 1.125rem;
}

.sovereignty-footer {
  text-align: center;
  margin-top: 3rem;
}

.sovereignty-final {
  font-size: 1.25rem;
  font-weight: 500;
  opacity: 0.95;
}

/* DOKOS SECTION (fond blanc) */
.dokos-section {
  padding: 5rem 0;
  background: white;
}

.solution-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.solution-card {
  transition: all 0.3s ease;
}

.solution-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(14, 116, 144, 0.15);
}

.solution-title-light {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.solution-text-light {
  color: #4b5563;
  line-height: 1.6;
}

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

/* CONTACT SECTION */
.contact-section {
  padding: 5rem 0;
}

.contact-card {
  max-width: 600px;
  margin: 0 auto;
}

.contact-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
}

.contact-description {
  text-align: center;
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.6;
}

/* FOOTER */
.footer-section {
  position: relative;
  color: white;
  padding: 3rem 0;
  text-align: center;
  overflow: hidden;
}

.footer-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.footer-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #ff7900 0%, #ff9500 100%);
}

.footer-content {
  position: relative;
  z-index: 10;
}

.footer-logos {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.footer-logo-dokos {
  height: 50px;
  width: auto;
  max-width: 150px;
  object-fit: contain;
}

.footer-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.95);
  color: #ff7900;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
}

.footer-content h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.footer-content p {
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 0.5rem;
}

.footer-tagline {
  font-size: 0.875rem;
  margin-top: 1rem;
  opacity: 0.9;
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

  .project-block,
  .project-block.reverse {
    grid-template-columns: 1fr;
    gap: 2rem;
    direction: ltr;
  }

  .features-grid,
  .solution-grid,
  .sovereignty-grid {
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