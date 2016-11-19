var Utils = require('./utils');
var vector = require('./vector');


var Vector = vector.Vector;
var GRID_SIZE = 30;

var Snake = {

    
    Snake: function (ctx) {
        this.ctx = ctx;
        this.width = ctx.canvas.clientWidth;
        this.height = ctx.canvas.clientHeight;
        this.headPos = Utils.getRandomPosition(10, 100);
        
        this.bodyPos = new Vector(this.headPos.x - GRID_SIZE, this.headPos.y);
        this.tailPos = new Vector(this.bodyPos.x - GRID_SIZE, this.bodyPos.y);

        this.snakeSize = GRID_SIZE;
        this.velocity;

        this.draw = function () {

        Utils.drawCell(this.ctx, 'rgb(0,0,255)', this.headPos, GRID_SIZE); 
        Utils.drawCell(this.ctx, 'rgb(0,255,255)', this.bodyPos, GRID_SIZE);
        Utils.drawCell(this.ctx, 'rgb(222, 255, 0)', this.tailPos, GRID_SIZE);

    }


    },

    getHeadPosition: function () {
        return this.headPos;
    },

    setVelocity : function (velocity) {
        this.velocity = velocity;
    },

    move : function () {
    
        var oldHeadPos = this.getHeadPosition();
        
        this.tailPos = new Vector(this.bodyPos.x, this.bodyPos.y);
        this.bodyPos = new Vector(this.headPos.x, this.headPos.y);
        
        this.headPos = oldHeadPos.add.call(oldHeadPos, this.velocity);

        // BOUNDRY DETECT
        if (this.headPos.x + GRID_SIZE > width) {
            this.setVelocity(new Vector(-this.velocity.x, this.velocity.y));
            this.headPos.x = width - GRID_SIZE;
        }

        if (this.headPos.x < 0) {
            this.velocity = new Vector(-this.velocity.x, this.velocity.y);
            this.headPos.x = 0;
        }

        if (this.headPos.y + GRID_SIZE > height) {
            this.velocity = new Vector(this.velocity.x, -this.velocity.y);
            this.headPos.y = height - GRID_SIZE;
        }

        if (this.headPos.y < 0) {
            this.velocity = new Vector(this.velocity.x, -this.velocity.y);
            this.headPos.y = 0;
        }
    },

    

}

module.exports = Snake;

