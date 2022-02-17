/**
 * 主要用于处理canvas相关的接口
 */
 import WorldCanvas from './world-canvas.js'
 import { shipList } from '../mock/shipList.js'
 import * as canvasUtils from './canvas-utils'
import worldCanvas from './world-canvas.js'

class worldRequest {
  constructor() {
    this._map = null
    this.isBackStatus = false //是否处于回放模式
    this.shipMaps = [] //存储当前地图（canvas）上的船舶数据
    this.shipData = null //当前活动的船舶对象，比如点击查看
  }
  //初始化，可以根据船舶类型进行加载
  init(map, drawType) {
    this._map = map
    this.mapEventBind()
    //canvas初始化
    WorldCanvas.init(this._map)
    //轮询船舶
    this.requestData()
  }
  //获取船队信息
  requestData() {
    this.shipList = shipList
    const bound = canvasUtils.getBoundsLatLng(this._map) //获取
    
    /**
     * 获取数据进行处理
     * 1、根据转换经纬度
     * 2、计算船舶旋转角度rotate
     * 3、计算船舶坐标（shipX, shipY）
     * 4、计算船舶各个点的坐标areaPos
     * 5、处理完成后存入shipMaps
     */
    shipList.forEach(ship => {
      //lng、lat
      let {lng, lat} = canvasUtils.lnglatsTrans(ship.lat, ship.lon, 1)
      //rotate
      ship.speed /= 10
      ship.course /= 10
      const rotate = canvasUtils.getRotate(ship.speed, ship.heading, ship.course)
      //shipX, shipY
      const {shipX, shipY} = canvasUtils.getShipXY(lat, lng, this._map) 
      //areaPos
      const areaPos = canvasUtils.getBigShipAreaPos({...ship, shipX, shipY, rotate}, this._map.getZoom())
      console.log(shipX, shipY);
      this.shipMaps.push({...ship, lng, lat, shipX, shipY, rotate, areaPos})
    })
    /**处理船舶尾迹 */
    /**
     * 绘制船舶
     * 绘制规则：1、系统船在关注船开或回放模式下采用 drawSystemShipIcon(ship, fillStyle)、始终绘制标签名
     *          2、非系统船采用 drawActualShipIcon(ship, fillStyle)、zoom小于12不绘制标签名
     * 绘制的方式不一样，分为系统船、关注船、普通船，使用颜色加以区分
     *  1、isBackStatus 是否处于回放模式
     *  2、openFollow  关注船开关
     * 重置shipData
     */
    this.shipMaps.forEach(ship => {
      WorldCanvas.drawShip(ship)
    })
    
  }

  mapEventBind() {
    this._map.on("zoom", (e) => {
      console.log('zoom');
    })
    this._map.on("move", (e) => {
      //地图发生zoom时，也会执行move
      /**
       * 1、重置canvas
       * 2、重新请求新区域船舶信息
       * 3、重新将canvas上的船舶定位（随着地图移动）
       */

      WorldCanvas.resetCanvas()
      WorldCanvas.clear()
      //重绘
      this.reDraw()
      this.shipMaps.forEach(ship => {
        WorldCanvas.drawShip(ship)    
      })
      if(this.shipData) {
        WorldCanvas.drawRedBox(this.shipData)
      }
      
    })
    this._map.on('click', e => {
      console.log('click');
    });
    this._map.on('moveend zoomend', (e) => {
      console.log(e);
    })
  }
  //处理船舶数据
  //拖动地图等操作需要不断计算坐标
  //重新计算船舶的shipX、shipY和areaPos
  reDraw() {
    const shipMaps = this.shipMaps
    shipMaps.forEach((ship,i) => {
      const {shipX, shipY} = canvasUtils.getShipXY(ship.lat, ship.lng, this._map) 
      const areaPos = canvasUtils.getBigShipAreaPos({...ship, shipX, shipY, rotate: ship.rotate}, this._map.getZoom())
      shipMaps[i].shipX = shipX
      shipMaps[i].shipY = shipY
      shipMaps[i].areaPos = areaPos
    })
  }
  //船舶点击后的处理，在
  clickEventTrigger(ship) {
    //回放模式直接跳出

    this.shipData = ship
    WorldCanvas.clear()
    this.shipMaps.forEach(v => {
      WorldCanvas.drawShip(v)
      if(v.mmsi === ship.mmsi) {
        worldCanvas.drawRedBox(ship)
      }
    })
    //创建popup

  }
}

export default new worldRequest()