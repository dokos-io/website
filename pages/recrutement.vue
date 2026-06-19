<script setup>
const techStack = [
  { label: 'Python', required: true },
  { label: 'JavaScript', required: true },
  { label: 'Linux', required: true },
  { label: 'Git', required: true },
  { label: 'DevOps / CI-CD', required: false },
  { label: 'Conteneurisation', required: false },
]

const mindset = [
  {
    icon: 'i-heroicons-globe-alt',
    title: "L'open source comme conviction",
    description: "Pas une appétence, une façon de concevoir le logiciel et son rapport aux utilisateurs."
  },
  {
    icon: 'i-heroicons-cpu-chip',
    title: "Une vraie curiosité pour l'IA",
    description: "Comprendre ce que l'IA change concrètement dans un produit de gestion, pas juste s'y intéresser."
  },
  {
    icon: 'i-heroicons-puzzle-piece',
    title: "A l'aise dans l'ambiguïté",
    description: "Avancer sans qu'on formule chaque tâche. Dans une équipe de cinq, les problèmes ne sont pas toujours bien définis."
  },
  {
    icon: 'i-heroicons-hand-raised',
    title: "L'implication dans le projet",
    description: "Des contraintes réelles, une responsabilité directe, un impact visible."
  },
]

const conditions = [
  { icon: 'i-heroicons-heart', label: 'Mutuelle prise en charge à 100 %' },
  { icon: 'i-heroicons-clock', label: 'Horaires flexibles · 38,5h/semaine' },
  { icon: 'i-heroicons-home', label: 'Télétravail vraiment flexible' },
  { icon: 'i-heroicons-map', label: 'Aucun déplacement obligatoire' },
  { icon: 'i-heroicons-building-office-2', label: 'Poste basé à Nancy' },
  { icon: 'i-heroicons-calendar', label: 'Début : dès que possible' },
]

const products = ['Dokos', 'Dodock', 'HRMS', 'Bookings']

useSeoMeta({
  title: "Ingénieur Logiciel Full-Stack — Dokos recrute",
  ogTitle: "Ingénieur Logiciel Full-Stack — Dokos recrute",
  description: "On est quatre. On cherche la cinquième personne. CDI à Nancy, télétravail flexible, produit open source orienté IA.",
  ogDescription: "On est quatre. On cherche la cinquième personne. CDI à Nancy, télétravail flexible, produit open source orienté IA.",
})
</script>

