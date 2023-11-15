import run from 'aocrunner';

const parseInput = (rawInput: string) => {
    const [rawStacks, rawMoves] = rawInput.split('\n\n');

    const stacks = rawStacks
        .split('\n')
        .reverse()
        .reduce((acc: string[][], current: string, index: number) => {
            if (index === 0) {
                const stackCount = current.trim().split(/\s+/);
                return Array.from({ length: stackCount.length }, () => []);
            } else {
                for (let ii = 0; ii < current.length; ii += 4) {
                    const crate = current.substring(ii + 1, ii + 2).trim();
                    if (crate) {
                        acc[ii / 4].push(crate);
                    }
                }
                return acc;
            }
        }, []);

    const moves = rawMoves
        .split('\n')
        .filter((x) => x)
        .map((move) => {
            const results = move.match(/move (\d+) from (\d+) to (\d+)/);
            if (!results) {
                throw new Error('Invalid input: ' + move);
            }
            return {
                count: parseInt(results[1]),
                from: parseInt(results[2]),
                to: parseInt(results[3]),
            };
        });

    return { stacks, moves };
};

const part1 = (rawInput: string) => {
    const { stacks, moves } = parseInput(rawInput);

    for (const move of moves) {
        for (let i = 0; i < move.count; i++) {
            const crate = stacks[move.from - 1].pop();
            if (!crate) {
                throw new Error('Invalid move ' + move);
            }
            stacks[move.to - 1].push(crate);
        }
    }

    const tops = stacks.map((stack) => stack[stack.length - 1]);
    return tops.join('');
};

const part2 = (rawInput: string) => {
    const { stacks, moves } = parseInput(rawInput);

    for (const move of moves) {
        const crates = stacks[move.from - 1].splice(stacks[move.from - 1].length - move.count);
        stacks[move.to - 1].push(...crates);
    }

    const tops = stacks.map((stack) => stack[stack.length - 1]);
    return tops.join('');
};

run({
    part1: {
        tests: [
            {
                input: `
    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`,
                expected: 'CMZ',
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `
    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`,
                expected: 'MCD',
            },
        ],
        solution: part2,
    },
    trimTestInputs: false,
    onlyTests: false,
});
