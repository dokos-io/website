<script setup lang="ts">
// Pricing page, before any table: how to choose. Two groups, so it is clear
// what you pick and what you add: where Dokos is hosted (one of three, the
// managed one in a Dokos blue card, the self-reliant ones plain on the cream,
// each saying what it asks of you), then the help on top. Each line leads to
// its detailed section; the legal note on prices closes the guide.

type Choice = {
    name: string;
    text: string;
    from?: string;
    price: string;
    trial?: string;
    to: string;
    link_label?: string;
    highlight?: boolean;
}

defineProps<{
    guide: {
        hosting_label: string;
        hosting_hint?: string;
        hosting: Choice[];
        help_label: string;
        help_hint?: string;
        help: Choice[];
        link_label: string;
    };
    note?: string;
}>()

const isExternal = (to: string) => /^https?:/.test(to)
</script>

<template>
    <section class="mx-auto flex max-w-[1360px] flex-col gap-14 px-4 pb-24 sm:px-8 sm:pb-32">
        <div class="flex flex-col gap-5">
            <p class="h26-reveal flex flex-wrap items-baseline gap-x-3 font-typed text-dokos-500">
                <span class="text-accent">01</span>
                <span>{{ guide.hosting_label }}</span>
                <span v-if="guide.hosting_hint" class="text-stone-600">· {{ guide.hosting_hint }}</span>
            </p>
            <div class="h26-reveal grid gap-4 lg:grid-cols-3">
                <NuxtLink
                    v-for="choice in guide.hosting"
                    :key="choice.name"
                    :to="choice.to"
                    :target="isExternal(choice.to) ? '_blank' : undefined"
                    class="h26-lift flex flex-col gap-3 rounded-2xl p-7"
                    :class="choice.highlight ? 'bg-dokos-500 text-white' : 'border-[1.5px] border-dokos-500/30 text-dokos-500'"
                >
                    <b class="text-2xl font-extrabold tracking-[-0.02em]">{{ choice.name }}</b>
                    <span class="leading-relaxed" :class="choice.highlight ? 'text-dokos-100' : 'text-stone-600'">{{ choice.text }}</span>
                    <span class="mt-auto flex flex-col gap-1 pt-4">
                        <span v-if="choice.from" class="font-typed text-sm" :class="choice.highlight ? 'text-accent-secondary' : 'text-stone-600'">{{ choice.from }}</span>
                        <span class="text-3xl font-extrabold tracking-[-0.02em]">{{ choice.price }}</span>
                        <span v-if="choice.trial" class="font-typed text-sm" :class="choice.highlight ? 'text-accent-secondary' : 'text-accent'">{{ choice.trial }}</span>
                    </span>
                    <span class="font-bold">{{ choice.link_label ?? guide.link_label }} →</span>
                </NuxtLink>
            </div>
        </div>

        <div class="flex flex-col gap-5">
            <p class="h26-reveal flex flex-wrap items-baseline gap-x-3 font-typed text-dokos-500">
                <span class="text-accent">02</span>
                <span>{{ guide.help_label }}</span>
                <span v-if="guide.help_hint" class="text-stone-600">· {{ guide.help_hint }}</span>
            </p>
            <ul class="h26-reveal border-b-[1.5px] border-dokos-500">
                <li v-for="choice in guide.help" :key="choice.name" class="border-t-[1.5px] border-dokos-500">
                    <NuxtLink
                        :to="choice.to"
                        :target="isExternal(choice.to) ? '_blank' : undefined"
                        class="grid items-baseline gap-x-10 gap-y-1 py-6 text-dokos-500 lg:grid-cols-[22rem_1fr_auto]"
                    >
                        <b class="text-2xl font-extrabold tracking-[-0.02em]">{{ choice.name }}</b>
                        <span class="text-stone-600">{{ choice.text }}</span>
                        <span class="flex flex-wrap items-baseline gap-x-4">
                            <span class="flex items-baseline gap-2">
                                <span v-if="choice.from" class="font-typed text-sm text-stone-600">{{ choice.from }}</span>
                                <span class="text-xl font-extrabold">{{ choice.price }}</span>
                            </span>
                            <span class="font-bold">{{ choice.link_label ?? guide.link_label }} →</span>
                        </span>
                    </NuxtLink>
                </li>
            </ul>
        </div>

        <p v-if="note" class="h26-reveal max-w-3xl font-typed text-sm leading-relaxed text-stone-600">{{ note }}</p>
    </section>
</template>
