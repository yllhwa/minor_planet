import "./style.css";

import { parse as QsParse } from "qs";
import axios from "axios";
import { Planet, initSun, initSolarSystem } from "./js/planet";
import { initRender, renderer, camera, controls, scene } from "./js/render";
import { initCoordinate } from "./js/coordinate";

let planetArray = [];

function addPlanet(Number, Name, a, e, Peri, i_angle, Node, Orbital_period) {
  planetArray.push(
    new Planet(Number, Name, a, e, Peri, i_angle, Node, Orbital_period)
  );
}
async function getPlanetData() {
  const params = QsParse(window.location.search.substring(1));
  await axios
    .get("/planet/" + params.Number)
    .then((res) => {
      addPlanet(
        res.data.Number,
        res.data.Name,
        res.data.a,
        res.data.e,
        (res.data.Peri * Math.PI) / 180,
        (res.data.i * Math.PI) / 180,
        res.data.Node,
        res.data.Orbital_period * 365
      );
    })
    .catch((error) => {
      console.log(error);
    });
}
async function setPlanet() {
  await getPlanetData();
  var solarArray = initSolarSystem();
  for (var i = 0; i < solarArray.length; i++) {
    planetArray.push(solarArray[i]);
  }
  for (var i = 0; i < planetArray.length; i++) {
    let planet = planetArray[i];
    if (planet.Number == 0) {
      planet.initPlanet(false);
    } else {
      planet.initPlanet(true);
    }
  }
}

let time = 0;
function updatePlanet() {
  time += 1;
  angle = (angle + 0.01) % (2 * Math.PI);
  for (var i = 0; i < planetArray.length; i++) {
    var planet = planetArray[i];
    var angle = (time * 2 * Math.PI) / planet.Orbital_period;
    planet.updatePosition(angle);
  }
}

//渲染
function render() {
  requestAnimationFrame(render);
  controls.update();
  updatePlanet();
  renderer.render(scene, camera);
}
//加载程序入口
async function loadThreejs() {
  initRender();
  initCoordinate(scene);
  initSun(scene);
  await setPlanet();
  render();
}

loadThreejs();
