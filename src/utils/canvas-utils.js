// import { followShipTypeList } from '../../../../utils/utils'
//import worldRequest from './world-request'
import L from 'leaflet'

export const SHIP_HEIGHT_SIZE = 22
export const SHIP_BOTTOM_SIZE = 14

export const getShipXY = (lat, lng, map) => {
  // 坐标 - 最左上角坐标 获取到可以用 canvas 来绘制的坐标 (当前船舶所处的坐标,该坐标后期也可以用于匹配 tooltip)
  // [注] 由于船舶的 lat,lng 是后台传递过来的,范围是 -180 ~ 180,所以计算得出的 shipX,Y 也是在这个 范围的point
  // [注] 纬度，纬度y 的是 北大南小，所以要 yMax - lat
  // const shipX = ((lng - xyData.xMin) / (xyData.xMax - xyData.xMin)) * CW
  // const shipY = ((xyData.yMax - lat) / (xyData.yMax - xyData.yMin)) * CH

  // 用 leaflet 自带的 api 就行，解决bug的感觉真爽
  const { x: shipX, y: shipY } = map.latLngToContainerPoint([lat, lng])

  return {
    shipX,
    shipY
  }
}
// 获取船舶三角形的区域点位
export const getAreaPos = (shipX, shipY, rotate) => {
  // 由于 Y 轴是相反的，所以需要...
  const rad = -(Math.PI / 180) * rotate
  const startX1 = 0
  const startY1 = 0 - SHIP_HEIGHT_SIZE / 2

  // startX1 * Math.cos(rad) - startY1 * Math.sin(rad) 是根据圆点， + shipX是 坐标偏移
  const topPosX = startX1 * Math.cos(rad) + startY1 * Math.sin(rad) + shipX
  const topPosY = -startX1 * Math.sin(rad) + startY1 * Math.cos(rad) + shipY

  const startX2 = 0 + SHIP_BOTTOM_SIZE / 2
  const startY2 = 0 + SHIP_HEIGHT_SIZE / 2

  const rightPosX = startX2 * Math.cos(rad) + startY2 * Math.sin(rad) + shipX
  const rightPosY = -startX2 * Math.sin(rad) + startY2 * Math.cos(rad) + shipY

  const startX3 = 0 - SHIP_BOTTOM_SIZE / 2
  const startY3 = 0 + SHIP_HEIGHT_SIZE / 2

  const leftPosX = startX3 * Math.cos(rad) + startY3 * Math.sin(rad) + shipX
  const leftPosY = -startX3 * Math.sin(rad) + startY3 * Math.cos(rad) + shipY

  return [
    {
      x: topPosX,
      y: topPosY
    },
    {
      x: rightPosX,
      y: rightPosY
    },
    {
      x: leftPosX,
      y: leftPosY
    }
  ]
}


