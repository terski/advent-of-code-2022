import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

const containsDuplicates = (input: string) => {
    console.log(input);
    const chars = input.split('');
    const set = new Set(chars);
    return chars.length !== set.size;
};

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    for (let i = 3; i < input.length; i++) {
        if (containsDuplicates(input.slice(i - 3, i + 1))) {
            continue;
        }
        return (i + 1).toString();
    }

    return (-1).toString();
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);
    for (let i = 13; i < input.length; i++) {
        if (containsDuplicates(input.slice(i - 13, i + 1))) {
            continue;
        }
        return (i + 1).toString();
    }

    return (-1).toString();
};

run({
    part1: {
        tests: [
            { input: `bvwbjplbgvbhsrlpgdmjqwftvncz`, expected: '5' },
            { input: `nppdvjthqldpwncqszvftbrmjlhg`, expected: '6' },
            { input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`, expected: '10' },
            { input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`, expected: '11' },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            { input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`, expected: '19' },
            { input: `bvwbjplbgvbhsrlpgdmjqwftvncz`, expected: '23' },
            { input: `nppdvjthqldpwncqszvftbrmjlhg`, expected: '23' },
            { input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`, expected: '29' },
            { input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`, expected: '26' },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
