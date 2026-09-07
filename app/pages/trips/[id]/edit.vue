<script setup lang="ts">
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  parseDate,
  today,
} from "@internationalized/date";
import type { CardTrip } from "~/types/card";

const config = useRuntimeConfig();
const route = useRoute();
const params = route.params as { id: string };

const { data: trip } = await useFetch<CardTrip>(
  `${config.public.BACKEND_URL}/trips/${params.id}`,
);

if (!trip.value) {
  throw createError({ statusCode: 404, statusMessage: "Izlet nije pronađen" });
}

const state = reactive({
  title: trip.value.title,
  date: trip.value.date,
  location: trip.value.location,
  country: trip.value.country,
  elevation: trip.value.elevation,
  difficulty: trip.value.difficulty,
  duration: trip.value.duration,
  description: trip.value.description,
  shortDescription: trip.value.shortDescription,
  maxParticipants: trip.value.maxParticipants,
});

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

const minDate = today(getLocalTimeZone());
const selectedDate = shallowRef<CalendarDate | null>(
  state.date ? parseDate(state.date) : null,
);
const dateFormatter = new DateFormatter("hr-HR", { dateStyle: "short" });

const formatedDate = computed(() => {
  return selectedDate.value
    ? dateFormatter.format(selectedDate.value.toDate(getLocalTimeZone()))
    : "";
});

watch(selectedDate, (value) => {
  state.date = value ? value.toString() : "";
});

const errorMessage = ref("");

const onSubmit = async () => {
  errorMessage.value = "";
  try {
    await $fetch(`${config.public.BACKEND_URL}/trips/${params.id}`, {
      method: "PATCH",
      body: state,
      credentials: "include",
    });
    await navigateTo(`/trips/${params.id}`);
  } catch (error) {
    errorMessage.value = "Greška pri uređivanju izleta.";
    console.error("Greška pri uređivanju izleta, ", error);
  }
};
</script>

<template>
  <div
    class="py-20 flex items-center justify-center flex-col px-40 min-h-screen"
  >
    <h1 class="text-6xl font-bold">Edit Trip</h1>

    <UForm
      :state="state"
      class="mt-10 flex flex-col gap-6 max-w-2xl"
      @submit="onSubmit"
    >
      <UFormField label="Title" name="title">
        <UInput v-model="state.title" placeholder="Matterhorn" class="w-full" />
      </UFormField>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <UFormField label="Location" name="location">
          <UInput
            v-model="state.location"
            :maxlength="60"
            placeholder="Zermatt"
            icon="i-lucide-map-pin"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Country" name="country">
          <USelect
            v-model="state.country"
            :items="countries"
            placeholder="Pick a country"
            class="w-full"
          />
        </UFormField>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <UFormField label="Elevation" name="elevation" hint="in meters">
          <UInputNumber
            v-model="state.elevation"
            :min="0"
            placeholder="3000"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Difficulty" name="difficulty">
          <USelect
            v-model="state.difficulty"
            :items="difficulties"
            value-key="value"
            placeholder="Pick a difficulty"
            class="w-full"
          />
        </UFormField>
      </div>

      <UFormField label="Duration" name="duration" hint="in hours">
        <UInputNumber
          v-model="state.duration"
          :min="1"
          placeholder="6"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Short description" name="shortDescription">
        <UInput
          v-model="state.shortDescription"
          :maxlength="100"
          placeholder="Write a short desc."
          class="w-full"
        />
      </UFormField>

      <UFormField label="Description" name="description">
        <UTextarea
          v-model="state.description"
          :maxlength="400"
          placeholder="Longer description about the trip, weather, equipment, expectations..."
          class="w-full"
        />
      </UFormField>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <UFormField label="Number of participants" name="maxParticipants">
          <UInputNumber
            v-model="state.maxParticipants"
            :min="1"
            placeholder="8"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Date" name="date">
          <UPopover>
            <UButton
              color="neutral"
              variant="subtle"
              icon="i-lucide-calendar"
              class="w-full cursor-pointer"
            >
              {{ selectedDate ? formatedDate : "Pick a trip date" }}
            </UButton>

            <template #content>
              <UCalendar
                v-model="selectedDate"
                :min-value="minDate"
                class="p-2"
              />
            </template>
          </UPopover>
        </UFormField>
      </div>

      <p v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</p>

      <div class="flex justify-end gap-3 pt-2">
        <UButton
          :to="`/trips/${params.id}`"
          color="neutral"
          variant="ghost"
          size="lg"
          class="cursor-pointer rounded-full"
        >
          Cancel
        </UButton>
        <UButton
          type="submit"
          color="primary"
          size="lg"
          class="cursor-pointer rounded-full text-black"
        >
          Save changes
        </UButton>
      </div>
    </UForm>
  </div>
</template>
