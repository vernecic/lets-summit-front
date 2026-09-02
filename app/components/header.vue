<script setup lang="ts">
const { y: scrollY } = useWindowScroll();

const isScrolled = computed(() => scrollY.value > 0);
const route = useRoute();

const { isLoggedIn, logout } = useAuth();
</script>
<template>
  <div
    :class="
      isScrolled || route.path !== '/'
        ? 'text-black bg-white border-b border-slate-200'
        : 'text-white bg-transparent'
    "
    class="text-base font-medium transition duration-300 w-full fixed top-0 py-2 px-40 h-15 z-30 flex items-center justify-between"
  >
    <div class="flex gap-4 items-center">
      <nuxt-link
        to="/trips"
        class="cursor-pointer hover:text-gray-300 transition duration-300"
        >Explore</nuxt-link
      >
      <nuxt-link
        v-if="isLoggedIn"
        to="/create-trip"
        class="cursor-pointer hover:text-gray-300 transition duration-300"
        >Create Trip</nuxt-link
      >
      <nuxt-link
        v-if="isLoggedIn"
        to="/my-trips"
        class="cursor-pointer hover:text-gray-300 transition duration-300"
        >My Trips</nuxt-link
      >
    </div>
    <div class="flex gap-4 items-center">
      <button
        v-if="isLoggedIn"
        class="cursor-pointer hover:text-gray-300 transition duration-300"
        @click="logout"
      >
        Log out
      </button>
      <nuxt-link
        v-if="!isLoggedIn"
        to="/login"
        class="cursor-pointer hover:text-gray-300 transition duration-300"
        >Log in</nuxt-link
      >
      <nuxt-link
        v-if="!isLoggedIn"
        to="/register"
        class="cursor-pointer hover:text-gray-300 transition duration-300"
        >Register</nuxt-link
      >
    </div>
  </div>
</template>
