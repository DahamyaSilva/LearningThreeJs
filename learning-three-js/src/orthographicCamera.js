import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

//initialize the scene
const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({color: "cyan"});

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.add(cubeMesh);
console.log(scene);

const aspectRatio = window.innerWidth / window.innerHeight;

//initialize the camera (orthographic camera)
const camera = new THREE.OrthographicCamera(
    -1 * aspectRatio, //left
    1 * aspectRatio, //right
    1, //top
    -1, //bottom
    0.1, //near
    200 //far
);


camera.position.z = 5;

//initialize the renerer
const canvas = document.querySelector('canvas.threejs');

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});

renderer.setSize(window.innerWidth , window.innerHeight);


//initialize the controls
const controls = new OrbitControls(camera, canvas);

controls.enableDamping = true;
controls.autoRotate = true;

const renderloop = () => {

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);

}

renderloop();

