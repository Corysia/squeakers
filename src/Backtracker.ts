import { MathUtil } from "./MathUtil";
import { MazeGenerator } from "./MazeGenerator";

export class Backtracker extends MazeGenerator {
    constructor(width: number, height: number, scale: number) {
        super(width, height, scale);
    }

    public override Generate(): void {
        this.GenerateMaze(MathUtil.RandomRange(2, this.width - 2), MathUtil.RandomRange(2, this.depth - 2));
    }

    private GenerateMaze(x: number, z: number): void {
        if (this.CountSquareNeighbors(x, z) > 1) return;
        this.map[x][z] = 0;
        this.directions = MathUtil.Shuffle(this.directions);

        this.GenerateMaze(x + this.directions[0].X, z + this.directions[0].Z);
        this.GenerateMaze(x + this.directions[1].X, z + this.directions[1].Z);
        this.GenerateMaze(x + this.directions[2].X, z + this.directions[2].Z);
        this.GenerateMaze(x + this.directions[3].X, z + this.directions[3].Z);
    }
}