<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
	<div class="container">
		<div class="grid-item"></div>
		<div class="grid-item"></div>
		<div class="grid-item"></div>
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
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import baseMap from './fleet/baseMap/index.vue'
export default {
  name: 'Home',
  components: {
    //HelloWorld
	baseMap
  },
}
</script>

<style>
	.container {
		height: 100vh;
		display: grid;
		/* grid-template-columns: repeat(3, 33.33%);
		grid-template-rows: repeat(3, 33.33%); */
		grid-template-columns: 10px auto 10px;
		grid-template-rows: 10px auto 10px;
	}
	
</style>
