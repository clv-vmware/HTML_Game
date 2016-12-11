/**
 * Created by lvyuanyuan on 16/10/29.
 */


var Hero = cc.Sprite.extend({
    _animation: null,
    state: 0,
    _fast: false,


    ctor: function () {
        this._super("#fly_0001.png");
        this._animation = new cc.Animation();
        for (var i = 1;i < 20;i++ ) {
            this._animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("fly_00" + (i < 10 ? ('0' + i) : (i)) + ".png"));
        }

        this._animation.setDelayPerUnit(1 / 20);
        var action = cc.animate(this._animation).repeatForever();
        this.runAction(action);

        return true;

    },

    toggleSpeed: function (fast) {
        if (fast == this._fast) {
            return;
        }
        this._fast = fast;

        this.stopAllActions();
        if (!fast) {
            this._animation.setDelayPerUnit(1 / 20);
        }
        else {
            this._animation.setDelayPerUnit(1 / 60);
        }

        var action = cc.animate(this._animation).repeatForever();
        this.runAction(action);
    },
    
    init: function () {
        Sound.stop();
        Sound.playGameBgMusic();

        var winSize = cc.director.gatWinSize();
        Game.user.lives = GameConstants.HERO_LIVES;
        Game.user.score = Game.user.distance = 0;
        Game.gameState = GameConstants.GAME_STATE_IDLE;
        Game.user.heroSpeed = this._background.speed = 0;

        this._hero.x = -winSize.width / 2;
        this._hero.y = -winSize.height / 2;
    },
    
    update: function () {
        var winSize = cc.director.getWinSize();
        switch (Game.gameState) {
            case GameConstants.GAME_STATE_IDLE:
                if (this._hero.x < winSize.width * 0.5 * 0.5) {
                    this._hero.x += ((winSize.width * 0.5 * 0.5 + 10) - this._hero.x) * 0.05;
                    Game.user.heroSpeed += (GameConstants.HERO_MIN_SPEED - Game.user.heroSpeed) * 0.05;
                    this._background.speed = Game.user.heroSpeed * elapsed;
                }
                else {
                    Game.gameState = GameConstants.GAME_STATE_FLYING;
                    this._hero.state = GameConstants.HERO_STATE_FLYING;

                }
                this._ui.update();
                break;

        }
    }




}); 