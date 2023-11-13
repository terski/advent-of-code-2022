import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split('\n');

const calculateScore = (player1Move: string, player2Move: string) => {
    const a = new Map([
        ['X', 4],
        ['Y', 8],
        ['Z', 3],
    ]);
    const b = new Map([
        ['X', 1],
        ['Y', 5],
        ['Z', 9],
    ]);
    const c = new Map([
        ['X', 7],
        ['Y', 2],
        ['Z', 6],
    ]);

    const map = new Map([
        ['A', a],
        ['B', b],
        ['C', c],
    ]);

    const player1Map = map.get(player1Move);
    if (!player1Map) {
        throw new Error('Invalid input');
    }

    const score = player1Map.get(player2Move);
    if (score === undefined) {
        throw new Error('Invalid input');
    }

    return score;
};

const calculateScorePart2 = (player1Move: string, player2Move: string) => {
    const a = new Map([
        ['X', 3],
        ['Y', 4],
        ['Z', 8],
    ]);
    const b = new Map([
        ['X', 1],
        ['Y', 5],
        ['Z', 9],
    ]);
    const c = new Map([
        ['X', 2],
        ['Y', 6],
        ['Z', 7],
    ]);

    const map = new Map([
        ['A', a],
        ['B', b],
        ['C', c],
    ]);

    const player1Map = map.get(player1Move);
    if (!player1Map) {
        throw new Error('Invalid input');
    }

    const score = player1Map.get(player2Move);
    if (score === undefined) {
        throw new Error('Invalid input');
    }

    return score;
};


const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);

    const sum = input
        .map((line) => {
            const [p1, p2] = line.split(' ');
            return calculateScore(p1, p2);
        })
        .reduce((acc, curr) => acc + curr, 0);

    return sum.toString();
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);

    const sum = input
        .map((line) => {
            const [p1, p2] = line.split(' ');
            return calculateScorePart2(p1, p2);
        })
        .reduce((acc, curr) => acc + curr, 0);

    return sum.toString();
};

run({
    part1: {
        tests: [
            {
                input: `
                    A Y
                    B X
                    C Z
                  `,
                expected: '15',
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `
            A Y
            B X
            C Z
          `,
                expected: '12',
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
