
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);


        return true;
    }
});

var BallLayer = cc.Layer.extend({
    deltaX: 1,
    ball: null,
    frame: 0,
    bg: null,
    
    ctor: function () {
        this._super();

        var size = cc.director.getWinSize();
        var ball = new cc.Sprite(res.Profile_jpg);
        ball.x = 0;
        ball.y = size.height / 2;
        this.addChild(ball, 1);
        this.ball = ball;

        this.bg = new cc.DrawNode();
        this.addChild(this.bg);

        // this.scheduleUpdate();
        return true;
    },

    update: function () {
        var size = cc.director.getWinSize();
        this.ball.x += this.deltaX;

        if (this.ball.x >= size.width || this.ball.x <= 0) {
            this.deltaX *= -1;
        }

        this.ball.y = Math.sin(this.frame / 20) * 50 + size.height / 2;
        this.bg.drawDot(new cc.Point(this.ball.x, this.ball.y), 2, cc.color(255, 0, 0));
        this.frame++;

    }
});

var SimpleActionLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        var size = cc.director.getWinSize();
        var ball = new cc.Sprite(res.Profile_jpg);
        ball.x = 0;
        ball.y = size.height / 2;
        this.addChild(ball, 1);

        var action = cc.moveBy(2, cc.p(size.width / 2, 0));
        var reverse = cc.reverse(action);
        var seq = cc.sequence(action, reverse);
        ball.runAction(seq);
        return true;
    }
});

var TrickyActionLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        var size = cc.director.getWinSize();
        var ball = new cc.Sprite(res.Profile_jpg);
        ball.x = 0;
        ball.y = size.height / 2;
        this.addChild(ball, 1);

        var action = cc.moveBy(2, 0, -(size.height - ball.height / 2));
        action.easing(cc.easeIn(2));
        var back = action.clone().reverse();
        back.easing(cc.easeBounceIn());
        ball.runAction(cc.sequence(action, back));
    }
});

var ControlActionLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        var size = cc.director.getWinSize();
        var ball = new cc.Sprite(res.Profile_jpg);
        ball.x = 0;
        ball.y = size.height / 2;
        this.addChild(ball, 1);

        var action = cc.moveBy(1, cc.p(size.width / 2, 0));
        var callback = cc.callFunc(this.callback, this, "message");
        var sequence = cc.sequence(action, callback);
        ball.runAction(sequence);

        // cc.audioEngine.playMusic(res.newsAudio, true);

        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMounseDown: function (event) {
                var pos = evnet.getLocation();
                var target = event.getCurrentTarget();
                if (event.getButton() === cc.EventMouse.BUTTON_RIGHT) {
                    trace("onRightMouseDown at" + pos.x + " " + pos.y);
                }
                else if (event.getButton() === cc.EventMouse.BUTTON_LEFT) {
                    trace("onLeftMouseDown at", pos.x + " " + pos.y);
                }
            },
            onMouseMove: function (event) {
                
            },
            onMouseUp: function (event) {

            }

        }, this);


        return true;
    },

    callback: function(nodeExcutingAction, data) {
        trace(nodeExcutingAction instanceof cc.Sprite, data);
    }
});

var MouseEventLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        if ('mouse' in cc.sys.capabilities) {
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan: function (event) {
                    var pos = event.getLocation();
                    var target = event.getCurrentTarget();
                    if (event.getButton() === cc.EventMouse.BUTTON_RIGHT) {
                        // trace("onRightMouseDown at" + pos.x + " " + pos.y);
                    }
                    else if (event.getButton() === cc.EventMouse.BUTTON_LEFT) {
                        // trace("onLeftMouseDown at", pos.x + " " + pos.y);
                    }
                },
                onMouseMove: function (event) {
                    var pos = event.getLocation(), target = event.getCurrentTarget();
                    // trace("onMouseMove at: " + pos.x + " " + pos.y );
                },

                onMouseUp: function () {
                    var pos = event.getLocation(), target = event.getCurrentTarget();
                    // trace("onMouseUp at: " + pos.x + " " + pos.y );
                }

            }, this);

        }
    }
});

var AccelerometerLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        var winSize = cc.director.getWinSize();

        if ('accelerometer' in cc.sys.capabilities) {
            cc.inputManager.setAccelerometerInterval(1 / 30);
            cc.inputManager.setAccelerometerEnabled(true);

            cc.eventManager.addListener({
                event: cc.EventListener.ACCELERATION,
                callback: function (accelerometerInfo, event) {
                    var target = event.getCurrentTarget();
                    cc.log('Accel x:' + accelerometerInfo.x + 'y: ' + accelerometerInfo.y + 'z: ' + accelerometerInfo.z + 'timestamp' + accelerometerInfo.timestamp);

                    var w = winSize.width;
                    var h = winSize.height;

                    var x = w * accelerometerInfo.x + w / 2;
                    var y = w * accelerometerInfo.y + h / 2;

                    x = x *0.2 + target._prevX * 0.8;
                    y = y* 0.2 + target._prevY * 0.8;
                }
            })
        }
    }
});

var ResumeLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.scheduleUpdate();
        this.schedule(this.scheduleTest, 1);
        this.scheduleOnce(this.scheduleOnceTest, 3);

        setTimeout(function () {
            trace("pause", this.currentTime());
            this.pause();
        }.bind(this), 2000);

        setTimeout(function () {
            trace("resume", this.currentTime());
            this.pause();
        }.bind(this), 5000);

        trace(this.currentTime());
        this.frame = 0;
    },
    update: function () {
        this.frame++;
        if (this.frame % 30 == 0) {
            trace("update 30 times");
        }
    },

    scheduleTest: function () {
        trace("scheduleTest", this.currentTime());
    },

    scheduleOnceTest: function () {
        trace("scheduleOnceTest", this.currentTime());
    },

    currentTime: function () {
        return parseInt(new Date().getTime() / 1000);
    }
});

var InaccuracyTestLayer = cc.Layer.extend({
    
    ctor: function () {
        this._super();
        var startTime = new Date().getTime();
        var count = 0;
        this.schedule(function () {
            var timePass = new Date().getTime() - startTime;
            count++;
            var delta = timePass - (count * 100);
            trace();
        }, 0.1);
    }
});


var MenuItemSpriteLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        var spriteNormal = new cc.Sprite(res.Profile_jpg);
        var spriteSelected = new cc.Sprite(res.Profile_jpg);
        var spriteDisabled = new cc.Sprite(res.Profile_jpg);
        var menuSprite = new cc.MenuItemSprite(spriteNormal, spriteSelected, spriteDisabled, this.startGame, this);

        var menu = new cc.Menu(menuSprite);
        this.addChild(menu);
        menuSprite.setEnabled(false); // disable the button
        // menuSprite.setEnabled(true)
    },
    
    startGame: function () {
        trace("this is MenuItemSpriteLayer ?", this instanceof MenuItemSpriteLayer);
    }
});

var trace = function () {
    cc.log(Array.prototype.join.call(arguments, ", "));
};

var MenuItemFontLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        var menuFont = new cc.MenuItemFont("START GAME", this.startGame, this);
        menuFont.fontSize = 32;
        menuFont.fontName = "Arial";
        var menu = new cc.Menu(menuFont);
        this.addChild(menu);
    },
    
    startGame: function () {
        trace("start game button clicked!");
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuItemFontLayer();
        this.addChild(layer);


    }
});


