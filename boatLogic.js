import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = null;

const loader = new GLTFLoader();

export const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvas.clientWidth, canvas.clientHeight);

canvas.appendChild(renderer.domElement);
const camera = new THREE.PerspectiveCamera(
  75,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  1000
);
camera.position.set(30, 10, 30);
const light = new THREE.PointLight(0x001eff);
light.intensity = 3000;
scene.add(light);
let mixer;
const controls = new OrbitControls(camera, renderer.domElement);

controls.enableZoom = false;

loader.load("Assets/3d/snoozecrowBoatBake2.glb", (gltf) => {
  const snoozy = gltf.scene;
  snoozy.scale.set(2, 2, 2);
  scene.add(snoozy);

  mixer = new THREE.AnimationMixer(snoozy);
  gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
});
window.addEventListener("resize", () => {
  const { clientWidth, clientHeight } = canvas;
  renderer.setSize(clientWidth, clientHeight);
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
});
const clock = new THREE.Clock();
let animationID; // so that we can check if animation is running
//not a boolean since its type is a function.
export const animate = () => {
  if (mixer) {
    mixer.update(clock.getDelta());
  }
  controls.autoRotate = true;
  controls.update();
  if (canvas.clientWidth < 500) {
    controls.enabled = false;
    canvas.style.pointerEvents = false;
  } else {
    controls.enabled = true;
    canvas.style.pointerEvents = true;
  }
  renderer.render(scene, camera);
  animationID = requestAnimationFrame(animate);
};

export const startAnimation = () => {
  if (!animationID) {
    animate();
    canvas.style.visibility = "unset";
    canvas.style.pointerEvents = "auto";
  }
};
export const stopAnimation = () => {
  if (animationID) {
    cancelAnimationFrame(animationID); // uses the animation frame
    animationID = null; // ensure startAnimation can be called
    canvas.style.visibility = "hidden";
    canvas.style.pointerEvents = "none";
  }
};
