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
          เข้าสู่ระบบนักเรียน-นักศึกษา
        </div>
        <!-- <span class="text-600 font-medium line-height-3">Don't have an account?</span>
                <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a> -->
      </div>

      <div>
        <label for="email1" class="block text-900 font-medium mb-2"
          >Username
        </label>
        <InputText
          id="username"
          type="text"
          placeholder="Username"
          class="w-full mb-3"
          v-model="username"
          :disabled="busy"
          autofocus
        />

        <label for="password1" class="block text-900 font-medium mb-2"
          >Password</label
        >
        <InputText
          id="password1"
          type="password"
          placeholder="Password"
          class="w-full mb-3"
          v-model="password"
          :disabled="busy"
        />

        <div class="flex align-items-center justify-content-between mb-6">
          <div class="flex align-items-center">
            <!-- <Checkbox id="rememberme1" :binary="true" v-model="checked1" class="mr-2"></Checkbox>
                        <label for="rememberme1">Remember me</label> -->
          </div>
          <a
            class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
            >Forgot password?</a
          >
        </div>

        <Button
          label="Sign In"
          icon="pi pi-user"
          class="w-full"
          :disabled="busy"
          @click="signin"
        >
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      busy: false,
    };
  },
  methods: {
    async signin() {
      try {
        let payload = {
          username: this.username,
          password: this.password,
        };
        let { data } = await this.$axios.post("/api/signin", payload);
        console.log("data=>", data.token);
        if (!data.token) {
          return;
        }
        // signin success
        localStorage.setItem("token", data.token);
        this.$emit("success");
        return navigateTo("/home");
      } catch (e) {}
    },
  },
};
</script>
