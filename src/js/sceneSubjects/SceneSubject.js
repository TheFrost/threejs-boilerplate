import * as THREE from 'three';

export default class SceneSubject {

  speed = 0.2;

  constructor(scene) {
    this.mesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2, 1),
      new THREE.MeshStandardMaterial({ flatShading: true })
    );
    this.mesh.position.set(0, 0, -20);

    scene.add(this.mesh);
  }

  update(delta, time) {
    const scale = Math.sin(time) + 3;

    this.mesh.scale.set(scale, scale, scale);
    this.mesh.rotation.y += this.speed * delta;
  }

}