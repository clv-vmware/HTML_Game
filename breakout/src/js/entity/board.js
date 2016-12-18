/**
 * 
 */

var Vector = require('../entity/vector');
var Constants = require('../constants/constants');
var PaintUtils = require('../utils/PaintUtils');


function Board (pos, color) {
    this.pos = pos || new Vector(0, 290);
    this.color = color || 'grey';
}


Board.prototype = {
    draw:  function (ctx) {
        PaintUtils.drawRect(ctx, this.color, this.pos, Constants.BOARD_WIDTH, Constants.BOARD_HEIGHT);
    },
    move: function (x) {
        this.pos = this.pos.add(new Vector(x, 0));
        if (this.pos.x < 0) {
            this.pos.x = 0;
        }
        else if (this.pos.x + Constants.BOARD_WIDTH > Constants.GAMESCENE_WIDTH) {
            this.pos.x = Constants.GAMESCENE_WIDTH - Constants.BOARD_WIDTH;
        }
    }

};

module.exports = Board;

