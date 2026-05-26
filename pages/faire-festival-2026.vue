<script setup>
import ContactForm from '~/components/ContactForm.vue'

const form = {
  title: 'On se retrouve ?',
  description: "Vous venez au Faire Festival et vous voulez qu'on se croise ? Vous ne pouvez pas venir mais vous êtes curieux·se de savoir ce que Dokos peut faire pour vous ? Écrivez-nous.",
  name: { label: 'Nom', placeholder: 'Martine Dupond' },
  email: { label: 'Email', placeholder: 'martine@mon-fablab.fr' },
  company: { label: 'Structure', placeholder: 'Votre fablab / tiers-lieu / association' },
  body: { label: 'Dites-nous tout', placeholder: 'Parlez-nous de votre espace et de ce que vous cherchez à mieux gérer' },
  info: '',
  button: { icon: "i-ph-paper-plane-right", label: 'Envoyer' },
}

const montage = [
  { number: '01', title: 'Écouter', description: 'Vos besoins font évoluer le logiciel. Pas l\'inverse.' },
  { number: '02', title: 'Construire ensemble', description: 'Un commun numérique. Pensé et construit avec les makers.' },
  { number: '03', title: 'Fabriquer, pas administrer', description: 'Adhésions, réservations, facturation, documentation… On gère. Place au Faire.' },
  { number: '04', title: 'Rester libre', description: 'Votre outil, vos données, vos règles. Un numérique qui vous appartient vraiment.' }
]

const otherTools = [
  'Valentina', 'Do.Doc', 'MoviLab', 'NextCloud',
  'Framasoft', 'FabManager', 'Inkscape', 'FreeCAD',
  'TopSolid', 'Solidworks', 'MakerNet'
]

const programme = [
  {
    date: 'Mardi 26 & Mercredi 27 mai',
    label: 'Pré-festival',
    events: [
      { time: '2 jours', title: 'Hackathon : Code · Cut · Share : Libérons les lasers', description: 'Deux jours autour de LaserMagic, outil open source pour piloter les découpes laser. Création de ressources, tests sur machines, documentation.' }
    ]
  },
  {
    date: 'Jeudi 28 mai', label: 'Jour 1',
    events: [
      { time: '14h30 – 16h30', title: 'Café IA : "IA & Tutos : outil magique ou mauvaise idée ?"', description: 'Discussion ouverte autour de l\'intelligence artificielle dans la création et le partage de tutoriels.' },
      { time: '17h – 18h', title: 'Kamishibaï : Ada & Zangemann', description: 'Lecture du conte de la Free Software Foundation, dès 7 ans, suivie d\'un débat sur les enjeux du Libre.' }
    ]
  },
  {
    date: 'Vendredi 29 mai', label: 'Jour 2',
    events: [
      { time: '10h – 11h30', title: 'Métacartes "Numérique éthique"', description: 'Atelier participatif autour de la souveraineté numérique et des outils libres.' },
      { time: '14h – 15h30', title: 'Métacartes "Faire ensemble"', description: 'Méthodes créatives et collaboratives pour les espaces du faire.' },
      { time: '16h – 18h', title: 'Comm\'un Lundi', description: 'Rencontre des acteur·rice·s de la fabrication distribuée.' },
      { time: 'Soirée', title: 'Wikiwar', description: 'Jeu collaboratif Wikipédia, tradition RFFLabs.' }
    ]
  },
  {
    date: 'Samedi 30 mai', label: 'Jour 3',
    events: [
      { time: 'Toute la journée', title: 'Stand "Faisons en communs !"', description: 'Framasoft, April, FreeCAD, Inkscape, communs des tiers-lieux, MoviLab et Dokos.' },
      { time: '10h30 – 11h & 15h – 16h', title: 'Kamishibaï tout public', description: 'Lecture du conte Ada & Zangemann, ouverte à toutes et tous.' },
      { time: '11h – 12h & 14h – 15h', title: 'Carto Party OpenStreetMap', description: 'Contribuez à la carte libre du monde, ensemble.' },
      { time: '11h – 12h30', title: 'Café IA grand public', description: 'L\'intelligence artificielle expliquée, questionnée, démystifiée.' }
    ]
  }
]

