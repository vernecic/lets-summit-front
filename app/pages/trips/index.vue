<script setup lang="ts">
import type { CardSummit } from "~/types/card";

const config = useRuntimeConfig();

const { data: trips } = await useFetch<CardSummit[]>(
  `${config.public.BACKEND_URL}/trips`,
);
</script>

<template>
  <div class="px-40 py-20 h-screen">
    <div class="flex gap-4 flex-col">
      <h2 class="text-3xl font-medium">All trips</h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <CardTrip v-for="trip in trips" :key="trip.id" :data="trip" />
      </div>
    </div>
  </div>
</template>
