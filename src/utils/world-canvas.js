import * as canvasUtils from './canvas-utils'
class WorldCanvas {
  constructor() {
    this.ctx = null;
    this.canvas = null
  }
  init(map) {
    let {x: width, y: height} = map.getSize();
    this.canvas = document.createElement('canvas')
    this.canvas.className = "world-canvas"
    this.canvas.width = width
    this.canvas.height = height
    document.querySelector('.leaflet-map-pane').append(this.canvas)
    this.ctx = this.canvas.getContext('2d')
  }
  //绘制船舶
  drawShip() {
    let fillStyle = '#faf763'
    let ship = {
      "mmsi": 561035,
      "lat": 24.317671666666666,
      "lon": 70901484,
      "name": "800333 80",
      "customName": null,
      "heading": -1,
      "course": 156.3,
      "speed": 1.5,
      "posTime": 1642534927,
      "status": 0,
      "customStatus": null,
      "shipType": 5,
      "shipTypeSpec": null,
      "customShipType": null,
      "breadth": 0,
      "length": 0,
      "sourceId": "86",
      "safeRadius": null,
      "lng": 118.16914,
      "rotate": 156.3,
      "shipX": 1210,
      "shipY": 1003,
      "areaPos": [
          {
              "x": 1214.4214255432155,
              "y": 1013.0722885267352
          },
          {
              "x": 1199.1689363034075,
              "y": 995.7413459098566
          },
          {
              "x": 1211.9882126101613,
              "y": 990.114077036673
          }
      ],
      "searchFlag": false
    }
    const ctx = this.ctx
    if (!ctx) return

    const { shipX, shipY, rotate, areaPos } = ship
    ctx.fillStyle =
      this.isDarkTheme && fillStyle == '#faf763' ? '#202200' : fillStyle
    ctx.strokeStyle = this.isDarkTheme ? '#FAF763' : '#000'
    ctx.lineWidth = ship.sourceId == '28' ? 2 : 1

    ctx.beginPath()
    ctx.moveTo(areaPos[0].x, areaPos[0].y)
    ctx.lineTo(areaPos[1].x, areaPos[1].y)
    ctx.lineTo(areaPos[2].x, areaPos[2].y)
    ctx.lineTo(areaPos[0].x, areaPos[0].y)

    ctx.fill()
    ctx.stroke()
    ctx.closePath()

    ctx.save()
    ctx.translate(shipX, shipY)
    ctx.rotate((rotate * Math.PI) / 180)

    if (ship.speed > 0.1) {
      ctx.beginPath()
      ctx.moveTo(0, -canvasUtils.SHIP_HEIGHT_SIZE / 2 + 4)
      ctx.lineTo(0, -canvasUtils.SHIP_HEIGHT_SIZE - 4)
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.closePath()
    }

    ctx.restore()
    ctx.lineWidth = 1

    if (fillStyle != '#f00') {
      this.shipBoundceList.push({
        minX: shipX - 11,
        maxX: shipX + 11,
        minY: shipY - 8,
        maxY: shipY + 8
      })
    } else {
      this.systemShipBoundceList.push({
        minX: shipX - 11,
        maxX: shipX + 11,
        minY: shipY - 8,
        maxY: shipY + 8
      })
    }
  }
}

export default new WorldCanvas