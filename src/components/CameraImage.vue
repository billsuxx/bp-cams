<script setup>
import { storeToRefs } from 'pinia'
import { useCameraStore } from '../stores/cameras'

const props = defineProps({
  cameraId: String,
  size: Number
})

const { image, loading } = storeToRefs(useCameraStore())
const { fetchCameraImage } = useCameraStore()

fetchCameraImage(props.cameraId)

</script>
<template>

  <div v-if="image">
    <img :src="`data:image/jpeg;base64,${image.image}`" alt="" :width="props.size ? props.size: 640">
  </div>

</template>
