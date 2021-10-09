import "./styles.css";
import * as PIXI from "pixi.js";
import Grid from "./Grid";
import { floodFill } from "./FloodFill"; import { marchingSquare, MarchingSquareLines } from "./MarchingSquare";
"./FloodFill"
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const app = new PIXI.Application({
  antialias: true,
  view: canvas
});

let grid = new Grid(64, 64);
grid.square_size = 10
app.stage.addChild(grid);

grid.fillRandom("éeeeé");
grid.smooth(100);

// grid.draw()

let lines = marchingSquare(grid);
let draw_lines = new MarchingSquareLines(lines);

app.stage.addChild(draw_lines);



let seed_inc = 0;
window.addEventListener("click", function () {
  grid.fillRandom(seed_inc.toString());
  grid.smooth(5);
  lines = marchingSquare(grid);
  draw_lines.setLines(lines);
  draw_lines.draw()
  // let flooded_cells = floodFill(grid.clone(), 8, 4, false);
  // grid.cells = flooded_cells;
  // grid.draw();


  seed_inc++;
});

window.addEventListener("resize", function () {
  app.renderer.resize(window.innerWidth, window.innerHeight);
});

let ev = new Event("resize");
window.dispatchEvent(ev);
