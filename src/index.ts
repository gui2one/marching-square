import "./styles.css";
import * as PIXI from "pixi.js";
import Grid from "./Grid";
import "./FloodFill"
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const app = new PIXI.Application({
  antialias: true,
  view: canvas
});

let grid = new Grid(65, 45);

grid.fillRandom("éeeeé");
grid.smooth(10);
grid.draw();

app.stage.addChild(grid);

let seed_inc = 0;
window.addEventListener("click", function () {
  grid.fillRandom(seed_inc.toString());
  grid.smooth(20);
  grid.draw();

  seed_inc++;
});

window.addEventListener("resize", function () {
  app.renderer.resize(window.innerWidth, window.innerHeight);
});

let ev = new Event("resize");
window.dispatchEvent(ev);
