<template>
	<div id="map" class="map"></div>
</template>

<script>
	import MapCore from '../../../utils/loongShipMap.js'
	import {
		defineComponent,
		onMounted
		/* getCurrentInstance,
		onUnmounted,
		reactive,
		toRefs,
		watch,
		watchEffect */
	} from 'vue'
	export default defineComponent({
		name: "baseMap",
		props: {},
		setup() {
			onMounted(async () => {
				console.log("onmounted");
				MapCore.initMap();
				MapCore.mapChange();

				let map = MapCore.$map;
				// map.on("zoom", () => {
				// 	console.log("zoom");
				// })
				// map.on("move", () => {
				// 	console.log("move");
				// })
				map.on("click", (e) => {
					console.log(e);
				})
				
			});
		}
	})
</script>

<style>
	.map {
		width: 100%;
		height: 100%;
		background-color: #0078A8;
	}
</style>
