import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import backgroundImg from "../img/back.jpg"
let renderer, width, height;
let camera;
let controls;
let scene;
//初始化Renderer
function initRenderer() {
  width = document.getElementById("threeJsCanvas").clientWidth;
  height = document.getElementById("threeJsCanvas").clientHeight;
  renderer = new THREE.WebGLRenderer({
    antialias: true, //开启抗锯齿
  });
  renderer.setSize(width, height); //设置大小
  renderer.setClearColor("#666666", 1.0); //设置清除色，不透明
  document.getElementById("threeJsCanvas").appendChild(renderer.domElement); //渲染到dom上
}

//初始化相机
function initCamera() {
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000); //开眼角45，视口宽高比width/height,近平面1，远平面1000
  camera.position.x = 50;
  camera.position.y = 50;
  camera.position.z = 50;
  camera.up.x = 0;
  camera.up.y = 1; //相机以y正轴为正方向
  camera.up.z = 0;
  camera.lookAt(new THREE.Vector3(0, 0, 0)); //相机照相坐标原点
  controls = new OrbitControls(camera, renderer.domElement);
}

//初始化场景
function initScene() {
  scene = new THREE.Scene();
  const loader = new THREE.CubeTextureLoader();
  let texture = loader.load(backgroundImg);
  texture.encoding = THREE.sRGBEncoding;
  scene.background = texture;
}

//初始化光源
function initLight() {
  let light = new THREE.SpotLight("#ffffff", 1.0);
  light.position.set(0, 0, 0);
  scene.add(light);
}

function initRender() {
  initRenderer();
  initScene();
  initCamera();
  initLight();
}

export {
  initRenderer,
  initCamera,
  initScene,
  initRender,
  initLight,
  renderer,
  width,
  height,
  camera,
  controls,
  scene,
};
