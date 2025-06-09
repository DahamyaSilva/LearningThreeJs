import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {Pane} from 'tweakpane';

//initialize the pane
const pane = new Pane();

const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const planeGeometry = new THREE.PlaneGeometry(1,1);

const material = new THREE.MeshBasicMaterial();

material.color = new THREE.Color("cyan");
// material.transparent = true;
// material.opacity = 0.5;
material.side = THREE.DoubleSide;

const fog = new THREE.Fog("white", 1, 10); //parameters are color near and far
scene.fog = fog;
scene.background = new THREE.Color("white");

const cubeMesh = new THREE.Mesh(cubeGeometry, material);

const cubeMesh2 = new THREE.Mesh(cubeGeometry, material);
cubeMesh2.position.x = 1.5;

const planeMesh = new THREE.Mesh(planeGeometry, material);
planeMesh.position.x = -1.5;

scene.add(cubeMesh);
scene.add(cubeMesh2);
scene.add(planeMesh);

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
// controls.autoRotate = true;

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

