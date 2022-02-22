import * as canvasUtils from './canvas-utils'
import WorldRequest from './world-request'

class WorldCanvas {
  constructor() {
    this.ctx = null;
    this.canvas = null
    this._map = null
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
    this.drawRect()
    this.canvas.addEventListener('mousemove', (e) => {
      let x = e.pageX, y = e.pageY
      //重新绘制canvas上的路径
      //this.clear()
      let pointer = false
      for(let val of WorldRequest.shipMaps) {
        this.drawShip(val)
        if(this.ctx.isPointInPath(x, y) === true) {
          pointer = true
          this.canvas.style.cursor = 'pointer'
        }
      }
      //因为是给整个canvas设置cursor, 所以放循环外面，否则就会被元素重置， 除非刚好是最后一个
      if(!pointer) {
        this.canvas.style.cursor = ''
      }
    })
    this.canvas.addEventListener('click', (e) => {
      let x = e.pageX, y = e.pageY
      //重新绘制canvas上的路径
      //this.clear()
      for(let val of WorldRequest.shipMaps) {
        this.drawShip(val)
        if(this.ctx.isPointInPath(x, y)) {
          console.log(val);
          WorldRequest.clickEventTrigger(val)
          //绘制红框
          this.drawRedBox(val)
        }
      }
    })
  }
  drawRect() {
    let ctx = this.ctx
    ctx.fillStyle = "#3b81f0"
    ctx.fillRect(100, 100, 500, 500)
    ctx.save()
    ctx.fillStyle = "#f00"
    ctx.translate(350, 350)
    ctx.rotate(45)
    ctx.fillRect(-250, -250, 500, 500)
    
  }
  //绘制船舶
  drawShip(ship) {
    let fillStyle = '#faf763'
    const ctx = this.ctx
    if (!ctx) return

    const { areaPos } = ship

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
  //绘制红框
  drawRedBox(shipData) {
    const ctx = this.ctx
    if (!ctx) return

    const { shipX, shipY, rotate } = shipData
    ctx.save()
    ctx.translate(shipX, shipY)
    ctx.rotate((rotate / 180) * Math.PI)
    const xDis = 14
    const yDis = 10

    ctx.strokeStyle = '#f00'
    ctx.lineWidth = 2
    ctx.beginPath()

    // ctx.moveTo(-20, -10)
    // ctx.lineTo(-20, -20)
    // ctx.lineTo(-10, -20)

    // ctx.moveTo(-20, 10)
    // ctx.lineTo(-20, 20)
    // ctx.lineTo(-10, 20)

    // ctx.moveTo(10, -20)
    // ctx.lineTo(20, -20)
    // ctx.lineTo(20, -10)

    // ctx.moveTo(20, 10)
    // ctx.lineTo(20, 20)
    // ctx.lineTo(10, 20)
    ctx.moveTo(-15, -5)
    ctx.lineTo(-15, -15)
    ctx.lineTo(-5, -15)

    ctx.moveTo(-15, 5)
    ctx.lineTo(-15, 15)
    ctx.lineTo(-5, 15)

    ctx.moveTo(5, -15)
    ctx.lineTo(15, -15)
    ctx.lineTo(15, -5)

    ctx.moveTo(15, 5)
    ctx.lineTo(15, 15)
    ctx.lineTo(5, 15)

    ctx.stroke()
    ctx.closePath()

    ctx.restore()
  }
  //重置画布
  resetCanvas() {
    const parentDom = document.querySelector('.leaflet-map-pane')

    const offsetList = []
    parentDom.style.transform.replace(/[-.\d]+(?=px)/g, searchVal => {
      offsetList.push(+searchVal)
    })

    const [x, y, z] = offsetList
    this.canvas.style.transform = `translate3d(${-x}px, ${-y}px, ${-z}px)`
  }
  clear() {
    this.ctx.clearRect(0, 0, this.CW, this.CH)
  }
}

export default new WorldCanvas()
