import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

const loader = new GLTFLoader();
let debugMode = false;

scene.background = null;

export const bobbleCanvas = document.getElementById("bobbleCanvas");
const bobbleRenderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});
bobbleRenderer.setPixelRatio(window.devicePixelRatio);
bobbleRenderer.setSize(bobbleCanvas.clientWidth, bobbleCanvas.clientHeight);
bobbleCanvas.appendChild(bobbleRenderer.domElement);
const camera = new THREE.PerspectiveCamera(
  75,
  bobbleCanvas.clientWidth / bobbleCanvas.clientHeight,
  0.1,
  1000
);
camera.position.set(-10, 1, -12);
const controls = new OrbitControls(camera, bobbleRenderer.domElement);
controls.enableZoom = false;
// controls.autoRotate = true;

const light = new THREE.PointLight("white");
const amb = new THREE.AmbientLight("white");
light.intensity = debugMode ? 9000 : 100;
let bobble;
// let headBone;
loader.load("/Assets/3d/bobbleHead.glb", (gltf) => {
  bobble = gltf.scene;
  let mesh = null;
  gltf.scene.traverse((o) => {
    if (o.isMesh) {
      o.material.flatShading = true;
      o.material.needsUpdate = true;
      console.log("----- MESH -----");
      console.log("Name:", o.name);
      console.log("Has morphTargetDictionary:", !!o.morphTargetDictionary);
      console.log("Dictionary:", o.morphTargetDictionary);
      console.log("Influences:", o.morphTargetInfluences);
    }
  });

  scene.add(bobble);
  scene.add(light);
  scene.add(amb);
  light.position.set(-5, 0, -10);
  bobble.scale.set(10, 10, 10);
  bobble.rotation.y = 179.5;
  controls.update();
});

// Disable interaction
function disableMesh(o) {
  o.raycast = () => {};
}

// Enable interaction
function enableMesh(o) {
  if (o.userData.originalRaycast) {
    o.raycast = o.userData.originalRaycast;
  }
}
window.addEventListener("click", () => {
  console.log("clicks happening bruv");

  bobble.traverse((o) => {
    if (o.name === "head") {
      o.userData.originalRaycast = o.raycast;
      const random = Math.floor(Math.random() * o.morphTargetInfluences.length);
      o.morphTargetInfluences[random] = 1;
      console.log(random);
      disableMesh(o);
      setTimeout(() => {
        o.morphTargetInfluences[random] = 0;
        enableMesh(o);
      }, 300);
    }
  });
});

window.addEventListener("resize", () => {
  const { clientWidth, clientHeight } = bobbleCanvas;
  bobbleRenderer.setSize(clientWidth, clientHeight);
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
});

//MOUSE TRACKING /*------------------------------*/

const target = new THREE.Object3D();
target.position.z = 2;

const intersectionPt = new THREE.Vector3();
const planeNormal = new THREE.Vector3();
const plane = new THREE.Plane();
const mousePos = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

window.addEventListener("mousemove", (e) => {
  mousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
  mousePos.y = (e.clientY / window.innerWidth) * 2 + 1;
  planeNormal.copy(camera.position).normalize();
  plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
  raycaster.setFromCamera(mousePos, camera);
  raycaster.ray.intersectPlane(plane, intersectionPt);
  target.position.set(intersectionPt.x, intersectionPt.y, 2);
});

export const animateBobble = () => {
  controls.update();
  bobbleRenderer.render(scene, camera);
  requestAnimationFrame(animateBobble);
};
animateBobble();

window.addEventListener("click", () => {
  if (debugMode) {
    light.position.set(intersectionPt.x, intersectionPt.y);
    console.log(light.position);
  }
});
