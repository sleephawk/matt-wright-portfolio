import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import animationObserver from "./main.js";

const scene = new THREE.Scene();
scene.background = null;

const loader = new GLTFLoader();
const camera = new THREE.PerspectiveCamera(
  750,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(30, 10, 30);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const canvas = document
  .getElementById("canvas")
  .appendChild(renderer.domElement);
const light = new THREE.PointLight(0x001eff);
light.intensity = 3000;
scene.add(light);
let mixer;
const controls = new OrbitControls(camera, renderer.domElement);

controls.enableZoom = false;

loader.load("Assets/3d/snoozecrowBoatBake2.glb", (gltf) => {
  const snoozy = gltf.scene;
  scene.add(snoozy);

  mixer = new THREE.AnimationMixer(snoozy);
  gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
});

const clock = new THREE.Clock();

export default function animate() {
  requestAnimationFrame(animate);

  if (mixer) {
    mixer.update(clock.getDelta());
  }
  controls.autoRotate = true;
  controls.update();

  renderer.render(scene, camera);
}
animationObserver.observe(canvas);
