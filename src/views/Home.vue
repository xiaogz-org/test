<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="container">
      <div class="grid-item">{{msg}}</div>
      <div class="grid-item">{{nameCount}}<button @click="addCount">+1</button></div>
      <div class="grid-item">
        {{switchBtn}} <button @click="switchBtn = !switchBtn">切换</button>
      </div>
      <div class="grid-item"></div>
      <div class="grid-item"><baseMap></baseMap></div>
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
  name: 'Home',
  data() {
    return {
      msg: "123"
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
