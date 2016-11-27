/**
 * Tetromino类
 */

var Constants = require('./Constants');
var Vector = require('./Vector');
var Square = require('./Square');
var PaintUtils = require('./utils/PaintUtils');
var PrintUtils = require('./utils/PrintUtils');
var MathUtils = require('./utils/MathUtils');
var Utils = require('./utils/Utils');

function Tetromino (type) {
    this.type = type || Utils.getRandomElement(Constants.TETROMINO_TYPES);
    // Tetromino pos  是一个vector list!
    var randPos = Utils.getRandomNum(2, 8);
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

    batchMove: function (v) {
        for (var i = 0;i < this.pos.length; i++) {
            
            this.pos[i].pos.add(v);
            // console.log('batch', this.pos[i]);
        }
    },

    move: function (collideMap) {
        var pos = this.getNextPos();
        // var p = MathUtils.convertVectorList(pos);
        // PrintUtils.printColInMatrix(p, 0);

        // TODO : 向左右移动时的碰撞检测！！！
        
        for (var j = 0;j < pos.length; j++) {

            if (pos[j].x + 1 > Constants.GAMESCENE_WIDTH) {
                console.log('IN > WIDTH CASE', pos);
                this.setVelocity(new Vector(0, 0));
                // this.batchMove(new Vector(-1, 0));
                break;
            }

            if (pos[j].x < 0) {
                console.log('IN < 0 CASE', pos);
                this.setVelocity(new Vector(0, 0));
                // this.pos.x = 0;
                this.batchMove(new Vector(1, 0));
                break;
            }

            // if (this.pos.y + 1 > Constants.GAMESCENE_HEIGHT) {
            //     this.velocity = new Vector(this.velocity.x, -this.velocity.y);
            //     this.pos.y = Constants.GAMESCENE_HEIGHT - 1;
            //     break;
            // }

            if (this.pos.y < 0) {
                this.velocity = new Vector(this.velocity.x, -this.velocity.y);
                this.pos.y = 0;
                break;
            }
        }

        for (var i = 0;i < this.pos.length; i++) {
            this.pos[i].move(this.velocity);
        }
        
        return this.pos;
    },

    getNextPos: function () {
        // console.log('in nextpos', this.velocity);
        var list = [];
        var pos = this.pos;
        for (var i = 0;i < pos.length; i++) {
            list.push(MathUtils.vectorAdd(pos[i].getPosition(), this.velocity));
        }
        return list;
    },

    hitBoundry: function () {
        var list = this.pos;
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
        var list = [];
        var pos = this.pos;
        for (var i = 0;i < pos.length; i++) {
            list.push(pos[i].getPosition());
        }
        return list;
    },

    getColor: function () {
        return this.color;
    },

    setVelocity: function (v) {
        this.velocity = v;
    }
};

module.exports = Tetromino;