const videoUrl = 'https://www.youtube.com/embed/HOWEyCbs1WM'

const features = [
  { icon: 'i-heroicons-academic-cap', title: 'Tutoriels', description: 'Créez et partagez des tutos pas à pas. Vos membres progressent, votre savoir-faire se transmet.' },
  { icon: 'i-heroicons-receipt-percent', title: 'Facturation', description: 'Devis, factures, avoirs générés selon vos tarifs. Conformes, numérotés, envoyés automatiquement.' },
  { icon: 'i-heroicons-play-circle', title: 'LMS', description: 'Organisez des formations, suivez les parcours, certifiez les compétences. Intégré à votre gestion.' },
  { icon: 'i-heroicons-calendar', title: 'Réservation de machine', description: 'Planning de réservation pour toutes vos machines. Créneaux, disponibilités, historique. Sans tableur partagé.' },
  { icon: 'i-heroicons-user-group', title: 'Adhésion', description: 'Gérez adhésions, cotisations et renouvellements. Chaque membre a son espace, vous avez le tableau de bord.' },
  { icon: 'i-heroicons-document-text', title: 'Documentation', description: 'Guides machines, règles d\'utilisation, ressources partagées. Accessible à tous, maintenue par la communauté.' },
]

useSeoMeta({
  title: "Dokos au Faire Festival 2026",
  ogTitle: "Dokos au Faire Festival 2026 : le logiciel libre des Makers",
  description: "Retrouvez Dokos au Faire Festival 2026, 28-30 mai à Toulouse. Le logiciel libre de gestion pensé pour les makers, fablabs et tiers-lieux.",
  ogDescription: "Retrouvez Dokos au Faire Festival 2026, 28-30 mai à Toulouse. Le logiciel libre de gestion pensé pour les makers, fablabs et tiers-lieux.",
});
</script>

