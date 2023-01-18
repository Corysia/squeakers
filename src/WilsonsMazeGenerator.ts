import { MazeGenerator } from "./MazeGenerator";
import { MapLocation } from "./MapLocation";

export class WilsonsMazeGenerator extends MazeGenerator {

    constructor(width: number, height: number, scale: number) {
        console.log("Wilson's Maze Generator");
        super(width, height);
    }
    
    public Generate(): void {
        throw new Error("Method not implemented.");
    }
    public GetMap(): number[][] {
        throw new Error("Method not implemented.");
    }
    public GetStart(): MapLocation {
        throw new Error("Method not implemented.");
    }
    public GetEnd(): MapLocation {
        throw new Error("Method not implemented.");
    }
    public GetWidth(): number {
        throw new Error("Method not implemented.");
    }
    public GetDepth(): number {
        throw new Error("Method not implemented.");
    }
    public GetScale(): number {
        throw new Error("Method not implemented.");
    }

}