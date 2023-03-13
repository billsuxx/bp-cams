<script setup>
import CameraImage from "@/components/CameraImage.vue";
import CameraDetails from "@/components/CameraDetails.vue";
</script>
<template>
  <div class="cameraview">
      <CameraDetails :camera-id="$route.params.id"></CameraDetails>
      <CameraImage :camera-id="$route.params.id"></CameraImage>
  </div>
</template>

<style>

</style>
