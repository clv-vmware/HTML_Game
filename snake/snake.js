function Snake () {
    this.position = getRandomPosition(10, 100);
    this.snakeSize = GRID_SIZE;
    this.velocity;

}

function getRandomPosition (fromNum, toNum) {
    var x = fromNum + Math.random() * (toNum - fromNum);
    var y = fromNum + Math.random() * (toNum - fromNum);

    var roundX = x - x % (GRID_SIZE + 0.1);
    var roundY = y - y % (GRID_SIZE + 0.1);
    return new Vector(roundX, roundY);
}

Snake.prototype.getPosition = function () {
    return this.position;
}

Snake.prototype.setVelocity = function (velocity) {
    this.velocity = velocity;
}
// NEED BOUNDRY DETECT
Snake.prototype.move = function () {
    var oldPos = this.getPosition();
    this.position = oldPos.add.call(oldPos, this.velocity);
    console.log(this.position, width, this.velocity);

    if (this.position.x + GRID_SIZE > width) {
        this.setVelocity(new Vector(-this.velocity.x, this.velocity.y));
        console.log('in  > ', this.velocity);
        this.position.x = width - GRID_SIZE;
    }

    if (this.position.x < 0) {
        this.velocity = new Vector(-this.velocity.x, this.velocity.y);
        this.position.x = 0;
    }

    if (this.position.y + GRID_SIZE > height) {
        this.velocity = new Vector(this.velocity.x, -this.velocity.y);
        this.position.y = height - GRID_SIZE;
    }

    if (this.position.y < 0) {
        this.velocity = new Vector(this.velocity.x, -this.velocity.y);
        this.position.y = 0;
    }
}

Snake.prototype.draw = function () {
    ctx.fillStyle = 'rgb(0,0,255)';
    ctx.beginPath();
    ctx.fillRect(this.position.x, this.position.y, this.snakeSize, this.snakeSize);
    // console.log('in draw', this.position);
    ctx.closePath();
    ctx.fill();

}

// var s = new Snake();
// s.draw();
// s.move();
// s.draw();

