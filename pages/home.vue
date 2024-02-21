<template>
  <div class="app-bar">
    <h1>{{ title }}</h1>
    <div class="flex align-items-end justify-content-end">
      <SpeedDial
        :model="items"
        direction="left"
        :transitionDelay="80"
        showIcon="pi pi-bars"
        hideIcon="pi pi-times"
        buttonClass="p-button-info"
      />
    </div>
  </div>

  <div class="container mt-4">
    <button class="btn btn-primary" @click="onShow">Show user_student</button>
  </div>
  <div class="container mt-4">
    <button class="btn btn-primary" @click="onShow_cmt">
      Show user_committee
    </button>
  </div>
</template>
<script>
// import "~/assets/themes/lara-light-purple/theme.css";
export default {
  setup() {
    definePageMeta({
      middleware: ["auth"],
    });
  },
  methods: {
    onShow() {
      this.$router.replace("/student");
    },
    onShow_cmt() {
      this.$router.replace("/student_cmt");
    },
  },
  props: {
    title: {
      type: String,
      default: "My App",
    },
  },

  data() {
    return {
      items: [
        {
          label: "Add",
          icon: "pi pi-pencil",
          command: () => {
            this.$toast.add({
              severity: "info",
              summary: "Add",
              detail: "Data Added",
            });
          },
        },
        {
          label: "Update",
          icon: "pi pi-refresh",
          command: () => {
            this.$toast.add({
              severity: "success",
              summary: "Update",
              detail: "Data Updated",
            });
          },
        },
        {
          label: "Delete",
          icon: "pi pi-trash",
          command: () => {
            this.$toast.add({
              severity: "error",
              summary: "Delete",
              detail: "Data Deleted",
            });
          },
        },
        {
          label: "Upload",
          icon: "pi pi-upload",
          command: () => {
            this.$router.push("/fileupload");
          },
        },
        {
          label: "Vue Website",
          icon: "pi pi-external-link",
          command: () => {
            window.location.href = "https://vuejs.org/";
          },
        },
      ],
    };
  },
};
</script>

<style scoped>
.app-bar {
  background-color: #163d5d;
  color: white;
  padding: 10px;
  text-align: left;
}
</style>
