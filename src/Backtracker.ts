import { MapLocation } from "./MapLocation";
import { MathUtil } from "./MathUtil";
import { MazeGenerator } from "./MazeGenerator";

export class Backtracker extends MazeGenerator {
    public override Generate(): void {
        console.debug("Generate");
        super.Generate();
        let x = MathUtil.RandomRange(2, this.width - 2)
        let z = MathUtil.RandomRange(2, this.depth - 2)
        this.map[x][z] = 2;
        this.Backtrack(x, z);
    }

    private Backtrack(x: number, z: number): void {
        let neighbors = this.GetUnvisitedNeighbors(x, z);
        while (neighbors.length > 0) {
            let next = neighbors[MathUtil.RandomRange(0, neighbors.length - 1)];
            this.map[next.X][next.Z] = 2;
            this.Backtrack(next.X, next.Z);
            neighbors = this.GetUnvisitedNeighbors(x, z);
        }
    }

    private GetUnvisitedNeighbors(x: number, z: number): MapLocation[] {
        let neighbors: MapLocation[] = [];
        for (let i = 0; i < this.directions.length; i++) {
            let nx = x + this.directions[i].X
            let nz = z + this.directions[i].Z;
            if (this.map[nx][nz] == 1) {
                neighbors.push(new MapLocation(nx, nz));
            }
        }
        return neighbors;
    }
}