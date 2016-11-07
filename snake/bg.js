// GLOBAL VARIABLE
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var GRID_SIZE = 30;


function Background () {

}

Background.prototype.drawGrid = function (gridSize) {
    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0;i < width; i += gridSize) {
        drawLine(new Point(i, 0), new Point(i, height));
        

    }
    for (var i = 0;i < width; i += gridSize) {
        drawLine(new Point(0, i), new Point(width, i));
    }


}

function drawLine (startPoint, endPoint) {
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.lineWidth = 0.1;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
}




