<script setup>
import { storeToRefs } from 'pinia'
import { useCameraStore } from '../stores/cameras'

const props = defineProps({
  cameraId: String,
  size: Number
})

const { camera, loading } = storeToRefs(useCameraStore())
const {  fetchCameraData } = useCameraStore()

fetchCameraData(props.cameraId)

</script>
<template>

  <p v-if="loading">Loading...</p>
  <div  v-if="camera">
  <h2>Camera #{{ camera.external_id}}</h2>

    <table>
      <tr>
        <th align="right">Name</th>
        <th align="left">{{ camera.location_description}}</th>
      </tr>
      <tr>
        <th  align="right">Location</th>
        <th align="left">{{ camera.latitude }},{{ camera.longitude }}</th>
      </tr>
      <tr>
        <th  align="right">Updated at</th>
        <th align="left">{{ camera.updated_at }}</th>
      </tr>
      <tr>
        <th  align="right">IsActive</th>
        <th  align="left">{{ camera.is_active ? 'Yes' : 'No' }}</th>
      </tr>
    </table>
  </div>


</template>
