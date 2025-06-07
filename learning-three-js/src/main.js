import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

//initialize the scene
const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({color: "cyan"});

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.add(cubeMesh);
console.log(scene);

//initialize the camera(Perspective camera)
const camera = new THREE.PerspectiveCamera(
  35, //fov - field of view
  window.innerWidth / window.innerHeight, //aspect
  0.1, //near clipping plane - anything closer than this will be not visible
  30 //far clipping plane - anything far than this will also not be visible
);

camera.position.z = 5;
//scene.add(camera);

//initialize the renerer
const canvas = document.querySelector('canvas.threejs');

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true //------- This can be used to get rid of the aliasing problem
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