<template>
  <div class="ff">

    <!-- ══════════════════════════════════════════════════
         HERO — affiche festival, typo massive
    ══════════════════════════════════════════════════ -->
    <section class="hero">
      <!-- grain existant -->
      <svg class="hero-grain" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <filter id="ff-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" result="noise"/>
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise"/>
            <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blended"/>
            <feComposite in="blended" in2="SourceGraphic" operator="in"/>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="#0f2e42" filter="url(#ff-grain)" opacity="0.55"/>
      </svg>

      <UContainer class="hero-inner">
        <!-- Ligne de date — identification immédiate -->
        <div class="hero-dateline">
          <Icon name="i-heroicons-map-pin-solid" class="w-4 h-4" />
          <span>28 · 29 · 30 MAI 2026</span>
          <span class="hero-sep">—</span>
          <span>TOULOUSE</span>
        </div>

        <!-- Titre affiche empilé -->
        <h1 class="hero-title">
          <span class="hero-line hero-line--hollow">DOKOS</span>
          <span class="hero-line hero-line--highlight">AU FAIRE</span>
          <span class="hero-line hero-line--white">FESTIVAL</span>
        </h1>

        <p class="hero-sub">
          Le logiciel libre des makers.<br>
          Construisons quelque chose ensemble.
        </p>

        <!-- Trust chips — avant les CTAs pour réduire la friction (neuromarketing) -->
        <div class="hero-chips">
          <span class="chip chip--outline">Commun du numérique</span>
          <span class="chip chip--outline">100 % open source</span>
          <span class="chip chip--outline">Vos données, vos règles</span>
        </div>

        <div class="hero-ctas">
          <UButton to="https://dokos.io" target="_blank" size="xl" class="btn-hero-primary">
            Découvrir dokos.io
          </UButton>
          <UButton to="#trouver" size="xl" class="btn-hero-ghost">
            Nous trouver au festival →
          </UButton>
        </div>
      </UContainer>

      <!-- Coins de cadre technique — signal maker discret -->
      <span class="hero-corner hero-corner--tl" aria-hidden="true"></span>
      <span class="hero-corner hero-corner--tr" aria-hidden="true"></span>

      <!-- Mascotte qui déborde sur la section suivante -->
      <img
        src="/faire-festival/testlogotuxdokosfaire.svg"
        alt=""
        class="hero-mascot"
        aria-hidden="true"
      />

      <!-- Coupe diagonale bas — séparateur festival -->
      <div class="hero-angle-cut" aria-hidden="true">
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="0,56 1440,8 1440,56" fill="#FAF8F4"/>
        </svg>
      </div>
    </section>


    <!-- ══════════════════════════════════════════════════
         NOTICE DE MONTAGE — 4 valeurs, cartes inclinées
    ══════════════════════════════════════════════════ -->
    <section class="montage-section">
      <UContainer>
        <div class="montage-header">
          <span class="section-eyebrow">Notice de montage</span>
          <h2 class="section-h2">Comment fonctionne Dokos&nbsp;?</h2>
        </div>

        <div class="montage-grid">
          <div
            v-for="(step, i) in montage"
            :key="step.number"
            :class="['montage-card', `tilt-${i}`]"
          >
            <span class="montage-num">{{ step.number }}</span>
            <h3 class="montage-title">{{ step.title }}</h3>
            <p class="montage-desc">{{ step.description }}</p>
          </div>
        </div>
      </UContainer>
    </section>


    <!-- ══════════════════════════════════════════════════
         FEATURES — ce que Dokos gère pour vous
    ══════════════════════════════════════════════════ -->
    <section class="features-section">
      <UContainer>
        <div class="features-header">
          <span class="section-eyebrow section-eyebrow--light">Ce que Dokos gère pour vous</span>
          <h2 class="section-h2 section-h2--light">
            Place au Faire.<br>
            <span class="ocre-text">On s'occupe du reste.</span>
          </h2>
          <p class="features-sub">
            Les tâches administratives qui vous volent du temps de fabrication. Dokos les prend en charge.
          </p>
        </div>

        <!-- Vidéo — renseigner videoUrl dans le script pour remplacer le placeholder -->
        <div class="features-video">
          <iframe
            v-if="videoUrl"
            :src="videoUrl"
            class="features-video-frame"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
          <div v-else class="features-video-placeholder">
            <Icon name="i-heroicons-play-circle" class="w-12 h-12 mb-3 opacity-40" />
            <p>Vidéo à venir</p>
          </div>
        </div>

        <div class="features-grid">
          <div v-for="feature in features" :key="feature.title" class="feature-card">
            <div class="feature-icon-wrap">
              <Icon :name="feature.icon" class="w-6 h-6" />
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-desc">{{ feature.description }}</p>
          </div>
        </div>
      </UContainer>
    </section>


    <!-- ══════════════════════════════════════════════════
         OÙ NOUS TROUVER — Le Cyber Café du Faire
    ══════════════════════════════════════════════════ -->
    <section class="trouver-section" id="trouver">
      <UContainer>
        <div class="trouver-grid">

          <div class="trouver-main">
            <span class="section-eyebrow">Où nous trouver</span>
            <h2 class="trouver-title">Le Cyber Café<br>du Faire</h2>

            <div class="trouver-infos">
              <div class="trouver-info-row">
                <Icon name="i-heroicons-calendar-days" class="w-5 h-5 flex-shrink-0" />
                <span>28, 29 et 30 mai 2026, toute la journée</span>
              </div>
              <div class="trouver-info-row">
                <Icon name="i-heroicons-map-pin" class="w-5 h-5 flex-shrink-0" />
                <span>La Cité · 55 avenue Louis Bréguet · Toulouse</span>
              </div>
              <div class="trouver-info-row">
                <Icon name="i-heroicons-users" class="w-5 h-5 flex-shrink-0" />
                <span>Parcours Communs Numériques</span>
              </div>
            </div>

            <p class="trouver-desc">
              L'espace permanent du festival dédié aux logiciels libres et propriétaires.
              Venez tester, comparer, poser vos questions, on vous y attend !
            </p>
          </div>

          <!-- Autres outils — validation sociale peer-to-peer (neuromarketing) -->
          <div class="trouver-peers">
            <h3 class="peers-title">On y sera avec…</h3>
            <div class="peers-chips">
              <span v-for="tool in otherTools" :key="tool" class="chip chip--solid">{{ tool }}</span>
            </div>
          </div>

        </div>
      </UContainer>
    </section>


    <!-- ══════════════════════════════════════════════════
         PROGRAMME — timeline sur blueprint
    ══════════════════════════════════════════════════ -->
    <section class="programme-section">
      <!-- grille de points blueprint -->
      <div class="blueprint-dots" aria-hidden="true" />

      <UContainer class="relative z-10">
        <div class="programme-header">
          <span class="section-eyebrow section-eyebrow--light">Programme</span>
          <h2 class="section-h2 section-h2--light">Parcours Communs Numériques</h2>
        </div>

        <div class="timeline">
          <div v-for="day in programme" :key="day.date" class="timeline-day">
            <div class="timeline-day-header">
              <span class="day-badge">{{ day.label }}</span>
              <h3 class="day-date">{{ day.date }}</h3>
            </div>

            <div class="timeline-events">
              <div v-for="event in day.events" :key="event.title" class="timeline-event">
                <span class="event-time">{{ event.time }}</span>
                <div class="event-body">
                  <h4 class="event-title">{{ event.title }}</h4>
                  <p class="event-desc">{{ event.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="programme-note">
          <Icon name="i-heroicons-information-circle" class="w-5 h-5 flex-shrink-0" />
          <p>Le Cyber Café du Faire est ouvert en continu sur les 3 jours, avec des personnes ressources pour accompagner la découverte des outils.</p>
        </div>
      </UContainer>
    </section>


    <!-- ══════════════════════════════════════════════════
         CTA + CONTACT — fond corail, inversion chaude
    ══════════════════════════════════════════════════ -->
    <section class="contact-section" id="contact">
      <UContainer>
        <div class="contact-grid">

          <div class="contact-copy">
            <!-- Tampon existant -->
            <img
              src="/faire-festival/Tamponfairefestival2026dokos.png"
              alt="Tampon Faire Festival 2026 Dokos"
              class="contact-tampon"
            />
            <h2 class="contact-h2">On se retrouve&nbsp;?</h2>
            <p class="contact-sub">
              Vous venez au festival et vous voulez qu'on se croise,
              ou vous avez une question sur Dokos, écrivez-nous. On répond vite.
            </p>
          </div>

          <div class="contact-form-wrap">
            <ContactForm :form="form" />
          </div>

        </div>
      </UContainer>
    </section>


    <!-- ══════════════════════════════════════════════════
         FOOTER
    ══════════════════════════════════════════════════ -->
    <footer class="ff-footer">
      <UContainer>
        <div class="footer-inner">
          <img src="/faire-festival/dokos-logo-inverted-dokosblanc.svg" alt="Dokos" class="footer-logo" />
          <p class="footer-line">Le logiciel libre des Makers</p>
          <p class="footer-sub">Faire Festival 2026 · 28-30 mai · La Cité, Toulouse</p>
        </div>
      </UContainer>
    </footer>

  </div>
</template>

<style scoped>
/* ── VARIABLES ─────────────────────────────────────────── */
.ff {
  --blue:       #1B4B6B;
  --blue-dark:  #1B4B6B;
  --blue-mid:   #154060;
  --ocre:       #D4960F;
  --ocre-light: #F5C842;
  --ocre-dark:  #A8750A;
  --coral:      #ff6b6b;
  --coral-dark: #e85555;
  --cream:      #FAF8F4;
  --white:      #ffffff;
  --ink:        #111827;

  font-family: 'DM Sans', sans-serif;
  color: var(--ink);
  background: var(--blue-dark);
}

/* ── HERO ──────────────────────────────────────────────── */
.hero {
  position: relative;
  background: var(--blue-dark);
  padding: 5rem 0 6rem;
}

.hero-grain {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.hero-inner {
  position: relative;
  z-index: 10;
}

/* Date line — ancrage temporel immédiat */
.hero-dateline {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ocre-light);
  background: rgba(245,200,66,0.1);
  border: 1px solid rgba(245,200,66,0.25);
  padding: 0.4rem 0.875rem;
  margin-bottom: 1.5rem;
}
.hero-sep { opacity: 0.4; }

/* Titre affiche — l'impact visuel principal */
.hero-title {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 2rem;
  line-height: 0.88;
}
.hero-line {
  font-family: 'Space Mono', monospace;
  font-size: clamp(3.5rem, 11vw, 9rem);
  font-weight: 700;
  text-transform: uppercase;
  display: block;
}
.hero-line--white  { color: var(--white); }
/* Creux — pattern interruption, signal tribal sérigraphie */
.hero-line--hollow {
  color: transparent;
  -webkit-text-stroke: 2.5px var(--white);
}
/* Bloc surligné — point focal sur le nom de l'événement */
.hero-line--highlight {
  color: var(--blue-dark);
  background: var(--ocre-light);
  width: fit-content;
  padding: 0.04em 0.3em 0.06em;
}

.hero-sub {
  font-size: 1.125rem;
  color: rgba(255,255,255,0.75);
  line-height: 1.7;
  max-width: 480px;
  margin-bottom: 2.5rem;
}

.hero-ctas {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Chips trust — signal de confiance avant les CTAs */
.hero-chips {
  display: flex;
  gap: 0.625rem;
  flex-wrap: wrap;
  margin-bottom: 1.75rem;
}

.chip {
  font-family: 'Space Mono', monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.3rem 0.75rem;
  border-radius: 2px;
}
.chip--outline {
  border: 1.5px solid rgba(255,255,255,0.3);
  color: rgba(255,255,255,0.6);
}
.chip--solid {
  background: var(--blue);
  border: 1.5px solid rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.8);
}

/* Boutons hero */
.btn-hero-primary {
  font-family: 'Space Mono', monospace !important;
  background: var(--white) !important;
  color: var(--blue-dark) !important;
  border: 2px solid var(--white) !important;
  box-shadow: 4px 4px 0 var(--ocre) !important;
  border-radius: 3px !important;
  font-weight: 700 !important;
  transition: box-shadow .15s, transform .15s !important;
}
.btn-hero-primary:hover {
  box-shadow: 0 0 0 var(--ocre) !important;
  transform: translate(4px, 4px) !important;
}

.btn-hero-ghost {
  font-family: 'Space Mono', monospace !important;
  background: transparent !important;
  color: var(--ocre-light) !important;
  border: 2px solid var(--ocre) !important;
  border-radius: 3px !important;
  font-weight: 700 !important;
  transition: background .15s !important;
}
.btn-hero-ghost:hover {
  background: rgba(212,150,15,0.12) !important;
}

/* Coins de cadre technique — signal maker discret */
.hero-corner {
  position: absolute;
  width: 28px;
  height: 28px;
  border-color: rgba(255,255,255,0.2);
  border-style: solid;
  z-index: 3;
}
.hero-corner--tl { top: 20px; left: 20px; border-width: 1.5px 0 0 1.5px; }
.hero-corner--tr { top: 20px; right: 20px; border-width: 1.5px 1.5px 0 0; }

/* Mascotte — se superpose à la coupe diagonale */
.hero-mascot {
  position: absolute;
  bottom: -60px;
  right: 8%;
  height: 220px;
  width: auto;
  z-index: 20;
  pointer-events: none;
}

/* Coupe diagonale bas du hero */
.hero-angle-cut {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  line-height: 0;
}
.hero-angle-cut svg { display: block; width: 100%; }

/* ── MONTAGE — cartes inclinées ────────────────────────── */
.montage-section {
  background: var(--cream);
  padding: 8rem 0 5rem;
}

.montage-header {
  margin-bottom: 3rem;
}

.montage-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  /* espace pour les rotations */
  padding: 1rem 0 2rem;
}

.montage-card {
  background: var(--white);
  border: 2px solid var(--ink);
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  transition: transform .2s ease, box-shadow .2s ease;
}
/* Rotations — effet tableau en liège */
.tilt-0 {
  transform: rotate(-2deg);
  box-shadow: 4px 4px 0 var(--ocre);
}
.tilt-1 {
  transform: rotate(1.5deg);
  box-shadow: 4px 4px 0 var(--blue);
}
.tilt-2 {
  transform: rotate(-1deg);
  box-shadow: 4px 4px 0 var(--ocre);
}
.tilt-3 {
  transform: rotate(2deg);
  box-shadow: 4px 4px 0 var(--blue);
}
.montage-card:hover {
  transform: rotate(0deg) translateY(-4px) !important;
  box-shadow: 6px 6px 0 var(--coral) !important;
}

.montage-num {
  font-family: 'Space Mono', monospace;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--ocre);
  line-height: 1;
  opacity: 0.6;
}
.montage-title {
  font-family: 'Space Mono', monospace;
  font-size: 1rem;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.3;
}
.montage-desc {
  font-size: 0.875rem;
  color: #6B7280;
  line-height: 1.6;
}

