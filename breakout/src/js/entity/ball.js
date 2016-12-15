/**
 * BALL CLASS
 */

var Vector = require('../entity/vector');
var Constants = require('../constants/constants');

function Ball (pos, velocity) {
    this.pos = new Vector(0, 0) || pos;
    this.velocity = new Vector(0, 0) || velocity;
}
// collision !!

function draw () {

};