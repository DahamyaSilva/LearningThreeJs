import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {Pane} from 'tweakpane';

//initialize the pane
const pane = new Pane();

const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const torunknotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100,16);
const planeGeometry = new THREE.PlaneGeometry(1,1);

const material = new THREE.MeshPhongMaterial( );
// const material = new THREE.MeshBasicMaterial( );

material.shininess = 100;

// pane.addInput(material, 'shininess', {  
//     min: 0,
//     max: 100,
//     step: 1
// });

material.side = THREE.DoubleSide;

const cubeMesh = new THREE.Mesh(cubeGeometry, material);

const cubeMesh2 = new THREE.Mesh(torunknotGeometry, material);
cubeMesh2.position.x = 1.5;

const planeMesh = new THREE.Mesh(planeGeometry, material);
planeMesh.position.x = -1.5;

scene.add(cubeMesh);
scene.add(cubeMesh2);
scene.add(planeMesh);

//initialize the light
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(1,1,1);
scene.add(pointLight);

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

