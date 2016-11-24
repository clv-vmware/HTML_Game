(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Vector = require('./Vector');

var Constants = {
    SQUARE_SIZE: 30,

    LEFT_ARROW : 37,
    UP_ARROW : 38,
    RIGHT_ARROW : 39,
    DOWN_ARROW : 40,

    GAMESCENE_WIDTH: 300,
    GAMESCENE_HEIGHT: 510,

    // COLOR_LIST: ['#C46564', '#F0E999', '#B8C99D', '#9B726F', '#EEB15B']
    COLOR_LIST:  ['#EFEECC', '#FE8B05', '#FE0557', '#400403', '#0AABBA'],

    TETROMINO_TYPES: ['O', 'T', 'L', 'Z', 'S'],

    V_LEFT: new Vector(-30, 0),
    V_RIGHT: new Vector(30, 0),
    V_UP: new Vector(0, -30),
    V_DOWN: new Vector(0, 30),

    

};

module.exports = Constants;
},{"./Vector":5}],2:[function(require,module,exports){
var Vector = require('./Vector');
var Square = require('./Square');
var Tetromino = require('./Tetromino');
var EventUtils = require('./utils/EventUtils');
var PaintUtils = require('./utils/PaintUtils');
var PrintUtils = require('./utils/PrintUtils');
var Constants = require('./Constants');


var canvas = document.querySelector('#gameScene');
var ctx = canvas.getContext('2d');
var square = new Square(new Vector(0, 0));
square.setVelocity(new Vector(0, 30));

var testTetromino = new Tetromino(new Vector(20, 20), 'S');

var velocity = new Vector(0, 30);



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

    initBlockColorMap: function () {
        var colorMap = new Array(17);
        for (var j = 0;j < 17; j++) {
            colorMap[j] = new Array(10);
            for (var i = 0;i < 10;i ++) {
                colorMap[j][i] = '';
            }
        }
        // PrintUtils.printMatrix(colorMap);
        return colorMap;
    },

    createSquare: function () {
        var randX = Math.floor(Math.random() * 17) * 30;
        square = new Square(new Vector(randX, 0));
        square.setVelocity(new Vector(0, 30));
    },

    updateBlockMap: function (pos, color) {
        // 检查 pos 和 现有堆积的squares 的连通性
        

        var j = Math.floor(pos.x / 30);
        var i = Math.floor(pos.y / 30);
        // console.log(i, j);
        this.blockMap[i][j] = true;
        // console.log(pos, i, j, color, PrintUtils.printColInMatrix(this.blockColorMap, 0));
        this.blockColorMap[i][j] = color;
        

        this.createSquare();
        
    },

    draw: function (ctx) {
        var ylen = this.blockMap.length;
        
        for (var i = 0; i < ylen; i++ ) {
            var xlen = this.blockMap[0].length;
            
            for (var j = 0;j < xlen; j++) {
                var square = new Square(new Vector(j * 30, i * 30));
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
    
    var curPos = square.getPosition();
    var nextPos = new Vector(curPos.x, curPos.y + velocity.y);

        // console.log(nextPos);
        var nextj = Math.floor(nextPos.x / 30);
        var nexti = Math.floor(nextPos.y / 30);
    
    if (PaintUtils.isInBoundry(nextPos) && (!gameScene.blockMap[nexti][nextj])) {
        curPos = square.move();
    }
    else { // hit case
        gameScene.updateBlockMap(curPos, square.color);
    }
}

function draw () {
    testTetromino.draw(ctx);
    // square.draw(ctx);
    // gameScene.draw(ctx);
    // square.setVelocity(new Vector(0, 30));


    
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

},{"./Constants":1,"./Square":3,"./Tetromino":4,"./Vector":5,"./utils/EventUtils":7,"./utils/PaintUtils":9,"./utils/PrintUtils":10}],3:[function(require,module,exports){
/**
 * 单个方块类
 */

var Constants = require('./Constants');
var Vector = require('./Vector');
var PaintUtils = require('./utils/PaintUtils');


function Square (pos) {
    this.pos = pos;
    this.color = PaintUtils.getRandomColor();
    this.velocity = new Vector(0, 0);
    this.size = Constants.SQUARE_SIZE;
}

Square.prototype = {

    draw : function (ctx, color) {
        PaintUtils.drawCell(ctx, color || this.color, this.pos, this.size);
    },

    move: function (v) {
        var oldPos = this.getPosition();
        this.pos = oldPos.add(v || this.velocity);

        // BOUNDRY DETECT
        if (this.pos.x + Constants.SQUARE_SIZE > Constants.GAMESCENE_WIDTH) {
            this.setVelocity(new Vector(-this.velocity.x, this.velocity.y));
            this.pos.x = Constants.GAMESCENE_WIDTH - Constants.SQUARE_SIZE;
        }

        if (this.pos.x < 0) {
            this.velocity = new Vector(-this.velocity.x, this.velocity.y);
            this.pos.x = 0;
        }

        if (this.pos.y + Constants.SQUARE_SIZE > Constants.GAMESCENE_HEIGHT) {
            this.velocity = new Vector(this.velocity.x, -this.velocity.y);
            this.pos.y = Constants.GAMESCENE_HEIGHT - Constants.SQUARE_SIZE;
        }

        if (this.pos.y < 0) {
            this.velocity = new Vector(this.velocity.x, -this.velocity.y);
            this.pos.y = 0;
        }

        return this.pos;

    },

    getPosition: function () {
        return this.pos;
    },

    getColor: function () {
        return this.color;
    },

    setVelocity: function (v) {
        this.velocity = v;
    }

}

module.exports = Square;
},{"./Constants":1,"./Vector":5,"./utils/PaintUtils":9}],4:[function(require,module,exports){
/**
 * Tetromino类
 */

var Constants = require('./Constants');
var Vector = require('./Vector');
var Square = require('./Square');
var PaintUtils = require('./utils/PaintUtils');
var MathUtils = require('./utils/MathUtils');
var Utils = require('./utils/Utils');

function Tetromino (pos, type) {
    this.type = type || Utils.getRandomElement(Constants.TETROMINO_TYPES);
    
    this.pos = pos;
    this.squareList = this.getSquareListByType(this.type, pos);
    this.color = PaintUtils.getRandomColor();
    this.velocity = new Vector(0, 0);
}

Tetromino.prototype = {
    draw: function (ctx, color) {
        var list = this.squareList;
        for (var i = 0;i < list.length; i++) {
            list[i].draw(ctx);
        }

    },

    move: function () {

    },

    // 组成不同形状 tetromino 的square list 
    getSquareListByType: function (type, pos) {
        var list = [];
        switch (type) {
            case 'O':
                list.push(new Square(pos));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_RIGHT)));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_DOWN)));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_RIGHT, Constants.V_DOWN)));
                break;

            case 'Z':
                list.push(new Square(pos));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_RIGHT)));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_DOWN, Constants.V_RIGHT)));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_RIGHT, Constants.V_DOWN, Constants.V_RIGHT)));
                break;

            case 'T':
                list.push(new Square(pos));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_RIGHT)));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_RIGHT, Constants.V_RIGHT)));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_RIGHT, Constants.V_DOWN)));
                break;

            case 'L':
                list.push(new Square(pos));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_DOWN)));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_DOWN, Constants.V_DOWN)));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_DOWN, Constants.V_DOWN, Constants.V_DOWN)));
                break;

            case 'S':
                list.push(new Square(pos));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_DOWN)));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_RIGHT, Constants.V_DOWN)));
                list.push(new Square(MathUtils.vectorAdd(pos, Constants.V_RIGHT, Constants.V_DOWN, Constants.V_DOWN)));
                break;
        
        
        
            default:
                break;
        }

        return list;
    }



};

