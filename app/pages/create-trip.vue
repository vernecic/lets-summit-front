<script setup lang="ts">
const state = reactive({
  title: "",
  location: "",
  country: "",
  elevation: 3000,
  difficulty: "",
  shortDescription: "",
  description: "",
  short_description: "",
  maxParticipants: 10,
});
const config = useRuntimeConfig();

const countries = ["Croatia", "Slovenia", "Austria", "Italy", "Switzerland"];

const difficulties = [
  { label: "Easy", value: "easy" },
  { label: "Moderate", value: "moderate" },
  { label: "Hard", value: "hard" },
  { label: "Extreme", value: "extreme" },
];

const onSubmit = async () => {
  await $fetch(`${config.public.BACKEND_URL}/trips`, {
    method: "POST",
    body: state,
  });
};

const SHORT_DESCRIPTION_MAX = 120;
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
            :step="50"
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

      <UFormField label="Short description" name="short_description">
        <UInput
          v-model="state.short_description"
          :maxlength="SHORT_DESCRIPTION_MAX"
          placeholder="Write a short desc."
          class="w-full"
        />
      </UFormField>

      <UFormField label="Description" name="description">
        <UTextarea
          v-model="state.description"
          placeholder="Longer description..."
          class="w-full"
        />
      </UFormField>

      <UFormField label="Number of participants" name="maxParticipants">
        <UInputNumber
          v-model="state.maxParticipants"
          :min="1"
          placeholder="8"
          class="w-full sm:w-40"
        />
      </UFormField>

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
