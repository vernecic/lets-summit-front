<script setup lang="ts">
import type { CardSummit } from "~/types/card";

const { currentUser } = useAuth();

const isUserOwner = computed(() => {
  if (!currentUser.value) return false;
  return currentUser.value._id === trip.value?.ownerId;
});

const config = useRuntimeConfig();
const route = useRoute();
const params = route.params as { id: string };

const url = `${config.public.BACKEND_URL}/trips/${params.id}`;
const { data: trip, error } = await useFetch<CardSummit>(url);
</script>

<template>
  <div v-if="trip" class="py-20 max-w-4xl mx-auto px-40 min-h-screen">
    <div class="flex gap-20">
      <div class="flex flex-col gap-6">
        <div class="flex gap-2 items-center">
          <h1 class="text-4xl font-medium">{{ trip.title }}</h1>
          <UBadge class="capitalize" color="error" variant="solid" size="lg">{{
            trip.difficulty
          }}</UBadge>
          <UBadge color="neutral" variant="subtle" size="lg"
            >{{ trip.elevation }} m</UBadge
          >
        </div>
        <p>{{ trip.description }}</p>
      </div>
    </div>
  </div>
</template>
