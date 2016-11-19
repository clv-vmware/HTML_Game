(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Utils = require('./utils');
var vector = require('./vector');


var Vector = vector.Vector;
var GRID_SIZE = 30;

var Snake = {

    
    Snake: function (ctx) {
        this.ctx = ctx;
        this.width = ctx.canvas.clientWidth;
        this.height = ctx.canvas.clientHeight;
        this.headPos = Utils.getRandomPosition(10, 100);
        
        this.bodyPos = new Vector(this.headPos.x - GRID_SIZE, this.headPos.y);
        this.tailPos = new Vector(this.bodyPos.x - GRID_SIZE, this.bodyPos.y);

        this.snakeSize = GRID_SIZE;
        this.velocity;

        this.draw = function () {

        Utils.drawCell(this.ctx, 'rgb(0,0,255)', this.headPos, GRID_SIZE); 
        Utils.drawCell(this.ctx, 'rgb(0,255,255)', this.bodyPos, GRID_SIZE);
        Utils.drawCell(this.ctx, 'rgb(222, 255, 0)', this.tailPos, GRID_SIZE);

    }


    },

    getHeadPosition: function () {
        return this.headPos;
    },

    setVelocity : function (velocity) {
        this.velocity = velocity;
    },

    move : function () {
    
        var oldHeadPos = this.getHeadPosition();
        
        this.tailPos = new Vector(this.bodyPos.x, this.bodyPos.y);
        this.bodyPos = new Vector(this.headPos.x, this.headPos.y);
        
        this.headPos = oldHeadPos.add.call(oldHeadPos, this.velocity);

        // BOUNDRY DETECT
        if (this.headPos.x + GRID_SIZE > width) {
            this.setVelocity(new Vector(-this.velocity.x, this.velocity.y));
            this.headPos.x = width - GRID_SIZE;
        }

        if (this.headPos.x < 0) {
            this.velocity = new Vector(-this.velocity.x, this.velocity.y);
            this.headPos.x = 0;
        }

        if (this.headPos.y + GRID_SIZE > height) {
            this.velocity = new Vector(this.velocity.x, -this.velocity.y);
            this.headPos.y = height - GRID_SIZE;
        }

        if (this.headPos.y < 0) {
            this.velocity = new Vector(this.velocity.x, -this.velocity.y);
            this.headPos.y = 0;
        }
    },

    

}

module.exports = Snake;


},{"./utils":3,"./vector":4}],2:[function(require,module,exports){
var GRID_SIZE = 30;

var snake = require('./snake');




var canvas = document.querySelector('#gameScene');
var ctx = canvas.getContext('2d');

var s = new snake.Snake(ctx);
console.log(s.draw);

s.draw();

},{"./snake":1}],3:[function(require,module,exports){
/**
 * generate random position based on grid
 */


var vector = require('./vector');

var GRID_SIZE = 30;
var Utils = {
    GRID_SIZE : 30,
 getRandomPosition: function (fromNum, toNum) {
    var x = fromNum + Math.random() * (toNum - fromNum);
    var y = fromNum + Math.random() * (toNum - fromNum);

    var roundX = x - x % (GRID_SIZE + 0.1);
    var roundY = y - y % (GRID_SIZE + 0.1);
    return new vector.Vector(roundX, roundY);
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
     console.log('in drawCell', ctx, strokeStyle, fillStyle, cornerX, cornerY, width, height, cornerRadius);
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



},{"./vector":4}],4:[function(require,module,exports){
var vector = {
 Vector : function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
},

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

module.exports = vector;
},{}]},{},[2]);