<template>
  <div class="rp">

    <!-- ═══════════════════════════════════════
         HERO
    ═══════════════════════════════════════ -->
    <section class="hero">
      <UContainer class="hero-inner">

        <div class="hero-badges">
          <span class="badge badge--mint">
            <Icon name="i-heroicons-map-pin-solid" class="w-3.5 h-3.5" /> Nancy
          </span>
          <span class="badge badge--outline">CDI</span>
          <span class="badge badge--outline">Dès que possible</span>
        </div>

        <h1 class="hero-title">
          Ingénieur Logiciel<br>
          <em class="hero-title-em">Full-Stack</em>
        </h1>

        <p class="hero-sub">
          On est quatre.<br>On cherche la cinquième personne.
        </p>

        <div class="hero-actions">
          <a href="#postuler" class="btn-coral">
            Postuler
            <Icon name="i-ph-paper-plane-right" class="w-4 h-4" />
          </a>
          <a href="#poste" class="btn-ghost">
            Lire l'offre
            <Icon name="i-heroicons-arrow-down" class="w-4 h-4" />
          </a>
        </div>

      </UContainer>

      <!-- Bandeau stats ancré en bas du hero -->
      <div class="hero-stats">
        <UContainer>
          <div class="stats-row">
            <div class="stat">
              <span class="stat-num">10</span>
              <span class="stat-label">ans d'existence</span>
            </div>
            <div class="stat-divider" />
            <div class="stat">
              <span class="stat-num">4</span>
              <span class="stat-label">personnes dans l'équipe</span>
            </div>
            <div class="stat-divider" />
            <div class="stat">
              <span class="stat-num stat-num--coral">5<sup>e</sup></span>
              <span class="stat-label">poste ouvert</span>
            </div>
          </div>
        </UContainer>
      </div>
    </section>


    <!-- ═══════════════════════════════════════
         QUI ON EST
    ═══════════════════════════════════════ -->
    <section class="section section--light" id="poste">
      <UContainer class="section-grid">
        <div class="section-label">
          <span class="eyebrow">Qui on est</span>
        </div>
        <div class="section-content">
          <h2 class="h2">Dix ans d'open source.<br>Un projet qui grandit.</h2>
          <p class="body-text mt-5">
            Dokos développe et héberge une suite de gestion open source, fork français d'ERPNext,
            utilisée par des PME, des associations et des groupes du CAC 40 qui ont fait le choix
            de la souveraineté numérique sans renoncer à la performance.
          </p>
          <p class="body-text mt-4">
            Le projet prend une direction résolument IA. L'objectif n'est pas de grossir
            indéfiniment. C'est précisément là que l'IA nous permet de faire plus avec une
            équipe qui reste petite.
          </p>
        </div>
      </UContainer>
    </section>


    <!-- ═══════════════════════════════════════
         CE QUE TU VAS FAIRE
    ═══════════════════════════════════════ -->
    <section class="section section--white">
      <UContainer>
        <div class="section-header">
          <span class="eyebrow">Ce que tu vas faire</span>
          <h2 class="h2 mt-2">Le poste en deux blocs.</h2>
        </div>

        <div class="work-grid">

          <!-- 80 % -->
          <div class="work-card work-card--main">
            <div class="work-pct">80<span class="work-pct-unit">%</span></div>
            <h3 class="work-title">Développement produit</h3>
            <p class="body-text mt-3">
              Tu développes et tu fais évoluer les produits Dokos : nouvelles fonctionnalités,
              amélioration de l'existant, solidité des environnements de déploiement et de
              l'automatisation.
            </p>
            <p class="body-text mt-3">
              Chaque projet se pense de bout en bout. Tu ne travailles pas sur un micro-périmètre :
              tu vois le produit entier, et ton travail a un impact direct sur ce que nos clients
              utilisent chaque jour.
            </p>
            <div class="products mt-5">
              <span v-for="p in products" :key="p" class="product-chip">{{ p }}</span>
            </div>
          </div>

          <!-- 20 % -->
          <div class="work-card work-card--side">
            <div class="work-pct work-pct--muted">20<span class="work-pct-unit">%</span></div>
            <h3 class="work-title">Support · Communauté · IA</h3>
            <ul class="work-list mt-4">
              <li>Support technique clients</li>
              <li>
                Contribution à la communauté Frappe/ERPNext : visibilité publique sur ton travail,
                échanges avec des développeurs qui travaillent sur les mêmes problèmes partout dans
                le monde
              </li>
              <li>
                Intégration concrète de l'IA dans le produit et dans le quotidien de l'équipe,
                notamment via la création d'applications agentiques
              </li>
            </ul>
            <p class="work-note mt-4">
              Cette partie va naturellement prendre de plus en plus de place dans le poste.
            </p>
          </div>

        </div>

        <!-- Encart promesse -->
        <div class="promise-box">
          <Icon name="i-heroicons-bolt" class="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
          <p class="body-text">
            Dans les premières semaines, ton code part en production sur des environnements
            utilisés par de vraies organisations. Tu échanges directement avec les clients
            qui s'en servent. Et quand on prend une décision sur l'architecture ou la roadmap,
            tu es dans la pièce.
          </p>
        </div>
      </UContainer>
    </section>


    <!-- ═══════════════════════════════════════
         CE QU'ON CHERCHE
    ═══════════════════════════════════════ -->
    <section class="section section--blue">
      <UContainer>
        <div class="section-header">
          <span class="eyebrow eyebrow--light">Ce qu'on cherche</span>
          <h2 class="h2 h2--light mt-2">Les compétences, et surtout l'état d'esprit.</h2>
        </div>

        <div class="profile-grid">

          <!-- Tech -->
          <div class="profile-card">
            <h3 class="profile-card-title">
              <Icon name="i-heroicons-code-bracket" class="w-4 h-4" />
              Indispensables techniques
            </h3>
            <ul class="tech-list">
              <li v-for="t in techStack" :key="t.label" class="tech-item">
                <span class="tech-dot" :class="t.required ? 'tech-dot--blue' : 'tech-dot--mint'" />
                <span class="tech-name">{{ t.label }}</span>
                <span v-if="!t.required" class="tech-plus">vrai plus</span>
              </li>
            </ul>
            <div class="profile-card-note">
              On ne recrute pas sur le diplôme. On recrute sur les projets, la curiosité,
              et la façon de travailler. Un profil junior avec une vraie envie d'apprendre
              nous intéresse autant qu'un profil expérimenté.
            </div>
          </div>

          <!-- Mindset -->
          <div class="mindset-list">
            <div v-for="m in mindset" :key="m.title" class="mindset-item">
              <div class="mindset-icon">
                <Icon :name="m.icon" class="w-5 h-5" />
              </div>
              <div>
                <h4 class="mindset-title">{{ m.title }}</h4>
                <p class="mindset-desc">{{ m.description }}</p>
              </div>
            </div>
          </div>

        </div>
      </UContainer>
    </section>


    <!-- ═══════════════════════════════════════
         CE QU'ON OFFRE
    ═══════════════════════════════════════ -->
    <section class="section section--light">
      <UContainer>
        <div class="section-header">
          <span class="eyebrow">Ce qu'on offre</span>
          <h2 class="h2 mt-2">Le salaire, les conditions.</h2>
        </div>

        <div class="offer-grid">

          <!-- Salaire -->
          <div class="salary-card">
            <p class="salary-label">Salaire selon profil · bruts annuels</p>
            <div class="salary-rows">
              <div class="salary-row">
                <span class="salary-profile">Profil junior</span>
                <span class="salary-amount">à partir de 32 000 €</span>
              </div>
              <div class="salary-divider" />
              <div class="salary-row">
                <span class="salary-profile">Profil expert</span>
                <span class="salary-amount salary-amount--highlight">jusqu'à 50 000 €</span>
              </div>
            </div>
            <p class="salary-note">
              Expérience significative sur des ERP pour le haut de fourchette.
              On en parle ensemble.
            </p>
          </div>

          <!-- Conditions -->
          <div class="conditions-card">
            <h3 class="conditions-title">Les conditions</h3>
            <ul class="conditions-list">
              <li v-for="c in conditions" :key="c.label" class="condition-item">
                <div class="condition-icon">
                  <Icon :name="c.icon" class="w-4 h-4" />
                </div>
                {{ c.label }}
              </li>
            </ul>
          </div>

        </div>
      </UContainer>
    </section>


    <!-- ═══════════════════════════════════════
         POSTULER
    ═══════════════════════════════════════ -->
    <section class="apply-section" id="postuler">
      <UContainer class="apply-inner">
        <span class="eyebrow eyebrow--light">Comment postuler</span>
        <h2 class="apply-title">Envoyez-nous ce qui vous semble pertinent.</h2>
        <p class="apply-desc">
          Un CV, un GitHub, des projets personnels, quelques lignes sur ce qui vous attire
          dans ce qu'on fait. On lit tout, et on répond.
        </p>
        <a
          href="mailto:celine@dokos.io?subject=Candidature%20Ingénieur%20Full-Stack"
          class="apply-btn"
        >
          <Icon name="i-ph-paper-plane-right" class="w-5 h-5" />
          celine@dokos.io
        </a>
      </UContainer>
    </section>

  </div>