/* ── EYEBROW + TITLES réutilisables ────────────────────── */
.section-eyebrow {
  font-family: 'Space Mono', monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--ocre);
  display: block;
  margin-bottom: 0.5rem;
}
.section-eyebrow--light { color: var(--ocre-light); }

.section-h2 {
  font-family: 'Space Mono', monospace;
  font-size: clamp(1.75rem, 3.5vw, 2.75rem);
  font-weight: 700;
  line-height: 1.2;
  color: var(--ink);
}
.section-h2--light { color: var(--white); }

.ocre-text { color: var(--ocre-light); }

/* ── FEATURES ──────────────────────────────────────────── */
.features-section {
  background: var(--blue-dark);
  padding: 5rem 0;
  border-top: 3px solid rgba(212,150,15,0.4);
  border-bottom: 3px solid rgba(212,150,15,0.4);
}

.features-header {
  margin-bottom: 3rem;
}
.features-sub {
  font-size: 1rem;
  color: rgba(255,255,255,0.55);
  max-width: 520px;
  line-height: 1.7;
  margin-top: 0.75rem;
}

.features-video {
  margin-bottom: 3rem;
  border: 2px solid var(--ocre);
  box-shadow: 6px 6px 0 var(--ocre-dark);
}
.features-video-frame {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
}
.features-video-placeholder {
  aspect-ratio: 16 / 9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.4);
  font-family: 'Space Mono', monospace;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.feature-card {
  background: var(--white);
  border: 2px solid var(--white);
  border-top: 4px solid var(--ocre);
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  box-shadow: 5px 5px 0 rgba(15, 46, 66, 0.5);
  transition: transform .2s ease, box-shadow .2s ease;
}
.feature-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0 var(--coral);
}

