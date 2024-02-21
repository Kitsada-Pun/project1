<template>
  <div class="app-bar">
    <h1>{{ title }}</h1>
    <AppManu />
  </div>
  <div class="h-1rem"></div>
  <div class="flex justify-content-end mb-3">
    <NuxtLink to="/add_week">
      <Button label="เพิ่มสัปดาห์" />
    </NuxtLink>
  </div>
  <div class="card">
    <div class="card">
      <DataTable :value="week" tableStyle="min-width: 50rem">
        <Column field="id" header="ID"></Column>
        <Column field="week" header="สัปดาห์ที่"></Column>
        <Column field="create_at" header="วันที่สร้าง"></Column>
        <Column field="status" header="สถานะ">
          <template #body="slotProps">
            <Tag
              :value="getStatusName(slotProps.data.status)"
              :severity="getStatusSeverity(slotProps.data.status)"
            />
          </template>
        </Column>
        <Column field="status" header="Actions">
          <template #body="slotProps">
            <Button
              label="ปิดสัปดาห์"
              size="small"
              severity="warning"
              rounded
              v-if="slotProps.data.status === 1"
              @click="closeWeek(slotProps.data.id)"
            ></Button>
            <Button
              label="เปิดสัปดาห์"
              size="small"
              rounded
              v-else-if="slotProps.data.status === 0"
              @click="openWeek(slotProps.data.id)"
            ></Button>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <div class="flex flex-wrap gap-5 p-fluid"></div>
</template>
<script>
export default {
  setup() {
    definePageMeta({
      middleware: ["auth"],
    });
  },
  data() {
    return {
      title: "จัดการสัปดาห์",
      week: [],
    };
  },
  mounted() {
    this.getWeek();
  },
  methods: {
    async getWeek() {
      try {
        const res = await this.$axios.get("/api/week");
        const data = res.data;
        if (data.status == 0) {
          alert(data.msg);
          return;
        }
        this.week = data.data;
        console.log(this.week);
      } catch (error) {
        console.error(error);
      }
    },
    async closeWeek(id) {
      try {
        const res = await this.$axios.post("/api/close-week", {
          id: id,
        });
        const data = res.data;
        if (data.status == 0) {
          alert(data.msg);
          return;
        }
        this.getWeek();
        alert("ปิดสัปดาห์สําเร็จ");
      } catch (error) {
        console.error(error);
      }
    },
    async openWeek(id) {
      try {
        const res = await this.$axios.post("/api/open-week", {
          id: id,
        });
        const data = res.data;
        if (data.status == 0) {
          alert(data.msg);
        }
        this.getWeek();
        alert("เปิดสัปดาห์สําเร็จ");
      } catch (error) {
        console.error(error);
      }
    },
    getStatusName(status) {
      switch (status) {
        case 2:
          return "วันหยุด";
        case 1:
          return "เปิด";
        case 0:
          return "ปิด";
        default:
          return "-";
      }
    },
    getStatusSeverity(status) {
      switch (status) {
        case 2:
          return "danger";
        case 1:
          return "success";
        case 0:
          return "warning";
        default:
          return "Secondary";
      }
    },
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
