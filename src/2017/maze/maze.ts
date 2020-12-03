type MazeAndPosition = {maze: number[], position: number};

function nextStep(state: MazeAndPosition): MazeAndPosition {
    const {position, maze} = state;
    const nextPosition = position + maze[position];
    const newOffset = maze[position] >= 3 ? maze[position] - 1 : maze[position] + 1;
    const nextMaze = [...maze.slice(0, position), newOffset, ...maze.slice(position + 1)];
    return ({
        maze: nextMaze,
        position: nextPosition
    });
}

export function iterateUntilOutsideMaze(initialState: MazeAndPosition): number {
    let step = 0;
    let state = initialState;
    do {
        // printState(state);
        step += 1;
        if (step % 1000 === 0) console.log(step);
        state = nextStep(state);
        if (state.position >= state.maze.length || state.position < 0) {
            return step;
        }
    } while(true);
}

export function iterateUntilOutsideMazeV2(initialState: MazeAndPosition): number {
    let step = 0;
    let state = initialState;
    do {
        printState(state);
        step += 1;
        if (step % 1000 === 0) console.log(step);
        // state = nextStep(state);
        state.position += state.maze[state.position];
        state.maze[state.position] = state.maze[state.position] >= 3
            ? state.maze[state.position] - 1
            : state.maze[state.position] + 1;
        if (state.position >= state.maze.length || state.position < 0) {
            return step;
        }
    } while(true);
}

function printState(state: MazeAndPosition) {
    const maze = state.maze.map((v, i) => i === state.position ? `(${v})` : v.toString());
    console.log(maze.join(' '));
}