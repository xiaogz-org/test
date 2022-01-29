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

      map.on("zoom", (e) => {
        /**
         * 根据比例重绘船舶
         * 根据船长渲染（14级渲染超过200米的船，15级渲染超过100米的，16级渲染大于50米的）
         */
      })
      map.on("move", (e) => {
        //地图发生zoom时，也会执行move
        /**
         * 1、重置canvas
         * 2、重新请求新区域船舶信息
         * 3、重新将canvas上的船舶定位（随着地图移动）
         */
        worldCanvas.resetCanvas()
        worldCanvas.clear()
        worldCanvas.drawAllShip()
      })
      map.on('click', e => {
        //console.log(e);
      });
      worldCanvas.init(map)
      worldCanvas.drawAllShip()
    });
  }
});
</script>

<style scoped>
.map {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #0078a8;
}
:deep(.world-canvas) {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,.2);
  z-index: 401 !important;
}
.leaflet-grab {
  cursor: default;
}
</style>
