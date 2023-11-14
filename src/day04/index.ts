import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split('\n');

const contains = (r1: string, r2: string) => {
    const [r1Min, r1Max] = r1.split('-').map(Number);
    const [r2Min, r2Max] = r2.split('-').map(Number);
    return r1Min <= r2Min && r1Max >= r2Max;
}

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const totalContained = input.reduce((total, line, i) => {
        const [r1, r2] = line.split(',').map(s => s.trim());
        if (contains(r1, r2) || contains(r2, r1)) {
            return total + 1;
        }
        return total;
    }, 0);

    return totalContained.toString();
};

const overlaps = (r1: string, r2: string) => {
    const [r1Min, r1Max] = r1.split('-').map(Number);
    const [r2Min, r2Max] = r2.split('-').map(Number);
    return r1Min <= r2Max && r1Max >= r2Min;
}

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const totalOverlaps = input.reduce((total, line, i) => {
        const [r1, r2] = line.split(',').map(s => s.trim());
        if (overlaps(r1, r2) || overlaps(r2, r1)) {
            return total + 1;
        }
        return total;
    }, 0);

    return totalOverlaps.toString();
};

run({
    part1: {
        tests: [
            {
              input: `
                2-4,6-8
                2-3,4-5
                5-7,7-9
                2-8,3-7
                6-6,4-6
                2-6,4-8
              `,
              expected: "2",
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `
                  2-4,6-8
                  2-3,4-5
                  5-7,7-9
                  2-8,3-7
                  6-6,4-6
                  2-6,4-8
                `,
                expected: "4",
              },
          ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
