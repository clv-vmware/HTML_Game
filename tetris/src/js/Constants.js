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