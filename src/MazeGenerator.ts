import { MapLocation } from "./MapLocation";
import { Drawable } from "./Drawable";
import { CreateBox, Vector3, Scene, MeshBuilder } from "@babylonjs/core";
import { bonesDeclaration } from "@babylonjs/core/Shaders/ShadersInclude/bonesDeclaration";

export abstract class MazeGenerator implements Drawable {

    private width: number = 30;
    private depth: number = 30;
    private scale: number = 1;

    public Map: number[][];

    constructor(width: number, height: number, scale: number) {
        console.debug("Maze Generator")
        this.width = width;
        this.depth = height;
        this.scale = scale;
        this.Map = [];
        this.Initialize();
    }

    Draw(scene: Scene): void {
        console.debug("Draw");
        // const box = CreateBox("box", { size: 1 }, scene);
        // box.position = new Vector3(0, 0, 0);
        // scene.addMesh(box);
        const offset = 0.5 * this.scale;
        const ground = MeshBuilder.CreateGround('ground', { width: this.width * this.scale, height: this.depth * this.scale }, scene);
        ground.position = new Vector3(this.width * this.scale / 2 - offset, 0, this.depth * this.scale / 2 - offset);
        const box = CreateBox("box", { size: 1 }, scene);
        box.isVisible = false;
        scene.addMesh(box);

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.depth; j++) {
                if (this.Map[i][j] == 1) {
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
            console.debug("Initializing row " + i)
            this.Map[i] = [];
            for (let j = 0; j < this.depth; j++) {
                console.debug("Initializing column " + j)
                this.Map[i][j] = 1;
            }
        }
        console.debug("Map initialized");
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

    // Randomly remove walls (not a good maze algorithm, don't use this)
    public Generate(): void {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.depth; j++) {
                if (Math.floor(Math.random() * 100) < 50) {
                    this.Map[i][j] = 0; // 1 = wall, 0 = path
                }
            }
        }
    }

    public abstract GetMap(): number[][];

    public abstract GetStart(): MapLocation;

    public abstract GetEnd(): MapLocation;

    public abstract GetWidth(): number;

    public abstract GetDepth(): number;

}