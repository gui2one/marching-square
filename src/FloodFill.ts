// JavaScript program to implement
// flood fill algorithm
// Dimensions of paint screen

import { cellI } from "./CaveInspector";
import Grid from "./Grid";

// found at : https://www.geeksforgeeks.org/flood-fill-algorithm-implement-fill-paint/



let count = 0;
// A recursive function to replace
// previous color 'prevC' at '(x, y)'
// and all surrounding pixels of (x, y)
// with new color 'newC' and
const floodFillUtil = function (_grid: Grid, x: number, y: number, prevC: boolean, newC: boolean, cell_set: Set<cellI>) {
    count++;
    // Base cases
    if (x < 0 || x >= _grid.resx || y < 0 || y >= _grid.resy) return;
    if (_grid.cells[y][x] != prevC) return;

    // Replace the color at (x, y)
    _grid.cells[y][x] = newC;

    cell_set.add({
        x, y, value: _grid.cells[y][x]
    })
    // Recur for north, east, south and west
    floodFillUtil(_grid, x + 1, y, prevC, newC, cell_set);
    floodFillUtil(_grid, x - 1, y, prevC, newC, cell_set);
    floodFillUtil(_grid, x, y + 1, prevC, newC, cell_set);
    floodFillUtil(_grid, x, y - 1, prevC, newC, cell_set);
}

// It mainly finds the previous color
// on (x, y) and calls floodFillUtil()

export const floodFill = function (grid: Grid, x: number, y: number, newC: boolean): Set<cellI> {


    let cell_set = new Set<cellI>();
    let prevC = grid.cells[y][x];
    if (prevC == newC) return cell_set;

    floodFillUtil(grid, x, y, prevC, newC, cell_set);

    return cell_set;
}
// Driver code
// let grid = new Grid(10, 5)
// grid.fillRandom()
// floodFill(grid.clone(), x, y, newC);

// console.log("Updated _screen after " + count + " calls to floodFill:");
// let str = ""
// for (var j = 0; j < grid.resy; j++) {
//     for (var i = 0; i < grid.resx; i++) {

//         str += ((grid.cells[j][i] ? ' ' : 0) + " ");
//     }
//     str += "\n";
// }

// console.log(str)

      // This code is contributed by rdtank.