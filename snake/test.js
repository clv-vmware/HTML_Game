var GRID_SIZE = 30;

var snake = require('./snake');




var canvas = document.querySelector('#gameScene');
var ctx = canvas.getContext('2d');

var s = new snake.Snake(ctx);

s.draw();
