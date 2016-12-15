var EventUtils = require('./utils/EventUtils');
var PaintUtils = require('./utils/paintUtils');
var PrintUtils = require('./utils/PrintUtils');
var MathUtils = require('./utils/MathUtils');
var Constants = require('./constants/constants');

// global vars
var canvas = document.querySelector("#gameScene");
var ctx = canvas.getContext('2d');

function GameScene () {
    this.bricksMap = initBricksMap();
    this.drawBricks();
}

GameScene.prototype.draw = function () {

};

GameScene.prototype.update = function () {
    
};


// 5 * 10 COLOR_BAR
GameScene.prototype.drawBricks = function () {
    for (var i = 0;i < 5;i++) {
        for (var j = 0;j < 10;j++) {
            if (this.bricksMap[i][j] > 0) {
                var pos = new Vector((i + 1) * Constants.BRICK_HEIGHT, (j + 1) * Constants.BRICK_WIDTH);
                PaintUtils.drawRect(Constants.COLOR_BAR[i], pos, width, height);
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
}
