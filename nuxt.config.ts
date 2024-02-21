// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  css: [
    "primevue/resources/themes/lara-light-purple/theme.css",
    "primeflex/primeflex.css",
    "primeicons/primeicons.css",
  ],
  app: {
    head: {
      script: [{ src: "/opencv.js" }],
    },
  },
  modules: ["nuxt-primevue"],
  primevue: {
    usePrimeVue: true,
    components: {
      include: "*",
    },
    directives: {
      include: "*",
    },
    composables: {
      include: "*",
    },
  },
  vite: {
    server: {
      proxy: {
        "/face-api": {
          target: "http://127.0.0.1:8000",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/face-api/, ""),
        },
        "/api": {
          target: "http://127.0.0.1:9000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  },
});
