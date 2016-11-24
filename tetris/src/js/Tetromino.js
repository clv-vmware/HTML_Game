/**
 * Tetromino类
 */

var Constants = require('./Constants');
var Vector = require('./Vector');
var Square = require('./Square');
var PaintUtils = require('./utils/PaintUtils');
var MathUtils = require('./utils/MathUtils');
var Utils = require('./utils/Utils');

function Tetromino (pos, type) {
    this.type = type || Utils.getRandomElement(Constants.TETROMINO_TYPES);
    
    this.pos = pos;
    this.squareList = this.getSquareListByType(this.type, pos);
    this.color = PaintUtils.getRandomColor();
    this.velocity = new Vector(0, 0);
}

Tetromino.prototype = {
    draw: function (ctx, color) {
        var list = this.squareList;
        for (var i = 0;i < list.length; i++) {
            list[i].draw(ctx);
        }

    },

    move: function () {

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
    }



};

module.exports = Tetromino;