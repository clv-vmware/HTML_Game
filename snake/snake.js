function Snake () {
    this.position = getRandomPosition(10, 1000);
    this.snakeSize = GRID_SIZE;

}

function getRandomPosition (fromNum, toNum) {
    var x = fromNum + Math.random() * (toNum - fromNum);
    var y = fromNum + Math.random() * (toNum - fromNum);

    var roundX = x - x % (GRID_SIZE + 0.1);
    var roundY = y - y % (GRID_SIZE + 0.1);
    return new Point(roundX, roundY);
}

Snake.prototype.getPosition = function () {
    return this.position;
}
Snake.prototype.move = function () {
    this.position = new Point(this.getPosition.x + 10, this.getPosition.y + 10);
}

Snake.prototype.draw = function () {
    ctx.fillStyle = 'rgb(0,0,255)';
    ctx.beginPath();
    ctx.fillRect(this.position.x, this.position.y, this.snakeSize, this.snakeSize);
    console.log('in draw', this.position, this.snakeSize);
    ctx.closePath();
    ctx.fill();

}

