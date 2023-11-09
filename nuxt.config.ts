// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "~/assets/theme.css",
    "primeflex/primeflex.css",
    "primeicons/primeicons.css",
  ],
  modules: ["nuxt-primevue"],
  primevue: {
    usePrimeVue: true,
    components: {
      include: "*",
    },
  },
});
