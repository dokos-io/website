<script setup lang="ts">
defineOptions({ inheritAttrs: false })

// Everything under public/ is now committed at its display size and encoded as
// WebP, so @nuxt/image has nothing left to do here — and it was not free.
//
// Every route is prerendered, so each <NuxtImg> variant is baked into the static
// output as a file. With no width/format modifiers that variant is `/_ipx/_/…`,
// an identity transform: a byte-for-byte second copy of the source. IPX also
// cannot rasterise SVG, so it returned those untouched, which meant `placeholder`
// (a 10x10 blurred thumbnail) produced a *third* full-size copy. The hero image
// shipped as 3 x 5.4 MB per deployment that way, and /_ipx accounted for 81 MB of
// the 290 MB output — which is what exhausted Vercel's deployment storage.
//
// Serving the sources directly takes /_ipx from 81 MB to under 10 MB. It does
// not empty it: markdown images (@nuxtjs/mdc's ProseImg) and the blog cards in
// @nuxt/ui-pro's BlogPost still render <NuxtImg>, and both are out of our hands
// short of patching those packages. Their sources are now small WebP, so what
// is left is a few MB rather than the bulk of the output.
//
// The trade-off is that we give up responsive srcset and per-browser format
// negotiation; re-encoding the assets ahead of time buys back most of that.
// Reintroduce <NuxtImg> here if we ever need real responsive variants — but pass
// explicit width/format modifiers so IPX emits something genuinely smaller than
// the source, never an identity copy.
const props = defineProps<{
    src?: string
    // Accepted and ignored: call sites used it for @nuxt/image's blur-up, which
    // no longer applies. Declared so it is not passed through to the rendered
    // <img> as a stray `placeholder` attribute.
    placeholder?: boolean
}>()

// Much of content/ stores paths root-relative but without the leading slash
// ("image/achat/foo.webp"). <NuxtImg> resolved those against the public root;
// a bare <img> would resolve them against the *current page*, so on
// /fr/modules/achats they would 404. Normalise before rendering.
const src = computed(() => {
    const value = props.src
    if (!value || /^([a-z]+:)?\/\//i.test(value) || value.startsWith('/') || value.startsWith('data:')) {
        return value
    }
    return `/${value}`
})
</script>

<template>
    <img :src="src" v-bind="$attrs">
</template>
