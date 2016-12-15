/**
 * 
 */

var Vector = require('../entity/vector');
var Constants = require('../constants/constants');
var PaintUtils = require('../utils/PaintUtils');


function Board (pos, color) {
    this.pos = pos;
    this.color = color;
}


Board.prototype.draw = function (ctx) {
    PaintUtils.drawRect(this.color, this.pos, Constants.BRICH_WIDTH, BRICK_HEIGHT);
    
}

