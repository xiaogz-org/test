<template>
  <div id="map" class="map">
    <ship-menu></ship-menu>
  </div>
</template>

<script>
import MapCore from '../../../utils/loongShipMap.js'
import WorldRequest from '../../../utils/world-request.js'
import {defineComponent,onMounted} from 'vue';
import { shipList } from '../../../mock/shipList.js'
import * as canvasUtils from '../../../utils/canvas-utils'

export default defineComponent({
  components: { shipMenu },
  name: 'baseMap',
  props: {},
});
</script>
<script setup>
  import shipMenu from './shipMenu.vue'

  onMounted(async () => {
    MapCore.initMap();
    MapCore.mapChange();
    let map = MapCore.$map;
    let bounds = map.getBounds()
    let {x, y} = map.getSize();

    //西南 左下角
    let leftPoint = {
      lat:bounds._southWest.lat,
      lng:bounds._southWest.lng
    }
    //东南 右下角
    let rightPoint = {
      lat:bounds._southWest.lat,
      lng:bounds._northEast.lng
    }
    let distance = map.distance(leftPoint, rightPoint) / 1852;
    WorldRequest.init(map)
    /*  map.on("zoom", (e) => {
    })
    map.on("move", (e) => {
      
      worldCanvas.resetCanvas()
      worldCanvas.clear()
      worldCanvas.drawRedBox()
      worldCanvas.drawAllShip()
    })
    map.on('click', e => {
      //console.log(e);
    });
    
    handleShipList(map)
    const worldCanvas = new WorldCanvas(shipList)
    worldCanvas.init(map)
    worldCanvas.drawAllShip() */
  });

  function handleShipList(map) {
    shipList.forEach((ship, index) => {
      console.log(ship);
      let lat = ship.lat
      let lng = ship.lng || ship.lon
      //经纬度转换成坐标
      const { shipX, shipY } = canvasUtils.getShipXY(lat, lng, map)
      
      shipList[index] = {
        ...ship,
        shipX,
        shipY
      }
    });
  }
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
