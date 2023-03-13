<script setup>
import { watch,reactive } from 'vue'
const props = defineProps({
  page: {
    type: String,
    default: '1'
  }
})

const state = reactive({ query: '' })

import Pager from "@/components/Pager.vue";
import { useCameraStore } from '../stores/cameras'

import { storeToRefs } from 'pinia'
import CameraImage from "@/components/CameraImage.vue";
const { cameras, loading } = storeToRefs(useCameraStore())
const { fetchCameras } = useCameraStore()

fetchCameras(1)

watch(() => props.page, (n, o) => {
  fetchCameras(n)
});

const search = () => {
  fetchCameras(1, state.query)
}

</script>
<template>


  <form @submit.prevent>
    <input type="text" v-model="state.query" @keydown.enter="search">
  </form>

  <p v-if="loading">Loading posts...</p>
  <section v-if="cameras">
    <div :class="[$style.cameraContainer]">
      <div v-for="(camera,index) in cameras" :class="[$style.cameraBox]"
        :key="`camera-box-${index}`">
        <RouterLink :to="{ name: 'camera', params: { id: camera.external_id } }">
          <div>
            {{ camera.location_description }}
          </div>
        </RouterLink>
      </div>
    </div>
    <Pager></Pager>
  </section>

</template>
<style lang="css" module>
.cameraBox {
  background: #2c3e50;
  padding: 5px;
  width: 150px;
  height: 200px;
  margin: 10px;
  font-size: 12px;
}
.cameraBox img {
  margin: 0 -5px;
}

.cameraContainer {
  display: flex;
  flex-wrap: wrap;
}

</style>