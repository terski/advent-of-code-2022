import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split('\n');

type Entry = {
    type: 'file' | 'dir';
    name: string;
    size: number;
    parent?: Entry;
    children?: Entry[];
};

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const fsRoot = parseFilesystem(input);
    const result = sumSmallDirectories(fsRoot);

    return result.toString();
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const fsRoot = parseFilesystem(input);
    const freeSpace = 70000000 - fsRoot.size;
    const requiredSpace = 30000000 - freeSpace;
    const directories = flattenDirectories(fsRoot);
    const sortedDirectories = directories
        .filter((dir) => dir.size >= requiredSpace)
        .sort((a, b) => a.size - b.size);

    return sortedDirectories[0].size.toString();
};

const flattenDirectories = (entry: Entry) => {
    const directories: Entry[] = [];
    directories.push(entry);
    if (entry.children) {
        for (const child of entry.children.filter(
            (child) => child.type === 'dir',
        )) {
            directories.push(...flattenDirectories(child));
        }
    }
    return directories;
};

const sumSmallDirectories = (entry: Entry) => {
    let size = 0;
    if (entry.size <= 100000) {
        size = entry.size;
    }

    if (entry.children) {
        for (const child of entry.children.filter(
            (child) => child.type === 'dir',
        )) {
            size += sumSmallDirectories(child);
        }
    }

    return size;
};

function parseFilesystem(input: string[]) {
    const fsRoot: Entry = { type: 'dir', name: '/', size: 0, children: [] };
    let currentDir = fsRoot;
    for (const line of input) {
        switch (line[0]) {
            case '$':
                // Command
                if (line.startsWith('$ cd')) {
                    const directory = line.split(' ')[2];
                    if (directory === '/') {
                        currentDir = fsRoot;
                    } else if (directory === '..') {
                        currentDir = currentDir.parent ?? fsRoot;
                    } else {
                        const newDir = currentDir.children?.find(
                            (entry) => entry.name === directory,
                        );
                        if (!newDir) {
                            throw new Error(
                                `Directory not found: ${directory}`,
                            );
                        }
                        currentDir = newDir;
                    }
                }
                break;
            case 'd':
                // Directory
                const newDir: Entry = {
                    type: 'dir',
                    name: line.split(' ')[1],
                    size: 0,
                    children: [],
                    parent: currentDir,
                };
                currentDir.children?.push(newDir);
                break;
            default:
                // File
                const [size, name] = line.split(' ');
                const newFile: Entry = {
                    type: 'file',
                    name,
                    size: +size,
                    parent: currentDir,
                };

                let parent: Entry | undefined = currentDir;
                while (parent) {
                    parent.size += newFile.size;
                    parent = parent.parent;
                }
                currentDir.children?.push(newFile);
                break;
        }
    }
    return fsRoot;
}

const view = (entry: Entry, depth = 0) => {
    console.log(
        `${'  '.repeat(depth)}${entry.name} (${entry.size} - ${entry.type})`,
    );
    if (entry.children) {
        for (const child of entry.children) {
            view(child, depth + 1);
        }
    }
};

run({
    part1: {
        tests: [
            {
                input: `
                $ cd /
                $ ls
                dir a
                14848514 b.txt
                8504156 c.dat
                dir d
                $ cd a
                $ ls
                dir e
                29116 f
                2557 g
                62596 h.lst
                $ cd e
                $ ls
                584 i
                $ cd ..
                $ cd ..
                $ cd d
                $ ls
                4060174 j
                8033020 d.log
                5626152 d.ext
                7214296 k
              `,
                expected: '95437',
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `
                $ cd /
                $ ls
                dir a
                14848514 b.txt
                8504156 c.dat
                dir d
                $ cd a
                $ ls
                dir e
                29116 f
                2557 g
                62596 h.lst
                $ cd e
                $ ls
                584 i
                $ cd ..
                $ cd ..
                $ cd d
                $ ls
                4060174 j
                8033020 d.log
                5626152 d.ext
                7214296 k
              `,
                expected: '24933642',
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
