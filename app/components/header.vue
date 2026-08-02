<script setup lang="ts">
const { y: scrollY } = useWindowScroll();

const isScrolled = computed(() => scrollY.value > 0);
</script>
<template>
  <div
    :class="
      isScrolled
        ? 'text-black bg-white border-b border-slate-200'
        : 'text-white bg-transparent'
    "
    class="text-base font-medium transition duration-300 w-full fixed top-0 py-2 px-40 h-15 z-30 flex items-center justify-between"
  >
    <div class="flex gap-4 items-center">
      <nuxt-link
        to="explore"
        class="cursor-pointer hover:text-gray-300 transition duration-300"
        >Explore</nuxt-link
      >
      <nuxt-link
        to="create-trip"
        class="cursor-pointer hover:text-gray-300 transition duration-300"
        >Create Trip</nuxt-link
      >
      <nuxt-link
        to="my-trips"
        class="cursor-pointer hover:text-gray-300 transition duration-300"
        >My Trips</nuxt-link
      >
    </div>
    <div class="h-full overflow-hidden">
      <img src="/img/logo.png" alt="Logo" class="h-full w-auto scale-125" />
    </div>
  </div>
</template>
