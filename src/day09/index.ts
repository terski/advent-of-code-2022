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
        for (let i = 0; i < +distance; i++) {
            const diff = delta[direction];
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

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);

    return;
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
            // {
            //   input: ``,
            //   expected: "",
            // },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
