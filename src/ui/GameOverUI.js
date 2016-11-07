/**
 * Created by lvyuanyuan on 16/10/29.
 */

var GameOverUI = cc.Layer.extend({

    _distanceText:null,
    _scoreText:null,
    _gameScene:null,

    ctor: function () {
        this._super(gameScene);
        this._gameScene = gameScene;

        var winSize = cc.director.getWinSize();
        var bg = new cc.LayerColor(cc.color(0,0,0,200), winSize.width, winSize.height);
        this.addChild(bg);

        var fnt = "res/fonts/font.fnt";
        var title = new cc.LabelBMFont("HERO WAS KILLED!", fnt);
        this.addChild(title);
        title.setColor(cc.color(243,231,95));
        title.x = winSize.width/2;
        title.y = winSize.height - 120;

        this._distanceText = new cc.LabelBMFont("DISTANCE TRAVELLED: 0000000", fnt);
        this.addChild(this._distanceText);
        this._distanceText.x = winSize.width/2;
        this._distanceText.y = winSize.height - 220;

        this._scoreText = new cc.LabelBMFont("SCORE: 0000000", fnt);
        this.addChild(this._scoreText);
        this._scoreText.x = winSize.width/2;
        this._scoreText.y = winSize.height - 270;
    },

    init:function(){
        this._distanceText.setString("DISTANCE TRAVELLED: " + parseInt(Game.user.distance));
        this._scoreText.setString("SCORE: " + Game.user.score);
    },


})
