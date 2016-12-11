/**
 * Created by lvyuanyuan on 16/10/29.
 */

var GameSceneUI = cc.Layer.extend({
    _lifeText: null,
    _distanceText: null,
    _scoreText: null,

    ctor: function () {
        this._super();

        var fnt = "res/fonts/font.fnt";
        var winSize = cc.director.getWinSize();

        var lifeLabel = new cc.LabelBMFont("L I V E S", fnt);
        this.addChild(lifeLabel);
        lifeLabel.x = 360;
        lifeLabel.y = winSize.height - 25;

        this._lifeText = new cc.LabelBMFont("0", fnt);
        this.addChild(this._lifeText);
        this._lifeText.x = 360;
        this._lifeText.y = winSize.height - 60;

        var distanceLabel = new cc.LabelBMFont("D I S T A N C E", fnt);
        this.addChild(distanceLabel);
        distanceLabel.x = 680;
        distanceLabel.y = winSize.height - 25;

        this._distanceText = new cc.LabelBMFont("50", fnt);
        this.addChild(this._distanceText);
        this._distanceText.x = 680;
        this._distanceText.y = winSize.height - 60;

        var scoreLabel = new cc.LabelBMFont("S C O R E", fnt);
        this.addChild(scoreLabel);
        scoreLabel.x = 915;
        scoreLabel.y = winSize.height - 25;

        this._scoreText = new cc.LabelBMFont("100", fnt);
        this.addChild(this._scoreText);
        this._scoreText.x = 915;
        this._scoreText.y = winSize.height - 60;

        var pauseButton = new cc.MenuItemImage("#pauseButton.png", "#pauseButton.png", this._pauseResume);
        var soundButton = new SoundButton();
        var menu = new cc.Menu(soundButton, pauseButton);
        menu.alignItemsHorizontallyWithPadding(30);
        menu.x = 80;
        menu.y = winSize.height - 45;
        this.addChild(menu);

        return true;


    },

    _pauseResume: function () {
        if (cc.director.isPaused()) {
            cc.director.resume();
        }
        else
            cc.director.pause();
    },
    
    update: function () {
        this._lifeText.setString(Game.user.lives.toString());
        this._distanceText.setString(parseInt(Game.user.distance.toString()));
        this._scoreText.setString(Game.user.score.toString());
    }
});

var GameBackground = cc.Layer.extend({
    _bg1: null,
    _bg2: null,
    _bg3: null,
    _bg4: null,

    speed: 5,
    
    ctor: function () {
        this._super();
        this.scheduleUpdate();

        var buildParallaxBackground = function (texture) {
            var layer = new cc.Layer();
            var bg1 = new cc.Sprite(texture);
            bg1.x = bg1.width / 2;
            bg1.y = bg1.height / 2;
            layer.addChild(bg1);

            var bg2 = new cc.Sprite(texture);
            bg2.x = bg2.width / 2 + bg2.width;
            bg2.y = bg2.height / 2;
            layer.addChild(bg2);

            return layer;


        }

        // sky
        this._bg1 = buildParallaxBackground("res/graphics/bgLayer.jpg");
        this.addChild(this._bg1);

        this._bg2 = buildParallaxBackground("#bgLayer2.png");
        this.addChild(this._bg2);

        this._bg3 = buildParallaxBackground("#bgLayer3.png");
        this.addChild(this._bg3);

        this._bg4 = buildParallaxBackground("#bgLayer2.png");
        this.addChild(this._bg4);

        return true;
    },
    
    update: function () {
        var winSize = cc.director.getWinSize();
        this._bg1.x -= Math.ceil(this.speed * 0.02);
        if (this._bg1.x < -parseInt(winSize.width)) {
            this._bg1.x = 0;
        }

        this._bg2.x -= Math.ceil(this.speed * 0.2);
        if (this._bg2.x < -parseInt(winSize.width)) {
            this._bg2.x = 0;
        }

        this._bg3.x -= Math.ceil(this.speed * 0.5);
        if (this._bg3.x < -parseInt(winSize.width)) {
            this._bg3.x = 0;
        }

        this._bg4.x -= Math.ceil(this.speed * 1);
        if (this._bg4.x < -parseInt(winSize.width)) {
            this._bg4.x = 0;
        }
    }

});