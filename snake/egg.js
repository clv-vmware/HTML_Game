function Egg () {
    this.position = getRandomPosition(10, 100);
    this.eggSize = GRID_SIZE;

}

Egg.prototype.draw = function () {
    ctx.fillStyle = 'rgb(255,0,0)';
    ctx.beginPath();
    ctx.fillRect(this.position.x, this.position.y, this.eggSize, this.eggSize);
    console.log('in  egg  draw', this.position, this.eggSize);
    ctx.closePath();
    ctx.fill();

}