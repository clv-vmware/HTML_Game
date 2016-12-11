/**
 * Created by lvyuanyuan on 16/10/29.
 */

var GameScene = cc.Scene.extend({
    _hero: null,
    _ui: null,
    _background: null,
    itemBatchLayer: null,
    _touchY: null,

    ctor: function () {
        this._super();
        var layer = new cc.Layer();
        this.addChild(layer);

        this._background = new GameBackground();
        layer.addChild(this._background);

        this._hero = new Hero();
        this.addChild(this._hero);

        this.itemBatchLayer = new cc.SpriteBatchNode("res/graphics/texture.png");
        this.addChild(this.itemBatchLayer);

        this._ui = new GameSceneUI();
        this.addChild(this._ui);
        this._ui.update();

        this.init();

        return true;
    },
    
    init: function () {
        Sound.stop();
        Sound.playGameBgMusic();

        var winSize = cc.director.getWinSize();
        Game.user.lives = GameConstants.HERO_LIVES;
        Game.user.score = Game.user.distance = 0;
        Game.gameState = GameConstants.GAME_STATE_IDLE;
        Game.user.heroSpeed = this._background.speed = 0;

        this._hero.x = -winSize.width / 2;
        this._hero.y = -winSize.height / 2;
        this._touchY = winSize.height / 2;

        this.scheduleUpdate();
    },
    
    _onMouseMove: function () {
        if (Game.gameState != GameConstants.GAME_STATE_OVER)
            this._touchY = event.getLocationY();
    },

    _handleHeroPose: function() {
        var winSize = cc.director.getWinSize();
        if (Math.abs(-(this._hero.y - this._touchY) * 0.2) < 30) {
            this._hero.setRotation((this._hero.y - this._touchY) * 0.2);
        }

        if (this._hero.y < this._hero.height * 0.5) {
            this._hero.y = this._hero.height * 0.5;
            this._hero.setRotation(0);
        }
    },

    update: function (elapsed) {
        var winSize = cc.director.getWinSize();
        switch (Game.gameState) {
            case GameConstants.GAME_STATE_IDLE:
                if (this._hero.x < winSize.width * 0.5 * 0.5) {
                    this._hero.x += ((winSize.width * 0.5 * 0.5 + 10) - this._hero.x) * 0.05;
                    this._hero.y -= (this._hero.y - this._touchY) * 0.1;

                    Game.user.heroSpeed += (GameConstants.HERO_MIN_SPEED - Game.user.heroSpeed) * 0.05;

                    this._background.speed = Game.user.heroSpeed * elapsed;
                }
                else {
                    Game.gameState = GameConstants.GAME_STATE_FLYING;
                    this._hero.state = GameConstants.HERO_STATE_FLYING;
                }
                this._handleHeroPose();
                this._ui.update();
                break;

        }





        // callback
        if ("touches" in cc.sys.capabilities) {
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesMoved: this._onTouchMoved.bind(this)
            }, this);
        }
        else {
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseMove: this._onMouseMove.bind(this)
            }, this);
        }
    }
});