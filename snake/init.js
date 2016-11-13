// DRAW bg
// var bg = new Background();
// bg.drawGrid(GRID_SIZE);

// DRAW SNAKE
console.log(document);
var s = new Snake();
s.setVelocity(velocity);


var obstacle = new Egg();


// set V

window.addEventListener('keydown', function (event) {
    // event.stopPropagation();
    // event.preventDefault();
    console.log('hahah', event, canvas);

    if (event.key === 'ArrowUp') {
        velocity = new Vector(0, -2);
        s.setVelocity(velocity);
    }
    else if(event.key === 'ArrowDown') {
        velocity = new Vector(0, 2);
        s.setVelocity(velocity);
    }
    else if(event.key === 'ArrowLeft') {
        velocity = new Vector(-2, 0);
        s.setVelocity(velocity);
    }
    else if(event.key === 'ArrowRight') {
        velocity = new Vector(2, 0);
        s.setVelocity(velocity);
    } 
});


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
    obstacle.draw();
}

function queue () {
    // window.requestAnimationFrame(loop);
}

loop();