export const useAuth = () => {
  const config = useRuntimeConfig();
  const currentUser = useState("user", () => null);

  const getCurrentUser = async () => {
    try {
      const response = await $fetch(`${config.public.BACKEND_URL}/me`, {
        credentials: "include",
      });
      currentUser.value = response.user;
    } catch (error) {
      currentUser.value = null;
    }
  };

  const login = async (username, password) => {
    const response = await $fetch(`${config.public.BACKEND_URL}/login`, {
      method: "POST",
      credentials: "include",
      body: { username, password },
    });
    currentUser.value = response.user;
  };

  const logout = async () => {
    try {
      await $fetch(`${config.public.BACKEND_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Greška pri odjavi, ", error);
    }
    currentUser.value = null;
    await navigateTo("/login");
  };

  const isLoggedIn = computed(() => {
    if (!currentUser.value) return false;
    return true;
  });

  return { currentUser, isLoggedIn, getCurrentUser, login, logout };
};
