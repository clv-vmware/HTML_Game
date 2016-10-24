function trace(){
    cc.log(Array.prototype.join.call(arguments, ", "));
}

var TiledMapLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var map = new cc.TMXTiledMap("res/map.tmx");
        this.addChild(map);

        var layer = map.getLayer("layer1");
        var tile0 = layer.getTileAt(cc.p(1, 1));
        var rotate = cc.rotateBy(2, 360);
        tile0.runAction(rotate);
        var properties = map.getPropertiesForGID(layer.getTileGIDAt(cc.p(3, 2)));
        trace("properties.block", properties.block);

        this.scheduleOnce(function () {
            layer.setTileGID(31, cc.p(0, 0));
        }, 2);
    }
});

screenSize = 10;
tileSize = 32;

var UnlimitedTiledMapLayer = cc.Layer.extend({

    map: null,
    ctor: function () {
        this._super();
        var map = new cc.SpriteBatchNode("res/tile0.png");

        for (var i = 0;i < screenSize;i++) {
            for (var j = 0;j < screenSize;j++) {
                var tile = new cc.Sprite("res/tile" + this.getTileGIDAt(i, j) + ".png");
                tile.x = i * tileSize + tileSize / 2;
                tile.y = j * tileSize + tileSize / 2;

                map.addChild(tile);

            }
        }

        this.map = map;
        this.addChild(map);

        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseMove: this.move.bind(this)
        }, this);
    },

    getTileGIDAt: function (i, j) {
        return 0;
    },

    move: function (event) {
        if (event.getButton() == cc.EventMouse.BUTTON_LEFT) {
            this.map.x += event.getDeltaX();
            this.map.y += event.getDeltaY();

            if (this.map.x / tileSize + this.mapRight - screenSize < 1) {
                for (var i = -this.mapBottom;i < this,mapTop;i++ ) {
                    var tile = new cc.Sprite("res/tile" + this.getTileGIDAt(this.mapRight, i) + ".png");

                    tile.x = this.mapRight * tileSize + tileSize / 2;
                    tile.y = i * tileSize + tileSize / 2;

                    map.addChild(tile);

                }

                this.mapRight++;
            }
        }
    }


});

var ParticleLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        var particleSystem = new cc.ParticleSystem(100);
        this.addChild(particleSystem);
        particleSystem.texture = cc.textureCache.addImage("res/star.png");

        var size = cc.director.getWinSize();
        particleSystem.x = size.width / 2;
        particleSystem.y = size.height / 2;

        particleSystem.posVar = cc.p(0, 0);
        particleSystem.duration = cc.ParticleSystem.DURATION_INFINITY;
        particleSystem.emitterMode = cc.ParticleSystem.MODE_RADIUS;

        particleSystem.startRadius = 0;
        particleSystem.startRadiusVar = 30;
        particleSystem.endRadius = 240;
        particleSystem.endRadiusVar = 30;

        particleSystem.rotatePerS = 180;
        particleSystem.rotatePerSVar = 0;

        particleSystem.angle = 90;
        particleSystem.angleVar = 0;

        particleSystem.life = 10;
        particleSystem.lifeVar = 0;

        particleSystem.startSpin = 0;
        particleSystem.startSpinVar = 0;
        particleSystem.endSpin = 0;
        particleSystem.endSpinVar = 0;

        particleSystem.startColor = cc.color(128, 128, 128, 255);
        particleSystem.startColorVar = cc.color(128, 128, 128, 255);

        particleSystem.endColor = cc.color(128, 128, 128, 50);
        particleSystem.endColorVar = cc.color(26, 26, 26, 50);

        particleSystem.startSize = 32;
        particleSystem.startSizeVar = 0;
        particleSystem.endSize = cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE;
        particleSystem.emissionRate = particleSystem.totalParticles / particleSystem.life;


    }
});

var ParallaxLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        var bg = new cc.ParallaxNode();
        var bg1 = new cc.Sprite("res/bgLayer.jpg");
        var bg2 = new cc.Sprite("res/bgLayer2.png");
        var bg3 = new cc.Sprite("res/bgLayer3.png");
        var bg4 = new cc.Sprite("res/bgLayer4.png");

        bg.addChild(bg1, 1, cc.p(0.1, 0), cc.p(bg1.width / 2, bg1.height / 2));
        bg.addChild(bg2, 2, cc.p(0.3, 0), cc.p(bg2.width / 2, bg2.height / 2));
        bg.addChild(bg3, 3, cc.p(0.5, 0), cc.p(bg3.width / 2, bg3.height / 2));
        bg.addChild(bg4, 4, cc.p(1, 0), cc.p(bg4.width / 2, bg4.height / 2));

        var action = cc.moveBy(1, -200, 0);
        bg.runAction(cc.sequence(action, action.clone().reverse()).repeatForever());

        this.addChild(bg);

    }
});

var UnlimitedParallaxLayer = cc.Layer.extend({

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



            return layer;
        }


        this._bg1 = buildParallaxBackground("res/bgLayer.jpg");
        this.addChild(this._bg1);

        this._bg2 = buildParallaxBackground("res/bgLayer2.png");
        this.addChild(this._bg2);

        this._bg3 = buildParallaxBackground("res/bgLayer3.png");
        this.addChild(this._bg3);

        this._bg4 = buildParallaxBackground("res/bgLayer4.png");
        this.addChild(this._bg4);

        return true;


    },
    
    update: function (dt) {
        var winSize = cc.director.getWinSize();

        this._bg1.x -= Math.ceil(this.speed * 0.1);
        if (this._bg1.x < -parseInt(winSize.width)) {
            this._bg1.x = 0;
        }


        this._bg2.x -= Math.ceil(this.speed * 0.3);
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

var AnimationLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        var size = cc.winSize;
        var man = new cc.Sprite();
        var animation = new cc.Animation();
        for (var i = 0; i < animation_pngs.length; i++) {
            animation.addSpriteFrameWithFile(animation_pngs[i]);
        }
        animation.setDelayPerUnit(1/14);
        var action = cc.animate(animation);
        action.repeatForever();
        man.runAction(action);
        this.addChild(man);
        man.x = size.width/2;
        man.y = size.height/2;
    }
});

var ArmatureLayer = cc.Layer.extend({
    _armature:null,
    _direction:1,
    onEnter:function () {
        this._super();

        var winSize = cc.winSize;
        ccs.armatureDataManager.addArmatureFileInfo("res/DemoPlayer/DemoPlayer.ExportJson");
        this._armature = new ccs.Armature("DemoPlayer");
        this._armature.getAnimation().play("walk_fire");
        this._armature.scaleX = -0.25;
        this._armature.scaleY = 1; // 0.25;
        this._armature.x = winSize.width / 2 - 150;
        this._armature.y = winSize.height / 2;
        this._armature.getAnimation().setMovementEventCallFunc(this.animationEventHandler,this);
        this.addChild(this._armature);

        this._direction = 1;
    },

    animationEventHandler:function (armature, movementType, movementID) {
        if (movementType == ccs.MovementEventType.loopComplete) {
            if (movementID == "walk_fire") {
                var moveBy = cc.moveBy(2, cc.p(300 * this._direction, 0));
                this._armature.stopAllActions();
                this._armature.runAction(cc.sequence(moveBy, cc.callFunc(this.callback, this)));
                this._armature.getAnimation().play("walk");

                this._direction *= -1;
            }
        }
    },

    callback:function () {
        this._armature.runAction(cc.scaleTo(0.1, 0.25 * this._direction * -1, 0.25));
        this._armature.getAnimation().play("walk_fire", 10);
    }
});


var DragonBonesLayer = cc.Layer.extend({

    ctor: function () {
        this._super();

        ccs.armatureDataManager.addArmatureFileInfo("res/dragonbones/skeleton.png", "res/dragonbones/skeleton.plist", "res/dragonbones/skeleton.xml");
        var armature = new ccs.Armature("Dragon");
        armature.getAnimation().play("walk");
        armature.getAnimation().setSpeedScale(24/60);
        this.addChild(armature);
        armature.x = cc.winSize.width/2;
        armature.y = cc.winSize.height/2;
    }
});


var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
//        var layer = new AnimationLayer();
//        var layer = new ArmatureLayer();
        var layer = new UnlimitedTiledMapLayer();
        this.addChild(layer);
    }
});











