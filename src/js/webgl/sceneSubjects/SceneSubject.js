import * as THREE from 'three'
import { gui } from '../utils/tools'

import vertexShader from '../shaders/vertexShader.glsl'
import fragmentShader from '../shaders/fragmentShader.glsl'

export default class SceneSubject {
  constructor (scene) {
    const geometry = new THREE.BoxGeometry(2, 2, 2)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 }
      },
      vertexShader,
      fragmentShader
    })

    this.mesh = new THREE.Mesh(geometry, material)

    // gui
    gui.add(this.mesh.position, 'x').min(-5).max(5).step(0.001)
    gui.add(this.mesh.position, 'y').min(-5).max(5).step(0.001)
    gui.add(this.mesh.position, 'z').min(-5).max(5).step(0.001)

    scene.add(this.mesh)
  }

  update (delta, time) {
    this.mesh.material.uniforms.uTime.value = time
  }
}
