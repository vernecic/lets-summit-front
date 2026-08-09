<script setup lang="ts">
import type { CardSummit } from "~/types/card";
const config = useRuntimeConfig();

const { data: trips } = await useFetch<CardSummit[]>(
  `${config.public.BACKEND_URL}/trips`,
);

const featuredTrips = computed(() => trips.value?.slice(0, 4) ?? []);
</script>
<template>
  <div class="py-20 bg-white px-40">
    <div class="font-sans text-slate-800">
      <div class="flex justify-between items-center">
        <h2 class="text-4xl font-medium">Featured trips</h2>
        <UButton
          to="trips"
          color="neutral"
          variant="subtle"
          size="lg"
          class="cursor-pointer rounded-lg text-black"
        >
          All trips
        </UButton>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-4 md:gap-6"
      >
        <CardTrip v-for="trip in featuredTrips" :key="trip.id" :data="trip" />
      </div>
    </div>
  </div>
</template>
