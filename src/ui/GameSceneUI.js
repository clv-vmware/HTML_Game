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

        var lifeLabel = new cc.LabelBMFont("LIVES", fnt);
    }
})