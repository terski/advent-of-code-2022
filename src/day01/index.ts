import run from 'aocrunner';

const parseInput = (rawInput: string) => {
    return rawInput.split('\n');
};

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);

    interface Accumulator {
        max: number;
        current: number;
    }

    const result = input.reduce(
        (acc: Accumulator, current: string) => {
            if (!current) {
                if (acc.current > acc.max) {
                    acc.max = acc.current;
                }
                acc.current = 0;
            } else {
                acc.current += parseInt(current);
            }
            return acc;
        },
        { max: 0, current: 0 },
    );

    return Math.max(result.max, result.current).toString();
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);

    type Accumulator = {
        calories: number[];
        current: number;
    }

    const calorieCounts = input.reduce((acc: Accumulator, current: string) => {
        if (!current) {
            acc.calories.push(acc.current);
            acc.current = 0;
        } else {
            acc.current += parseInt(current);
        }
        return acc;
    }, { calories: [], current: 0 });

    if (calorieCounts.current) {
        calorieCounts.calories.push(calorieCounts.current);
    }

    const sortedCalorieCounts = calorieCounts.calories.sort((a, b) => b - a);

    return sortedCalorieCounts.slice(0, 3).reduce((acc, current) => acc + current, 0).toString();
};

run({
    part1: {
        tests: [
            {
                input: `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
              `,
                expected: '24000',
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
                          `,
                expected: '45000',
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
