import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

const loader = new GLTFLoader();

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
controls.autoRotate = true;

const light = new THREE.PointLight("white");
light.intensity = 900;

loader.load("Assets/3d/bobble.glb", (gltf) => {
  const bobble = gltf.scene;
  scene.add(bobble);
  scene.add(light);
  light.position.set(1, 1, -20);
  bobble.scale.set(10, 10, 10);
  controls.update();
});

window.addEventListener("resize", () => {
  const { clientWidth, clientHeight } = bobbleCanvas;
  bobbleRenderer.setSize(clientWidth, clientHeight);
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
});

export const animateBobble = () => {
  controls.update();
  bobbleRenderer.render(scene, camera);
  requestAnimationFrame(animateBobble);
};
animateBobble();
