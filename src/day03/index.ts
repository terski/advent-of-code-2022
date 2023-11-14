import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split('\n');

const calculateScore = (input: string) => {
    const compartment1 = input.slice(0, input.length / 2);
    const compartment2 = input.slice(input.length / 2);
    const common = compartment1.split('').reduce((acc, curr, index) => {
        if (!acc && compartment2.indexOf(curr) !== -1) {
            acc = curr;
        }
        return acc;
    }, '');

    return priority(common);
};

const priority = (input: string) => {
    const unicodeValue = input.charCodeAt(0);
    const offset = unicodeValue >= 97 ? 96 : 64 - 26;
    const score = unicodeValue - offset;
    return score;
};

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const sum = input.reduce((acc, curr) => acc + calculateScore(curr), 0);
    return sum.toString();
};

const badge = (input: string[]) => {
    const badge = input[0].split('').reduce((acc, curr, index) => {
        if (
            !acc &&
            input[1].indexOf(curr) !== -1 &&
            input[2].indexOf(curr) !== -1
        ) {
            acc = curr;
        }
        return acc;
    }, '');

    return badge;
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);
    let sum = 0;
    for (let ii = 0; ii < input.length; ii+=3) {
        sum += priority(badge(input.slice(ii, ii + 3)));
    }

    return sum.toString();
};

run({
    part1: {
        tests: [
            {
                input: `
                    vJrwpWtwJgWrhcsFMMfFFhFp
                    jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
                    PmmdzqPrVvPwwTWBwg
                    wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
                    ttgJtRGJQctTZtZT
                    CrZsJsPPZsGzwwsLwLmpwMDw
                    `,
                expected: '157',
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `
                    vJrwpWtwJgWrhcsFMMfFFhFp
                    jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
                    PmmdzqPrVvPwwTWBwg
                    wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
                    ttgJtRGJQctTZtZT
                    CrZsJsPPZsGzwwsLwLmpwMDw
                    `,
                expected: '70',
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
