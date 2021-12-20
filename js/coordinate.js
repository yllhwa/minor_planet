import * as THREE from "three";
let scene;
//绘制虚线
function createDashedLine(start_point, end_point, color) {
  let geometry = new THREE.BufferGeometry();
  let material = new THREE.LineDashedMaterial({ color: color });
  let pointsArray = [];
  pointsArray.push(start_point);
  pointsArray.push(end_point);
  geometry.setFromPoints(pointsArray);
  let line = new THREE.Line(geometry, material);
  line.computeLineDistances();
  scene.add(line);
}
//绘制实线
function createLine(start_point, end_point, color) {
  let geometry = new THREE.BufferGeometry();
  let material = new THREE.LineBasicMaterial({ color: color });
  let pointsArray = [];
  pointsArray.push(start_point);
  pointsArray.push(end_point);
  geometry.setFromPoints(pointsArray);
  let line = new THREE.Line(geometry, material);
  scene.add(line);
}
//初始化坐标系
function initCoordinate(_scene) {
  scene = _scene;
  let zero_point = new THREE.Vector3(0, 0, 0);
  createDashedLine(new THREE.Vector3(-1000, 0, 0), zero_point, 0x0000ff);
  createLine(zero_point, new THREE.Vector3(1000, 0, 0), 0x0000ff);
  createDashedLine(new THREE.Vector3(0, 0, -1000), zero_point, 0x00ff00);
  createLine(zero_point, new THREE.Vector3(0, 0, 1000), 0x00ff00);
  createDashedLine(new THREE.Vector3(0, -1000, 0), zero_point, 0xff0000);
  createLine(zero_point, new THREE.Vector3(0, 1000, 0), 0xff0000);
}
export { initCoordinate };
