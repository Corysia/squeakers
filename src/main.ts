import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Scene, Vector3, HemisphericLight } from "@babylonjs/core";

import { SceneManager } from "./SceneManager";
import { Backtracker } from "./Backtracker";
import { FirstPersonController } from "./FirstPersonController";
import { Sprite } from "./Mixin";

class Main {

    private sceneManager: SceneManager;

    constructor() {
        console.debug("Main");
        this.sceneManager = SceneManager.Instance;
        this.main().catch((err) => {
            console.error(err);
        });

        let player = new Sprite();
        player.jump();
        player.duck();
    }

    private async main(): Promise<void> {
        await this.GenerateMaze();
        this.sceneManager.StartRenderLoop();
    }

    private async GenerateMaze() {
        console.debug("generateMaze");
        const engine = this.sceneManager.Engine;
        engine.displayLoadingUI();
        const maze = new Backtracker(30, 30, 6);
        maze.Generate();

        let scene = new Scene(engine);
        
        const hemisphericLight: HemisphericLight = new HemisphericLight('HemisphericLight', new Vector3(1, .5, 0), scene);
        hemisphericLight.intensity = 0.7;

        maze.Draw(scene);

        await scene.whenReadyAsync();
        engine.hideLoadingUI();
        this.sceneManager.Scene = scene;
        const firstPersonController = new FirstPersonController(new Vector3(maze.StartingLocation._x, 2, maze.StartingLocation._z));
    }
}
new Main();