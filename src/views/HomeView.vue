<script setup lang="ts">
import CameraList from '../components/CameraList.vue'

</script>

<template>
  <main>
    <h2>Home</h2>
    <CameraList :page="$route.params.page"></CameraList>
  </main>
</template>
