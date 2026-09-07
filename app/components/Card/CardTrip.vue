<script setup lang="ts">
const props = defineProps<{
  data: {
    id: string;
    title: string;
    description: string;
    shortDescription: string;
    date: string;
    duration: number;
    elevation: number;
    difficulty: Difficulty;
    image: string;
    location: string;
    country: string;
  };
}>();

export type Difficulty = "easy" | "moderate" | "hard" | "extreme";

const difficultyColor = {
  easy: "success",
  moderate: "primary",
  hard: "warning",
  extreme: "error",
} as const;

const formatedDate = computed(() => {
  const date = new Date(props.data.date);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
</script>
<template>
  <div
    class="flex hover:bg-gray-100 cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 flex-col gap-2 group bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
  >
    <div class="flex items-center justify-between">
      <h3 class="font-display text-3xl font-medium">{{ props.data.title }}</h3>
      <UBadge
        class="capitalize"
        :color="difficultyColor[props.data.difficulty]"
        variant="soft"
        size="lg"
      >
        {{ props.data.difficulty }}
      </UBadge>
    </div>
    <div class="flex-1">
      <p class="text-sm">{{ props.data.shortDescription }}</p>
    </div>
    <div class="flex flex-wrap gap-2">
      <UBadge
        v-if="formatedDate"
        variant="soft"
        color="neutral"
        size="lg"
        icon="i-lucide-calendar"
      >
        {{ formatedDate }}
      </UBadge>
      <UBadge variant="soft" color="neutral" size="lg" icon="i-lucide-clock">
        {{ props.data.duration }}h
      </UBadge>
      <UBadge variant="soft" color="neutral" size="lg" icon="i-lucide-mountain">
        {{ props.data.elevation }}
      </UBadge>
      <UBadge variant="soft" color="neutral" size="lg" icon="i-lucide-map-pin">
        {{ props.data.location }}
      </UBadge>
    </div>
    <div>
      <UButton
        :to="{ name: 'trips-id', params: { id: props.data.id } }"
        variant="solid"
        color="primary"
        size="lg"
        class="w-full flex justify-center mt-2"
      >
        See more
      </UButton>
    </div>
  </div>
</template>
