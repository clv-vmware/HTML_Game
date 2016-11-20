var Square = require('./Square');
var Vector = require('./Vector');


var canvas = document.querySelector('#gameScene');
var ctx = canvas.getContext('2d');
var square = new Square(new Vector(1, 2));
square.draw(ctx);