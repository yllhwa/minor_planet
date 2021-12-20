import * as THREE from "three";
import { getPointByTrueAngle, getTrueAngleByAngle } from "./kepler";
import sunImg from "../img/sun.jpg";
import planetImg from "../img/planet.jpg";
import EarthImg from "../img/Earth.jpg";
import MercuryImg from "../img/Mercury.jpg";
import VenusImg from "../img/Venus.jpg";
import MarsImg from "../img/Mars.jpg";
import JupiterImg from "../img/Jupiter.jpg";
import SaturnImg from "../img/Saturn.jpg";
let scene;

function Planet(Number, Name, a, e, Peri, i_angle, Node, Orbital_period) {
  this.Number = Number; // 行星编号
  this.Name = Name; // 行星名
  this.a = a; // 轨道半长轴长度
  this.e = e; // 轨道离心率
  this.Peri = Peri; // 近日点辐角
  this.i_angle = i_angle; // 轨道倾角
  this.Node = Node; // 升交点黄经
  this.Orbital_period = Orbital_period; // 周期(年)
  this.obj = null;
  this.Image = planetImg;
  this.r = 1;
  this.orbitColor = 0xff0000;
  this.circleColor = 0x7c7c7c;
  this.circleLineColor = 0x7c7c7c;
  this.initOrbit = function initOrbit(drawCircle) {
    let planet = this;
    let material = new THREE.LineBasicMaterial({ color: this.orbitColor });
    let geometry = new THREE.BufferGeometry();

    var pointsArray = [];

    let circle_material = new THREE.LineBasicMaterial({
      color: this.circleColor,
    });
    let circle_geometry = new THREE.BufferGeometry();
    var circle_pointsArray = [];
    var count = 0;
    for (var i = 0; i < 2 * Math.PI + 0.02; i += 0.01, count += 1) {
      var point = getPointByTrueAngle(planet, i);
      pointsArray.push(point);
      if (drawCircle == true && count % 4 == 0) {
        circle_pointsArray.push(new THREE.Vector3(point.x, 0, point.z));
        let tmp_material = new THREE.LineBasicMaterial({
          color: this.circleLineColor,
        });
        let tmp_geometry = new THREE.BufferGeometry();
        var tmp_pointsArray = [];
        tmp_pointsArray.push(
          new THREE.Vector3(point.x, point.y, point.z),
          new THREE.Vector3(point.x, 0, point.z)
        );
        tmp_geometry.setFromPoints(tmp_pointsArray);
        let line = new THREE.Line(tmp_geometry, tmp_material);
        scene.add(line);
      }
    }
    circle_geometry.setFromPoints(circle_pointsArray);
    let circle_line = new THREE.Line(circle_geometry, circle_material);
    scene.add(circle_line);

    geometry.setFromPoints(pointsArray);
    let line = new THREE.Line(geometry, material);
    scene.add(line);
  };
  this.initPlanet = function initPlanet(drawCircle) {
    let planet = this;
    this.initOrbit(drawCircle);
    const loader = new THREE.TextureLoader();
    let texture = loader.load(this.Image);
    const mat = new THREE.MeshBasicMaterial();
    mat.map = texture;
    let _planet = new THREE.Mesh(new THREE.SphereGeometry(this.r, 50, 50), mat);
    scene.add(_planet);
    planet.obj = _planet;
  };
  this.updatePosition = function updatePosition(angle) {
    var point = getPointByTrueAngle(this, getTrueAngleByAngle(this, angle));
    this.obj.position.x = point.x;
    this.obj.position.y = point.y;
    this.obj.position.z = point.z;
  };
}

function initSun(_scene) {
  scene = _scene;
  const loader = new THREE.TextureLoader();
  loader.load(sunImg, (texture) => {
    const mat = new THREE.MeshBasicMaterial();
    mat.map = texture;
    var sphere = new THREE.Mesh(new THREE.SphereGeometry(1.5, 50, 50), mat);
    scene.add(sphere);
  });
}

function initSolarSystem() {
  let solar_system_array = [];
  var Mercury = new Planet(
    0,
    "Mercury",
    0.38709893,
    0.20563069,
    (77.45645 * Math.PI) / 180,
    (7.00487 * Math.PI) / 180,
    48.33167,
    87.9
  );
  Mercury.Image = MercuryImg;
  solar_system_array.push(Mercury);
  var Venus = new Planet(
    0,
    "Venus",
    0.72333199,
    0.00677323,
    (131.53298 * Math.PI) / 180,
    (3.39471 * Math.PI) / 180,
    76.68069,
    224.7
  );
  Venus.Image = VenusImg;
  solar_system_array.push(Venus);
  var Earth = new Planet(
    0,
    "Earth",
    1.00000011,
    0.01671022,
    (102.94719 * Math.PI) / 180,
    (0.00005 * Math.PI) / 180,
    -11.26064,
    365
  );
  Earth.Image = EarthImg;
  solar_system_array.push(Earth);
  var Mars = new Planet(
    0,
    "Mars",
    1.52366231,
    0.09341233,
    (336.04084 * Math.PI) / 180,
    (1.85061 * Math.PI) / 180,
    49.57854,
    693.5
  );
  Mars.Image = MarsImg;
  solar_system_array.push(Mars);
  var Jupiter = new Planet(
    0,
    "Jupiter",
    5.20336301,
    0.04839266,
    (14.75385 * Math.PI) / 180,
    (1.3053 * Math.PI) / 180,
    100.55615,
    4307
  );
  Jupiter.Image = JupiterImg;
  solar_system_array.push(Jupiter);
  var Saturn = new Planet(
    0,
    "Saturn",
    9.53707032,
    0.0541506,
    (92.43194 * Math.PI) / 180,
    (2.48446 * Math.PI) / 180,
    113.71504,
    10767.5
  );
  Saturn.Image = SaturnImg;
  solar_system_array.push(Saturn);
  var Uranus = new Planet(
    0,
    "Uranus",
    19.19126393,
    0.04716771,
    (170.96424 * Math.PI) / 180,
    (0.76986 * Math.PI) / 180,
    74.22988,
    30660
  );
  solar_system_array.push(Uranus);
  var Neptune = new Planet(
    0,
    "Neptune",
    30.06896348,
    0.00858587,
    (44.97135 * Math.PI) / 180,
    (1.76917 * Math.PI) / 180,
    131.72169,
    60152
  );
  solar_system_array.push(Neptune);
  // var Pluto = new Planet(
  //   0,
  //   "Pluto",
  //   39.48168677,
  //   0.24880766,
  //   (224.06676 * Math.PI) / 180,
  //   (17.14175 * Math.PI) / 180,
  //   110.30347
  // );
  // solar_system_array.push(Pluto);

  for (var i = 0; i < solar_system_array.length; i++) {
    let planet = solar_system_array[i];
    planet.orbitColor = 0x7c7c7c;
  }
  return solar_system_array;
}
export { Planet, initSun, initSolarSystem };
