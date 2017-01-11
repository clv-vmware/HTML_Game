/**
 * Created by lvyuanyuan on 17/1/11.
 */
MaterialApp = function () {
    Sim.App.call(this);
}

MaterialApp.prototype = new Sim.App();

MaterialApp.prototype.init = function (param) {
    Sim.App.prototype.init.call(this, param);

    var ambientLight = new THREE.AmbientLight(0x444444);
    this.scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-.3333, 1, .777).normalize();
    this.scene.add(directionalLight);
    this.directionalLight = directionalLight;

    this.camera.position.set(0, 3.333, 6.667);
    this.camera.lookAt(this.root.position);

    this.createGrid();
    this.createObjects();
    this.createAnimations();

}

MaterialApp.prototype.createGrid = function () {
    var line_material = new THREE.LineBasicMaterial({ color: 0xaaaaaa, opacity: 0.8}),
        geometry = new THREE.Geometry(),
        floor = -2, step = 1, size = 66;

    for (var i = 0;i <= size / step * 2;i++) {
        geometry.vertices.push(new THREE.Vector3(-size, floor, i * step - size ));
        geometry.vertices.push(new THREE.Vector3(size, floor, i * step - size ));

        geometry.vertices.push(new THREE.Vector3(i * step -size, floor, -size ));
        geometry.vertices.push(new THREE.Vector3(i * step -size, floor, size ));
    }

    var grid = new THREE.Line(geometry, line_material, THREE.LinePieces);
}