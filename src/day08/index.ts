import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split('\n');

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    let visibleTreeCount = 0;
    for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[row].length; col++) {
            visibleTreeCount += isVisible(row, col, input) ? 1 : 0;
        }
    }
    return visibleTreeCount.toString();
};

const isVisible = (row: number, column: number, input: string[]) => {
    if (row === 0 || row >= input.length) {
        return true;
    }
    if (column === 0 || column >= input[row].length) {
        return true;
    }
    let fromLeft = true;
    let fromRight = true;
    let fromTop = true;
    let fromBottom = true;
    const height = input[row][column];

    for (let current = 0; current < input[row].length; current++) {
        if (current === column) {
            continue;
        }
        if (input[row][current] >= height) {
            if (current < column) {
                fromLeft = false;
            } else {
                fromRight = false;
                break;
            }
        }
    }

    for (let current = 0; current < input.length; current++) {
        if (current === row) {
            continue;
        }
        if (input[current][column] >= height) {
            if (current < row) {
                fromTop = false;
            } else {
                fromBottom = false;
                break;
            }
        }
    }

    const visible = fromLeft || fromRight || fromTop || fromBottom;
    return visible;
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);
    let bestScore = 0;
    for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[row].length; col++) {
            const score = scenicScore(row, col, input);
            if (score > bestScore) {
                bestScore = score;
            }
        }
    }

    return bestScore.toString();
};

const scenicScore = (row: number, column: number, input: string[]) => {
    if (
        row === 0 ||
        row >= input.length ||
        column === 0 ||
        column >= input[row].length
    ) {
        return 0;
    }
    let fromLeft = visibleTrees(
        input[row]
            .slice(0, column + 1)
            .split('')
            .map((x) => +x)
            .reverse(),
    );
    let fromRight = visibleTrees(
        input[row]
            .slice(column)
            .split('')
            .map((x) => +x),
    );
    let fromTop = visibleTrees(
        input
            .slice(0, row + 1)
            .map((x) => +x[column])
            .reverse(),
    );
    let fromBottom = visibleTrees(input.slice(row).map((x) => +x[column]));
    return fromLeft * fromRight * fromTop * fromBottom;
};

const visibleTrees = (input: number[]) => {
    let count = 0;
    for (let i = 1; i < input.length; i++) {
        count++;
        if (input[i] >= input[0]) {
            break;
        }
    }
    return count;
};

run({
    part1: {
        tests: [
            {
                input: `
                30373
                25512
                65332
                33549
                35390
              `,
                expected: '21',
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `
                  30373
                  25512
                  65332
                  33549
                  35390
                `,
                expected: '8',
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
