<script setup>
import { storeToRefs } from 'pinia'
import { useCameraStore } from '../stores/cameras'

const { pager,loading } = storeToRefs(useCameraStore())
</script>

<template>
  <div v-if="pager.total">
    <ul v-if="pager" :class="$style.ul">
      <li v-for="page in pager.pages" :key="`page-${page}`" :class="$style.li">

        <template v-if="page == $route.params.page">
          <span>{{ page }}</span>
        </template>

        <RouterLink v-else :to="{ name: 'home', params: { page: page } }">
          {{ page }}
        </RouterLink>
      </li>
    </ul>
  </div>
  <div v-else-if="!loading">
    Nincs talalat
  </div>
</template>



<style module>
.ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.li {
  display: inline;
}
.li span,
.li a {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 2px 5px;
}
</style>