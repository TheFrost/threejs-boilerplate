import * as THREE from 'three';

// shaders
import vertexShader from '../../shaders/vertexShader.glsl';
import fragmentShader from '../../shaders/fragmentShader.glsl';

export default class SceneSubject {

  constructor(scene) {
    const geometry = new THREE.IcosahedronGeometry(5, 1);
    geometry.computeFlatVertexNormals();

    const material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: {
          type: 'f',
          value: 0
        }
      },
      side: THREE.DoubleSide
    });

    this.mesh = new THREE.Mesh(geometry, material);

    scene.add(this.mesh);
  }

  update(delta, time) {
    const { uniforms } = this.mesh.material;
    uniforms.time.value = time * 2;

    this.mesh.rotation.y += delta * 0.1;
  }

}