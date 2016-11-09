// DRAW bg
// var bg = new Background();
// bg.drawGrid(GRID_SIZE);

// DRAW SNAKE
var s = new Snake();
s.draw();

s.setVelocity(new Vector(2, 2));
function loop () {
    clear();
    update();
    draw();
    queue();
}

function clear() {
    ctx.clearRect(0, 0, width, height);
}
function update() {
    
    s.move();
}

function draw () {
    s.draw();
}

function queue () {
    window.requestAnimationFrame(loop);
}

loop();