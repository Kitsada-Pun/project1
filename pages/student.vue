<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
  />
  <div class="app-bar">
    <h1>{{ title }}</h1>
    <AppManu />

    <div class="card flex justify-content-start">
      <MultiSelect
        v-model="selectedCities"
        display="chip"
        :options="cities"
        optionLabel="name"
        placeholder="เลือกระดับชั้น"
        :maxSelectedLabels="3"
        class="w-full md:w-27rem"
        @change="fetchStudentData"
      />
    </div>
  </div>

  <div class="card">
    <DataTable ref="dt" :value="students" scrollable>
      <template #header>
        <div style="text-align: left">
          <Button
            icon="pi pi-external-link"
            label="Export"
            @click="exportCSV($event)"
          />
        </div>
      </template>
      <Column
        field="id_std1"
        key="id"
        header="Code"
        style="min-width: 7rem"
      ></Column>
      <Column field="std_name" header="ชื่อ" style="min-width: 7rem"></Column>
      <Column
        field="last_name"
        header="นามสกุล"
        style="min-width: 7rem"
      ></Column>
      <Column
        v-for="weekItem of week"
        :key="weekItem.id"
        :field="'week_' + weekItem.id"
        :header="'สัปห์ดาที่' + weekItem.week"
        style="min-width: 7rem"
      ></Column>
      <Column field="summary" header="สรุป" style="min-width: 2.5rem"></Column>
    </DataTable>
  </div>
</template>

<script>
import axios from "axios";
import "~/assets/themes/lara-light-purple/theme.css";

export default {
  setup() {
    definePageMeta({
      middleware: ["auth"],
    });
  },
  data() {
    return {
      sortKey: null,
      reverse: false,

      selectedCities: null,
      cities: [
        { name: "Aw", code: "Aw" },
        { name: "Ag", code: "Ag" },
        { name: "Bw", code: "Bw" },
        { name: "Bg", code: "Bg" },
        { name: "Cw", code: "Cw" },
        { name: "Cg", code: "Cg" },
        { name: "D1", code: "D1" },
        { name: "D5", code: "D5" },
        { name: "E1", code: "E1" },
        { name: "E5", code: "E5" },
      ],
      week: [],
      students: [],
    };
  },

  mounted() {
    // Fetch data from the server when the component is mounted
    this.fetchStudentData();
  },
  methods: {
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
    async fetchStudentData() {
      const url = "/api/list";
      const groupCodes = this.selectedCities?.map((item) => item?.code);
      try {
        const response = await axios.get(url, {
          params: {
            g: groupCodes,
          },
        });
        const data = response.data;
        this.week = data.week;
        this.students = data.students;
        this.students.map((student) => {
          // getCheckStatus to student.`week_${weekItem.id}`
          // getSummary to student.summary
          student.summary = this.getSummary(student);
          // getCheckStatus() to student.`week_${weekItem.id}`
          const week = this.week.map((item) => {
            return {
              id: item.id,
              status: this.getCheckStatus(student, item),
            };
          });
          for (const weekItem of week) {
            student[`week_${weekItem.id}`] = weekItem.status;
          }
          return student;
        });
        console.log("student =>", this.students);
      } catch (error) {
        console.error("Error fetching student data", error);
      }
    },

    getCheckStatus(student, weekItem) {
      if (weekItem.status == 2) {
        return "-";
      }
      const check = student.list.find((item) => item.week_id === weekItem.id);
      // console.log("check =>", check);
      if (!check) {
        return "0";
      }
      return "1";
    },
    getSummary(student) {
      const persent = (student.list.length / this.week.length) * 100;
      if (persent >= 60) {
        return `ผ่าน ${persent.toFixed(2)}%`;
      } else {
        return `ไม่ผ่าน ${persent.toFixed(2)}%`;
      }
    },
  },

  props: {
    title: {
      type: String,
      default: "รายชื่อผู้ใช้งานนักเรียน-นักศึกษา",
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
