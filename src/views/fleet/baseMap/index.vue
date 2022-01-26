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
      map.on("zoom", (e) => {
        console.log(e);
      })
      map.on("move", (e) => {
        console.log(e);
        /**
         * 1、重置canvas
         * 2、重新请求新区域船舶信息
         * 3、重新将canvas上的船舶定位（随着地图移动）
         */
        worldCanvas.resetCanvas()
        
      })
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
