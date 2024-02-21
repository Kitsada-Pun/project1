<template>
    <div style="background-color: #8b5cf6; background-size: cover; width:auto;  height: 747px; padding-top: 100px;"></div>
    <div class="form_regis"> 
      <h1 style="color: #265073; font-size: 50px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">Register</h1>
        <h1></h1>
    </div>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <h5 style="text-align: left; margin: 30px 0px 0px 0px; font-size: 20px;color: #265073;">Username</h5>
      <v-text-field
        v-model="username"
        :counter="10"
        required
        style="margin: 0px 0px 20px 0px;
        background-color: #9AD0C2;
        height: 55px;"
      ></v-text-field>
      <h5 style="text-align: left; margin: 0px 0px 0px 0px; font-size: 20px;color: #265073;">Password</h5>
      <v-text-field
        v-model="password"
        :counter="8"
        required
        style="margin: 0px 0px 30px 0px;
        background-color: #9AD0C2;
        height: 55px;"
      ></v-text-field>
    </v-form>
</template>
<script>
export default {
    setup() {
        definePageMeta({
            middleware: ["auth"]
        })
    }
}
</script>
