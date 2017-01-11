EarthApp = function () {
    Sim.App.call(this);
}

// inherit
EarthApp.prototype = new Sim.App();

EarthApp.prototype.init = function (param) {
    Sim.App.prototype.init.call(this, param);

    var earth = new Earth();
    earth.init();
    // this.addObject(earth);

    var sun = new Sun();
    sun.init();
    this.addObject(sun);

    var saturn = new Saturn();
    saturn.init();
    // this.addObject(saturn);

    var stars = new Stars();
    stars.init(5);
    // this.addObject(stars);

    var orbit = new Orbit();
    orbit.init(100);
    // this.addObject(orbit);
    this.camera.position.set(0, 0, 66);
    this.root.rotation.x = Math.PI / 6;

    console.log(this.camera.position);
}

