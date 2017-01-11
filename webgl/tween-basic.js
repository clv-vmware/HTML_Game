/**
 * Created by lvyuanyuan on 17/1/9.
 */
TweenApp = function () {
    Sim.App.call(this);
}

TweenApp.prototype = new Sim.App();

TweenApp.prototype.init = function (param) {
    Sim.App.prototype.init.call(this, param);

    var light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 0, 20);
    this.scene.add(light);

    this.camera.position.set.z = 6.667;

    var movingBall = new MovingBall();
    movingBall.init();
    // 添加看的见的 使用addObject， 其余用this.scene.add()
    this.addObject(movingBall);

    this.movingBall = movingBall;
}

TweenApp.prototype.update = function () {
    // !必须调用
    TWEEN.update();

    Sim.App.prototype.update.call(this);
}

TweenApp.prototype.handleMouseUp = function (x, y) {
    this.movingBall.animate();
}

MovingBall = function () {
    Sim.Object.call(this);
}
MovingBall.prototype = new Sim.Object();

MovingBall.prototype.init = function () {
    var BALL_TEXTURE = './res/ball_texture.jpg';
    var geometry = new THREE.SphereGeometry(0.2, 32, 32);
    var material = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture(BALL_TEXTURE)
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 0;
    this.setObject3D(mesh);
}

MovingBall.prototype.animate = function () {
    var newpos, easefn;
    if (this.object3D.position.y > 0) {
        newpos = this.object3D.position.y - 6.667;
        easefn = MovingBall.useBounceFunction ? TWEEN.Easing.Bounce.EaseOut: TWEEN.Easing.Quadratic.EaseOut;
    }
    else {
        newpos = this.object3D.position.x + 6.667;
        easefn = MovingBall.useBounceFunction ? TWEEN.Easing.Bounce.EaseIn: TWEEN.Easing.Quadratic.EaseIn;
    }
    new TWEEN.Tween(this.object3D.position).to({
        y: newpos,
    }, 2000).start();
}

MovingBall.useBounceFunction = true;


















