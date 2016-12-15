(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var EventUtils = require('./utils/EventUtils');
var PaintUtils = require('./utils/paintUtils');
var PrintUtils = require('./utils/PrintUtils');
var MathUtils = require('./utils/MathUtils');
var Constants = require('./constants/constants');

// global vars
var canvas = document.querySelector("#gameScene");
var ctx = canvas.getContext('2d');

function GameScene () {
    this.bricksMap = initBricksMap();
    this.drawBricks();
}

GameScene.prototype.draw = function () {

};

GameScene.prototype.update = function () {
    
};


// 5 * 10 COLOR_BAR
GameScene.prototype.drawBricks = function () {
    for (var i = 0;i < 5;i++) {
        for (var j = 0;j < 10;j++) {
            if (this.bricksMap[i][j] > 0) {
                var pos = new Vector((i + 1) * Constants.BRICK_HEIGHT, (j + 1) * Constants.BRICK_WIDTH);
                PaintUtils.drawRect(Constants.COLOR_BAR[i], pos, width, height);
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
}

},{"./constants/constants":2,"./utils/EventUtils":4,"./utils/MathUtils":5,"./utils/PrintUtils":6,"./utils/paintUtils":7}],2:[function(require,module,exports){
var Constants = {
    BRICK_WIDTH: 30,
    BRICK_HEIGHT: 10,

    COLOR_BAR: ['red', 'yellow', 'green', '#03fcfb', 'blue']
};

module.exports = Constants;
},{}],3:[function(require,module,exports){
// game entry
var GameScene = require('./GameScene');

var gameScene = new GameScene();
gameScene.init();


},{"./GameScene":1}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){

},{}],6:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],7:[function(require,module,exports){
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
},{}]},{},[3]);
