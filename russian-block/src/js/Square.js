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