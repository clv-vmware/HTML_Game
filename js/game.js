
var sprites = {
	ship : {
			sx: 0,
			sy: 0,
			w: 18,
			h: 35,
			frames: 3
	},
	missile: {
		sx: 0,
		sy: 30,
		w : 2,
		h: 10,
		frames: 1
	},
	enemy_purple : {
		sx: 37,
		sy: 0,
		w: 42,
		h: 43,
		frames: 1
	},
	enemy_bee : {
		sx: 79,
		sy: 0,
		w: 37,
		h: 43,
		frames: 1
	},
	enemy_ship : {
		sx: 116,
		sy: 0,
		w: 42,
		h: 43,
		frames: 1
	},
	enemy_circle : {
		sx: 158,
		sy: 0,
		w: 32,
		h: 33,
		frames: 1
	}
}; // end sprites

var enemies = {
	basic: {
	x: 100,
	y : -50,
	sprite : 'enemy_purple',
	B: 100 ,
	C: 2,
	E: 100
}
};




window.addEventListener("load", function () {
	Game.initialize("game", sprites, startGame);
} );

//starField

var Starfield =  function(speed, opacity, numStars, clear) {
  var stars = document.createElement('canvas');
  stars.width = Game.width;
  stars.height = Game.height;
  var starCtx = stars.getContext('2d');
  var offset = 0;

  if(clear) {
  	starCtx.fillStyle = '#000';
  	starCtx.fillRect(0, 0, stars.width, stars.height);
  }

  starCtx.fillStyle = '#fff';
  starCtx.globalAlpha = opacity;
  for(var i = 0;i < numStars; i++){
	starCtx.fillRect(Math.floor(Math.random()* stars.width),
		             Math.floor(Math.random()* stars.height),
		             2,
		             2

		             );
   }

   this.draw = function( ctx) {
     var intOffset = Math.floor(offset);
     var remaining = stars.height - intOffset;
     if(intOffset > 0){
     	ctx.drawImage(stars, 0, remaining, stars.width, intOffset, 0,0,stars.width, intOffset);

     }
     if(remaining > 0){
     	ctx.drawImage(stars, 0, 0 , stars.width, remaining, 0, intOffset, stars.width, remaining);
     }
   }

   this.step = function( dt) {
     offset += dt* speed;
     offset = offset % stars.height;
   }

}; //end starField





//playerShip

var PlayerShip = function() {
	this.setup('ship', {vx: 0, frame: 1, reloadTime: 0.25, maxVel: 200} );

	this.x = Game.width/2 - this.w/2 ;
	this.y = Game.height - 10 - this.h;



	this.reload = this.reloadTime;

	this.step = function (dt) {
      //TODO
			this.maxVel = 200;
			this.step = function (dt) {
				if(Game.keys['left'] ){
					this.vx = -this.maxVel;
				}
				else if(Game.keys['right']){
					this.vx = this.maxVel;
				}
				else {
					this.vx = 0;
				}
				this.x += this.vx*dt;

				if(this.x < 0){this.x = 0; }
				else if(this.x > Game.width - this.w ) {
					this.x = Game.width - this.w;
				}
				this.reload-= dt;
				if(Game.keys['fire'] && this.reload < 0){
					Game.keys['fire'] = false;
					this.reload = this.reloadTime;
					this.board.add(new PlayerMissile(this.x, this.y + this.h/2));
					this.board.add(new PlayerMissile(this.x + this.w, this.y+ this.h/2));
				}
			}
	};

}
PlayerShip.prototype = new Sprite();

var PlayerMissile = function(x, y) {
	this.setup('missile', {vy: -700} );


	this.x = x - this.w/2;
	this.y = y - this.h;

}
PlayerMissile.prototype = new Sprite();
PlayerMissile.prototype.step = function(dt ){
	this.y += this.vy * dt;
	if(this.y < -this.h) {
		this.board.remove(this);
	}
}



var playGame = function() {
	var board = new GameBoard();

	board.add(new Enemy(enemies.basic));
	board.add(new Enemy(enemies.basic, {x : 200}));
	board.add(new PlayerShip());
	Game.setBoard(3, board);
}

var Enemy = function(blueprint, override) {
	this.merge(this.baseParameters);
	this.setup(blueprint.sprite, blueprint);
	this.merge(override);
} //end enemy

Enemy.prototype = new Sprite();
Enemy.prototype.baseParameters = {A : 0, B: 0, C: 0, D: 0,
											E: 0, F: 0, G: 0, H: 0 , t: 0};
Enemy.prototype.step = function(dt ) {
  this.t += dt;
  this.vx = this.A + this.B * Math.sin(this.C * this.t + this.D);
  this.vy = this.E + this.F * Math.sin(this.G * this.t + this.H);
  this.x += this.vx * dt;
  this.y += this.vy* dt;
  if(this.y > Game.height || this.x < -this.w || this.x > Game.width ) {
  	this.board.remove(this);
  }
}




/////start Game //////
var startGame = function() {
	Game.setBoard(0, new Starfield(20, 0.4, 100, true));
	Game.setBoard(1, new Starfield(50, 0.6, 100));
	Game.setBoard(2, new Starfield(100, 1.0, 50));

	Game.setBoard(3, new TitleScreen('alien invasion', 'press button to start playing', playGame));
};
