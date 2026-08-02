<script setup lang="ts">
import CardTrip from "~/components/Card/CardTrip.vue";

const dummyTripsData = ref([
  {
    title: "Matterhorn",
    description:
      "Switzerland's iconic peak at 4,478 m. A challenging two-day alpine climb via the Hörnli Ridge, with a mountain hut stay before the final summit ascent.",
    duration: "2 days",
    height: "4478 m",
    difficulty: "Extreme",
    image: "/img/matterhorn.jpg",
  },
]);
</script>

<template>
  <BlockHero />
  <div class="py-20 bg-white px-40">
    <div class="font-sans text-slate-800">
      <div class="flex justify-between items-center">
        <h2 class="text-4xl font-medium">Featured trips</h2>
        <UButton
          color="neutral"
          variant="subtle"
          size="lg"
          class="cursor-pointer rounded-lg text-black"
        >
          Explore trips
        </UButton>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-4 md:gap-6"
      >
        <CardTrip
          v-for="trip in dummyTripsData"
          :key="trip.title"
          :data="trip"
        />
      </div>
    </div>
  </div>
</template>
