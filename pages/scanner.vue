<template>
  <div id="app">
    <h1>เช็คลงกิจกรรม</h1>
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
    <video ref="webcamVideo" autoplay></video>
    <div class="flex align-items-center justify-content-center">
      <button @click="startWebcam">Start Webcam</button>
      <button @click="stopWebcam">Stop Webcam</button>
      <button @click="captureImage">Capture Image</button>
    </div>
    <img v-if="capturedImage" :src="capturedImage" alt="Captured Image" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      webcamStream: null,
      capturedImage: null,
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
    async startWebcam() {
      try {
        this.webcamStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        this.$refs.webcamVideo.srcObject = this.webcamStream;
      } catch (error) {
        console.error("Error starting webcam:", error);
      }
    },
    stopWebcam() {
      if (this.webcamStream) {
        const tracks = this.webcamStream.getTracks();
        tracks.forEach((track) => track.stop());
        this.$refs.webcamVideo.srcObject = null;
        this.webcamStream = null;
      }
    },
    captureImage() {
      const canvas = document.createElement("canvas");
      canvas.width = this.$refs.webcamVideo.videoWidth;
      canvas.height = this.$refs.webcamVideo.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(
        this.$refs.webcamVideo,
        0,
        0,
        canvas.width,
        canvas.height
      );
      this.capturedImage = canvas.toDataURL("image/png");
    },

  },
};
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
