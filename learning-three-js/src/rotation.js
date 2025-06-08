import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({color: "cyan", wireframe: true});
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.add(cubeMesh);

//by default the rotation occurs in X-Y-Z order
//This is used to reorder the desired order 
cubeMesh.rotation.reorder('YXZ');

//add the desired rotaion in degrees and it automatically converts it into radients
cubeMesh.rotation.x  = THREE.MathUtils.degToRad(45); 
cubeMesh.rotation.y  = THREE.MathUtils.degToRad(90); 

const axesHelper = new THREE.AxesHelper(2);
cubeMesh.add(axesHelper);

const camera = new THREE.PerspectiveCamera(
  35, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  30 
);

camera.position.z = 5;

const canvas = document.querySelector('canvas.threejs');

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true 
});

renderer.setSize(window.innerWidth , window.innerHeight);

const maxPixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(maxPixelRatio);

const controls = new OrbitControls(camera, canvas);

controls.enableDamping = true;

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth , window.innerHeight);
});

const renderloop = () => {

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);

}

renderloop();

