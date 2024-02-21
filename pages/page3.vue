<template>
    <div>
        <h1>Page 3</h1>
    </div>
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