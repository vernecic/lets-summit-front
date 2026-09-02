export default defineNuxtRouteMiddleware(() => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn.value) return navigateTo("/login");
});

// guard za pageve koje nelogirani user ne smije vidjet, kasnije ubacit u my-trips i slično (create trips...)
