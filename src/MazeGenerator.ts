abstract class MazeGenerator {

    private width: number = 30;
    private depth: number = 30;

    public Map: number[][];
    constructor(width: number, height: number) {
        this.width = width;
        this.depth = height;
        this.Initialize();
    }

    public Initialize() {
        for (let i = 0; i < this.width; i++) {
            this.Map[i] = [];
            for (let j = 0; j < this.depth; j++) {
                this.Map[i][j] = 1;
            }
        }
    }

    public CountSquareNeighbours(x: number, y: number): number {
        let count = 0;
        if (this.Map[x - 1][y] == 1) count++;
        if (this.Map[x + 1][y] == 1) count++;
        if (this.Map[x][y - 1] == 1) count++;
        if (this.Map[x][y + 1] == 1) count++;
        return count;
    }

    public CountDiagonalNeighbours(x: number, y: number): number {
        let count = 0;
        if (this.Map[x - 1][y - 1] == 1) count++;
        if (this.Map[x + 1][y - 1] == 1) count++;
        if (this.Map[x - 1][y + 1] == 1) count++;
        if (this.Map[x + 1][y + 1] == 1) count++;
        return count;
    }

    public CountNeighbours(x: number, y: number): number {
        return this.CountSquareNeighbours(x, y) + this.CountDiagonalNeighbours(x, y);
    }

    public abstract Generate(): void;

    public abstract GetMap(): number[][];

    public abstract GetStart(): MapLocation;

    public abstract GetEnd(): MapLocation;

    public abstract GetWidth(): number;

    public abstract GetDepth(): number;

}