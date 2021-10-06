import { Graphics } from "pixi.js";
import Alea from "seedrandom/lib/alea";
export default class Grid extends Graphics {
  resx: number;
  resy: number;
  cells: number[][];
  prng;
  fill_ratio: number;
  constructor(resx: number, resy: number) {
    super();
    this.resx = resx;
    this.resy = resy;
    this.cells = [];
    this.fill_ratio = 0.43


    this.initCells();
  }

  initCells() {
    this.cells = [];
    for (let i = 0; i < this.resy; i++) {
      this.cells.push(Array<number>());
    }

    for (let j = 0; j < this.resy; j++) {
      for (let i = 0; i < this.resx; i++) {
        this.cells[j].push(0);
      }
    }
  }

  cloneCells(): number[][] {
    let cells_copy = [];
    for (let col of this.cells) {
      cells_copy.push([])
    }
    for (let row = 0; row < this.cells.length; row++) {
      cells_copy[row].push(...this.cells[row])
    }

    return cells_copy
  }
  setRandomSeed(seed: string) {
    this.prng = Alea(seed);
  }
  fillRandom(seed: string = "hello there") {
    this.setRandomSeed(seed);
    for (let j = 0; j < this.resy; j++) {
      for (let i = 0; i < this.resx; i++) {
        if (j === 0 || j === this.resy - 1 || i === 0 || i === this.resx - 1) {

          this.cells[j][i] = 0;
        } else {

          this.cells[j][i] = this.prng();
        }
      }
    }
  }
  smooth(iterations: number) {
    let cells_copy = this.cloneCells();

    for (let iter = 0; iter < iterations; iter++) {
      for (let j = 0; j < this.resy; j++) {
        for (let i = 0; i < this.resx; i++) {
          let count = this.getNeighbours(i, j);

          if (count < 4) cells_copy[j][i] -= 0.5;
          else if (count > 4) cells_copy[j][i] += 0.5;

          if ((j === 0) || (j === this.resy - 1) || (i === 0) || (i === this.resx - 1)) {
            cells_copy[j][i] = 0
          }
        }
      }

      this.cells = cells_copy

    }

    this.draw();
  }

  draw() {
    this.clear();
    let square_size = 10
    for (let child of this.children) {
      child.destroy();
    }
    for (let y = 0; y < this.resy; y++) {
      for (let x = 0; x < this.resx; x++) {
        let index = y * this.resx + x;
        let state = this.cells[y][x] > this.fill_ratio ? true : false;

        let clr = state ? 0xffffff : 0xF00000;
        this.beginFill(clr, 1.0);

        this.drawRect(x * square_size, y * square_size, square_size, square_size);
        this.endFill();
      }
    }
  }


  getNeighbours(x, y): number {
    let count = 0;
    for (let j = -1; j <= 1; j++) {
      for (let i = -1; i <= 1; i++) {
        // check for out of bounds
        if ((x + i >= 0) && (x + i < this.resx) && (y + j >= 0) && (y + j < this.resy)) {
          // check for this cell
          if (i !== 0 || j !== 0) {

            if (this.cells[y + j][x + i] > this.fill_ratio) {

              count++;
            }
          }

        }
      }
    }
    return count;
  }
}
