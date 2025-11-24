import * as THREE from "three";
import { GLTFLoader, GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import animationObserver from "./main.js";

const scene = new THREE.scene();
scene.background = null;
const loader = new GLTFLoader();
const controls = new OrbitControls();
controls.enableZoom = false;

loader.load("", (gltf) => {
  const bobble = gltf.scene;
  scene.add(bobble);
});
