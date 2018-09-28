var cv = document.getElementById('xxx')
var ctx = cv.getContext('2d')

autoSetCanvasSize(cv)
listenToMouse(cv)
var eraserEnable = false
var eraser = document.getElementById('eraser')
eraser.onclick = function () {
  eraserEnable = true
  action.className = 'action x'
}

brush.onclick = function () {
  eraserEnable = false
  action.className = 'action'
}

/************************** */

function listenToMouse(canvas) {
  var using = false
  var lastPoint = {
    'x': undefined,
    'y': undefined
  }

  canvas.onmousedown = function (yy) {
    var x = yy.clientX
    var y = yy.clientY
    if (eraserEnable) {
      using = true
      ctx.clearRect(x - 5, y - 5, 10, 10)
    } else {
      using = true
      lastPoint = {
        'x': x,
        'y': y
      }
    }
  }

  canvas.onmousemove = function (yy) {
    var x = yy.clientX
    var y = yy.clientY
    if (!using) { return }
    if (eraserEnable) {
      ctx.clearRect(x - 10, y - 10, 20, 20)
    } else {
      drawLine(lastPoint['x'], lastPoint['y'], x, y)
      lastPoint['x'] = x
      lastPoint['y'] = y
    }
  }

  canvas.onmouseup = function () {
    using = false
  }
}

function setCanvasSize(cv) {
  var pageWidth = document.documentElement.clientWidth
  var pageHeight = document.documentElement.clientHeight
  cv.width = pageWidth
  cv.height = pageHeight
}

function drawLine(x1, y1, x2, y2) {
  ctx.strokeStyle = 'green'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
  ctx.closePath()

}



function autoSetCanvasSize(canvas) {
  setCanvasSize(canvas)
  window.onresize = function () {
    setCanvasSize(canvas)
  }
}