</template>

<style scoped>
/* ── VARIABLES ─────────────────────────────────────── */
.rp {
  --blue:      #1b4b6b;
  --blue-deep: #122f44;
  --mint:      #a8e6cf;
  --mint-dark: #6ecfab;
  --coral:     #ff6b6b;
  --coral-dark:#e85555;
  --light:     #f8f9fa;
  --white:     #ffffff;
  --ink:       #1a1a2e;
  --muted:     #64748b;

  font-family: 'DM Sans', sans-serif;
  color: var(--ink);
}

/* ── HERO ──────────────────────────────────────────── */
.hero {
  background: var(--blue);
  padding: 5rem 0 0;
  position: relative;
  overflow: hidden;
}

/* fond grain subtil */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 70% 20%, rgba(168,230,207,0.12) 0%, transparent 55%),
    radial-gradient(circle at 10% 80%, rgba(255,107,107,0.08) 0%, transparent 50%);
  pointer-events: none;
}

.hero-inner {
  position: relative;
  z-index: 1;
  padding-bottom: 4rem;
}

.hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.35rem 0.875rem;
  border-radius: 9999px;
  letter-spacing: 0.02em;
}
.badge--mint {
  background: var(--mint);
  color: var(--blue-deep);
}
.badge--outline {
  border: 1.5px solid rgba(255,255,255,0.25);
  color: rgba(255,255,255,0.7);
}

.hero-title {
  font-size: clamp(2.75rem, 7vw, 5.5rem);
  font-weight: 800;
  color: var(--white);
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
}
.hero-title-em {
  font-style: normal;
  color: var(--mint);
}

