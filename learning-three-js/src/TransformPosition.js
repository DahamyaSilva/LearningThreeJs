import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

//initialize the scene
const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({color: "cyan"});
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh.position.y = -1;

//adding more meshes
const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh2.position.x = 2;
const cubeMesh3 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh3.position.x = -2;

//creating a group
const  group = new THREE.Group();
group.add(cubeMesh);
group.add(cubeMesh2);
group.add(cubeMesh3);

group.position.y = 2;

scene.add(group);

// scene.add(cubeMesh);

//adding scales to change the scale of the object
cubeMesh.scale.set(1,1,1);

//vector 3
// const tempVector = new THREE.Vector3(0, 0, 0);
// cubeMesh.position.copy(tempVector);

//added axes helper
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

console.log(cubeMesh.position.distanceTo(camera.position));

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

