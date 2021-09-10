import '../css-output/settings.css';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

// NOTE Constants ---------------------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer(
  {
    canvas: document.querySelector('#bg'),
  });
renderer.setClearColor(0x121212,1);
const loadingScreen = document.querySelector('.loading');
// const loadingBar = document.querySelector(".loading-bar-indicator");
 
// Constants --------------------------------

// NOTE Lights ------------------------------
const ambientLight = new THREE.AmbientLight(0xffffff,0.5);
const pointLight = new THREE.PointLight(0xd9d9d9,2);
pointLight.position.set(4,10,2);
scene.add(pointLight);
scene.fog = new THREE.Fog( 0x252526, 1, 180 );
// Lights ----------------------------------

// NOTE Models and Helpers -----------------
const gridHelper = new THREE.GridHelper(500,50);
gridHelper.position.set(0,-10,0);
scene.add(gridHelper)

const model = "/Models/KNY3D_bevel.glb";
const loader = new GLTFLoader();
let space;

const globeGeom = new THREE.SphereGeometry(8, 32,32);
const globeMat = new THREE.MeshStandardMaterial( {color: 0x252526, wireframe: true});
const globe = new THREE.Mesh(globeGeom, globeMat);
globe.position.set(10,-20,3);
scene.add(globe);
//  Models and Helpers ---------------------

function init(){
  loader.load(model, (gltf) => {
    space = gltf.scene;
    space.position.set(0,-5,0);
    scene.add(space);
  })
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.set(0,0,10);
  scene.add(ambientLight);

  function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    const scrollButton = document.querySelector(".scroll-button");
    camera.position.y = t * 0.005;
    gridHelper.position.z = t * -0.01;
    globe.rotation.y += 0.005;
    if (t < -window.innerHeight / 2) {
        scrollButton.style.opacity = 0;
    }
    else {
        scrollButton.style.opacity = 1;
    }    
  }

  function addGeometry() {
    const geometry = new THREE.IcosahedronGeometry(1,0);
    const material = new THREE.MeshStandardMaterial( {color: 0x252526, wireframe: true});
    const mesh = new THREE.Mesh(geometry,material);
    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(150));
    mesh.position.set(x,y,z);
    const [rotx, roty, rotz] = Array(3).fill().map(() => THREE.MathUtils.randFloat(1,50));
    mesh.rotation.set(rotx,roty,rotz);
    scene.add(mesh); 
  }

  Array(50).fill().forEach(addGeometry);

  document.body.onscroll = moveCamera;
  window.addEventListener( 'resize', onWindowResize, false );
  window.onload = function() {
    loadingScreen.classList.add("hidden");
    // document.querySelector(".loading-bar").classList.add("hideLoadingBar");
  }
  animate()
}

function animate(){
  requestAnimationFrame(animate);
  space.rotation.y += 0.01;
  renderer.render(scene,camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

init()