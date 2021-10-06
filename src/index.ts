import "./styles.css";
import * as PIXI from "pixi.js";
import Grid from "./Grid";
import { floodFill } from "./FloodFill"; "./FloodFill"
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const app = new PIXI.Application({
  antialias: true,
  view: canvas
});

let grid = new Grid(65, 45);

grid.fillRandom("éeeeé");
grid.smooth(10);

app.stage.addChild(grid);



let seed_inc = 0;
window.addEventListener("click", function () {
  grid.fillRandom(seed_inc.toString());
  grid.smooth(10);
  // let flooded_cells = floodFill(grid.clone(), 8, 4, false);
  // grid.cells = flooded_cells;
  grid.draw();


  seed_inc++;
});

window.addEventListener("resize", function () {
  app.renderer.resize(window.innerWidth, window.innerHeight);
});

let ev = new Event("resize");
window.dispatchEvent(ev);
