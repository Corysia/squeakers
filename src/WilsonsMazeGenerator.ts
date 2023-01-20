import { MazeGenerator } from "./MazeGenerator";
import { MapLocation } from "./MapLocation";
import { DirectionalLightFrustumViewer } from "@babylonjs/core";

export class WilsonsMazeGenerator extends MazeGenerator {

    private withRooms: boolean = false;
    private potentialStart: MapLocation[] = [];
    private stalemateCount: number = 0;

    constructor(width: number, height: number, scale: number, rooms: boolean = false) {
        console.debug("Wilson's Maze Generator");
        super(width, height, scale);
        this.withRooms = rooms;
    }

    public override Generate(): void {
        console.debug("Generate");
        // let x = Math.floor(Math.random() * this.width - 1);
        // let z = Math.floor(Math.random() * this.depth - 1);
        // this.map[x][z] = 2;

        // while (this.GetAvailableCells() > 0 && this.stalemateCount < 10) {
        //     this.RandomWalk();
        // }
        super.Generate();
    }
    
    private GetAvailableCells(): number {
        this.potentialStart = [];
        for (let x = 1; x < this.width - 1; x++) {
            for (let z = 1; z < this.depth - 1; z++) {
                if (this.map[x][z] == 0) {
                    this.potentialStart.push(new MapLocation(x, z));
                }
            }
        }
        return this.potentialStart.length;
    }

    private CountSquareMazeNeighbors(x: number, z: number): number {
        let count = 0;
        for (let i = 0; i < this.directions.length; i++) {
            let nx = x + this.directions[i].X
            let nz = z + this.directions[i].Z;
            if (this.map[nx][nz] == 2) {
                count++;
            }
        }
        return count;
    }

    RandomWalk(): void {
        const inWalk: MapLocation[] = [];
        const startIndex = Math.floor(Math.random() * this.potentialStart.length);
        let x = this.potentialStart[startIndex].X;
        let z = this.potentialStart[startIndex].Z;
        inWalk.push(new MapLocation(x, z));

        let loop = 0;
        let validPath = false;

        while (x > 0 && x < this.width - 1 && z > 0 && z < this.depth - 1 && loop < 5000 && !validPath) {
            this.map[x][z] = 0;
            if (!this.withRooms && this.CountSquareMazeNeighbors(x, z) > 1) {
                break;
            }
            const randomDirection = Math.floor(Math.random() * this.directions.length);
            const newX = x + this.directions[randomDirection].X;
            const newZ = z + this.directions[randomDirection].Z;
            if (this.CountSquareNeighbors(newX, newZ) < 2) {
                x = newX;
                z = newZ;
                inWalk.push(new MapLocation(x, z));
            }
            validPath = this.CountSquareMazeNeighbors(x, z) == 1;
            loop++;
        }
        console.debug("Loop: " + loop);
        if (validPath) {
            this.map[x][z] = 0;
            for (let i = 0; i < inWalk.length; i++) {
                this.map[inWalk[i].X][inWalk[i].Z] = 2;
            }
            this.stalemateCount = 0;
        } else {
            for (let i = 0; i < inWalk.length; i++) {
                this.map[inWalk[i].X][inWalk[i].Z] = 1;
            }
            this.stalemateCount++;
        }
    }
}