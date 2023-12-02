import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split('\n');

const part1 = (rawInput: string) => {
    const instructions = parseInput(rawInput);

    let x = 1;
    let cycle = 0;
    let signalStrengths = new Array<number>();

    for (let instruction of instructions) {
        cycle++;
        checkSignal(cycle, x, signalStrengths);

        if (instruction.startsWith('addx')) {
            cycle++;
            checkSignal(cycle, x, signalStrengths);

            const increment = +instruction.split(' ')[1];
            x += increment;
        }
    }

    const sum = signalStrengths.reduce((acc, curr) => acc + curr, 0);

    return sum.toString();
};

const part2 = (rawInput: string) => {
    const instructions = parseInput(rawInput);

    let x = 1;
    let cycle = 0;
    let crt = new Array<string>(240).fill('.');

    for (let instruction of instructions) {
        cycle++;
        drawPixel(cycle, x, crt);

        if (instruction.startsWith('addx')) {
            cycle++;
            drawPixel(cycle, x, crt);

            const increment = +instruction.split(' ')[1];
            x += increment;
        }
    }

    const result = [];
    for (let i = 0; i < 6; i++) {
        result.push(crt.slice(i * 40, i * 40 + 40).join(''));
    }
    console.log(result);
    return result.toString();
};

const checkSignal = (cycle: number, x: number, signalStrengths: number[]) => {
    if ((cycle + 20) % 40 === 0) {
        signalStrengths.push(cycle * x);
    }
};

const drawPixel = (cycle: number, x: number, display: string[]) => {
    const pos = cycle - 1;
    const row = Math.floor(pos/40);
    const col = pos - (row * 40);
    const lit = Math.abs(col - x) < 2;

    display[pos] = lit ? '#' : '.';
};

run({
    part1: {
        tests: [
            {
                input: `
                    addx 15
                    addx -11
                    addx 6
                    addx -3
                    addx 5
                    addx -1
                    addx -8
                    addx 13
                    addx 4
                    noop
                    addx -1
                    addx 5
                    addx -1
                    addx 5
                    addx -1
                    addx 5
                    addx -1
                    addx 5
                    addx -1
                    addx -35
                    addx 1
                    addx 24
                    addx -19
                    addx 1
                    addx 16
                    addx -11
                    noop
                    noop
                    addx 21
                    addx -15
                    noop
                    noop
                    addx -3
                    addx 9
                    addx 1
                    addx -3
                    addx 8
                    addx 1
                    addx 5
                    noop
                    noop
                    noop
                    noop
                    noop
                    addx -36
                    noop
                    addx 1
                    addx 7
                    noop
                    noop
                    noop
                    addx 2
                    addx 6
                    noop
                    noop
                    noop
                    noop
                    noop
                    addx 1
                    noop
                    noop
                    addx 7
                    addx 1
                    noop
                    addx -13
                    addx 13
                    addx 7
                    noop
                    addx 1
                    addx -33
                    noop
                    noop
                    noop
                    addx 2
                    noop
                    noop
                    noop
                    addx 8
                    noop
                    addx -1
                    addx 2
                    addx 1
                    noop
                    addx 17
                    addx -9
                    addx 1
                    addx 1
                    addx -3
                    addx 11
                    noop
                    noop
                    addx 1
                    noop
                    addx 1
                    noop
                    noop
                    addx -13
                    addx -19
                    addx 1
                    addx 3
                    addx 26
                    addx -30
                    addx 12
                    addx -1
                    addx 3
                    addx 1
                    noop
                    noop
                    noop
                    addx -9
                    addx 18
                    addx 1
                    addx 2
                    noop
                    noop
                    addx 9
                    noop
                    noop
                    noop
                    addx -1
                    addx 2
                    addx -37
                    addx 1
                    addx 3
                    noop
                    addx 15
                    addx -21
                    addx 22
                    addx -6
                    addx 1
                    noop
                    addx 2
                    addx 1
                    noop
                    addx -10
                    noop
                    noop
                    addx 20
                    addx 1
                    addx 2
                    addx 2
                    addx -6
                    addx -11
                    noop
                    noop
                    noop
              `,
                expected: '13140',
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `
                addx 15
                addx -11
                addx 6
                addx -3
                addx 5
                addx -1
                addx -8
                addx 13
                addx 4
                noop
                addx -1
                addx 5
                addx -1
                addx 5
                addx -1
                addx 5
                addx -1
                addx 5
                addx -1
                addx -35
                addx 1
                addx 24
                addx -19
                addx 1
                addx 16
                addx -11
                noop
                noop
                addx 21
                addx -15
                noop
                noop
                addx -3
                addx 9
                addx 1
                addx -3
                addx 8
                addx 1
                addx 5
                noop
                noop
                noop
                noop
                noop
                addx -36
                noop
                addx 1
                addx 7
                noop
                noop
                noop
                addx 2
                addx 6
                noop
                noop
                noop
                noop
                noop
                addx 1
                noop
                noop
                addx 7
                addx 1
                noop
                addx -13
                addx 13
                addx 7
                noop
                addx 1
                addx -33
                noop
                noop
                noop
                addx 2
                noop
                noop
                noop
                addx 8
                noop
                addx -1
                addx 2
                addx 1
                noop
                addx 17
                addx -9
                addx 1
                addx 1
                addx -3
                addx 11
                noop
                noop
                addx 1
                noop
                addx 1
                noop
                noop
                addx -13
                addx -19
                addx 1
                addx 3
                addx 26
                addx -30
                addx 12
                addx -1
                addx 3
                addx 1
                noop
                noop
                noop
                addx -9
                addx 18
                addx 1
                addx 2
                noop
                noop
                addx 9
                noop
                noop
                noop
                addx -1
                addx 2
                addx -37
                addx 1
                addx 3
                noop
                addx 15
                addx -21
                addx 22
                addx -6
                addx 1
                noop
                addx 2
                addx 1
                noop
                addx -10
                noop
                noop
                addx 20
                addx 1
                addx 2
                addx 2
                addx -6
                addx -11
                noop
                noop
                noop
                `,
                expected: [
                    '##..##..##..##..##..##..##..##..##..##..',
                    '###...###...###...###...###...###...###.',
                    '####....####....####....####....####....',
                    '#####.....#####.....#####.....#####.....',
                    '######......######......######......####',
                    '#######.......#######.......#######.....',
                ].toString(),
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
