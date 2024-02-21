<template>
  <div class="flex align-items-start justify-content-end">
    <SpeedDial
      :model="items"
      direction="left"
      :transitionDelay="80"
      showIcon="pi pi-bars"
      hideIcon="pi pi-times"
      buttonClass="p-button-info"
    />
  </div>
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
          ลงทะเบียนนักเรียน-นักศึกษา
        </div>
        <!-- <span class="text-600 font-medium line-height-3">Don't have an account?</span>
                  <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a> -->
      </div>

      <div>
        <label for="email" class="block text-900 font-medium mb-2"
          >รหัสนักเรียน-นักศึกษา
        </label>
        <InputText
          id="id_std1"
          type="text"
          placeholder="รหัสนักเรียน-นักศึกษา"
          class="w-full mb-3"
          v-model="id_std1"
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
        <transition-group name="p-message" tag="div">
          <Message
            v-for="msg of messages"
            :key="msg.id"
            :severity="msg.severity"
            >{{ msg.content }}</Message
          >
        </transition-group>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      messages: [],
      count: 0,

      id_std1: "",
      std_name: "",
      last_name: "",
      busy: false,
      classroom: null,
      Class_select: [
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
      items: [
        {
          label: "student",
          icon: "pi pi-user",
          command: () => {
            this.$router.push("/student");
          },
        },
        // สมัครนักเรียน
        // {
        //   label: "register",
        //   icon: "pi pi-user-plus",
        //   command: () => {
        //     this.$router.push("/register");
        //   },
        // },
        {
          label: "check",
          icon: "pi pi-plus",
          command: () => {
            this.$router.push("/check");
          },
        },
        {
          label: "Upload",
          icon: "pi pi-sign-out",
          command: () => {
            this.$router.push("/loginpage_cmt");
            localStorage.removeItem("token");
          },
        },
      ],
    };
  },
  methods: {
    async submitForm() {
      this.messages = [
        {
          severity: "success",
          content: "สมัครสมาชิกเสร็จสิ้น",
          id: this.count++,
        },
      ];
      try {
        // Use axios.post instead of this.$axios.post

        await axios.post("/api/add", {
          id_std1: this.id_std1,
          std_name: this.std_name,
          last_name: this.last_name,
          classroom: this.classroom.code,
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