.hero-sub {
  font-size: 1.25rem;
  color: rgba(255,255,255,0.65);
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.875rem;
}

.btn-coral {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--coral);
  color: var(--white);
  font-size: 0.9375rem;
  font-weight: 600;
  padding: 0.75rem 1.75rem;
  border-radius: 9999px;
  text-decoration: none;
  transition: background 0.15s, transform 0.15s;
}
.btn-coral:hover {
  background: var(--coral-dark);
  transform: translateY(-1px);
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255,255,255,0.7);
  font-size: 0.9375rem;
  font-weight: 500;
  padding: 0.75rem 1.25rem;
  border-radius: 9999px;
  border: 1.5px solid rgba(255,255,255,0.2);
  text-decoration: none;
  transition: border-color 0.15s, color 0.15s;
}
.btn-ghost:hover {
  border-color: rgba(255,255,255,0.5);
  color: var(--white);
}

/* Bandeau stats */
.hero-stats {
  background: var(--blue-deep);
  border-top: 1px solid rgba(255,255,255,0.08);
  padding: 1.75rem 0;
  position: relative;
  z-index: 1;
}

.stats-row {
  display: flex;
  align-items: center;
  gap: 0;
}

.stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0 1.5rem;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255,255,255,0.12);
  flex-shrink: 0;
}

.stat-num {
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--white);
  line-height: 1;
  letter-spacing: -0.02em;
}
.stat-num--coral { color: var(--coral); }
.stat-num sup { font-size: 1rem; vertical-align: super; }

.stat-label {
  font-size: 0.8125rem;
  color: rgba(255,255,255,0.45);
  font-weight: 500;
  text-align: center;
}

/* ── SECTIONS ──────────────────────────────────────── */
.section {
  padding: 5rem 0;
}
.section--light { background: var(--light); }
.section--white { background: var(--white); }
.section--blue  { background: var(--blue); }

.section-grid {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 4rem;
  align-items: start;
}

.section-label {
  padding-top: 0.5rem;
}

.section-header { margin-bottom: 3rem; }

/* ── TYPOGRAPHIE RÉUTILISABLE ───────────────────────── */
.eyebrow {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--coral);
  display: block;
}
.eyebrow--light { color: var(--mint); }

.h2 {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  color: var(--ink);
  line-height: 1.15;
  letter-spacing: -0.01em;
}
.h2--light { color: var(--white); }

.body-text {
  font-size: 1rem;
  color: var(--muted);
  line-height: 1.8;
}
.body-text--light { color: rgba(255,255,255,0.65); }

.text-coral { color: var(--coral); }

/* ── CE QUE TU VAS FAIRE ────────────────────────────── */
.work-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.work-card {
  border-radius: 1rem;
  padding: 2rem;
}

.work-card--main {
  background: var(--blue);
  color: var(--white);
}

.work-card--side {
  background: var(--light);
  border: 1.5px solid #e5e7eb;
}

.work-pct {
  font-size: 4.5rem;
  font-weight: 900;
  color: var(--coral);
  line-height: 1;
  letter-spacing: -0.03em;
}
.work-pct--muted { color: var(--mint); opacity: 0.7; }
.work-pct-unit { font-size: 2rem; }

.work-title {
  font-size: 1.125rem;
  font-weight: 700;
  margin-top: 0.75rem;
  color: inherit;
}

.work-card--side .work-title { color: var(--ink); }
.work-card--main .body-text { color: rgba(255,255,255,0.7); }

.products {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.product-chip {
  font-size: 0.75rem;
  font-weight: 600;
  background: rgba(168,230,207,0.15);
  color: var(--mint);
  border: 1px solid rgba(168,230,207,0.3);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  letter-spacing: 0.02em;
}

.work-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}
.work-list li {
  font-size: 0.9375rem;
  color: var(--muted);
  line-height: 1.7;
  padding-left: 1.25rem;
  position: relative;
}
.work-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--mint-dark);
}

.work-note {
  font-size: 0.8125rem;
  color: #94a3b8;
  font-style: italic;
}

.promise-box {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  background: #fff7ed;
  border-left: 4px solid var(--coral);
  border-radius: 0 0.75rem 0.75rem 0;
  padding: 1.25rem 1.5rem;
}

/* ── CE QU'ON CHERCHE ───────────────────────────────── */
.profile-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 1.5rem;
}

