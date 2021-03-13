import * as THREE from 'three'

export default class SceneSubject {
  constructor (scene) {
    const geometry = new THREE.BoxGeometry(2, 2, 2)
    const material = new THREE.MeshNormalMaterial()

    this.mesh = new THREE.Mesh(geometry, material)

    scene.add(this.mesh)
  }

  update (delta, time) {}
}
