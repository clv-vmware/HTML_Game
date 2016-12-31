(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    gameOver: false,
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
                        // console.log('do colli', testBall.velocity);
                        testBall.velocity = new Vector(-testBall.velocity.x, -testBall.velocity.y);
                        // testBall.velocity = new Vector(0, 0);
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



module.exports.GameScene = GameScene;
module.exports.runningFlag = runningFlag;

},{"./constants/constants":2,"./entity/ball":3,"./entity/board":4,"./entity/vector":5,"./utils/CollisionUtils":8,"./utils/EventUtils":9,"./utils/MathUtils":10,"./utils/PrintUtils":12,"./utils/paintUtils":14}],2:[function(require,module,exports){
var Constants = {
    GAMESCENE_HEIGHT: 300,
    GAMESCENE_WIDTH: 445,

    BRICK_WIDTH: 40,
    BRICK_HEIGHT: 20,
    BRICK_MARGIN: 5,


    COLOR_BAR: ['red', 'yellow', 'green', '#03fcfb', 'blue'],

    BALL_COLOR: 'cornflowerblue',
    BALL_RADIUS: 5, 

    // BOARD
    BOARD_WIDTH: 40,
    BOARD_HEIGHT: 5,

    // ARROW Constants
    LEFT_ARROW: 39,
    RIGHT_ARROW: 37
};

module.exports = Constants;
},{}],3:[function(require,module,exports){
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

},{"../GameScene":1,"../constants/constants":2,"../entity/vector":5,"../utils/AnimationTimer":7,"../utils/CollisionUtils":8,"../utils/PaintUtils":11}],4:[function(require,module,exports){
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


},{"../constants/constants":2,"../entity/vector":5,"../utils/PaintUtils":11}],5:[function(require,module,exports){
/**
 * 
 */
function Vector (x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

Vector.prototype = {

    add : function (vector) {
        this.x += vector.x;
        this.y += vector.y;
        return new Vector(this.x, this.y);
    },

    minus : function (vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return new Vector(this.x, this.y);
    },

    getMagnitude : function () {
        return Math.sqrt(x * x + y * y);
    }
}

module.exports = Vector;
},{}],6:[function(require,module,exports){
// game entry
var GameSceneObj = require('./GameScene');

var gameScene = new GameSceneObj.GameScene();
gameScene.init();


},{"./GameScene":1}],7:[function(require,module,exports){
var Stopwatch = require('./Stopwatch');

function AnimationTimer (duration) {
    this.duration = duration;
}

AnimationTimer.prototype = {
    duration: undefined,

    stopwatch: new Stopwatch(),

    start: function () {
        this.stopwatch.start();
    },

    stop: function () {
        this.stopwatch.stop();
    },

    getElapsedTime: function () {
        var elapsedTime = this.stopwatch.getElapsedTime();

        if (!this.stopwatch.running) {
            return undefined;
        }
        else {
            return elapsedTime;
        }
    },

    isRunning: function () {
        return this.stopwatch.isRunning();
    },

    isOver: function () {
        return this.stopwatch.getElapsedTime() > this.duration;
    }
};

module.exports = AnimationTimer;


},{"./Stopwatch":13}],8:[function(require,module,exports){
/**
 * COLLISION DETECT UTILS
 */

var MathUtils = require('./MathUtils');
var Vector = require('../entity/vector');

var CollisionUtils = {
    CircleToCircleCheckHit: function (pos1, r1, pos2, r2) {
        if (MathUtils.getDistanceSquare(pos1, pos2) <= (r1 + r2) * (r1 + r2)) {
            return true;
        }
        return false;
    },

    CircleToRectCheckHit: function (rPos, height, width, cPos, r) {
        
        var mayHit = this.PointToRectCheckHit(cPos, new Vector(rPos.x - r, rPos.y - r), height + 2 * r, width + 2 * r);
        if (!mayHit) return false;

        // LEFT
        if (cPos.x < rPos.x) {
            // LEFT TOP
            if (cPos.y < rPos.y) {
                if (MathUtils.getDistanceSquare(cPos, rPos) >= r * r) {
                    return false;
                }
            }
            else {
                // LEFT BOTTOM
                if (cPos.y > rPos.y + height) {
                    if (MathUtils.getDistanceSquare(cPos, new Vector(rPos.x, rPos.y + height)) >= r * r) {
                        return false;
                    }
                }
            }
        }
        else {
            // RIGHT
            if (cPos.x > rPos.x + width) {
                // RIGHT TOP
                if (cPos.y < rPos.y) {
                    if (MathUtils.getDistanceSquare(cPos, new Vector(rPos.x + width, rPos.y)) >= r * r) {
                        return false;
                    }
                }
                else {
                    // RIGHT BOTTOM
                    if (cPos.y > rPos.y + height) {
                        if (MathUtils.getDistanceSquare(cPos, new Vector(rPos.x + width, rPos.y + height)) >= r * r) {
                            return false;
                        }
                    }
                }
            }
        }
        // console.log('cPos : ', cPos, 'rPos : ', rPos);
        return true;

    },

    PointToRectCheckHit: function (pPos, rPos, height, width) {
        if ((pPos.x > rPos.x && pPos.x < rPos.x + width) && 
            (pPos.y > rPos.y && pPos.y < rPos.y + height)) {
                return true;
            }

            return false;
    }
};


module.exports = CollisionUtils;
},{"../entity/vector":5,"./MathUtils":10}],9:[function(require,module,exports){
var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        }
        else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        }
    },

    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        }
        else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        }
        else {
            element["on" + type] = null;
        }
    }
}

module.exports = EventUtil;
},{}],10:[function(require,module,exports){
var MathUtils = {
    getDistanceSquare: function (pos1, pos2) {
        return (pos1.x - pos2.x) * (pos1.x - pos2.x) + (pos1.y - pos2.y) * (pos1.y - pos2.y);
    },
};

module.exports = MathUtils;
},{}],11:[function(require,module,exports){
let PaintUtil = {
    drawRect: function (ctx, color, pos, width, height) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(pos.x, pos.y, width, height);
        ctx.closePath();
        ctx.fill();
    },

    drawCircle: function (ctx, color, pos, r) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2, true);
        ctx.fill();
    }
}

module.exports = PaintUtil;
},{}],12:[function(require,module,exports){

},{}],13:[function(require,module,exports){
function Stopwatch () {

}

Stopwatch.prototype = {
    startTime: 0,

    running: false,

    elapsed: undefined,

    start: function () {
        this.startTime = +new Date();
        this.elapsed = undefined;
        this.running = true;
    },

    stop: function () {
        this.elapsed = (+new Date()) - this.startTime;
        this.running = false;
    },

    getElapsedTime: function () {
        if (this.running) {
            return (+new Date()) - this.startTime;
        }
        else {
            return this.elapsed;
        }
    },

    isRunning: function () {
        return this.running;
    },

    reset: function () {
        this.elapsed = 0;
    }


};

module.exports = Stopwatch;
},{}],14:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"dup":11}]},{},[6]);
