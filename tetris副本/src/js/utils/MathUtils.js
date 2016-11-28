var Vector = require('../Vector');
var PrintUtils = require('./PrintUtils');

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

    // convert vector list to matrix
    convertVectorList: function (list) {
        var matrix = new Array(16);
        for (var i = 0;i < 16; i++ ) {
            matrix[i] = new Array(10);
            for (var j = 0;j < 10;j++) {
                matrix[i][j] = 0;
            }
        }
        

        for(var s = 0;s < list.length;s++) {
            var x = list[s].x;
            var y = list[s].y;
            matrix[y][x] = 1;
        }
        // PrintUtils.printMatrix(matrix);

        return matrix;
    },

    clearOneRow: function (map, row) {
        for (var i = row;i >0; i-- ) {
            for (var j = 0;j < 10;j++) {
                map[i][j] = map[i - 1][j];
            }
        }
        for (var k = 0;k < 10;k++) {
            map[0][k] = 0;
        }
    }


}

module.exports = MathUtils;