.feature-icon-wrap {
  width: 44px;
  height: 44px;
  background: rgba(212,150,15,0.1);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ocre);
  flex-shrink: 0;
}
.feature-title {
  font-family: 'Space Mono', monospace;
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--blue-dark);
  line-height: 1.3;
}
.feature-desc {
  font-size: 0.875rem;
  color: #4B5563;
  line-height: 1.65;
}

/* ── OÙ NOUS TROUVER ───────────────────────────────────── */
.trouver-section {
  background: var(--cream);
  padding: 5rem 0;
  border-bottom: 3px solid var(--ink);
}

.trouver-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 5rem;
  align-items: start;
}

.trouver-title {
  font-family: 'Space Mono', monospace;
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 700;
  color: var(--blue-dark);
  line-height: 1.1;
  margin: 0.5rem 0 1.75rem;
}

.trouver-infos {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  margin-bottom: 1.75rem;
}
.trouver-info-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9375rem;
  color: var(--blue);
  font-weight: 500;
}

.trouver-desc {
  font-size: 0.9375rem;
  color: #6B7280;
  line-height: 1.75;
}

.peers-title {
  font-family: 'Space Mono', monospace;
  font-size: 1rem;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 1.25rem;
}
.peers-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* ── PROGRAMME — blueprint ─────────────────────────────── */
.programme-section {
  position: relative;
  background: var(--blue);
  padding: 5rem 0;
}

