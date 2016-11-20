(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Constants = {
    SQUARE_SIZE: 30,
    

};

module.exports = Constants;
},{}],2:[function(require,module,exports){
/**
 * 单个方块类
 */

var Constants = require('./Constants');
var PaintUtils = require('./utils/PaintUtils');


function Square (pos) {
    this.pos = pos;
    this.size = Constants.SQUARE_SIZE;
}

Square.prototype = {

    draw : function (ctx) {
        PaintUtils.drawCell(ctx, '#ccc', this.pos, this.size);
    },
}

module.exports = Square;
},{"./Constants":1,"./utils/PaintUtils":5}],3:[function(require,module,exports){
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
    },

    getMagnitude : function () {
        return Math.sqrt(x * x + y * y);
    }
}

module.exports = Vector;
},{}],4:[function(require,module,exports){
var Square = require('./Square');
var Vector = require('./Vector');


var canvas = document.querySelector('#gameScene');
var ctx = canvas.getContext('2d');
var square = new Square(new Vector(1, 2));
square.draw(ctx);
},{"./Square":2,"./Vector":3}],5:[function(require,module,exports){
/**
 * 
 */

var Vector = require('../Vector');
var Constants = require('../Constants');


var PaintUtils = {
    getRandomPosition: function (fromNum, toNum) {
        var x = fromNum + Math.random() * (toNum - fromNum);
        var y = fromNum + Math.random() * (toNum - fromNum);

        var roundX = x - x % (Constants.SQUARE_SIZE);
        var roundY = y - y % (Constants.SQUARE_SIZE);
        return new Vector(roundX, roundY);
    },

    drawCell: function(ctx, color, pos, size) {
        
        ctx.fillStyle = color || '#ccc';
        ctx.beginPath();
        // ctx.fillRect(pos.x, pos.y, size, size);
        this.drawRoundedRect (ctx, '#272727', '#272727', pos.x, pos.y, size, size, 5)
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

};

module.exports = PaintUtils;
},{"../Constants":1,"../Vector":3}]},{},[4]);
