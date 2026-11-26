<script setup lang="ts">
// Open Source Experience 2026, right after the band: who is what, drawn as a
// building so the rest of the page reads without guessing. Frappe is the
// foundation, ERPNext stands on it, Dokos (our French version) stands on
// ERPNext, and the business apps sit on top: Conectt directly on ERPNext, yours
// on ERPNext or Dokos; Conectt wears Orange's colours, its logo and an orange
// edge like the coral one of Dokos. A coral band on the right shows that Dokos SAS works on
// every floor. On a phone the floors simply stack, top floor first.
// When the drawing comes into view it is built from the ground up: each floor
// rises in turn, then the Dokos SAS band draws itself along all of them.
// Reduced motion shows it built.

type Box = { name: string; text: string; tag?: string; logo?: string; logo_alt?: string; accent?: string }

defineProps<{
    block: {
        title: string;
        description: string;
        tiers: { apps: string; software: string; framework: string };
        apps: Box[];
        dokos: Box;
        erpnext: Box;
        frappe: Box;
        company: Box;
    };
}>()

// Seconds after the start at which each part rises, from the foundation up.
const AT = { framework: 0, erpnext: 0.35, dokos: 0.7, conectt: 0.7, yours: 1.05, band: 1.4, company: 1.9 }
const delay = (at: number) => ({ '--d': `${at}s` })

const building = ref<HTMLElement | null>(null)
const built = ref(false)
const { reduced } = useInViewOnce(building, () => {
    built.value = true
}, 0.35)
</script>

<template>
    <section class="bg-paper">
        <div class="mx-auto flex max-w-[1360px] flex-col gap-12 px-4 py-24 sm:px-8 sm:py-32">
            <div class="flex flex-wrap items-end gap-x-16 gap-y-6">
                <h2 class="h26-reveal-x flex-[1_1_640px] text-[clamp(3rem,7vw,6rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em] text-dokos-500">
                    {{ block.title }}<span class="text-accent">.</span>
                </h2>
                <p class="h26-reveal flex-[1_1_360px] text-lg leading-relaxed text-stone-600">{{ block.description }}</p>
            </div>

            <!-- Large screens: an axis of floors, two columns of boxes, the company band on the right. -->
            <div
                ref="building"
                class="grid gap-3 lg:grid-cols-[11rem_minmax(0,1fr)_minmax(0,1fr)_13rem] lg:grid-rows-[auto_auto_auto_auto]"
                :class="{ 'is-built': built, 'is-static': reduced }"
            >
                <!-- Axis -->
                <p class="osx-floor hidden font-typed text-dokos-500 lg:col-start-1 lg:row-start-1 lg:flex lg:items-start lg:pt-5" :style="delay(AT.conectt)">
                    <span class="mr-3 text-accent">03</span>{{ block.tiers.apps }}
                </p>
                <p class="osx-floor hidden font-typed text-dokos-500 lg:col-start-1 lg:row-span-2 lg:row-start-2 lg:flex lg:items-center" :style="delay(AT.erpnext)">
                    <span class="mr-3 text-accent">02</span>{{ block.tiers.software }}
                </p>
                <p class="osx-floor hidden font-typed text-dokos-500 lg:col-start-1 lg:row-start-4 lg:flex lg:items-center" :style="delay(AT.framework)">
                    <span class="mr-3 text-accent">01</span>{{ block.tiers.framework }}
                </p>

                <!-- Floor 3: Conectt (it reaches down to ERPNext) and your apps -->
                <div
                    class="osx-floor relative flex flex-col gap-1 bg-white px-6 py-5 shadow-[0_18px_40px_rgba(43,42,39,0.16)] lg:col-start-2 lg:row-span-2 lg:row-start-1"
                    :class="{ 'border-t-4': block.apps[0]?.accent }"
                    :style="{ ...delay(AT.conectt), borderTopColor: block.apps[0]?.accent }"
                >
                    <img v-if="block.apps[0]?.logo" :src="block.apps[0]?.logo" :alt="block.apps[0]?.logo_alt ?? ''" class="absolute top-5 right-6 size-11" loading="lazy">
                    <b class="pr-14 text-2xl font-extrabold tracking-[-0.02em] text-dokos-500">{{ block.apps[0]?.name }}</b>
                    <span v-if="block.apps[0]?.tag" class="font-typed text-sm text-accent">{{ block.apps[0]?.tag }}</span>
                    <span class="mt-1 text-stone-600">{{ block.apps[0]?.text }}</span>
                </div>
                <div class="osx-floor flex flex-col gap-1 border-[1.5px] border-dashed border-dokos-500 px-6 py-5 lg:col-start-3 lg:row-start-1" :style="delay(AT.yours)">
                    <b class="text-2xl font-extrabold tracking-[-0.02em] text-dokos-500">{{ block.apps[1]?.name }}</b>
                    <span class="mt-1 text-stone-600">{{ block.apps[1]?.text }}</span>
                </div>

                <!-- Floor 2: Dokos on ERPNext -->
                <div class="osx-floor flex flex-col gap-1 border-t-4 border-accent bg-white px-6 py-5 shadow-[0_18px_40px_rgba(43,42,39,0.16)] lg:col-start-3 lg:row-start-2" :style="delay(AT.dokos)">
                    <b class="text-2xl font-extrabold tracking-[-0.02em] text-dokos-500">{{ block.dokos.name }}</b>
                    <span class="mt-1 text-stone-600">{{ block.dokos.text }}</span>
                </div>
                <div class="osx-floor flex flex-col gap-1 bg-dokos-500 px-6 py-5 text-white lg:col-span-2 lg:col-start-2 lg:row-start-3" :style="delay(AT.erpnext)">
                    <b class="text-2xl font-extrabold tracking-[-0.02em]">{{ block.erpnext.name }}</b>
                    <span class="text-dokos-100">{{ block.erpnext.text }}</span>
                </div>

                <!-- Floor 1: the foundation -->
                <div class="osx-floor flex flex-col gap-1 bg-dokos-900 px-6 py-5 text-white lg:col-span-2 lg:col-start-2 lg:row-start-4" :style="delay(AT.framework)">
                    <b class="text-2xl font-extrabold tracking-[-0.02em]">{{ block.frappe.name }}</b>
                    <span class="text-dokos-100">{{ block.frappe.text }}</span>
                </div>

                <!-- Dokos SAS, across every floor -->
                <div class="osx-band relative mt-3 flex flex-col gap-1 pl-6 lg:col-start-4 lg:row-span-4 lg:row-start-1 lg:mt-0 lg:justify-center" :style="delay(AT.band)">
                    <b class="osx-floor text-2xl font-extrabold tracking-[-0.02em] text-dokos-500" :style="delay(AT.company)">{{ block.company.name }}</b>
                    <span class="osx-floor text-stone-600" :style="delay(AT.company)">{{ block.company.text }}</span>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Each part rises into place at its own delay once the drawing is in view. */
.osx-floor { opacity: 0; transform: translateY(28px); }
.is-built .osx-floor {
    opacity: 1;
    transform: none;
    transition: opacity 0.6s ease var(--d), transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) var(--d);
}
/* The Dokos SAS band draws itself from the ground up, along every floor. */
.osx-band::before {
    content: "";
    position: absolute;
    inset: 0 auto 0 0;
    width: 4px;
    background: var(--color-accent);
    transform: scaleY(0);
    transform-origin: bottom;
}
.is-built .osx-band::before { transform: scaleY(1); transition: transform 0.8s ease var(--d); }
.is-static .osx-floor, .is-static .osx-band::before { opacity: 1; transform: none; transition: none; }
</style>
