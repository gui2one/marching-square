import { Graphics } from "@pixi/graphics";
import { Point } from "@pixi/math";
import Grid from "./Grid";

interface Line {
    p1: Point,
    p2: Point
}

export const marchingSquare = function (grid: Grid) {

    let lines: Line[] = [];

    for (let j = 0; j < grid.resy - 1; j++) {
        for (let i = 0; i < grid.resx - 1; i++) {
            let square_state = 0b0000;

            if (grid.state)
        }
    }
    return lines;
}

export class marchingSquareLines extends Graphics {

    constructor(public lines: Line[]) {
        super();
        this.draw();
    }

    draw() {

        this.clear();

        for (let line of this.lines) {
            console.log(line);
        }
    }
}