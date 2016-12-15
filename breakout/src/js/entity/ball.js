/**
 * BALL CLASS
 */

var Vector = require('../entity/vector');
var PaintUtils = require('../utils/PaintUtils');
var Constants = require('../constants/constants');

function Ball (pos, velocity) {
    this.pos = new Vector(0, 0) || pos;
    this.velocity = new Vector(0, 0) || velocity;
}
// collision !!

function draw () {
    PaintUtils.drawCircle(ctx, Constants.BALL_COLOR, this.pos, Constants.BALL_RADIUS);
};

function move () {
    this.pos = this.pos.add(this.velocity);
};

module.exports = Ball;
