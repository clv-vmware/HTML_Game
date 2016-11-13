var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var particles = [];

var emitters = [new Emitter(new Vector(100, 230), Vector.fromAngle(0, 2), Math.PI / 6), new Emitter(new Vector(100, 430), Vector.fromAngle(0, 2))];
var maxParticles = 20000;
var emissionRate = 4;



////// loop

function loop () {
    clear();
    update();
    draw();
    queue();
}

function clear () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function queue () {
    window.requestAnimationFrame(loop);
}

function update () {
    addNewParticles();
    plotParticles(canvas.width, canvas.height);
}
function draw () {// console.log('in draw', particles)
    drawParticles();
}




loop();



