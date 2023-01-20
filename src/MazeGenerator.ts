import { MapLocation } from "./MapLocation";
import { Drawable } from "./Drawable";
import { CreateBox, Vector3, Scene, MeshBuilder } from "@babylonjs/core";

export abstract class MazeGenerator implements Drawable {

    protected width: number = 30;
    protected depth: number = 30;
    protected scale: number = 1;

    protected map: number[][];
    protected directions: MapLocation[] = [
        new MapLocation(0, -1),
        new MapLocation(1, 0),
        new MapLocation(0, 1),
        new MapLocation(-1, 0)
    ];

    constructor(width: number, height: number, scale: number) {
        console.debug("Maze Generator")
        this.width = width;
        this.depth = height;
        this.scale = scale;
        this.map = [];
        this.Initialize();
    }

    Draw(scene: Scene): void {
        console.debug("Draw");
        const offset = 0.5 * this.scale;
        const ground = MeshBuilder.CreateGround('ground', { width: this.width * this.scale, height: this.depth * this.scale }, scene);
        ground.position = new Vector3(this.width * this.scale / 2 - offset, 0, this.depth * this.scale / 2 - offset);
        const box = CreateBox("box", { size: 1 }, scene);
        box.isVisible = false;
        scene.addMesh(box);

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.depth; j++) {
                if (this.map[i][j] == 1) {
                    let instance = box.createInstance("box" + i + j);
                    instance.position = new Vector3(i * this.scale, offset, j * this.scale);
                    instance.scaling = new Vector3(this.scale, this.scale, this.scale);
                }
            }
        }
    }

    public Initialize() {
        console.debug("Initializing map");
        for (let i = 0; i < this.width; i++) {
            this.map[i] = [];
            for (let j = 0; j < this.depth; j++) {
                this.map[i][j] = 1;
            }
        }
        console.debug("map initialized");
    }

    public CountSquareNeighbors(x: number, y: number): number {
        let count = 0;
        if (this.map[x - 1][y] == 1) count++;
        if (this.map[x + 1][y] == 1) count++;
        if (this.map[x][y - 1] == 1) count++;
        if (this.map[x][y + 1] == 1) count++;
        return count;
    }

    public CountDiagonalNeighbors(x: number, y: number): number {
        let count = 0;
        if (this.map[x - 1][y - 1] == 1) count++;
        if (this.map[x + 1][y - 1] == 1) count++;
        if (this.map[x - 1][y + 1] == 1) count++;
        if (this.map[x + 1][y + 1] == 1) count++;
        return count;
    }

    public CountNeighbors(x: number, y: number): number {
        return this.CountSquareNeighbors(x, y) + this.CountDiagonalNeighbors(x, y);
    }

    // Randomly remove walls (not a good maze algorithm, don't use this)
    public Generate(): void {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.depth; j++) {
                if (Math.floor(Math.random() * 100) < 50) {
                    this.map[i][j] = 0; // 1 = wall, 0 = path
                }
            }
        }
    }

    public get Zap(): number[][] {
        return this.map;
    }

    public get Width(): number {
        return this.width;
    }

    public get Depth(): number {
        return this.depth;
    }

    public get Scale(): number {
        return this.scale;
    }
}