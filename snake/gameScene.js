// DRAW bg
// var bg = new Background();
// bg.drawGrid(GRID_SIZE);

var Snake = require('./snake');
var Egg = require('./egg');
var EventUtil = require('./EventUtil');
var Vector = require('./vector');

var fps = 10;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;

var runningFlag = true;
var score = 0;

var absoluteV = 30;

var LEFT_ARROW = 37;
var UP_ARROW = 38;
var RIGHT_ARROW = 39;
var DOWN_ARROW = 40;

// GLOBAL VARIABLE
var canvas = document.querySelector('#gameScene canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;

// DRAW SNAKE
var snake = new Snake(ctx, width, height);
snake.setVelocity(new Vector(absoluteV, 0));
var obstacle = new Egg(ctx);
        
var gameScene = {

    init: function () {
        queue();
        initButtons();
        listenKeyBoardEvent();
    }
}

function initButtons () {
    var pauseBtn = document.querySelector("#pause");
    EventUtil.addHandler(pauseBtn, 'click', function () {
        runningFlag = false;
    });

    var runBtn = document.querySelector("#run");
    
    EventUtil.addHandler(runBtn, 'click', function () {
        runningFlag = true;
        queue();
    });
}

function listenKeyBoardEvent () {
    EventUtil.addHandler(window, 'keydown', function (event) {

        if (event.keyCode === UP_ARROW) {
            velocity = new Vector(0, -absoluteV);
            snake.setVelocity(velocity);
        }
        else if(event.keyCode === DOWN_ARROW) {
            velocity = new Vector(0, absoluteV);
            snake.setVelocity(velocity);
        }
        else if(event.keyCode === LEFT_ARROW) {
            velocity = new Vector(-absoluteV, 0);
            snake.setVelocity(velocity);
        }
        else if(event.keyCode === RIGHT_ARROW) {
            velocity = new Vector(absoluteV, 0);
            snake.setVelocity(velocity);
        } 
    });
};

function clear () {
    ctx.clearRect(0, 0, width, height);
};

function update () {
    snake.move();
};

function draw () {
    snake.draw();
    obstacle.draw();
    var ifHit = obstacle.checkCollision(snake);
};

function queue () {
    
    if (runningFlag) window.requestAnimationFrame(queue);
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
        then = now - (delta % interval);
        clear();
        update();
        draw();
    }
};

module.exports = gameScene;