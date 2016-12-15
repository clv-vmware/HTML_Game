/**
 * BALL CLASS
 */

var Vector = require('../entity/vector');
var PaintUtils = require('../utils/PaintUtils');
var Constants = require('../constants/constants');

function Ball (pos, velocity) {
    this.pos = pos || new Vector(0, 0);
    this.velocity = velocity || new Vector(0, 0);
}
// collision !!

Ball.prototype = {
    draw: function (ctx) {
        console.log('IN DRAW', this.pos);
        PaintUtils.drawCircle(ctx, Constants.BALL_COLOR, this.pos, Constants.BALL_RADIUS);
    },
    move: function () {
        this.pos = this.pos.add(this.velocity);
        // BOUNDRY DETECT
        if (this.pos.x - Constants.BALL_RADIUS < 0) {
            this.pos.x = Constants.BALL_RADIUS;
            this.velocity.x = -this.velocity.x;
        }
       else  if (this.pos.x + Constants.BALL_RADIUS > Constants.GAMESCENE_WIDTH) {
            this.pos.x = Constants.GAMESCENE_WIDTH - Constants.BALL_RADIUS;
            this.velocity.x = -this.velocity.x;
        }

        if (this.pos.y - Constants.BALL_RADIUS < 0) {
            this.pos.y = Constants.BALL_RADIUS;
            this.velocity.y = -this.velocity.y;
        }
       else  if (this.pos.y + Constants.BALL_RADIUS > Constants.GAMESCENE_HEIGHT) {
            this.pos.y = Constants.GAMESCENE_HEIGHT - Constants.BALL_RADIUS;
            this.velocity.y = -this.velocity.y;
        }



    },

    setVelocity: function (velocity) {
        this.velocity = velocity;
    }
}



module.exports = Ball;
