(function () {

var can = document.querySelector("#slugAnimation");
var width = can.width;
var height = can.height;


var slugCtx = can.getContext('2d');

var snakeAnimation = new Snake(slugCtx);
snakeAnimation.setVelocity(new Vector(0.1, 0.1));


function clear() {
    slugCtx.clearRect(0, 0, width, height);
}

function update() {
    snakeAnimation.move();
}

function draw () {
    snakeAnimation.draw();
    
}

function loop () {
    window.requestAnimationFrame(loop);
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
        then = now - (delta % interval);
        clear();
        update();
        draw();
    }
}

loop();

})();
