/**
 * Tetromino类
 */

var Constants = require('./Constants');
var Vector = require('./Vector');
var Square = require('./Square');
var PaintUtils = require('./utils/PaintUtils');
var MathUtils = require('./utils/MathUtils');
var Utils = require('./utils/Utils');

function Tetromino (type) {
    this.type = type || Utils.getRandomElement(Constants.TETROMINO_TYPES);
    // Tetromino pos  是一个vector list!
    var randPos = Utils.getRandomNum(0, 16);
    this.pos = this.getSquareListByType(this.type, new Vector(randPos, 0));
    this.color = PaintUtils.getRandomColor();
    this.velocity = new Vector(0, 0);
}

Tetromino.prototype = {
    draw: function (ctx, color) {
        var pos = this.pos;
        for (var i = 0;i < pos.length; i++) {
            pos[i].draw(ctx, this.color);
        }
    },

    move: function () {
        var pos = this.pos;
        for (var i = 0;i < pos.length; i++) {
            pos[i].move();
        }

        // BOUNTRY DETECT
        if (this.hitBoundry()) {
            
            this.setVelocity(-this.velocity);
            console.log('hit!', this.velocity);
        }
    },

    getNextPos: function () {
        var list = [];
        var pos = this.pos;
        for (var i = 0;i < pos.length; i++) {
            list.push(MathUtils.vectorAdd(pos[i].getPosition(), this.velocity));
        }
        return list;
    },

    hitBoundry: function () {
        var list = this.squareList;
        for (var i = 0;i < list.length; i++) {
            if (list[i].hitBoundry()) return true;
        }

        return false;
    },

    // 组成不同形状 tetromino 的square list 
    getSquareListByType: function (type, pos) {
        var list = [];
        switch (type) {
            case 'O':
                list.push(new Square(pos));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_RIGHT)));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_DOWN)));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_RIGHT, Constants.V_DOWN)));
                break;

            case 'Z':
                list.push(new Square(pos));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_RIGHT)));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_DOWN, Constants.V_RIGHT)));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_RIGHT, Constants.V_DOWN, Constants.V_RIGHT)));
                break;

            case 'T':
                list.push(new Square(pos));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_RIGHT)));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_RIGHT, Constants.V_RIGHT)));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_RIGHT, Constants.V_DOWN)));
                break;

            case 'L':
                list.push(new Square(pos));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_DOWN)));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_DOWN, Constants.V_DOWN)));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_DOWN, Constants.V_DOWN, Constants.V_DOWN)));
                break;

            case 'S':
                list.push(new Square(pos));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_DOWN)));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_RIGHT, Constants.V_DOWN)));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_RIGHT, Constants.V_DOWN, Constants.V_DOWN)));
                break;
            default:
                break;
        }

        return list;
    },

    getPosition: function () {
        return this.pos;
    },

    getColor: function () {
        return this.color;
    },

    setVelocity: function (v) {
        this.velocity = v;
    }
};

module.exports = Tetromino;