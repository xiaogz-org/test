<template>
  <div class="home">
    <div class="container">
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item">
        <baseMap></baseMap>
      </div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
    </div>
  </div>
</template>

<script>
import baseMap from './fleet/baseMap/index.vue';
import { state, methods } from './home.js'
import { defineComponent, onMounted, toRefs} from 'vue';

export default defineComponent({
  data() {
    return {
    }
  },
  components: {
    baseMap
  },
  setup() {
    onMounted(() => {
      
    });
    
    return {
      ...toRefs(state),
      ...methods
    };
  }
});
</script>

<style>
.container {
  height: 100vh;
  display: grid;
  /* grid-template-columns: repeat(3, 33.33%);
		grid-template-rows: repeat(3, 33.33%); */
  grid-template-columns: 50px auto 50px;
  grid-template-rows: 50px auto 50px;
}
</style>
