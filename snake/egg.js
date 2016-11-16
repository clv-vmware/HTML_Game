function Egg (ctx) {
    this.ctx = ctx;
    this.position = getRandomPosition(100, 400);
    this.eggSize = GRID_SIZE;

}

Egg.prototype.draw = function () {
    this.ctx.fillStyle = 'rgb(255,0,0)';
    this.ctx.beginPath();
    this.ctx.fillRect(this.position.x, this.position.y, this.eggSize, this.eggSize);
    // console.log('in  egg  draw', this.position, this.eggSize);
    this.ctx.closePath();
    this.ctx.fill();
}

Egg.prototype.checkCollision = function () {
    var ifHit = detectCollision(this.position, s.headPos, this.eggSize);
    if (ifHit) {
        this.clear();
        this.position = getRandomPosition(100, 400);
        this.draw();
        score++;
        updateScore();
    }

    return ifHit;
}

Egg.prototype.clear = function () {
    this.ctx.clearRect(this.position.x, this.position.y, this.eggSize, this.eggSize);
}

function updateScore () {
    var scoreBtn = document.querySelector("#score");
    scoreBtn.innerHTML = score;
}