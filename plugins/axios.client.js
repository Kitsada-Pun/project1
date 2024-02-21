import axios from "axios";
export default defineNuxtPlugin((nuxtApp) => {
  const token = localStorage.getItem("token");
  nuxtApp.provide(
    "axios",
    axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );
});
