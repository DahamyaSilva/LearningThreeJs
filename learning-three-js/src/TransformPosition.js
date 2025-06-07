import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

//initialize the scene
const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({color: "cyan"});
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubeMesh);

cubeMesh.position.y = 1;
cubeMesh.position.x = 1;


const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

//initialize the camera(Perspective camera)
const camera = new THREE.PerspectiveCamera(
  35, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  30 
);

camera.position.z = 5;


//initialize the renerer
const canvas = document.querySelector('canvas.threejs');

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true 
});

renderer.setSize(window.innerWidth , window.innerHeight);

const maxPixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(maxPixelRatio);

//initialize the controls
const controls = new OrbitControls(camera, canvas);

controls.enableDamping = true;
controls.autoRotate = true;

//event listener to deal with resizing
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

