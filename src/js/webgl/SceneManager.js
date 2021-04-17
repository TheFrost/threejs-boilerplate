import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'stats.js'

// subjects
import SceneSubject from './sceneSubjects/SceneSubject'

export default class SceneManager {
  clock = new THREE.Clock()

  buildScene = () => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#000')

    return scene
  }

  buildRender = ({ width, height }) => {
    const { canvas } = this

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    })
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    )
    renderer.setSize(width, height)

    return renderer
  }

  buildCamera = ({ width, height }) => {
    const aspectRatio = width / height
    const fieldOfView = 50
    const nearPlane = 0.1
    const farPlane = 100
    const camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    )
    camera.position.z = 5
    camera.position.y = 1

    return camera
  }

  buildHelpers = () => {
    const gridHelper = new THREE.GridHelper(10, 10)
    this.scene.add(gridHelper)
    const axesHelper = new THREE.AxesHelper(5)
    this.scene.add(axesHelper)
  }

  buildStats = () => {
    this.stats = new Stats()
    document.body.appendChild(this.stats.dom)
  }

  buildOrbitControls = (camera, domElement) => {
    const controls = new OrbitControls(camera, domElement)
    controls.enableDamping = true

    return controls
  }

  createSceneSubjects = scene => {
    const sceneSubjects = [
      new SceneSubject(scene)
    ]

    return sceneSubjects
  }

  constructor (canvas, debugMode = false) {
    this.debugMode = debugMode
    this.canvas = canvas
    this.screenDimentions = {
      width: this.canvas.width,
      height: this.canvas.height
    }

    this.scene = this.buildScene()
    this.renderer = this.buildRender(this.screenDimentions)
    this.camera = this.buildCamera(this.screenDimentions)
    this.buildHelpers()
    this.sceneSubjects = this.createSceneSubjects(this.scene)
    this.orbitControls = this.buildOrbitControls(this.camera, this.renderer.domElement)
    if (debugMode) {
      this.buildStats()
    }
  }

  update () {
    if (this.debugMode) this.stats.begin()

    const delta = this.clock.getDelta()
    const elapsed = this.clock.getElapsedTime()

    this.sceneSubjects.map(s => s.update ? s.update(delta, elapsed) : null)

    this.renderer.render(
      this.scene,
      this.camera
    )

    this.orbitControls.update()

    if (this.debugMode) this.stats.end()
  }

  resizeHandler () {
    const { width, height } = this.canvas

    this.screenDimentions = { width, height }

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()

    this.renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    )
    this.renderer.setSize(width, height)
  }
}
