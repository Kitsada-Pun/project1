<template>
  <div class="flex align-items-end justify-content-end">
    <SpeedDial
      :model="items"
      direction="left"
      :transitionDelay="80"
      showIcon="pi pi-bars"
      hideIcon="pi pi-times"
      buttonClass="p-button-info"
      :tooltipOptions="{ position: 'bottom' }"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          label: "รายชื่อนักเรียน",
          icon: "pi pi-user",
          command: () => {
            this.$router.push("/student");
          },
        },
        {
          label: "รายชื่อสัปดาห์",
          icon: "pi pi-calendar",
          command: () => {
            this.$router.push("/week");
          },
        },
        {
          label: "เช็คใบหน้านักเรียน",
          icon: "pi pi-camera",
          command: () => {
            this.$router.push("/face-check");
          },
        },
        {
          label: "ลงทะเบียนใบหน้านักเรียน",
          icon: "pi pi-arrow-circle-up",
          command: () => {
            this.$router.push("/face-register");
          },
        },
        {
          label: "ออกจากระบบ",
          icon: "pi pi-sign-out",
          command: () => {
            this.$router.push("/loginpage_cmt");
            localStorage.removeItem("token");
          },
        },
      ],
    };
  },
};
</script>
<style lang=""></style>
