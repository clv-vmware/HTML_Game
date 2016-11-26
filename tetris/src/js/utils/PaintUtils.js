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

    drawCellByPixel: function(ctx, color, pos) {
        
        ctx.fillStyle = color || '#222222';
        ctx.beginPath();
        // ctx.fillRect(pos.x, pos.y, size, size);
        this.drawRoundedRect (ctx, ctx.fillStyle, ctx.fillStyle, pos.x, pos.y, Constants.SQUARE_SIZE, Constants.SQUARE_SIZE, 5)
        // console.log('in draw', this.position);
        ctx.closePath();
        ctx.fill();
    },

    // 包装方法， 把坐标转化为pixel 
    drawCellByMap: function (ctx, color, MapPos) {
        var posInPixel = new Vector(MapPos.x * Constants.SQUARE_SIZE, MapPos.y * Constants.SQUARE_SIZE);
        this.drawCellByPixel(ctx, color, posInPixel);
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

    isSquareInBoundry: function (pos) {
        var flag = true;
        if (pos.x < 0 || pos.x >= Constants.GAMESCENE_WIDTH) flag = false;
        if (pos.y < 0 || pos.y >= Constants.GAMESCENE_HEIGHT) flag = false;

        return flag;
    },

    isTetrominoInBoundry: function (posList) {

    }

}

module.exports = PaintUtils;