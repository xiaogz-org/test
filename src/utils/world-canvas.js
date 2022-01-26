import * as canvasUtils from './canvas-utils'
class WorldCanvas {
  constructor() {
    this._map = null
    this.ctx = null;
    this.canvas = null
    this.shipList = {}
  }
  init(map) {
    this._map = map
    let { x: width, y: height } = map.getSize();
    this.canvas = document.createElement('canvas')
    this.canvas.className = "world-canvas"
    this.canvas.width = width
    this.canvas.height = height
    document.querySelector('.leaflet-map-pane').append(this.canvas)
    this.ctx = this.canvas.getContext('2d')
  }
  //绘制船舶
  drawShip() {
    /* const ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill(); */
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
      "rotate": -1,
      /* "shipX": 1374,
      "shipY": 557,
      "areaPos": [{
          "x": 1373.8080235291898,
          "y": 546.0016753532797
        },
        {
          "x": 1381.1909103369048,
          "y": 567.8761578016594
        },
        {
          "x": 1367.1930426047154,
          "y": 568.1204914917813
        }
      ] */
    }
    
    const { lat, lng } = ship
    const { shipX, shipY } = canvasUtils.getShipXY(lat, lng, this._map)
    
    const areaPos = canvasUtils.getAreaPos(shipX, shipY, ship.rotate)

    ship = {
      ...ship,
      shipX,
      shipY,
      areaPos
    }
    console.log(ship);
    const ctx = this.ctx
    if (!ctx) return

    //const { areaPos } = ship
    ctx.fillStyle = this.isDarkTheme && fillStyle == '#faf763' ? '#202200' : fillStyle
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
  }
  //重置canvas
  resetCanvas() {
    const parentDom = document.querySelector('.leaflet-map-pane')
    const offsetList = []
    console.log(parentDom.style.transform);
    parentDom.style.transform.replace(/[-.\d]+(?=px)/g, searchVal => {
      offsetList.push(+searchVal)
    })
    console.log(offsetList);
    const [x, y, z] = offsetList
    this.canvas.style.transform = `translate3d(${-x}px, ${-y}px, ${-z}px)`
  }
  //
  resetShip() {

  }
}

export default new WorldCanvas
