<!-- FilterTable.vue -->
<template>
  <div>
    <input v-model="filter" placeholder="Type to filter" />
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <!-- เพิ่ม th ตามต้องการ -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredItems" :key="item.id">
          <td>{{ item.id_std1 }}</td>
          <td>{{ item.std_name }}</td>
          <td>{{ item.last_name }}</td>
          <td>{{ item.classroom }}</td>
          <td>{{ item.week1 }}</td>
          <td>{{ item.week2 }}</td>
          <td>{{ item.week3 }}</td>
          <td>{{ item.week4 }}</td>
          <td>{{ item.week5 }}</td>
          <td>{{ item.week6 }}</td>
          <td>{{ item.week7 }}</td>
          <td>{{ item.week8 }}</td>
          <td>{{ item.week9 }}</td>
          <td>{{ item.week10 }}</td>
          <td>{{ item.week11 }}</td>
          <td>{{ item.week12 }}</td>
          <td>{{ item.week13 }}</td>
          <td>{{ item.week14 }}</td>
          <td>{{ item.week15 }}</td>
          <td>{{ item.week16 }}</td>
          <td>{{ item.week17 }}</td>
          <td>{{ item.week18 }}</td>
          <!-- เพิ่ม td ตามต้องการ -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import "~/assets/themes/lara-light-purple/theme.css";

export default {
  data() {
    return {
      sortKey: null,
      reverse: false,
      studentList: [],

      items: [
        { id: 1, name: "John", age: 25 },
        { id: 2, name: "Jane", age: 30 },
        // เพิ่มข้อมูลอื่น ๆ ตามต้องการ
      ],
      filter: "",
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) => {
        return Object.values(item).some((val) => {
          return String(val).toLowerCase().includes(this.filter.toLowerCase());
        });
      });
    },
  },

  mounted() {
    // Fetch data from the server when the component is mounted
    this.fetchStudentData();
  },
  methods: {
    async onShow() {
      const url = "/api/list";
      const res = await fetch(url);
      const data = await res.json();
      this.studentList = data.datas;
      console.log("data =>", data.datas);
    },
    doEdit(student) {
      // Implement edit logic here
      console.log("Edit student:", student);
    },
    doDelete(student) {
      // Implement delete logic here
      console.log("Delete student:", student);
    },
    async fetchStudentData() {
      const url = "/api/list";
      try {
        const response = await axios.get(url);
        this.studentList = response.data.datas;
        console.log("Fetched student data:", this.studentList);
      } catch (error) {
        console.error("Error fetching student data", error);
      }
    },

    sortBy(key) {
      this.reverse = this.sortKey === key ? !this.reverse : false;
      this.sortKey = key;

      this.sortedData = this.sortData(this.studentList, key, this.reverse);
    },
    sortData(data, key, reverse) {
      const clonedData = [...data];
      return clonedData.sort((a, b) => {
        let comparison = 0;

        if (a[key] > b[key]) {
          comparison = 1;
        } else if (a[key] < b[key]) {
          comparison = -1;
        }

        return reverse ? -comparison : comparison;
      });
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
/* เพิ่มสไตล์ CSS ตามต้องการ */
</style>
