<script setup lang="ts">
const props = defineProps<{
  data: {
    title: string;
    description: string;
    duration: string;
    height: string;
    difficulty: string;
    image: string;
  };
}>();
</script>
<template>
  <div
    class="flex border border-slate-200 flex-col overflow-hidden rounded-2xl group shadow-lg bg-white"
  >
    <div class="relative aspect-[4/3] overflow-hidden">
      <NuxtImg
        src="/img/matterhorn.jpg"
        alt="Matterhorn"
        class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition duration-300"
      />
      <UBadge
        class="absolute left-3 top-3 z-10"
        color="error"
        variant="solid"
        size="lg"
        >Extreme</UBadge
      >
    </div>

    <div class="flex flex-1 flex-col p-5">
      <div class="flex items-start justify-between gap-3">
        <h3 class="text-2xl font-display text-slate-900">Matterhorn</h3>
        <span
          class="mt-1 flex shrink-0 items-center gap-1 text-sm font-medium text-slate-500"
        >
          <UIcon name="i-lucide-mountain" class="size-4" />
          4478 m
        </span>
      </div>

      <p class="mt-2 text-sm leading-relaxed text-slate-500 flex-1">
        Switzerland's iconic peak at 4,478 m. A challenging two-day alpine climb
        via the Hörnli Ridge, with a mountain hut stay before the final summit
        ascent.
      </p>

      <div class="mt-4 flex items-center gap-1.5 text-sm text-slate-500">
        <UIcon name="i-lucide-clock" class="size-4" />
        2 days
      </div>

      <UButton
        block
        color="primary"
        size="lg"
        class="mt-5 cursor-pointer rounded-full text-black"
      >
        Join now
      </UButton>
    </div>
  </div>
</template>
