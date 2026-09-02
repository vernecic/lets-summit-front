<script setup lang="ts">
const state = reactive({
  username: "",
  email: "",
  ime: "",
  prezime: "",
  password: "",
});

const config = useRuntimeConfig();
const errorMessage = ref("");

const onSubmit = async () => {
  errorMessage.value = "";
  try {
    await $fetch(`${config.public.BACKEND_URL}/register`, {
      method: "POST",
      body: state,
    });
    await navigateTo("/login");
  } catch (error) {
    errorMessage.value = "Registracija neuspješna";
  }
};
</script>

<template>
  <div class="py-20 flex items-center justify-center flex-col min-h-screen">
    <h1 class="text-6xl font-bold">Register</h1>

    <UForm
      :state="state"
      class="mt-10 flex flex-col gap-6 w-full max-w-md"
      @submit="onSubmit"
    >
      <UFormField label="Username" name="username">
        <UInput
          v-model="state.username"
          placeholder="usernam123"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Email" name="email">
        <UInput
          v-model="state.email"
          type="email"
          placeholder="email@example.com"
          class="w-full"
        />
      </UFormField>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <UFormField label="Ime" name="ime">
          <UInput v-model="state.ime" placeholder="Ime" class="w-full" />
        </UFormField>

        <UFormField label="Prezime" name="prezime">
          <UInput
            v-model="state.prezime"
            placeholder="Prezime"
            class="w-full"
          />
        </UFormField>
      </div>

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
        Register
      </UButton>

      <p class="text-sm text-center">
        Already have an account?
        <nuxt-link to="/login" class="underline">Log in</nuxt-link>
      </p>
    </UForm>
  </div>
</template>
