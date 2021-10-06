// JavaScript program to implement
// flood fill algorithm
// Dimensions of paint screen
var M = 8;
var N = 8;
let _screen: number[][] = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 0],
    [1, 0, 0, 1, 1, 0, 1, 1],
    [1, 2, 2, 2, 2, 0, 1, 0],
    [1, 1, 1, 2, 2, 0, 1, 0],
    [1, 1, 1, 2, 2, 2, 2, 0],
    [1, 1, 1, 1, 1, 2, 1, 1],
    [1, 1, 1, 1, 1, 2, 2, 1],
];
var x = 4,
    y = 4,
    newC = 3;

let count = 0;
// A recursive function to replace
// previous color 'prevC' at '(x, y)'
// and all surrounding pixels of (x, y)
// with new color 'newC' and
function floodFillUtil(_screen, x, y, prevC, newC) {
    count++;
    // Base cases
    if (x < 0 || x >= M || y < 0 || y >= N) return;
    if (_screen[x][y] != prevC) return;

    // Replace the color at (x, y)
    _screen[x][y] = newC;

    // Recur for north, east, south and west
    floodFillUtil(_screen, x + 1, y, prevC, newC);
    floodFillUtil(_screen, x - 1, y, prevC, newC);
    floodFillUtil(_screen, x, y + 1, prevC, newC);
    floodFillUtil(_screen, x, y - 1, prevC, newC);
}

// It mainly finds the previous color
// on (x, y) and calls floodFillUtil()
function floodFill(_screen, x, y, newC) {

    var prevC = _screen[x][y];
    if (prevC == newC) return;
    floodFillUtil(_screen, x, y, prevC, newC);
}

// Driver code

floodFill(_screen, x, y, newC);

console.log("Updated _screen after " + count + " calls to floodFill:");
let str = ""
for (var i = 0; i < M; i++) {
    for (var j = 0; j < N; j++) str += (_screen[i][j] + " ");
    str += "\n";
}

console.log(str)

      // This code is contributed by rdtank.