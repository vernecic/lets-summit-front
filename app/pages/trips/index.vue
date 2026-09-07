<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router";
import type { CardTrip } from "~/types/card";

const config = useRuntimeConfig();

const countries = [
  "Croatia",
  "Slovenia",
  "Austria",
  "Italy",
  "Switzerland",
  "France",
  "Nepal",
];

const difficulties = [
  { label: "Easy", value: "easy" },
  { label: "Moderate", value: "moderate" },
  { label: "Hard", value: "hard" },
  { label: "Extreme", value: "extreme" },
];

const sortOptions = [
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
];

const difficulty = useRouteQuery("difficulty", "");
const country = useRouteQuery("country", "");
const sort = useRouteQuery("sort", "");
const minElevation = useRouteQuery("minElevation", 0, { transform: Number });
const maxElevation = useRouteQuery("maxElevation", 5000, { transform: Number });
const minDuration = useRouteQuery("minDuration", 1, { transform: Number });
const maxDuration = useRouteQuery("maxDuration", 60, { transform: Number });

const query = computed(() => ({
  difficulty: difficulty.value || undefined,
  country: country.value || undefined,
  sort: sort.value || undefined,
  minElevation: minElevation.value,
  maxElevation: maxElevation.value,
  minDuration: minDuration.value,
  maxDuration: maxDuration.value,
}));

const resetFilters = () => {
  difficulty.value = "";
  country.value = "";
  sort.value = "";
  minElevation.value = 0;
  maxElevation.value = 5000;
  minDuration.value = 1;
  maxDuration.value = 60;
};

const { data: trips } = await useFetch<CardTrip[]>(
  `${config.public.BACKEND_URL}/trips`,
  { query },
);
</script>

<template>
  <div class="px-40 py-20 h-screen">
    <div class="flex gap-4 flex-col">
      <h2 class="text-3xl font-medium">All trips</h2>

      <div
        class="flex flex-col gap-6 border border-gray-200 rounded-lg p-6 bg-white"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <UFormField label="Difficulty">
            <USelect
              v-model="difficulty"
              :items="difficulties"
              value-key="value"
              placeholder="Any difficulty"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Country">
            <USelect
              v-model="country"
              :items="countries"
              placeholder="Any country"
              class="w-full"
            />
          </UFormField>

          <UFormField
            :label="`Elevation: ${minElevation} - ${maxElevation} m`"
          >
            <USlider
              :model-value="[minElevation, maxElevation]"
              :min="0"
              :max="5000"
              :step="100"
              class="pt-3"
              @update:model-value="
                minElevation = Number($event?.[0]);
                maxElevation = Number($event?.[1]);
              "
            />
          </UFormField>

          <UFormField
            :label="`Duration: ${minDuration} - ${maxDuration} h`"
          >
            <USlider
              :model-value="[minDuration, maxDuration]"
              :min="1"
              :max="60"
              :step="1"
              class="pt-3"
              @update:model-value="
                minDuration = Number($event?.[0]);
                maxDuration = Number($event?.[1]);
              "
            />
          </UFormField>

          <UFormField label="Sort by elevation">
            <USelect
              v-model="sort"
              :items="sortOptions"
              value-key="value"
              placeholder="Default"
              class="w-full"
            />
          </UFormField>
        </div>

        <div class="flex justify-end">
          <UButton
            @click="resetFilters"
            color="neutral"
            variant="ghost"
            size="sm"
            class="cursor-pointer"
            >Reset filters</UButton
          >
        </div>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <CardTrip v-for="trip in trips" :key="trip.id" :data="trip" />
      </div>
      <p v-if="trips && !trips.length" class="text-sm text-gray-500">
        No trips found.
      </p>
    </div>
  </div>
</template>
