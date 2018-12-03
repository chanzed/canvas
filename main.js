var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var eraserEnabled = false
var lineWidth = 5;
autoSetCanvasSize(canvas)
listenToUser(canvas)

/******************************************************** */

function listenToUser(canvas) {
    var using = false
    var lastPoint = { x: undefined, y: undefined }

    //特性检测
    if (document.body.ontouchstart !== undefined) {
        canvas.ontouchstart = function (a) {
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 15, y - 15, 30, 30)
            } else {
                painting = true
                lastPoint = { x: x, y: y }
                drawCircle(x, y, 2)
            }
    
        }
    
        //移动鼠标
        canvas.ontouchmove = function (a) {
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            if (using) {
                if (eraserEnabled) {
                    context.clearRect(x - 15, y - 15, 30, 30)
                } else {
                    var newPoint = { x: x, y: y }
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint
                }
            }
        }
        //松开鼠标
        canvas.ontouchend = function (a) {
            using = false
        }
    } else {
        canvas.onmousedown = function (a) {
            var x = a.clientX
            var y = a.clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 15, y - 15, 30, 30)
            } else {
                painting = true
                lastPoint = { x: x, y: y }
                drawCircle(x, y, 2)
            }
    
        }
    
        //移动鼠标
        canvas.onmousemove = function (a) {
            var x = a.clientX
            var y = a.clientY
            if (using) {
                if (eraserEnabled) {
                    context.clearRect(x - 15, y - 15, 30, 30)
                } else {
                    var newPoint = { x: x, y: y }
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint
                }
            }
        }
        //松开鼠标
        canvas.onmouseup = function (a) {
            using = false
        }
    }
    
}

//按下鼠标


function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.lineWidth = lineWidth
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}

function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
    context.closePath()
}

function setCanvasSize(canvas) {
    var pageWidth = document.documentElement.clientWidth
    var pageHight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHight
}




function autoSetCanvasSize(canvas) {
    setCanvasSize(canvas)
    window.onresize = function () {
        setCanvasSize(canvas)
    }
}

pen.onclick = function(){
    console.log('点击pen')
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function(){
    console.log('点击eraser')
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}

red.onclick = function() {
    context.strokeStyle = 'red'
    context.fillStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
green.onclick = function() {
    context.strokeStyle = 'green'
    context.fillStyle = 'green'
    green.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
}
blue.onclick = function() {
    context.strokeStyle = 'blue'
    context.fillStyle = 'blue'
    blue.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
}

thin.onclick = function() {
    lineWidth = 5;
}

thick.onclick = function() {
    lineWidth = 8;
}

clear.onclick = function() {
    context.clearRect(0, 0, canvas.width, canvas.height)
}

download.onclick = function() {
    var url = canvas.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url;
    a.download = '我的画儿'
    a.target = '_blank'
    a.click()

}