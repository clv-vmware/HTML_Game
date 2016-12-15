(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var EventUtils = require('./utils/EventUtils');
var PaintUtils = require('./utils/paintUtils');
var PrintUtils = require('./utils/PrintUtils');
var MathUtils = require('./utils/MathUtils');
var Constants = require('./constants/constants');
var Ball = require('./entity/ball');
var Vector = require('./entity/vector');


// global vars
var canvas = document.querySelector("#gameScene");
var ctx = canvas.getContext('2d');
var testBall = new Ball(new Vector(20, 20), new Vector(1, 1));

function GameScene () {
    this.bricksMap = initBricksMap();
    this.drawBricks();
}

GameScene.prototype.draw = function () {
    testBall.draw();
};

GameScene.prototype.update = function () {
    testBall.move();
};


// 5 * 10 COLOR_BAR
GameScene.prototype.drawBricks = function () {
    for (var i = 0;i < 5;i++) {
        
        for (var j = 0;j < 10;j++) {
            if (this.bricksMap[i][j] > 0) {
                var pos = new Vector((j + 1) * (Constants.BRICK_WIDTH + Constants.BRICK_MARGIN), (i + 1) * (Constants.BRICK_HEIGHT + Constants.BRICK_MARGIN));
                PaintUtils.drawRect(ctx, Constants.COLOR_BAR[i], pos, Constants.BRICK_WIDTH, Constants.BRICK_HEIGHT);
            }
        }
    }
}


// UTILS FUNC

// 5 * 10 matrix
function initBricksMap () {
    var matrix = new Array(5);
    for (var i = 0;i < 5;i++) {
        matrix[i] = new Array(10);
        for (var j = 0;j < 10;j++) {
            matrix[i][j] = 1;
        }
    }
    return matrix;
}

module.exports = GameScene;

},{"./constants/constants":2,"./entity/ball":3,"./entity/vector":4,"./utils/EventUtils":6,"./utils/MathUtils":7,"./utils/PrintUtils":9,"./utils/paintUtils":10}],2:[function(require,module,exports){
var Constants = {
    BRICK_WIDTH: 30,
    BRICK_HEIGHT: 10,
    BRICK_MARGIN: 5,

    COLOR_BAR: ['red', 'yellow', 'green', '#03fcfb', 'blue'],

    BALL_COLOR: 'cornflowerblue',
    BALL_RADIUS: 30, 
};

module.exports = Constants;
},{}],3:[function(require,module,exports){
/**
 * BALL CLASS
 */

var Vector = require('../entity/vector');
var PaintUtils = require('../utils/PaintUtils');
var Constants = require('../constants/constants');

function Ball (pos, velocity) {
    this.pos = new Vector(0, 0) || pos;
    this.velocity = new Vector(0, 0) || velocity;
}
// collision !!

function draw () {
    PaintUtils.drawCircle(ctx, Constants.BALL_COLOR, this.pos, Constants.BALL_RADIUS);
};

function move () {
    this.pos = this.pos.add(this.velocity);
};

module.exports = Ball;

},{"../constants/constants":2,"../entity/vector":4,"../utils/PaintUtils":8}],4:[function(require,module,exports){
/**
 * 
 */
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
        return new Vector(this.x, this.y);
    },

    getMagnitude : function () {
        return Math.sqrt(x * x + y * y);
    }
}

module.exports = Vector;
},{}],5:[function(require,module,exports){
// game entry
var GameScene = require('./GameScene');

var gameScene = new GameScene();
gameScene.init();


},{"./GameScene":1}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){

},{}],8:[function(require,module,exports){
let PaintUtil = {
    drawRect: function (ctx, color, pos, width, height) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(pos.x, pos.y, width, height);
        ctx.closePath();
        ctx.fill();
    },

    drawCircle: function (ctx, color, pos, r) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, r, 0, Math.PI * 2, true);
        ctx.fill();
    }
}

module.exports = PaintUtil;
},{}],9:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7}],10:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}]},{},[5]);
