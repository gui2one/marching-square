import Grid from "./Grid";
import { floodFill, floodFillNew } from "./FloodFill";

export interface cellI {
    x: number,
    y: number,
    value: any
}

type Blob = Set<cellI>;
export default class CaveInspector {

    grid: Grid;
    cells_set: Set<cellI>;
    blobs: Array<Blob>;
    constructor(grid: Grid) {
        this.grid = grid;
        this.cells_set = new Set<cellI>();
        this.blobs = []
    }

    inspect() {
        for (let j = 0; j < this.grid.resy; j++) {
            for (let i = 0; i < this.grid.resx; i++) {

            }

        }
    }
}