.blueprint-dots {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px);
  background-size: 24px 24px;
}

.programme-header { margin-bottom: 3rem; }

/* Timeline */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  border-left: 3px solid var(--coral);
  padding-left: 2rem;
  margin-left: 0.5rem;
}

.timeline-day-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  /* Dot sur la ligne corail */
  position: relative;
}
.timeline-day-header::before {
  content: '';
  position: absolute;
  left: -2.625rem;
  width: 14px;
  height: 14px;
  background: var(--coral);
  border-radius: 50%;
  border: 2px solid var(--blue);
}

.day-badge {
  font-family: 'Space Mono', monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: var(--ocre);
  color: var(--blue-dark);
  padding: 0.2rem 0.625rem;
  border-radius: 2px;
}
.day-date {
  font-family: 'Space Mono', monospace;
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--white);
}

.timeline-events {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.timeline-event {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 1.25rem;
  align-items: start;
}
.event-time {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--ocre-light);
  padding-top: 2px;
  line-height: 1.5;
}
.event-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--white);
  margin-bottom: 0.25rem;
  line-height: 1.4;
}
.event-desc {
  font-size: 0.8125rem;
  color: rgba(255,255,255,0.55);
  line-height: 1.6;
}

.programme-note {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  background: rgba(212,150,15,0.1);
  border: 1px solid rgba(212,150,15,0.25);
  border-radius: 4px;
  padding: 1.125rem 1.375rem;
  margin-top: 2.5rem;
  color: rgba(255,255,255,0.65);
  font-size: 0.875rem;
  line-height: 1.6;
  position: relative;
  z-index: 10;
}

