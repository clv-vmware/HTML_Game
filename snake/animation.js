var can = document.querySelector("#slugAnimation");
var slugCtx = can.getContext('2d');

var snakeAnimation = new Snake();
snakeAnimation.setVelocity(new Vector(0.1, 0.1));



function clear() {
    ctx.clearRect(0, 0, width, height);
}

function update() {
    snakeAnimation.move();
}

function draw () {
    snakeAnimation.draw();
    obstacle.draw(ctx);
    var ifHit = obstacle.checkCollision(ctx);
}

function loop () {
    if (runningFlag) window.requestAnimationFrame(loop);
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
