// Custom Moon class
Moon = function()
{
    Sim.Object.call(this);
}

Moon.prototype = new Sim.Object();

Moon.prototype.init = function()
{
    var MOONMAP = "./res/moon_1024.jpg";

    var geometry = new THREE.SphereGeometry(Moon.SIZE_IN_EARTHS, 32, 32);
    var texture = THREE.ImageUtils.loadTexture(MOONMAP);
    var material = new THREE.MeshPhongMaterial( { map: texture,
        ambient:0x888888 } );
    var mesh = new THREE.Mesh( geometry, material );

    // Let's get this into earth-sized units (earth is a unit sphere)
    var distance = Moon.DISTANCE_FROM_EARTH / Earth.RADIUS;
    mesh.position.set(Math.sqrt(distance / 2), 0, -Math.sqrt(distance / 2));

    // Rotate the moon so it shows its moon-face toward earth
    mesh.rotation.y = Math.PI;

    // Create a group to contain Earth and Satellites
    var moonGroup = new THREE.Object3D();
    moonGroup.add(mesh);

    // Tilt to the ecliptic
    moonGroup.rotation.x = Moon.INCLINATION;

    // Tell the framework about our object
    this.setObject3D(moonGroup);

    // Save away our moon mesh so we can rotate it
    this.moonMesh = mesh;
}

Moon.prototype.update = function()
{
    // Moon orbit
    this.object3D.rotation.y += (Earth.ROTATION_Y / Moon.PERIOD);

    Sim.Object.prototype.update.call(this);
}

Moon.DISTANCE_FROM_EARTH = 356400;
Moon.PERIOD = 28;
Moon.EXAGGERATE_FACTOR = 1.2;
Moon.INCLINATION = 0.089;
Moon.SIZE_IN_EARTHS = 1 / 3.7 * Moon.EXAGGERATE_FACTOR;
