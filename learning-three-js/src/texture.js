import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {Pane} from 'tweakpane';

//initialize the pane
const pane = new Pane();

const scene = new THREE.Scene();

//initialize the texture loader
const textureLoader = new THREE.TextureLoader(); 

//initialize geometry
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const torunknotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100,16);
const planeGeometry = new THREE.PlaneGeometry(1,1);
const sphereGeometry = new THREE.SphereGeometry(0.5,32,32); //radius width height
const cylinderGeometry =  new THREE.CylinderGeometry(0.5, 0.5, 1, 32)

//initialize the texture
const grassTexture = textureLoader.load('/static/textures/space-cruiser-panels2-bl/space-cruiser-panels2_albedo.png');
grassTexture.repeat.set(2, 2);
// grassTexture.wrapS = THREE.MirroredRepeatWrapping
// grassTexture.wrapT = THREE.MirroredRepeatWrapping

grassTexture.wrapS = THREE.RepeatWrapping
grassTexture.wrapT = THREE.RepeatWrapping


//initialize the material 
const material = new THREE.MeshBasicMaterial( );
// material.color = new THREE.Color('cyan');
material.map = grassTexture;

//initialize a group 
const group = new THREE.Group() 

material.side = THREE.DoubleSide;

const cubeMesh = new THREE.Mesh(cubeGeometry, material);

const cubeMesh2 = new THREE.Mesh(torunknotGeometry, material);
cubeMesh2.position.x = 1.5;

const planeMesh = new THREE.Mesh(planeGeometry, material);
planeMesh.position.x = -1.5;

//this is another way to add materials
const sphere = new THREE.Mesh();
sphere.geometry = sphereGeometry;
sphere.material = material;
sphere.position.y = 1.5;

const cylinder = new THREE.Mesh();
cylinder.geometry = cylinderGeometry;
cylinder.material = material;
cylinder.position.y = -1.5;

planeMesh.rotation.x = -(Math.PI * 0.5);
planeMesh.scale.set(100, 100);

const cylinderMesh = new THREE.Mesh(cylinderGeometry, material);

//add mesh to the scene
// scene.add(cubeMesh);
// scene.add(cubeMesh2);
// scene.add(planeMesh);
// group.add(cubeMesh, cubeMesh2, planeMesh, sphere, cylinder);
group.add(planeMesh);
scene.add(group);


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
  10000 
);

camera.position.z = 10;
camera.position.y = 5;


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



//render the scene
const renderloop = () => {
  // group.children.forEach((child => {
  //   if (child instanceof THREE.Mesh){
  //     child.rotation.y += 0.01;
  //   }
  // } 
  // ));
  // cubeMesh.rotation.y += 0.01; 

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);

}

renderloop();


