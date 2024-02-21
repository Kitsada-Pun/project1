<template>
  <div id="app">
    <h1>เช็คลงกิจกรรม</h1>
    <AppManu />
    <video ref="webcamVideo" autoplay></video>
    <div class="flex align-items-center justify-content-center">
      <Button label="เช็ค" @click="faceCheck()" autofocus></Button>
      <!-- <button @click="startWebcam">Start Webcam</button>
      <button @click="stopWebcam">Stop Webcam</button>
      <button @click="captureImage">Capture Image</button> -->
    </div>
    <!-- <pre class="p-3 text-left">{{ result }}</pre> -->
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
      result: null,
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
    async faceCheck() {
      await this.captureImage();
      if (!this.capturedImageFile) {
        window.alert("Failed to capture image");
        return;
      }

      const form = new FormData();
      form.append("file", this.capturedImageFile);
      try {
        const face_res = await axios.post("/face-api/find-face", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const face = face_res.data;
        if (face.error) {
          window.alert(face.error);
          return;
        }
        this.result = face;
        if (!face.length) {
          console.log("No face found", face);
          window.alert("ไม่พบใบหน้าที่ลงทะเบียน");
          return;
        }
        const faceItem = face[0];
        console.log("faceItem=>", faceItem);
        if (!faceItem.data[0]) {
          console.log("No face data found", faceItem.data[0]);
          window.alert("ไม่พบข้อมูลใบหน้าที่ลงทะเบียน");
          return;
        }
        const res = await axios.post("/api/check-activity", {
          id: faceItem.data[0].name,
        });
        const check = res.data;
        if (check.status == 0) {
          console.log(check);
          window.alert(check.msg);
          return;
        }

        window.alert(
          `${check.student.id_std1} เช็คกิจกรรมเรียบร้อย ${check.student.std_name} ${check.student.last_name}`
        );
        // window.alert(`เช็คกิจกรรมเรียบร้อย`);
      } catch (error) {
        console.error("Error Checking Face:", error);
        window.alert("An error occurred while checking the face");
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
