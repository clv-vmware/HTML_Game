(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        }
        else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        }
    },

    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        }
        else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        }
        else {
            element["on" + type] = null;
        }
    }
}

module.exports = EventUtil;
},{}],2:[function(require,module,exports){
var Utils = require('./utils');
var GRID_SIZE = 30;


var score = 0;
function Egg (ctx) {
    this.ctx = ctx;
    this.position = Utils.getRandomPosition(100, 400);
    this.eggSize = GRID_SIZE;

}

Egg.prototype.draw = function () {
    this.ctx.fillStyle = 'rgb(255,0,0)';
    this.ctx.beginPath();
    var img = new Image();
    img.src='./res/img/cross.png';
    this.ctx.drawImage(img, this.position.x, this.position.y, this.eggSize, this.eggSize);
    
    // this.ctx.fillRect(this.position.x, this.position.y, this.eggSize, this.eggSize);
    // console.log('in  egg  draw', this.position, this.eggSize);
    this.ctx.closePath();
    this.ctx.fill();
}

Egg.prototype.checkCollision = function (s) {
    var ifHit = Utils.detectCollision(this.position, s.headPos, this.eggSize);
    if (ifHit) {
        this.clear();
        this.position = Utils.getRandomPosition(100, 400);
        this.draw();
        score++;
        updateScore();
    }

    return ifHit;
}

Egg.prototype.clear = function () {
    this.ctx.clearRect(this.position.x, this.position.y, this.eggSize, this.eggSize);
}

function updateScore () {
    var scoreBtn = document.querySelector("#score");
    scoreBtn.innerHTML = score;
}

module.exports = Egg;
},{"./utils":6}],3:[function(require,module,exports){
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
},{"./EventUtil":1,"./egg":2,"./snake":5,"./vector":7}],4:[function(require,module,exports){
var GRID_SIZE = 30;
// var velocity = new Vector(0, 0);

var Snake = require('./snake');
var GameScene = require('./gameScene');
var EventUtil = require('./EventUtil');

// index page: select level
var slug = document.querySelector("#slug");
var worm = document.querySelector("#worm");
var python = document.querySelector("#python");


EventUtil.addHandler(slug, 'click', selectLevel);
EventUtil.addHandler(worm, 'click', selectLevel);
EventUtil.addHandler(python, 'click', selectLevel);


// decide snake' speed
var level;


function selectLevel (e) {
    level = e.target.id;
    runGameScene();
}

function runGameScene () {
    var index = document.querySelector("#index");
    index.style.display = "none";

    var gameScene = document.querySelector("#gameScene");
    gameScene.style.display = "inherit";
    GameScene.init();
}




},{"./EventUtil":1,"./gameScene":3,"./snake":5}],5:[function(require,module,exports){
var Utils = require('./utils');
var Vector = require('./vector');


var GRID_SIZE = 30;

function Snake () {
    this.init.apply(this, arguments);
};

Snake.prototype = {

    init: function (ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.headPos = Utils.getRandomPosition(100, 150);
        
        this.bodyPos = new Vector(this.headPos.x - GRID_SIZE, this.headPos.y);
        this.tailPos = new Vector(this.bodyPos.x - GRID_SIZE, this.bodyPos.y);
        console.log('INIT ', this.headPos, this.bodyPos, this.tailPos, 'this.width', this.width, this.height);
        this.snakeSize = GRID_SIZE;
        this.velocity;
    },

    draw: function () {
        Utils.drawCell(this.ctx, 'rgb(0,0,255)', this.headPos, GRID_SIZE); 
        Utils.drawCell(this.ctx, 'rgb(0,255,255)', this.bodyPos, GRID_SIZE);
        Utils.drawCell(this.ctx, 'rgb(222, 255, 0)', this.tailPos, GRID_SIZE);
    },

    getHeadPosition: function () {
        return this.headPos;
    },

    setVelocity : function (velocity) {
        this.velocity = velocity;
    },

    move : function () {
    
        var oldHeadPos = this.getHeadPosition();
        console.log('oldHeadPos', oldHeadPos);
        
        this.tailPos = new Vector(this.bodyPos.x, this.bodyPos.y);
        this.bodyPos = new Vector(this.headPos.x, this.headPos.y);
        
        this.headPos = oldHeadPos.add(this.velocity);
        console.log(this.headPos, this.tailPos);

        // BOUNDRY DETECT
        if (this.headPos.x + GRID_SIZE > this.width) {
            this.setVelocity(new Vector(-this.velocity.x, this.velocity.y));
            this.headPos.x = this.width - GRID_SIZE;
        }

        if (this.headPos.x < 0) {
            this.velocity = new Vector(-this.velocity.x, this.velocity.y);
            this.headPos.x = 0;
        }

        if (this.headPos.y + GRID_SIZE > this.height) {
            this.velocity = new Vector(this.velocity.x, -this.velocity.y);
            this.headPos.y = this.height - GRID_SIZE;
        }

        if (this.headPos.y < 0) {
            this.velocity = new Vector(this.velocity.x, -this.velocity.y);
            this.headPos.y = 0;
        }
    }
};

module.exports = Snake;


},{"./utils":6,"./vector":7}],6:[function(require,module,exports){
/**
 * generate random position based on grid
 */


var Vector = require('./vector');

var GRID_SIZE = 30;
var Utils = {
    GRID_SIZE : 30,
 getRandomPosition: function (fromNum, toNum) {
    var x = fromNum + Math.random() * (toNum - fromNum);
    var y = fromNum + Math.random() * (toNum - fromNum);

    var roundX = x - x % (GRID_SIZE + 0.1);
    var roundY = y - y % (GRID_SIZE + 0.1);
    return new Vector(roundX, roundY);
},

 detectCollision : function (pos1, pos2, gridSize) {

    var nResult = false;

    var rec1Left = pos1.x;
    var rec1Right = pos1.x + gridSize;
    var rec2Left = pos2.x;
    var rec2Right = pos2.x + gridSize;
    var rec1Top = pos1.y;
    var rec2Top = pos2.y;
    var rec1Bottom = pos1.y + gridSize;
    var rec2Bottom = pos2.y + gridSize;

    if (rec1Right > rec2Left && rec1Left < rec2Right) {
        if (rec1Bottom > rec2Top && rec1Top < rec2Bottom) {
            nResult = true;
        }
    }
    return nResult;
},

 drawCell : function(ctx, color, pos, size) {
     
    ctx.fillStyle = color;
    ctx.beginPath();
    // ctx.fillRect(pos.x, pos.y, size, size);
    this.drawRoundedRect (ctx, '#272727', '#272727', pos.x, pos.y, size, size, 10)
    // console.log('in draw', this.position);
    ctx.closePath();
    ctx.fill();
},

 drawRoundedRect : function (ctx, strokeStyle, fillStyle, cornerX, cornerY, width, height, cornerRadius) {
    // console.log('in drawCell', ctx, strokeStyle, fillStyle, cornerX, cornerY, width, height, cornerRadius);
    ctx.beginPath();
    this.roundedRect (ctx, cornerX, cornerY, width, height, cornerRadius);
    ctx.strokeStyle = strokeStyle;
    // ctx.shadowColor = "RGBA(127,127,127,1)";

    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 0;
    ctx.fillStyle = fillStyle;

    ctx.stroke();
    ctx.fill();
},

 roundedRect : function (ctx, cornerX, cornerY, width, height, cornerRadius) {
    if (width > 0) {
        ctx.moveTo(cornerX + cornerRadius, cornerY);
    }
    else {
        ctx.moveTo(cornerX - cornerRadius, cornerY);
    }

    ctx.arcTo(cornerX + width, cornerY, cornerX + width, cornerY + height, cornerRadius);
    ctx.arcTo(cornerX + width, cornerY + height, cornerX, cornerY + height, cornerRadius);
    ctx.arcTo(cornerX, cornerY + height, cornerX, cornerY, cornerRadius);

    if (width > 0) {
        ctx.arcTo(cornerX, cornerY, cornerX + cornerRadius, cornerY, cornerRadius);
    }
    else {
        ctx.arcTo(cornerX, cornerY, cornerX - cornerRadius, cornerY, cornerRadius);
    }
}

}

module.exports = Utils;



},{"./vector":7}],7:[function(require,module,exports){


function Vector (x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

Vector.prototype = {

    add : function (vector) {
        this.x += vector.x;
        this.y += vector.y;

        return new Vector(this.x, this.y);
    },

    minus : function (vector) {
        this.x -= vector.x;
        this.y -= vector.y;
    },

    getMagnitude : function () {
        return Math.sqrt(x * x + y * y);
    }
}

module.exports = Vector;
},{}]},{},[4]);
