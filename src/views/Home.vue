<template>
  <div class="home">
    <div class="container">
      <div class="grid-item">1</div>
      <div class="grid-item">2</div>
      <div class="grid-item">3</div>
      <div class="grid-item">4</div>
      <div class="grid-item">
        <base-map></base-map>
      </div>
      <div class="grid-item">6</div>
      <div class="grid-item">7</div>
      <div class="grid-item">8</div>
      <div class="grid-item">9</div>
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