module.exports = Tetromino;
},{"./Constants":1,"./Square":3,"./Vector":5,"./utils/MathUtils":8,"./utils/PaintUtils":9,"./utils/Utils":11}],5:[function(require,module,exports){
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
var Square = require('./Square');
var Vector = require('./Vector');
var GameScene = require('./GameScene');

var gameScene = new GameScene();
gameScene.init();


},{"./GameScene":2,"./Square":3,"./Vector":5}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
var Vector = require('../Vector');

var MathUtils = {
    vectorAdd: function (v1, v2) {
        var sumX = 0;
        var sumY = 0;
        for (var i = 0;i < arguments.length; i++) {
            sumX += arguments[i].x;
            sumY += arguments[i].y;
        }
        return new Vector(sumX, sumY);
    },

    vectorMinus: function (v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    },


}

module.exports = MathUtils;
},{"../Vector":5}],9:[function(require,module,exports){
/**
 * 
 */

var Vector = require('../Vector');
var Constants = require('../Constants');


var PaintUtils = {
    getRandomPosition: function (fromNum, toNum) {
        var x = fromNum + Math.random() * (toNum - fromNum);
        var y = fromNum + Math.random() * (toNum - fromNum);

        var roundX = x - x % (Constants.SQUARE_SIZE);
        var roundY = y - y % (Constants.SQUARE_SIZE);
        return new Vector(roundX, roundY);
    },

    getRandomColor: function () {
        var rand = Math.floor(Math.random() * 5);
        return Constants.COLOR_LIST[rand];
    },

    drawCell: function(ctx, color, pos, size) {
        
        ctx.fillStyle = color || '#222222';
        ctx.beginPath();
        // ctx.fillRect(pos.x, pos.y, size, size);
        this.drawRoundedRect (ctx, ctx.fillStyle, ctx.fillStyle, pos.x, pos.y, size, size, 5)
        // console.log('in draw', this.position);
        ctx.closePath();
        ctx.fill();
    },

    drawRoundedRect : function (ctx, strokeStyle, fillStyle, cornerX, cornerY, width, height, cornerRadius) {
        // console.log('in drawCell', ctx, strokeStyle, fillStyle, cornerX, cornerY, width, height, cornerRadius);
        ctx.beginPath();
        this.roundedRect (ctx, cornerX, cornerY, width, height, cornerRadius);
        ctx.strokeStyle = strokeStyle;

        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
        ctx.shadowBlur = 0;
        ctx.fillStyle = fillStyle;
        ctx.stroke();
        ctx.fill();
    },

    // draw round rect
    roundedRect : function (ctx, cornerX, cornerY, width, height, cornerRadius) {
        if (width > 0) {
            ctx.moveTo(cornerX + cornerRadius, cornerY);
        }
        else {
            ctx.moveTo(cornerX - cornerRadius, cornerY);
        }

        ctx.arcTo(cornerX + width, cornerY, cornerX + width, cornerY + height, cornerRadius);
        ctx.arcTo(cornerX + width, cornerY + height, cornerX, cornerY + height, cornerRadius);
        ctx.arcTo(cornerX, cornerY + height, cornerX, cornerY, cornerRadius);

        if (width > 0) {
            ctx.arcTo(cornerX, cornerY, cornerX + cornerRadius, cornerY, cornerRadius);
        }
        else {
            ctx.arcTo(cornerX, cornerY, cornerX - cornerRadius, cornerY, cornerRadius);
        }
    },

    isInBoundry: function (pos) {
        var flag = true;
        if (pos.x < 0 || pos.x >= Constants.GAMESCENE_WIDTH) flag = false;
        if (pos.y < 0 || pos.y >= Constants.GAMESCENE_HEIGHT) flag = false;

        return flag;
    } 

}

module.exports = PaintUtils;
},{"../Constants":1,"../Vector":5}],10:[function(require,module,exports){
var PrintUtils = {

    printMatrix: function (matrix) {
        for (var i = 0; i < matrix.length; i++) {
            var row = '';
            for (var j = 0; j < matrix[0].length; j++) {
                row += matrix[i][j] + ' ';
            }
            console.log(row);
        }
    },

    printColInMatrix: function (matrix, col) {
        var row = '';
        
        for (var i = 0; i < matrix.length; i++) {
            
            for (var j = 0; j < matrix[0].length; j++) {
                if (j === col) row += matrix[i][j] + ', ';
            }
            
        }

        console.log(row);
    },
}

module.exports = PrintUtils;
},{}],11:[function(require,module,exports){
var Utils = {
    getRandomElement: function (elems) {
        var len = elems.length;
        var rand = Math.floor(Math.random() * len);
        return elems[rand];
    }
};
},{}]},{},[6]);
