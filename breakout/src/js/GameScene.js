var EventUtils = require('./utils/EventUtils');
var PaintUtils = require('./utils/paintUtils');
var PrintUtils = require('./utils/PrintUtils');
var MathUtils = require('./utils/MathUtils');
var Constants = require('./constants/constants');
var Ball = require('./entity/ball');
var Vector = require('./entity/vector');


// global vars
var canvas = document.querySelector("#gameScene");
var ctx = canvas.getContext('2d');
var testBall = new Ball(new Vector(20, 20), new Vector(1, 1));

function GameScene () {
    this.bricksMap = initBricksMap();
    this.drawBricks();
}

GameScene.prototype.draw = function () {
    testBall.draw();
};

GameScene.prototype.update = function () {
    testBall.move();
};


// 5 * 10 COLOR_BAR
GameScene.prototype.drawBricks = function () {
    for (var i = 0;i < 5;i++) {
        
        for (var j = 0;j < 10;j++) {
            if (this.bricksMap[i][j] > 0) {
                var pos = new Vector((j + 1) * (Constants.BRICK_WIDTH + Constants.BRICK_MARGIN), (i + 1) * (Constants.BRICK_HEIGHT + Constants.BRICK_MARGIN));
                PaintUtils.drawRect(ctx, Constants.COLOR_BAR[i], pos, Constants.BRICK_WIDTH, Constants.BRICK_HEIGHT);
            }
        }
    }
}


// UTILS FUNC

// 5 * 10 matrix
function initBricksMap () {
    var matrix = new Array(5);
    for (var i = 0;i < 5;i++) {
        matrix[i] = new Array(10);
        for (var j = 0;j < 10;j++) {
            matrix[i][j] = 1;
        }
    }
    return matrix;
}

module.exports = GameScene;
