import { Graphics } from "@pixi/graphics";
import { Point } from "@pixi/math";
import Grid from "./Grid";

interface Line {
    p1: Point,
    p2: Point
}

const bytesToString = function (num: number, num_bytes: number = 4) {
    let str = num.toString(2);
    let zeros: String = ''
    for (let i = str.length; i < num_bytes; i++) {
        zeros += "0"
    }
    return zeros + str;
}
export const marchingSquare = function (grid: Grid) {

    let lines: Line[] = [];

    for (let y = 0; y < grid.resy - 1; y++) {
        for (let x = 0; x < grid.resx - 1; x++) {
            let square_state = 0b0000;

            square_state += 8 * (grid.cells[y][x] ? 1 : 0)
            square_state += 4 * (grid.cells[y][x + 1] ? 1 : 0)
            square_state += 2 * (grid.cells[y + 1][x + 1] ? 1 : 0)
            square_state += 1 * (grid.cells[y + 1][x] ? 1 : 0)


            // console.log(`x :${x} y : ${y} ->  ${bytesToString(square_state)}`)

            let a = new Point((x + 0.5) * grid.square_size, y * grid.square_size);
            let b = new Point((x + 1.0) * grid.square_size, (y + 0.5) * grid.square_size);
            let c = new Point((x + 0.5) * grid.square_size, (y + 1.0) * grid.square_size);
            let d = new Point(x * grid.square_size, (y + 0.5) * grid.square_size);
            switch (square_state) {
                case 0:
                    break;
                case 1:
                    lines.push({ p1: c, p2: d })
                    break;
                case 2:
                    lines.push({ p1: b, p2: c })
                    break;
                case 3:
                    lines.push({ p1: b, p2: d })
                    break;
                case 4:
                    lines.push({ p1: a, p2: b })
                    break;
                case 5:
                    lines.push({ p1: a, p2: d })
                    lines.push({ p1: c, p2: b })
                    break;
                case 6:
                    lines.push({ p1: a, p2: c })
                    break;
                case 7:
                    lines.push({ p1: a, p2: d })
                    break;
                case 8:
                    lines.push({ p1: a, p2: d })
                    break;
                case 9:
                    lines.push({ p1: a, p2: c })
                    break;
                case 10:
                    lines.push({ p1: a, p2: b })
                    lines.push({ p1: d, p2: c })
                    break;
                case 11:
                    lines.push({ p1: a, p2: b })
                    break;
                case 12:
                    lines.push({ p1: d, p2: b })
                    break;
                case 13:
                    lines.push({ p1: c, p2: b })
                    break;
                case 14:
                    lines.push({ p1: d, p2: c })
                    break;
                case 15:

                    break;

            }
        }
    }
    return lines;
}

export class MarchingSquareLines extends Graphics {

    private lines: Line[];
    constructor(lines: Line[]) {
        super();

        this.lines = lines;
        this.draw();
    }

    setLines(lines: Line[]) {
        this.lines = lines;
    }

    draw() {

        this.clear();

        for (let line of this.lines) {
            // console.log(line);
            this.lineStyle(6, 0xffffff, 0.2)
            this.moveTo(line.p1.x, line.p1.y)
            this.lineTo(line.p2.x, line.p2.y)
        }
    }
}