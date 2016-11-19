var GRID_SIZE = 30;
var velocity = new Vector(0, 0);

// index page: select level
var slug = document.querySelector("#slug");
var worm = document.querySelector("#worm");
var python = document.querySelector("#python");


EventUtil.addHandler(slug, 'click', selectLevel);
EventUtil.addHandler(worm, 'click', selectLevel);
EventUtil.addHandler(python, 'click', selectLevel);


// decide snake' speed
var level;


function selectLevel (e) {
    console.log(e.target.id);
    level = e.target.id;
    runGameScene();
}

function runGameScene () {
    var index = document.querySelector("#index");
    index.style.display = "none";

    var gameScene = document.querySelector("#gameScene");
    gameScene.style.display = "inherit";
}



