/**
 * Created by lvyuanyuan on 16/10/29.
 */

var AboutScene = cc.Scene.extend({
    ctor: function () {
        this._super();
        var layer = new cc.Layer();
        this.addChild(layer);

        var winSize = cc.director.getWinSize();
        var bgWelcome = new cc.Sprite("res/graphics/bgWelcome.jpg");
        bgWelcome.x = winSize.width / 2;
        bgWelcome.y = winSize.height / 2;
        layer.addChild(bgWelcome);

        var aboutText = "This is the about paragraph...";
        var helloLabel = new cc.LabelTTF(aboutText, "Arial", 18);
        helloLabel.x = winSize.width /2;
        helloLabel.y = winSize.height / 2 + 80;
        layer.addChild(helloLabel);

        var backButton = new cc.MenuItemImage("#about_backButton.png", "#about_backButton.png" , this._back);
        backButton.x = 150;
        backButton.y = -70;
        var menu = new cc.Menu(backButton);
        layer.addChild(menu);
        return true;
    },

    _back: function () {
        Sound.playCoffee();
        cc.director.runScene(new MenuScene());
    }
});