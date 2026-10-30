<script lang="ts" setup>
defineOptions({
  inheritAttrs: false
})

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>

<template>
  <!-- Satori resolves colours at render time and cannot read `@theme` tokens,
       so the v5 petrol blue is inlined here rather than referenced. -->
  <div
    class="box-border w-full h-full flex flex-col justify-center items-center text-center p-16"
    style="background-color: #024a70"
  >
    <div class="flex flex-col items-center w-full">
      <h1 class="text-8xl mb-8 mt-0 text-white">
        {{ title }}
      </h1>
      <p class="text-5xl leading-tight mt-0 mb-0" style="color: #f4f0e6">
        {{ description }}
      </p>
    </div>
  </div>
</template>
