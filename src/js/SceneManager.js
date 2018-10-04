import * as THREE from 'three';

// subjects
import GeneralLights from './sceneSubjects/GeneralLights';
import SceneSubject from './sceneSubjects/SceneSubject';

export default class SceneManager {

  clock = new THREE.Clock();
  
  buildScene = () => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000');

    return scene;
  }

  buildRender = ({ width, height }) => {
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true, 
      alpha: true 
    });
    const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    return renderer;
  }

  buildCamera = ({ width, height }) => {
    const aspectRatio = width / height;
    const fieldOfView = 60;
    const nearPlane = 1;
    const farPlane = 100;
    const camera = new THREE.PerspectiveCamera(
      fieldOfView, 
      aspectRatio, 
      nearPlane, 
      farPlane
    );

    return camera;
  }

  createSceneSubjects = scene => {
    const sceneSubjects = [
      new GeneralLights(scene),
      new SceneSubject(scene)
    ];

    return sceneSubjects;
  }

  constructor(canvas) {
    this.canvas = canvas;
    this.screenDimentions = {
      width: this.canvas.width,
      height: this.canvas.height
    }
  
    this.scene = this.buildScene();
    this.renderer = this.buildRender(this.screenDimentions);
    this.camera = this.buildCamera(this.screenDimentions);
    this.sceneSubjects = this.createSceneSubjects(this.scene);
  }

  update() {
    const elapsedTime = this.clock.getElapsedTime();

    this.sceneSubjects.map(subject => subject.update(elapsedTime));

    this.renderer.render(
      this.scene, 
      this.camera
    );
  }

  resizeHandler() {
    const { width, height } = this.canvas;

    this.screenDimentions = { width, height };

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

}