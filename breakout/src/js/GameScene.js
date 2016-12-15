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

var testBall = new Ball(new Vector(Constants.GAMESCENE_WIDTH / 2, Constants.GAMESCENE_HEIGHT - Constants.BALL_RADIUS), new Vector(0, 0));
testBall.setVelocity(new Vector(5, 15));

function GameScene () {
    this.bricksMap = initBricksMap();
    this.drawBricks();
}

GameScene.prototype = {
    init: function () {
        loop();
        initButtons();
        listenKeyBoardEvent();
    },

    draw: function () {

    },

    update: function () {
        testBall.move();
        checkColision(testBall, );
        update
    },
    // 5 * 10 COLOR_BAR: 根据当前bricksMap update bricks
    drawBricks: function () {
        for (var i = 0;i < 5;i++) {
            for (var j = 0;j < 10;j++) {
                if (this.bricksMap[i][j] > 0) {
                    var pos = new Vector((j + 1) * (Constants.BRICK_WIDTH + Constants.BRICK_MARGIN), (i + 1) * (Constants.BRICK_HEIGHT + Constants.BRICK_MARGIN));
                    PaintUtils.drawRect(ctx, Constants.COLOR_BAR[i], pos, Constants.BRICK_WIDTH, Constants.BRICK_HEIGHT);
                }
            }
        }
    },

};



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

/**
 * pause / run 
 */
function initButtons () {
    var pauseBtn = document.querySelector("#pause");
    EventUtils.addHandler(pauseBtn, 'click', function () {
        runningFlag = false;
    });

    var runBtn = document.querySelector("#run");
    EventUtils.addHandler(runBtn, 'click', function () {
        runningFlag = true;
        queue();
    });

    var gameOverModal = document.querySelector("#gameOverModal");
    gameOverModal.style.display = "none";

    var newGameBtn = document.querySelector("#newGame");
    EventUtils.addHandler(newGameBtn, 'click', function () {
        MathUtils.clearAllRows(gameScene.blockMap);
        gameOverModal.style.display = "none";
        runningFlag = true;
        queue();
    });
};

function listenKeyBoardEvent () {
    EventUtils.addHandler(window, 'keydown', function (event) {
        if(event.keyCode === Constants.DOWN_ARROW) {
            testTetromino.setVelocity(new Vector(0, 2));
        }
        else if(event.keyCode === Constants.LEFT_ARROW) {
            
            testTetromino.setVelocity(new Vector(-1, 0));
        }
        else if(event.keyCode === Constants.RIGHT_ARROW) {
            testTetromino.setVelocity(new Vector(1, 0));
        } 

        // UP ARROW: CHANGE Tetromino SHAPE
        else if(event.keyCode === Constants.UP_ARROW) {
            testTetromino.changeShape();
        } 
    });
};

// DEFINE GLOBAL VARS
var gameScene = new GameScene();

var fps = 3;
var now;
var then = Date.now();
var interval = 1000 / fps;
var delta;
var runningFlag = true;

// LOOP HELPERS FUNCS

function loop () {
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
        then = now - (delta % interval);
        clear();
        update();
        draw();
    }
    queue();
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateScore () {
    var scoreBtn = document.querySelector("#score");
    scoreBtn.innerHTML = score;
}

function update () {
    testBall.move();

};

function draw () {
    testBall.draw(ctx);
    gameScene.drawBricks();
}

function queue () {
    if (!runningFlag) return;
    window.requestAnimationFrame(loop);
}



module.exports = GameScene;
