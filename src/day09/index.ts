import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split('\n');

const part1 = (rawInput: string) => {
    const moves = parseInput(rawInput);
    const visits = tailVisits(moves, 2);

    return visits.size.toString();
};

const part2 = (rawInput: string) => {
    const moves = parseInput(rawInput);
    const visits = tailVisits(moves, 10);

    return visits.size.toString();
};

const tailVisits = (moves: string[], knotCount: number) => {
    const rope = new Array<Position>(knotCount)
        .fill([0, 0])
        .map((x) => [...x] as Position);
    const visited = new Set([rope[0].toString()]);

    for (let move of moves) {
        const [direction, distance] = move.split(' ');
        const diff = directions[direction];
        for (let i = 0; i < +distance; i++) {
            for (let j = 0; j < rope.length; j++) {
                if (j === 0) {
                    rope[j] = add(rope[j], diff);
                } else {
                    rope[j] = follow(rope[j - 1], rope[j]);
                }
            }
            visited.add(rope[rope.length - 1].toString());
        }
    }

    return visited;
};

type Position = [number, number];

const add = (a: Position, b: Position): Position => {
    return [a[0] + b[0], a[1] + b[1]];
};

const subtract = (a: Position, b: Position): Position => {
    return [a[0] - b[0], a[1] - b[1]];
};

const sign = (position: Position): Position => {
    return [Math.sign(position[0]), Math.sign(position[1])];
};

const directions: { [key: string]: Position } = {
    R: [0, 1],
    L: [0, -1],
    U: [-1, 0],
    D: [1, 0],
};

const follow = (head: Position, tail: Position): Position => {
    const diff = subtract(head, tail);
    if (Math.max(...diff.map((x) => Math.abs(x))) > 1) {
        return add(tail, sign(diff));
    }
    return [tail[0], tail[1]];
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
    onlyTests: false,
});