/* ── CONTACT — fond ocre désaturé, chaleur sans agressivité ── */
.contact-section {
  background: #EDD87A;
  padding: 5rem 0;
  border-top: 3px solid var(--ocre-dark);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 5rem;
  align-items: start;
}

.contact-tampon {
  height: 120px;
  width: auto;
  margin-bottom: 1.5rem;
  mix-blend-mode: multiply;
}

.contact-h2 {
  font-family: 'Space Mono', monospace;
  font-size: clamp(1.75rem, 3.5vw, 2.75rem);
  font-weight: 700;
  color: var(--blue-dark);
  line-height: 1.2;
  margin-bottom: 1rem;
}
.contact-sub {
  font-size: 1rem;
  color: rgba(15,46,66,0.75);
  line-height: 1.75;
  margin-bottom: 1.5rem;
}

.contact-form-wrap {
  background: var(--white);
  border: 2px solid var(--blue-dark);
  box-shadow: 6px 6px 0 var(--blue-dark);
  padding: 2rem;
}

/* ── FOOTER ────────────────────────────────────────────── */
.ff-footer {
  background: var(--blue-dark);
  padding: 2.5rem 0;
  border-top: 3px solid rgba(212,150,15,0.3);
}
.footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
}
.footer-logo {
  height: 60px;
  width: auto;
}
.footer-line {
  font-family: 'Space Mono', monospace;
  font-size: 0.875rem;
  font-weight: 700;
  color: rgba(255,255,255,0.7);
}
.footer-sub {
  font-size: 0.8125rem;
  color: rgba(255,255,255,0.35);
}

/* ── RESPONSIVE ────────────────────────────────────────── */
@media (max-width: 1024px) {
  .montage-grid { grid-template-columns: repeat(2, 1fr); }
  .features-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .hero-line { font-size: clamp(2.5rem, 15vw, 5rem); }
  .hero-mascot { height: 140px; bottom: -40px; right: 4%; }
  .montage-section { padding-top: 6rem; }
  .montage-grid { grid-template-columns: 1fr 1fr; gap: 1rem; }
  .tilt-0, .tilt-1, .tilt-2, .tilt-3 { transform: none; }
  .features-grid { grid-template-columns: 1fr; }
  .trouver-grid { grid-template-columns: 1fr; gap: 3rem; }
  .contact-grid { grid-template-columns: 1fr; gap: 2.5rem; }
  .timeline-event { grid-template-columns: 1fr; gap: 0.25rem; }
}

@media (max-width: 480px) {
  .montage-grid { grid-template-columns: 1fr; }
  .hero-ctas { flex-direction: column; }
}
</style>
