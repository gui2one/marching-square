import "./styles.css";
import * as PIXI from "pixi.js";
import Grid from "./Grid";
import { floodFill, floodFillNew } from "./FloodFill";
import { marchingSquare, MarchingSquareLines } from "./MarchingSquare";
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

grid.fillRandom("gui2one4556");
grid.smooth(3);
grid.alpha = 0.2
grid.draw()

let lines = marchingSquare(grid);
let draw_lines = new MarchingSquareLines(lines);
draw_lines.position.set(grid.square_size / 2, grid.square_size / 2)
app.stage.addChild(draw_lines);


interface floodedCell {
  x: number,
  y: number,
  value: any
}

let seed_inc = 0;
window.addEventListener("click", function (e: MouseEvent) {
  // grid.fillRandom(seed_inc.toString());
  // grid.smooth(3);

  let click_x = Math.floor(e.clientX / grid.square_size)
  let click_y = Math.floor(e.clientY / grid.square_size)

  let flooded_cells = floodFillNew(grid.clone(), click_x, click_y, true);
  console.log(flooded_cells);
  // grid.cells = flooded_cells;

  lines = marchingSquare(grid);
  draw_lines.setLines(lines);
  draw_lines.draw()
  grid.draw();


  seed_inc++;
});

window.addEventListener("resize", function () {
  app.renderer.resize(window.innerWidth, window.innerHeight);
});

let ev = new Event("resize");
window.dispatchEvent(ev);
