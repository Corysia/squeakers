import { MapLocation } from "./MapLocation";
import { MathUtil } from "./MathUtil";
import { MazeGenerator } from "./MazeGenerator";

export class Backtracker extends MazeGenerator {
    constructor(width: number, height: number, scale: number) {
        super(width, height, scale);
    }

    public override Generate(): void {
        // this.GenerateMaze(MathUtil.RandomRange(2, this.width), MathUtil.RandomRange(2, this.depth));
        this.GenerateMaze(this.width / 2, this.depth / 2);
    }

    private GenerateMaze(x: number, z: number): void {
        if (this.CountSquareNeighbors(x, z) > 1) return;
        this.map[x][z] = 0;
        let localDirections = MathUtil.Shuffle(this.directions);

        this.GenerateMaze(x + localDirections[0].X, z + localDirections[0].Z);
        this.GenerateMaze(x + localDirections[1].X, z + localDirections[1].Z);
        this.GenerateMaze(x + localDirections[2].X, z + localDirections[2].Z);
        this.GenerateMaze(x + localDirections[3].X, z + localDirections[3].Z);
    }
}