/**
 * Created by lvyuanyuan on 17/1/3.
 */
Sun = function () {
    Sim.Object.call(this);
}

Sun.prototype = new Sim.Object();

Sun.prototype.init = function () {
    var light = new THREE.PointLight(0xffffff, 2, 100);
    light.position.set(-10, 0, 20);

    this.setObject3D(light);
}