var EventUtils = require('./utils/EventUtils');
var PaintUtils = require('./utils/paintUtils');
var PrintUtils = require('./utils/PrintUtils');
var MathUtils = require('./utils/MathUtils');
var CollisionUtils = require('./utils/CollisionUtils');
var Constants = require('./constants/constants');
var Ball = require('./entity/ball');
var Board = require('./entity/board');
var Vector = require('./entity/vector');


// global vars
var canvas = document.querySelector("#gameScene");
var ctx = canvas.getContext('2d');

var testBall = new Ball(new Vector(Constants.GAMESCENE_WIDTH / 2, Constants.GAMESCENE_HEIGHT - Constants.BALL_RADIUS), new Vector(0, 0));
testBall.setVelocity(new Vector(5, 9.8));
var testBoard = new Board();

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
    // 规则： 一次碰撞， 小球反弹，brick 消掉
    checkcollision: function () {

    },

    update: function () {
        
    },
    // 5 * 10 COLOR_BAR: 根据当前bricksMap update bricks
    drawBricks: function () {
        for (var i = 0;i < 5;i++) {
            for (var j = 0;j < 10;j++) {
                if (this.bricksMap[i][j] > 0) {
                    var boxPos = new Vector((j) * (Constants.BRICK_WIDTH + Constants.BRICK_MARGIN), (i) * (Constants.BRICK_HEIGHT + Constants.BRICK_MARGIN));
                    // DO COLLISIONS
                    if (CollisionUtils.CircleToRectCheckHit(boxPos, Constants.BRICK_HEIGHT, Constants.BRICK_WIDTH, testBall.pos, Constants.BALL_RADIUS)) {
                        // console.log('COLLIDE!', i, j, testBall.pos);
                        console.log('do colli', testBall.velocity);
                        testBall.velocity = new Vector(-testBall.velocity.x, -testBall.velocity.y);
                        this.bricksMap[i][j] = 0;
                        
                    }
                    PaintUtils.drawRect(ctx, Constants.COLOR_BAR[i], boxPos, Constants.BRICK_WIDTH, Constants.BRICK_HEIGHT);
                }
            }
        }
    },

    // Do Cllisions
    doCollisions: function () {
        for (var i = 0;i < 5;i++) {
            for (var j = 0;j < 10;j++) {
                if (this.bricksMap[i][j] > 0) {
                    var boxPos = new Vector((j) * (Constants.BRICK_WIDTH + Constants.BRICK_MARGIN), (i) * (Constants.BRICK_HEIGHT + Constants.BRICK_MARGIN));
                    if (CollisionUtils.CircleToRectCheckHit(boxPos, Constants.BRICK_HEIGHT, Constants.BRICK_WIDTH, testBall.pos, Constants.BALL_RADIUS)) {
                        this.bricksMap[i][j] = 0;
                        
                    }
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
        if(event.keyCode === Constants.LEFT_ARROW) {
            testBoard.move(10);
        }
        else if(event.keyCode === Constants.RIGHT_ARROW) {
            testBoard.move(-10);
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
var gameOver = false;

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
    testBall.move(gameScene.bricksMap);

};

function draw () {
    testBall.draw(ctx);
    testBoard.draw(ctx);
    gameScene.drawBricks();
}

function queue () {
    if (!runningFlag || gameOver) return;
    window.requestAnimationFrame(loop);
}



module.exports = GameScene;
