import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

//first three parameters for the box are width, height and depth
//second three parameters are width Segment, height Segment, depth Segment,
// const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);

const geometry = new THREE.SphereGeometry(1,16,16);
// const geometry = new THREE.PlaneGeometry(1,1,2,2);
// const geometry = new THREE.TorusKnotGeometry(10,3,100, 16);

//create custom geometry //creating a triangle 
// const vertices = new Float32Array([

// //x, y, z
//   0, 0, 0, //vertex 1
//   0, 2, 0, //vertex 2
//   2, 0, 0  //vertex 3
// ]); 

// const bufferAttribute = new THREE.BufferAttribute(vertices, 3);

// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute('position', bufferAttribute);


const cubeMaterial = new THREE.MeshBasicMaterial({color: "cyan", wireframe: true});

// const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
const cubeMesh = new THREE.Mesh(geometry, cubeMaterial);

scene.add(cubeMesh);

const camera = new THREE.PerspectiveCamera(
  35, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  30 
);

camera.position.z = 25;

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

