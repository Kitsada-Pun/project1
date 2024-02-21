<template>
  <div id="app">
    <h1>ลงทะเบียนใบหน้า</h1>
    <div class="flex align-items-end justify-content-end">
      <AppManu />
    </div>
    <video ref="webcamVideo" autoplay></video>
    <div class="flex align-items-center justify-content-center">
      <div class="flex flex-column gap-2">
        <label for="username">ใส่รหัสนักเรียน</label>
        <InputText
          id="username"
          v-model="studentCode"
          aria-describedby="username-help"
        />
        <Button label="Submit" @click="register" :disabled="waiting"></Button>
        <div v-if="waiting">Waiting...</div>
      </div>
      <!-- <button @click="startWebcam">Start Webcam</button>
        <button @click="stopWebcam">Stop Webcam</button>
        <button @click="captureImage">Capture Image</button> -->
    </div>
    <img v-if="capturedImage" :src="capturedImage" alt="Captured Image" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  // setup() {
  //   definePageMeta({
  //     middleware: ["auth"],
  //   });
  // },
  data() {
    return {
      studentCode: "",
      webcamStream: null,
      capturedImage: null,
      capturedImageFile: null,
      waiting: false,
    };
  },
  mounted() {
    this.startWebcam();
  },
  unmounted() {
    // this.stopWebcam();
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
      const blobPromise = new Promise((resolve) => {
        canvas.toBlob((blob) => {
          // blob to file
          const file = new File([blob], "image.png", {
            type: "image/png",
          });
          this.capturedImageFile = file;
          console.log(file);
          resolve();
        });
      });
      return blobPromise;
    },
    async register() {
      const res = await axios.get("/api/student/" + this.studentCode);
      const student = res.data.data;
      console.log(student);
      if (!student) {
        window.alert("ไม่พบรหัสนักศึกษา");
        return;
      }

      if (student.id_face) {
        window.alert("ได้ลงทะเบียนใบหน้า ไปแล้ว");
        return;
      }

      await this.captureImage(); // Capture image first
      if (!this.capturedImageFile) {
        window.alert("เกิดข้อผิดพลาดในการลงทะเบียน");
        return;
      }

      const form = new FormData();
      form.append("name", student.id_std1); // Fix: Remove extra space after "name"
      console.log("image", this.capturedImageFile);
      form.append("file", this.capturedImageFile); // Populate file field

      try {
        const face_res = await axios.post("/face-api/add-face", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const face = face_res.data;
        if (face.error) {
          window.alert(face.error);
          return;
        }
        console.log(face);
        await axios.post("/api/addface", {
          id_std1: student.id_std1,
          id_face: face.id,
        });

        window.alert(
          "ลงทะเบียนใบหน้า เรียบร้อย : " +
            student.std_name +
            " " +
            student.last_name
        );
      } catch (error) {
        console.error("Error registering face:", error);
        window.alert("An error occurred while registering face");
      }
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
