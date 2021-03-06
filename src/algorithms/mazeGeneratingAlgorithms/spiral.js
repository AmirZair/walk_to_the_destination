import Position, { isEqual, getNeighbours } from "../../helper/position";

const walls = [];
const isOnEdge = (position, rows, columns) => {
    return (
        position.x === 1 ||
        position.x === rows ||
        position.y === 1 ||
        position.y === columns
    );
};

const buildWalls = (startRow, endRow, startColumn, endColumn) => {
    for (let i = startColumn; i <= endColumn; i++) {
        if (Math.random() > 0.04) walls.push(new Position(startRow, i));
    }
    for (let i = startRow + 1; i <= endRow; i++) {
        if (Math.random() > 0.02) walls.push(new Position(i, endColumn));
    }
    if (startRow >= endRow - 1 || startColumn >= endColumn - 1) return;
    for (let i = endColumn - 1; i >= startColumn; i--) {
        if (Math.random() > 0.04) walls.push(new Position(endRow, i));
    }
    for (let i = endRow - 1; i >= startRow + 2; i--) {
        if (Math.random() > 0.02) walls.push(new Position(i, startColumn));
    }
    if (startRow + 2 <= endRow - 2 && startColumn + 2 <= endColumn - 2)
        walls.push(new Position(startRow + 2, startColumn + 1));
    else return;
    buildWalls(startRow + 2, endRow - 2, startColumn + 2, endColumn - 2);
};

const generateSpiralMaze = (rows, columns, source, target) => {
    walls.length = 0;
    window.rows = rows;
    window.columns = columns;

    buildWalls(1, rows, 1, columns);

    const sourceNeighbours = isOnEdge(source, rows, columns)
        ? getNeighbours(source, rows, columns)
        : [];
    const targetNeighbours = isOnEdge(target, rows, columns)
        ? getNeighbours(target, rows, columns)
        : [];
    return walls.filter(
        (wall) =>
            !isEqual(wall, source) &&
            !isEqual(wall, target) &&
            // (wall.y !== columns - 1 || wall.x === 1 || wall.x === rows) &&
            !sourceNeighbours.some((node) => isEqual(node, wall)) &&
            !targetNeighbours.some((node) => isEqual(node, wall))
    );
};

export default generateSpiralMaze;
