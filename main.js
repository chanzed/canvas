cv = document.getElementById('xxx')
setCanvasSize(cv)
var using = false
var lastPoint = {
  'x': undefined,
  'y': undefined
}

cv.onmousedown = function(yy){
  using = true
  lastPoint['x'] = yy.clientX
  lastPoint['y'] = yy.clientY
}

cv.onmousemove = function(yy){
  if(using){
  var x = yy.clientX
  var y = yy.clientY
  var ctx = cv.getContext('2d')
  ctx.beginPath()
  ctx.moveTo(lastPoint['x'], lastPoint['y'])
  ctx.lineTo(x, y)
  ctx.stroke()
  lastPoint['x'] = x
  lastPoint['y'] = y
  }
}

cv.onmouseup = function(){
  using = false
}





window.onresize = function(){
  setCanvasSize(cv)
}
function setCanvasSize(cv){
  var pageWidth = document.documentElement.clientWidth
  var pageHeight = document.documentElement.clientHeight
  cv.width = pageWidth
  cv.height = pageHeight 
}