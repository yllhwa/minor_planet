import * as THREE from "three";
let scale = 10;
function getPointByTrueAngle(planet, real_angle) {
  var a = planet.a;
  var e = planet.e;
  var Peri = planet.Peri;
  var i_angle = planet.i_angle;
  var Node = planet.Node;
  var R = (a * (1 - Math.pow(e, 2))) / (1 + e * Math.cos(real_angle));
  var y = R * Math.sin(real_angle + Peri) * Math.sin(i_angle);
  var x =
    R *
    (Math.cos(Node) * Math.cos(real_angle + Peri) -
      Math.sin(Node) * Math.sin(real_angle + Peri)) *
    Math.cos(i_angle);
  var z =
    R *
    (Math.sin(Node) * Math.cos(real_angle + Peri) +
      Math.cos(Node) * Math.sin(real_angle + Peri)) *
    Math.cos(i_angle);
  x = x * scale;
  y = y * scale;
  z = z * scale;
  return new THREE.Vector3(x, y, z);
}
function getTrueAngleByAngle(planet, angle) {
  var e_angle =
    angle +
    planet.e * Math.sin(angle) +
    (1 / 2) * Math.pow(planet.e, 2) * Math.sin(2 * angle);
  var real_angle =
    2 *
    Math.atan(
      Math.sqrt((1 + planet.e) / (1 - planet.e)) * Math.tan(e_angle / 2)
    );
  return real_angle;
}
export { getPointByTrueAngle, getTrueAngleByAngle };
