/**
 * BALL CLASS
 */

var Vector = require('../entity/vector');
var PaintUtils = require('../utils/PaintUtils');
var CollisionUtils = require('../utils/CollisionUtils');
var AnimationTimer = require('../utils/AnimationTimer');
var Constants = require('../constants/constants');
var GameScene = require('../GameScene');

var PIXELS_PER_METER = 0.5;
var fallingTimer = new AnimationTimer(10000000);fallingTimer.start();

function Ball (pos, velocity) {
    this.pos = pos || new Vector(0, 0);
    this.velocity = velocity || new Vector(0, 0);
}
// collision !!

Ball.prototype = {
    draw: function (ctx) {
        
        PaintUtils.drawCircle(ctx, Constants.BALL_COLOR, this.pos, Constants.BALL_RADIUS);
    },
    move: function (bricksMap) {
        // console.log('IN MOVE', bricksMap);
        // TODO 模拟重力
        /*
        var fps = 30;
        var GRAVITY_FORCE = 9.81;
        
        let curVelocityY = GRAVITY_FORCE * ( fallingTimer.getElapsedTime() / 1000) * PIXELS_PER_METER;
        console.log('Y', curVelocityY, fallingTimer.getElapsedTime(), fallingTimer.isRunning());
        this.pos.y = this.pos.y + curVelocityY;
        */



        this.pos.x = this.pos.add(this.velocity).x;
        this.pos.x = this.pos.add(this.velocity).x;
        // 计算出当前pos 在 bricks map 里的 i j 坐标
        var GridX = Math.ceil(this.pos.x / (Constants.BRICK_WIDTH + Constants.BRICK_MARGIN));
        var GridY = Math.ceil(this.pos.y / (Constants.BRICK_HEIGHT + Constants.BRICK_MARGIN));
        //  如果是实心， 更新checkmap 为0（消失）, 速度反向
        // console.log(GridX, GridY);
        // y 要在bricks 范围之内才进行collision check
        // if (GridY < 5) {
        //     // console.log(bricksMap[GridY][GridX]);
        //     // TODO!
        //     if (CollisionUtils.CircleToRectCheckHit(rPos, Constants.BRICK_HEIGHT, Constants.BRICK_WIDTH, this.pos, Constants.BALL_RADIUS)) {
        //         if (bricksMap[GridY][GridX] === 1) {
        //             bricksMap[GridY][GridX] = 0;
        //             // TODO : 速度改变与碰撞到的边有关
        //             this.velocity.y = -this.velocity.y;
        //         }
        //     }
        // }
        
        // BOUNDRY DETECT
        if (this.pos.x - Constants.BALL_RADIUS < 0) {
            this.pos.x = Constants.BALL_RADIUS;
            this.velocity.x = -this.velocity.x;
        }
       else  if (this.pos.x + Constants.BALL_RADIUS > Constants.GAMESCENE_WIDTH) {
            this.pos.x = Constants.GAMESCENE_WIDTH - Constants.BALL_RADIUS;
            this.velocity.x = -this.velocity.x;
        }
        //  GAME OVER!
        if (this.pos.y - Constants.BALL_RADIUS < 0) {
            this.pos.y = Constants.BALL_RADIUS;
            this.velocity.y = -this.velocity.y;
        }
       else  if (this.pos.y + Constants.BALL_RADIUS > Constants.GAMESCENE_HEIGHT) {
            // gameOver = true;
            console.log('HIT BOTTOM!', GameScene.runningFlag);
            GameScene.runningFlag = false;
            this.pos.y = Constants.GAMESCENE_HEIGHT - Constants.BALL_RADIUS;
            this.velocity.y = -this.velocity.y;
        }



    },

    setVelocity: function (velocity) {
        this.velocity = velocity;
    }
}



module.exports = Ball;
