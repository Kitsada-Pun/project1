<template>
    <div>
      <NuxtWelcome />
    </div>
  </template>
<script>
export default {
  created() {
    return navigateTo("/loginpage_cmt");
  }
}
</script>
