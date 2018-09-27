var cv = document.getElementById('xxx')
var ctx = cv.getContext('2d')
setCanvasSize(cv)
window.onresize = function () {
  setCanvasSize(cv)
}


var using = false
var lastPoint = {
  'x': undefined,
  'y': undefined
}

cv.onmousedown = function (yy) {
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

cv.onmousemove = function (yy) {
  var x = yy.clientX
  var y = yy.clientY
  if (eraserEnable) {
    if (using) {
      ctx.clearRect(x - 5, y - 5, 10, 10)
    }
  } else {
    if (using) {
      drawLine(lastPoint['x'], lastPoint['y'], x, y)
    }
  }
}

cv.onmouseup = function () {
  using = false
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
  lastPoint['x'] = x2
  lastPoint['y'] = y2
}

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