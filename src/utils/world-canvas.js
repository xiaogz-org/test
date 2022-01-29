import * as canvasUtils from './canvas-utils'
import { shipList } from '../mock/shipList.js'
class WorldCanvas {
  constructor() {
    this.ctx = null;
    this.canvas = null
    this._map = null
    this.shipMaps = null
    this.CW = 0
    this.CH = 0
    this.shipList = shipList
  }
  init(map) {
    this._map = map
    let { x: width, y: height } = map.getSize();
    this.canvas = document.createElement('canvas')
    this.canvas.className = "world-canvas"
    this.canvas.width = this.CW = width
    this.canvas.height = this.CH = height
    document.querySelector('.leaflet-map-pane').append(this.canvas)
    this.ctx = this.canvas.getContext('2d')

    this.canvas.addEventListener('mousemove', (e) => {
      let x = e.pageX, y = e.pageY
      //重新绘制canvas上的路径
      this.clear()
      let pointer = false
      for(let val of this.shipList) {
        this.drawShip(val)
        if(this.ctx.isPointInPath(x, y) === true) {
          pointer = true
          this.canvas.style.cursor = 'pointer'
        }
      }
      //因为是给整个canvas设置cursor, 所以放循环外面，否则就会被元素重置
      if(!pointer) {
        this.canvas.style.cursor = ''
      }
    })
    this.canvas.addEventListener('click', (e) => {
      let x = e.pageX, y = e.pageY
      //重新绘制canvas上的路径
      this.clear()
      for(let val of this.shipList) {
        this.drawShip(val)
        if(this.ctx.isPointInPath(x, y)) {
          alert(val.mmsi)
        }
      }
    })
  }
  //绘制船舶
  drawShip(ship) {
    let fillStyle = '#faf763'
    
    const ctx = this.ctx
    if (!ctx) return
    const { lat, lng, breadth, length, rotate } = ship
    const { shipX, shipY } = canvasUtils.getShipXY(lat, lng, this._map)
    const areaPos = canvasUtils.getBigShipAreaPos({shipX, shipY, breadth, length, rotate}, this._map.getZoom())

    ctx.fillStyle = this.isDarkTheme && fillStyle == '#faf763' ? '#202200' : fillStyle
    ctx.strokeStyle = this.isDarkTheme ? '#FAF763' : '#000'
    ctx.lineWidth = ship.sourceId == '28' ? 2 : 1

    ctx.beginPath()
    drawPath(areaPos)
    ctx.stroke()
    ctx.fill()
    ctx.closePath()
    function drawPath(areaPos) {
      areaPos.forEach((val, i) => {
        if(i === 0) {
          ctx.moveTo(areaPos[i].x, areaPos[i].y)
        }else {
          ctx.lineTo(areaPos[i].x, areaPos[i].y)
        }
      });
      ctx.lineTo(areaPos[0].x, areaPos[0].y)
    }
  }
  drawAllShip() {
    for(let val of this.shipList) {
      this.drawShip(val)
    }
  }
  resetCanvas() {
    const parentDom = document.querySelector('.leaflet-map-pane')

    const offsetList = []
    parentDom.style.transform.replace(/[-.\d]+(?=px)/g, searchVal => {
      offsetList.push(+searchVal)
    })

    const [x, y, z] = offsetList
    this.canvas.style.transform = `translate3d(${-x}px, ${-y}px, ${-z}px)`
  }
  //重置画布
  clear() {
    console.log('clear');
    this.ctx.clearRect(0, 0, this.CW, this.CH)
  }
}

export default new WorldCanvas
