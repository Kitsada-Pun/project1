<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
  />

  <div>
    <div class="container mt-4">
      <!-- <button class="btn btn-primary" @click="onShow">List</button> -->
    </div>
    <div class="text-900 text-3xl font-medium mb-3">
      รายชื่อผู้ใช้งานคณะกรรมการ
    </div>
    <div class="container mt-4">
      <table class="table table-bordered custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="st in studentList" :key="st.id">
            <td>{{ st.id }}</td>
            <td>{{ st.username }}</td>
            <td>{{ st.password }}</td>
            <td>
              <button class="btn btn-warning mr-2" @click="doEdit(st)">
                <i class="fas fa-edit"></i> Edit
              </button>
              <button class="btn btn-danger" @click="doDelete(st)">
                <i class="fas fa-trash-alt"></i> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      studentList: [],
    };
  },
  mounted() {
    // Fetch data from the server when the component is mounted
    this.fetchStudentData();
  },
  methods: {
    async onShow() {
      const url = "/api/list_cmt";
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
      const url = "/api/list_cmt";
      try {
        const response = await axios.get(url);
        this.studentList = response.data.datas;
        console.log("Fetched student data:", this.studentList);
      } catch (error) {
        console.error("Error fetching student data", error);
      }
    },
  },
};
</script>

<style scoped>
.custom-table {
  width: 100%;
  margin-bottom: 1rem;
  color: #ffffff;
  background-color: #8d9bf6;
  border-collapse: collapse;
}

.custom-table th,
.custom-table td {
  padding: 0.8rem;
  vertical-align: top;
  border: 1px solid #dee2e6;
}

.custom-table th {
  background-color: #252780;
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
</style>
cdnjs.cloudflare.com
