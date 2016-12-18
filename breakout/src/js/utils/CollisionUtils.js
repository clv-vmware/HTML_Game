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