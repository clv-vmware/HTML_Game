var Utils = require('./utils');
var Vector = require('./vector');


var GRID_SIZE = 30;

function Snake () {
    this.init.apply(this, arguments);
};

Snake.prototype = {

    init: function (ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.headPos = Utils.getRandomPosition(100, 150);
        
        this.bodyPos = new Vector(this.headPos.x - GRID_SIZE, this.headPos.y);
        this.tailPos = new Vector(this.bodyPos.x - GRID_SIZE, this.bodyPos.y);
        // console.log('INIT ', this.headPos, this.bodyPos, this.tailPos, 'this.width', this.width, this.height);
        this.snakeSize = GRID_SIZE;
        this.velocity;
    },

    draw: function () {
        Utils.drawCell(this.ctx, 'rgb(0,0,255)', this.headPos, GRID_SIZE); 
        Utils.drawCell(this.ctx, 'rgb(0,255,255)', this.bodyPos, GRID_SIZE);
        Utils.drawCell(this.ctx, 'rgb(222, 255, 0)', this.tailPos, GRID_SIZE);
    },

    getHeadPosition: function () {
        return this.headPos;
    },

    setVelocity : function (velocity) {
        this.velocity = velocity;
    },

    move : function () {
    
        var oldHeadPos = this.getHeadPosition();
        console.log('oldHeadPos', oldHeadPos);
        
        this.tailPos = new Vector(this.bodyPos.x, this.bodyPos.y);
        this.bodyPos = new Vector(this.headPos.x, this.headPos.y);
        
        this.headPos = oldHeadPos.add(this.velocity);
        // console.log(this.headPos, this.tailPos);

        // BOUNDRY DETECT
        if (this.headPos.x + GRID_SIZE > this.width) {
            this.setVelocity(new Vector(-this.velocity.x, this.velocity.y));
            this.headPos.x = this.width - GRID_SIZE;
        }

        if (this.headPos.x < 0) {
            this.velocity = new Vector(-this.velocity.x, this.velocity.y);
            this.headPos.x = 0;
        }

        if (this.headPos.y + GRID_SIZE > this.height) {
            this.velocity = new Vector(this.velocity.x, -this.velocity.y);
            this.headPos.y = this.height - GRID_SIZE;
        }

        if (this.headPos.y < 0) {
            this.velocity = new Vector(this.velocity.x, -this.velocity.y);
            this.headPos.y = 0;
        }
    }
};

module.exports = Snake;

