<script setup lang="ts">
import MyFooter from "./components/MyFooter.vue"

</script>
<template>
  <main class="text-center">
    <Top />

    <router-view />

    <MyFooter />
  </main>
</template>

