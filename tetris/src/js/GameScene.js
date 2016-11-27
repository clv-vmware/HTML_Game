var Vector = require('./Vector');
var Square = require('./Square');
var Tetromino = require('./Tetromino');
var EventUtils = require('./utils/EventUtils');
var PaintUtils = require('./utils/PaintUtils');
var PrintUtils = require('./utils/PrintUtils');
var MathUtils = require('./utils/MathUtils');
var Constants = require('./Constants');


var canvas = document.querySelector('#gameScene');
var ctx = canvas.getContext('2d');

var testTetromino = new Tetromino();
testTetromino.setVelocity(new Vector(0, 1));
var velocity = new Vector(0, 1);


/**GAME SCENE CLASS */
function GameScene () {
    this.blockMap = this.initBlockMap();
    this.blockColorMap = this.initBlockColorMap();
}

GameScene.prototype = {
    init: function () {
        loop();
        initButtons();
        listenKeyBoardEvent();
    },

    // 采用 matrix 1， 0.。。 表示 
    initBlockMap: function () {
        var blockMap = new Array(16);
        for (var j = 0;j < 16; j++) {
            blockMap[j] = new Array(10);
            for (var i = 0;i < 10;i ++) {
                blockMap[j][i] = 0;
            }
        }
        return blockMap;
    },

    initBlockColorMap: function () {
        var colorMap = new Array(16);
        for (var j = 0;j < 16; j++) {
            colorMap[j] = new Array(10);
            for (var i = 0;i < 10;i ++) {
                colorMap[j][i] = '';
            }
        }
        // PrintUtils.printMatrix(colorMap);
        return colorMap;
    },

    createTetromino: function () {
        testTetromino = new Tetromino();
        testTetromino.setVelocity(new Vector(0, 1));
    },

    updateBlockMap: function (pos, color) {
        // 检查 pos 和 现有堆积的squares 的连通性
        var p = MathUtils.convertVectorList(pos);
        // PrintUtils.printMatrix(p);

        for (var i = 0;i < 16; i++ ) {
            var rowFullFlag = true;
            for (var j = 0;j < 10;j++) {
                this.blockMap[i][j] = this.blockMap[i][j] + p[i][j];
                if (this.blockMap[i][j] === 0) rowFullFlag = false;
                
            }
            if (rowFullFlag) {
                // clean this row
                MathUtils.clearOneRow(this.blockMap, i);
            }
        }


        for (var i = 0;i < 16; i++ ) {
            for (var j = 0;j < 10;j++) {
                if (p[i][j] > 0) {
                    this.blockColorMap[i][j] = color;
                }
                
            }
        }
        
        // PrintUtils.printMatrix(this.blockMap);
        
        // console.log(pos, i, j, color, PrintUtils.printColInMatrix(this.blockColorMap, 0));

        this.createTetromino();
    },

    checkCollide: function (nextPos) {
        // console.log('collide next', nextPos);
        var pos = MathUtils.convertVectorList(nextPos);
        // PrintUtils.printMatrix(pos);

        for (var i = 0;i < 16; i++ ) {
            for (var j = 0;j < 10;j++) {
                pos[i][j] = this.blockMap[i][j] + pos[i][j];
                if (pos[i][j] > 1 && testTetromino.velocity.x === 0) 
                {
                    PrintUtils.printMatrix(pos);
                    return true;
                }
            }
        }
        return false;
    },


    getCollideMap: function (pos) {
        var pos = MathUtils.convertVectorList(pos);
        for (var i = 0;i < 16; i++ ) {
            for (var j = 0;j < 10;j++) {
                pos[i][j] = this.blockMap[i][j] + pos[i][j];
                    
            }
        }
        // PrintUtils.printMatrix(pos);

        return pos;
    },

    draw: function (ctx) {
        var ylen = this.blockMap.length;
        for (var i = 0; i < 16; i++ ) {
            var xlen = this.blockMap[0].length;
            
            for (var j = 0;j < 10; j++) {
                var square = new Square(new Vector(j, i));
                if (this.blockMap[i][j]) {
                    square.draw(ctx, this.blockColorMap[i][j]);
                }
            }
        }
    }
}


// DEFINE GLOBAL VARS
var gameScene = new GameScene();

var fps = 3;
var now;
var then = Date.now();
var interval = 1000 / fps;
var delta;
var runningFlag = true;

// LOOP HELPER FUNCS
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

function update () {
    var curPos = testTetromino.getPosition();
    var nextPos = testTetromino.getNextPos();
    console.log('nextpos', nextPos);

    // 保证nextpos  在范围内，并且nextpos所在的 i ,j 在map内都为false
    // console.log('collide',PaintUtils.isTetrominoInBoundry(nextPos),  gameScene.checkCollide(nextPos), nextPos);
    // TODO : 此处逻辑混乱，重新理清楚 ！！！
    if (PaintUtils.isTetrominoInBoundry(nextPos)) {
        if (!gameScene.checkCollide(nextPos)) {
            // var collideMap = this.getCollideMap();
            curPos = testTetromino.move();
        }
        else  if (testTetromino.velocity.x !== 0) {
            testTetromino.setVelocity(new Vector(0, 1));
        }
        else { // hit case!
            console.log('hit!', curPos);
            gameScene.updateBlockMap(curPos, testTetromino.color);
        }
    }
    else {// OUT OF BOUNDRY CASE
        // 向左会触发 here
        console.log('hit the boundry case!');
        if (testTetromino.velocity.x !== 0) {
            testTetromino.setVelocity(new Vector(0, 1));
        }
        else { // hit case!
            console.log('hit!', curPos);
            gameScene.updateBlockMap(curPos, testTetromino.color);
        }
    }
    
    
}

function draw () {
    testTetromino.draw(ctx);
    gameScene.draw(ctx);
    testTetromino.setVelocity(new Vector(0, 1));
}

function queue () {
    if (!runningFlag) return;
    window.requestAnimationFrame(loop);
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
}

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
    });
};

module.exports = GameScene;
