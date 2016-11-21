var Vector = require('./Vector');
var Square = require('./Square');
var EventUtils = require('./utils/EventUtils');
var PaintUtils = require('./utils/PaintUtils');
var Constants = require('./Constants');


var canvas = document.querySelector('#gameScene');
var ctx = canvas.getContext('2d');
var square = new Square(new Vector(2, 2));

var velocity = new Vector(0, 10);



function GameScene () {
    this.blockMap = this.initBlockMap();
}

GameScene.prototype = {
    init: function () {
        loop();
        initButtons();
        listenKeyBoardEvent();
    },
    initBlockMap: function () {
        var blockMap = new Array(17);
        for (var j = 0;j < 17; j++) {
            blockMap[j] = new Array(10);
            for (var i = 0;i < 10;i ++) {
                blockMap[j][i] = false;
            }
        }

        return blockMap;
    },

    updateBlockMap: function (pos) {
        // 如果碰到stack 
        // decide the pos belon to the blockmap i j
        var j = Math.floor(pos.x / 30);
        var i = Math.floor(pos.y / 30);
        console.log(i, j);
        this.blockMap[j][i] = true;

        for (var i = 0;i < 17; i++) {
            console.log(this.blockMap[i]);
        }
    },

    draw: function (ctx) {
        var ylen = this.blockMap.length;
        
        for (var i = 0; i < ylen; i++ ) {
            var xlen = this.blockMap[0].length;
            
            for (var j = 0;j < xlen; j++) {
                var square = new Square(new Vector(i * 30, j * 30));
                if (this.blockMap[i][j]) {
                    square.draw(ctx);
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
    
    
    if (PaintUtils.isInBoundry(square.getPosition())) {
        var curPos = square.move(velocity);
        // console.log('curpos',);
        gameScene.updateBlockMap(curPos);
    }
    
}

function draw () {
    // square.draw(ctx);
    gameScene.draw(ctx);
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

        if (event.keyCode === Constants.UP_ARROW) {
            velocity = new Vector(0, -absoluteV);
            snake.setVelocity(velocity);
        }
        else if(event.keyCode === Constants.DOWN_ARROW) {
            velocity = new Vector(0, absoluteV);
            snake.setVelocity(velocity);
        }
        else if(event.keyCode === Constants.LEFT_ARROW) {
            velocity = new Vector(-absoluteV, 0);
            snake.setVelocity(velocity);
        }
        else if(event.keyCode === Constants.RIGHT_ARROW) {
            velocity = new Vector(absoluteV, 0);
            snake.setVelocity(velocity);
        } 
    });
};

module.exports = GameScene;
