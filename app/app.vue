<script setup lang="ts">
const { getCurrentUser } = useAuth();
if (import.meta.client) await getCurrentUser();
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
