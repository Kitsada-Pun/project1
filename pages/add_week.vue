<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
  />
  <div class="app-bar">
    <h1>{{ title }}</h1>
    <AppManu />
  </div>
  <div class="h-1rem"></div>
  <div class="flex justify-content-end mb-3">
    <NuxtLink to="/week">
      <Button label="กลับ"></Button>
    </NuxtLink>
  </div>
  <div
    class="px-4 md:px-6 lg:px-8 flex align-items-center justify-content-center"
  >
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div class="flex flex-row gap-3">
        <div class="">
          <label for="integeronly" class="font-bold block mb-2">
            สัปดาห์ที่
          </label>
          <InputNumber v-model="week" inputId="integeronly" />
        </div>
        <div class="">
          <label for="" class="font-bold block mb-2">&nbsp;</label>
          <div class="flex align-items-center">
            <Checkbox
              v-model="stopDay"
              inputId="stopDay"
              name="stopDay"
              value="1"
            />
            <label for="stopDay" class="ml-2"> วันหยุด </label>
          </div>
        </div>

        <div class="flex align-items-end">
          <Button
            label="สร้างสัปดาห์"
            severity="info"
            @click="submitForm()"
            :disabled="!week"
          >
          </Button>
        </div>
      </div>
    </div>
  </div>

  <div class="h-2rem"></div>
</template>

<script>
import axios from "axios";

// import "~/assets/themes/lara-light-purple/theme.css";

export default {
  data() {
    return {
      value: "",
      week: null,
      stopDay: false,
      selectedWeek: null,
      cities: [
        { name: "1", code: "1" },
        { name: "2", code: "2" },
        { name: "3", code: "3" },
        { name: "4", code: "4" },
        { name: "5", code: "5" },
        { name: "6", code: "6" },
        { name: "7", code: "7" },
        { name: "8", code: "8" },
        { name: "9", code: "9" },
        { name: "10 ", code: "10" },
        { name: "11 ", code: "11" },
        { name: "12 ", code: "12" },
        { name: "13 ", code: "13" },
        { name: "14 ", code: "14" },
        { name: "15 ", code: "15" },
        { name: "16 ", code: "16" },
        { name: "17 ", code: "17" },
        { name: "18 ", code: "18" },
      ],
    };
  },

  mounted() {},
  methods: {
    async submitForm() {
      try {
        const response = await axios.post("/api/add_event", {
          week: this.week,
          stopDay: this.stopDay[0] ? 1 : 0,
        });
        const data = response.data;

        if (data.status == 0) {
          alert(data.msg);
          return;
        }
        alert("สร้างสัปดาห์สําเร็จ");
      } catch (error) {
        alert("เกิดข้อผิดพลาด");
        console.error("Error submitting form:", error);
      }
    },

    logout() {
      this.token = null;
    },
  },

  props: {
    title: {
      type: String,
      default: "สร้างสัปดาห์ นักเรียน-นักศึกษา",
    },
  },
};
</script>

<style scoped>
.custom-table {
  width: 100%;
  margin-bottom: 1rem;
  color: #000000;
  background-color: rgb(225, 251, 255);
  border-collapse: collapse;
}

.custom-table th,
.custom-table td {
  /* padding: 0.2rem; */
  vertical-align: top;
  border: 1px solid #4978ae;
}

.custom-table th {
  background-color: #0056b3;
  border-bottom: 2px solid #dee2e6;
  text-align: left;
  color: #ffffff;
}

.custom-table tbody + tbody {
  border-top: 2px solid #dee2e6;
}

.btn-primary,
.btn-warning,
.btn-danger {
  background-color: #007bff;
  border-color: #007bff;
  color: #ffffff;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.btn-primary:hover,
.btn-warning:hover,
.btn-danger:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.app-bar {
  background-color: #163d5d;
  color: white;
  padding: 10px;
  text-align: left;
}
</style>
cdnjs.cloudflare.com
