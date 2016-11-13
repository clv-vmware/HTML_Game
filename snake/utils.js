/**
 * generate random position based on grid
 */
function getRandomPosition (fromNum, toNum) {
    var x = fromNum + Math.random() * (toNum - fromNum);
    var y = fromNum + Math.random() * (toNum - fromNum);

    var roundX = x - x % (GRID_SIZE + 0.1);
    var roundY = y - y % (GRID_SIZE + 0.1);
    return new Vector(roundX, roundY);
}


