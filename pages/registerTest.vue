<template>
  <div class="flex justify-content-center flex-wrap">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div class="text-center mb-5">
        <img
          src="/images/Logo_IT_Department.png"
          alt="Image"
          height="50"
          class="mb-3"
        />
        <div class="text-900 text-3xl font-medium mb-3">
          ลงทะเบียนคณะกรรมการ
        </div>
        <!-- <span class="text-600 font-medium line-height-3">Don't have an account?</span>
                  <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a> -->
      </div>

      <div>
        <label for="email" class="block text-900 font-medium mb-2"
          >รหัสนักเรียน-นักศึกษา
        </label>
        <InputText
          id="id_std"
          type="text"
          placeholder="รหัสนักเรียน-นักศึกษา"
          class="w-full mb-3"
          v-model="id_std"
          :disabled="busy"
          autofocus
        />

        <label for="text" class="block text-900 font-medium mb-2">ชื่อ </label>
        <InputText
          id="std_name"
          type="text"
          placeholder="ชื่อ"
          class="lg:w-6"
          v-model="std_name"
          :disabled="busy"
          autofocus
        />
        <InputText
          id="last_name"
          type="text"
          placeholder="นามสกุล"
          class="lg:w-6 mb-3"
          v-model="last_name"
          :disabled="busy"
          autofocus
        />
        <Dropdown
          v-model="classroom"
          :options="Class_select"
          optionLabel="name"
          placeholder="ชั้น/ห้อง"
          class="w-full mb-3"
        />

        <div class="flex align-items-center justify-content-between mb-3">
          <div class="flex align-items-center">
            <!-- <Checkbox id="rememberme1" :binary="true" v-model="checked1" class="mr-2"></Checkbox>
                          <label for="rememberme1">Remember me</label> -->
          </div>
        </div>

        <Button
          label="Register"
          icon="pi pi-user"
          class="w-full"
          :disabled="busy"
          @click="submitForm"
        >
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      id_std: "",
      std_name: "",
      last_name: "",
      busy: false,
      // classroom: null,
      // Class_select: [
      //   { name: "Aw", code: "classroom" },
      //   { name: "Ag", code: "classroom" },
      //   { name: "Bw", code: "classroom" },
      //   { name: "Bg", code: "classroom" },
      //   { name: "Cw", code: "classroom" },
      //   { name: "Cg", code: "classroom" },
      //   { name: "D1", code: "classroom" },
      //   { name: "D5", code: "classroom" },
      //   { name: "E1", code: "classroom" },
      //   { name: "E5", code: "classroom" },
      // ],
    };
  },
  methods: {
    async submitForm() {
      try {
        // Use axios.post instead of this.$axios.post
        await axios.post("/api/add", {
          id_std: this.id_std,
          std_name: this.std_name,
          last_name: this.last_name,
          // classroom: this.classroom,
        });

        // Set formSubmitted to true after successfully submitting data
        this.formSubmitted = true;
        s;
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  },
};
</script>
