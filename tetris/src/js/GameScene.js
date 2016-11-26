var Vector = require('./Vector');
var Square = require('./Square');
var Tetromino = require('./Tetromino');
var EventUtils = require('./utils/EventUtils');
var PaintUtils = require('./utils/PaintUtils');
var PrintUtils = require('./utils/PrintUtils');
var Constants = require('./Constants');


var canvas = document.querySelector('#gameScene');
var ctx = canvas.getContext('2d');
// TEST SQUARE CASE
// var square = new Square(new Vector(0, 0));
// square.setVelocity(new Vector(0, 1));

var testTetromino = new Tetromino();
testTetromino.setVelocity(new Vector(0, 1));

var velocity = new Vector(0, 1);

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

    createSquare: function () {
        var randX = Math.floor(Math.random() * 16);
        square = new Square(new Vector(randX, 0));
        square.setVelocity(new Vector(0, 1));
    },

    updateBlockMap: function (pos, color) {
        // 检查 pos 和 现有堆积的squares 的连通性
        

        var j = pos.x;
        var i = pos.y
        // console.log(i, j);
        this.blockMap[i][j] = 1;
        // console.log(pos, i, j, color, PrintUtils.printColInMatrix(this.blockColorMap, 0));
        this.blockColorMap[i][j] = color;
        

        this.createSquare();
        
    },

    draw: function (ctx) {
        var ylen = this.blockMap.length;
        
        for (var i = 0; i < ylen; i++ ) {
            var xlen = this.blockMap[0].length;
            
            for (var j = 0;j < xlen; j++) {
                var square = new Square(new Vector(j, i));
                if (this.blockMap[i][j]) {
                    // console.log('draw gameScene', i, j, square.getPosition());
                    square.draw(ctx, this.blockColorMap[i][j]);
                }
            }
        }
    }
}

var gameScene = new GameScene();

var fps = 5;
var now;
var then = Date.now();
var interval = 1000 / fps;
var delta;
var runningFlag = true;

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
    // testTetromino.move();
    
    var curPos = testTetromino.getPosition();
    var nextPos = testTetromino.getNextPos();

        // console.log(nextPos);
        var nextj = nextPos.x;
        var nexti = nextPos.y;

    // 保证nextpos  在范围内，并且nextpos所在的 i ,j 在map内都为false
    if (PaintUtils.isSquareInBoundry(nextPos) && (!gameScene.blockMap[nexti][nextj])) {
        curPos = square.move();
    }
    else { // hit case
        gameScene.updateBlockMap(curPos, square.color);
    }
}

function draw () {
    // testTetromino.draw(ctx);

    square.draw(ctx);
    gameScene.draw(ctx);
    square.setVelocity(new Vector(0, 30));


    
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
            square.setVelocity(new Vector(0, 60));
        }
        else if(event.keyCode === Constants.LEFT_ARROW) {
            
            square.setVelocity(new Vector(-30, 0));
            // console.log('left arrow ',square.velocity );
        }
        else if(event.keyCode === Constants.RIGHT_ARROW) {
            square.setVelocity(new Vector(30, 0));
            // console.log('right arrow ',square.velocity );
        } 
    });
};

module.exports = GameScene;
