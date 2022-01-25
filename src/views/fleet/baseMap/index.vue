<template>
  <div id="map" class="map"></div>
</template>

<script>
import MapCore from '../../../utils/loongShipMap.js'
import worldCanvas from '../../../utils/world-canvas.js'
import {defineComponent,onMounted} from 'vue';
export default defineComponent({
  name: 'baseMap',
  props: {},
  setup() {
    onMounted(async () => {
      MapCore.initMap();
      MapCore.mapChange();
        
      let map = MapCore.$map;
      console.log(map.getSize());
      // map.on("zoom", () => {
      // 	console.log("zoom");
      // })
      // map.on("move", () => {
      // 	console.log("move");
      // })
      map.on('click', e => {
        console.log(e);
      });
      worldCanvas.init(map)
      worldCanvas.drawShip()
    });
  }
});
</script>

<style>
.map {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #0078a8;
}
.world-canvas {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,.2);
  z-index: 401 !important;
}
</style>
