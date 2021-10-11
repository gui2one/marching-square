import Grid from "./Grid";
import { floodFill } from "./FloodFill";

export interface cellI {
    x: number,
    y: number,
    value: any
}

export class FilledCoord {
    x: number;
    y: number;

    Equals(other: FilledCoord): boolean {
        return this.x === other.x && this.y === other.y
    }
}

export type Blob = Set<cellI>;
export default class CaveInspector {

    grid: Grid;
    filled_coords: Set<FilledCoord>;
    outer_wall: Blob;
    inner_blobs: Array<Blob>;
    constructor(grid: Grid) {
        this.grid = grid;
        this.filled_coords = new Set<FilledCoord>();
        this.inner_blobs = []
        this.outer_wall = undefined

    }

    getOuterWall() {
        let cells = floodFill(this.grid.clone(), 0, 0, !this.grid.cells[0][0])
        this.outer_wall = cells;

        for (let entry of this.outer_wall) {
            // console.log(entry.y)
            let coord = new FilledCoord();
            coord.x = entry.x
            coord.y = entry.y
            this.filled_coords.add({ ...coord } as FilledCoord)
        }
    }
    inspect() {

        this.getOuterWall();
        console.log(this.filled_coords);
        for (let y = 0; y < this.grid.resy; y++) {
            for (let x = 0; x < this.grid.resx; x++) {
                let bool = Array.from(this.filled_coords).some((value) => {
                    return value.x === x && value.y === y
                })

                if (!bool) {
                    let cells = floodFill(this.grid.clone(), x, y, !this.grid.cells[y][x])
                    this.inner_blobs.push(cells);

                    for (let entry of cells) {
                        let coord = new FilledCoord();
                        coord.x = entry.x
                        coord.y = entry.y
                        this.filled_coords.add({ ...coord } as FilledCoord)
                    }
                    console.log(`x : ${x}, y : ${y}`);

                }
            }

        }
    }
}