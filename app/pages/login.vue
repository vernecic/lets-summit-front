<script setup lang="ts">
const state = reactive({
  username: "",
  password: "",
});

const config = useRuntimeConfig();
const errorMessage = ref("");

const onSubmit = async () => {
  errorMessage.value = "";
  try {
    await $fetch(`${config.public.BACKEND_URL}/login`, {
      method: "POST",
      body: state,
    });
    await navigateTo("/trips");
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="py-20 flex items-center justify-center flex-col min-h-screen">
    <h1 class="text-6xl font-bold">Log in</h1>

    <UForm
      :state="state"
      class="mt-10 flex flex-col gap-6 w-full max-w-md"
      @submit="onSubmit"
    >
      <UFormField label="Username" name="username">
        <UInput v-model="state.username" placeholder="vid123" class="w-full" />
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput
          v-model="state.password"
          type="password"
          placeholder="••••••••"
          class="w-full"
        />
      </UFormField>

      <p v-if="errorMessage" class="text-sm text-red-500">
        {{ errorMessage }}
      </p>

      <UButton
        type="submit"
        color="primary"
        size="lg"
        block
        class="cursor-pointer rounded-full text-black"
      >
        Log in
      </UButton>

      <p class="text-sm text-center">
        No account?
        <nuxt-link to="/register" class="underline">Register</nuxt-link>
      </p>
    </UForm>
  </div>
</template>
