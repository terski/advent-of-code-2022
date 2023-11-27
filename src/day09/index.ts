import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split('\n');

const part1 = (rawInput: string) => {
    const moves = parseInput(rawInput);
    const delta: { [key: string]: [number, number] } = {
        R: [0, 1],
        L: [0, -1],
        U: [-1, 0],
        D: [1, 0],
    };
    const head = { row: 0, column: 0 };
    const tail = { row: 0, column: 0 };
    const locations = new Set([`${tail.row},${tail.column}`]);

    for (let move of moves) {
        const [direction, distance] = move.split(' ');
        const diff = delta[direction];
        for (let i = 0; i < +distance; i++) {
            const previous = { row: head.row, column: head.column };

            head.row += diff[0];
            head.column += diff[1];

            if (
                Math.abs(head.row - tail.row) > 1 ||
                Math.abs(head.column - tail.column) > 1
            ) {
                tail.row = previous.row;
                tail.column = previous.column;
                locations.add(`${tail.row},${tail.column}`);
            }
        }
    }

    return locations.size.toString();
};

type Position = { row: number; column: number };

const part2 = (rawInput: string) => {
    const moves = parseInput(rawInput);
    const delta: { [key: string]: [number, number] } = {
        R: [0, 1],
        L: [0, -1],
        U: [-1, 0],
        D: [1, 0],
    };
    const rope = Array<Position>(10).fill({ row: 0, column: 0 }, 0, 10);
    console.log(rope);
    const locations = new Set([`${rope[9].row},${rope[9].column}`]);

    for (let move of moves) {
        const [direction, distance] = move.split(' ');
        const diff = delta[direction];
        console.log(`Move`);
        for (let i = 0; i < +distance; i++) {
            for (let j = 0; j < rope.length; j++) {
                if (j === 0) {
                    rope[j].row += diff[0];
                    rope[j].column += diff[1];
                } else {
                    const vert = rope[j].row - rope[j - 1].row;
                    if (Math.abs(vert) > 1) {
                        rope[j].row += rope[j].row > rope[j - 1].row ? -1 : 1;
                        console.log(
                            `Moving rope[${j}]to ${rope[j].row}, ${rope[j].column}`,
                        );
                    }
                    const horiz = rope[j].column - rope[j - 1].column;
                    if (Math.abs(horiz) > 1) {
                        rope[j].column +=
                            rope[j].column > rope[j - 1].column ? -1 : 1;
                            console.log(
                                `Moving rope[${j}] to ${rope[j].row}, ${rope[j].column}`,
                            );
                    }
                }
            }
            locations.add(`${rope[-1].row},${rope[-1].column}`);
        }
    }

    return locations.size.toString();
};

run({
    part1: {
        tests: [
            {
                input: `
                R 4
                U 4
                L 3
                D 1
                R 4
                D 1
                L 5
                R 2`,
                expected: '13',
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `
                R 5
                U 8
                L 8
                D 3
                R 17
                D 10
                L 25
                U 20`,
                expected: '36',
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: true,
});
