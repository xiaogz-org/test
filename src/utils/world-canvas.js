import * as canvasUtils from './canvas-utils'
class WorldCanvas {
  constructor() {
    this.ctx = null;
    this.canvas = null
    this._map = null
    this.shipMaps = null
    this.CW = 0
    this.CH = 0
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
      // this.clear()
      // this.drawShip()
      console.log(this.ctx.isPointInPath(x,y));
      if(this.ctx.isPointInPath(x,y)) {
        console.log("true");
      }
    })
  }
  //绘制船舶
  drawShip() {
    let fillStyle = '#faf763'
    let ship = {
      "mmsi": 22436359,
      "lat": 24.448611666666668,
      "lon": 70984469,
      "name": "AIP I",
      "customName": null,
      "heading": -1,
      "course": 0,
      "speed": 0,
      "posTime": 1643164736,
      "status": 0,
      "customStatus": null,
      "shipType": 5,
      "shipTypeSpec": null,
      "customShipType": null,
      "breadth": 16,
      "length": 105,
      "sourceId": "28",
      "safeRadius": null,
      "lng": 118.30744833333334,
      "rotate": 10,
      "searchFlag": false
    }
    const ctx = this.ctx
    if (!ctx) return
    const { lat, lng } = ship
    const { shipX, shipY } = canvasUtils.getShipXY(lat, lng, this._map)
    const areaPos1 = canvasUtils.getAreaPos(shipX, shipY, ship.rotate)
    const areaPos = canvasUtils.getBigShipAreaPos(shipX, shipY, ship.rotate)

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
    this.ctx.clearRect(0, 0, this.CW, this.CH)
  }
}

export default new WorldCanvas