.profile-card {
  background: rgba(255,255,255,0.06);
  border: 1.5px solid rgba(255,255,255,0.1);
  border-radius: 1rem;
  padding: 2rem;
}

.profile-card-title {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--mint);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-list {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  margin-bottom: 1.75rem;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9375rem;
  color: rgba(255,255,255,0.85);
  font-weight: 500;
}

.tech-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.tech-dot--blue { background: var(--mint); }
.tech-dot--mint { background: var(--coral); opacity: 0.7; }

.tech-name { flex: 1; }

.tech-plus {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--coral);
  background: rgba(255,107,107,0.12);
  border: 1px solid rgba(255,107,107,0.25);
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
}

.profile-card-note {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.45);
  line-height: 1.7;
  border-top: 1px solid rgba(255,255,255,0.08);
  padding-top: 1.25rem;
}

.mindset-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.mindset-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.08);
  border-radius: 0.875rem;
  padding: 1.25rem;
  transition: border-color 0.2s, background 0.2s;
}
.mindset-item:hover {
  background: rgba(168,230,207,0.06);
  border-color: rgba(168,230,207,0.2);
}

.mindset-icon {
  width: 42px;
  height: 42px;
  background: rgba(168,230,207,0.12);
  border-radius: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--mint);
  flex-shrink: 0;
}

.mindset-title {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 0.25rem;
  line-height: 1.3;
}

.mindset-desc {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.65;
}

/* ── CE QU'ON OFFRE ─────────────────────────────────── */
.offer-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.salary-card {
  background: var(--blue);
  border-radius: 1rem;
  padding: 2rem;
  color: var(--white);
}

.salary-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.4);
  margin-bottom: 1.5rem;
}

.salary-rows {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.salary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  gap: 1rem;
}

.salary-divider {
  height: 1px;
  background: rgba(255,255,255,0.1);
}

.salary-profile {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.55);
  font-weight: 500;
}

.salary-amount {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--white);
}
.salary-amount--highlight {
  color: var(--coral);
  font-size: 1.25rem;
}

.salary-note {
  font-size: 0.8125rem;
  color: rgba(255,255,255,0.35);
  line-height: 1.65;
  margin-top: 1.25rem;
  border-top: 1px solid rgba(255,255,255,0.08);
  padding-top: 1.25rem;
}

.conditions-card {
  background: var(--white);
  border: 1.5px solid #e5e7eb;
  border-radius: 1rem;
  padding: 2rem;
}

.conditions-title {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
  margin-bottom: 1.5rem;
}

.conditions-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.condition-item {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  font-size: 0.9375rem;
  color: var(--ink);
  font-weight: 500;
}

.condition-icon {
  width: 36px;
  height: 36px;
  background: var(--light);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--blue);
  flex-shrink: 0;
}

/* ── POSTULER ───────────────────────────────────────── */
.apply-section {
  background: var(--blue);
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
}

.apply-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 80% 50%, rgba(255,107,107,0.1) 0%, transparent 50%),
    radial-gradient(circle at 20% 50%, rgba(168,230,207,0.08) 0%, transparent 50%);
  pointer-events: none;
}

.apply-inner {
  position: relative;
  z-index: 1;
  max-width: 620px;
}

.apply-title {
  font-size: clamp(1.75rem, 3.5vw, 2.75rem);
  font-weight: 800;
  color: var(--white);
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin: 0.75rem 0 1.25rem;
}

.apply-desc {
  font-size: 1rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.8;
  margin-bottom: 2.5rem;
}

.apply-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  background: var(--coral);
  color: var(--white);
  font-size: 1rem;
  font-weight: 700;
  padding: 0.875rem 2rem;
  border-radius: 9999px;
  text-decoration: none;
  transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
  box-shadow: 0 4px 20px rgba(255,107,107,0.35);
}
.apply-btn:hover {
  background: var(--coral-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(255,107,107,0.45);
}

/* ── RESPONSIVE ─────────────────────────────────────── */
@media (max-width: 1024px) {
  .section-grid    { grid-template-columns: 1fr; gap: 1.5rem; }
  .work-grid       { grid-template-columns: 1fr; }
  .profile-grid    { grid-template-columns: 1fr; }
  .offer-grid      { grid-template-columns: 1fr; }
}

@media (max-width: 640px) {
  .stats-row       { gap: 0; }
  .stat            { padding: 0 0.75rem; }
  .hero-title      { font-size: 2.5rem; }
}
</style>
