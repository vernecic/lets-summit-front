<script setup lang="ts">
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  today,
} from "@internationalized/date";

const state = reactive({
  title: "",
  date: "",
  location: "",
  country: "",
  elevation: 3000,
  difficulty: "",
  duration: "",
  description: "",
  shortDescription: "",
  maxParticipants: 10,
});
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

const minDate = today(getLocalTimeZone());
const selectedDate = shallowRef<CalendarDate | null>(null);
const dateFormatter = new DateFormatter("hr-HR", { dateStyle: "short" });

const formatedDate = computed(() => {
  return selectedDate.value
    ? dateFormatter.format(selectedDate.value.toDate(getLocalTimeZone()))
    : "";
});

watch(selectedDate, (value) => {
  state.date = value ? value.toString() : "";
});

const onSubmit = async () => {
  await $fetch(`${config.public.BACKEND_URL}/trips`, {
    method: "POST",
    body: state,
    credentials: "include",
  });
  await navigateTo("/");
};
</script>

<template>
  <div
    class="py-20 flex items-center justify-center flex-col px-40 min-h-screen"
  >
    <h1 class="text-6xl font-bold">Create Trip</h1>

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
        <UInput
          v-model="state.duration"
          :maxlength="30"
          placeholder="Trip duration (hours)"
          icon="i-lucide-clock"
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

      <div class="flex justify-end gap-3 pt-2">
        <UButton
          to="/trips"
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
          Create trip
        </UButton>
      </div>
    </UForm>
  </div>
</template>
