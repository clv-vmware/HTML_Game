/**
 * 单个方块类
 */

var Constants = require('./Constants');
var Vector = require('./Vector');
var PaintUtils = require('./utils/PaintUtils');


function Square (pos) {
    this.pos = pos;
    this.color = PaintUtils.getRandomColor();
    this.velocity = new Vector(0, 0);
    this.size = Constants.SQUARE_SIZE;
}

Square.prototype = {

    draw : function (ctx, color) {
        PaintUtils.drawCell(ctx, color || this.color, this.pos, this.size);
    },

    move: function (v) {
        var oldPos = this.getPosition();
        this.pos = oldPos.add(v || this.velocity);

        // BOUNDRY DETECT
        if (this.pos.x + Constants.SQUARE_SIZE > Constants.GAMESCENE_WIDTH) {
            this.setVelocity(new Vector(-this.velocity.x, this.velocity.y));
            this.pos.x = Constants.GAMESCENE_WIDTH - Constants.SQUARE_SIZE;
        }

        if (this.pos.x < 0) {
            this.velocity = new Vector(-this.velocity.x, this.velocity.y);
            this.pos.x = 0;
        }

        if (this.pos.y + Constants.SQUARE_SIZE > Constants.GAMESCENE_HEIGHT) {
            this.velocity = new Vector(this.velocity.x, -this.velocity.y);
            this.pos.y = Constants.GAMESCENE_HEIGHT - Constants.SQUARE_SIZE;
        }

        if (this.pos.y < 0) {
            this.velocity = new Vector(this.velocity.x, -this.velocity.y);
            this.pos.y = 0;
        }

        return this.pos;

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

}

module.exports = Square;