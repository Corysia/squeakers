import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Scene, Vector3, FreeCamera } from "@babylonjs/core";

import { SceneManager } from "./SceneManager";
import { WilsonsMazeGenerator } from "./WilsonsMazeGenerator";

class Main {

    private sceneManager: SceneManager;

    constructor() {
        console.debug("Main");
        this.sceneManager = SceneManager.Instance;
        this.main().catch((err) => {
            console.error(err);
        });
    }

    private async main(): Promise<void> {
        // await this.goToStart();
        await this.GenerateMaze();
        this.sceneManager.StartRenderLoop();
    }

    private async GenerateMaze() {
        console.debug("generateMaze");
        const engine = this.sceneManager.Engine;
        engine.displayLoadingUI();
        const maze = new WilsonsMazeGenerator(30, 30, 6);
        maze.Generate();

        let scene = new Scene(engine);
        let camera = new FreeCamera("camera", new Vector3(-50, 50, -50), scene);
        camera.setTarget(new Vector3(maze.Width * maze.Scale / 2, 0, maze.Depth * maze.Scale / 2));
        camera.attachControl(this.sceneManager.Canvas, true);
        
        const hemisphericLight = scene.createDefaultLight(true);

        maze.Draw(scene);

        await scene.whenReadyAsync();
        engine.hideLoadingUI();
        this.sceneManager.Scene = scene;
    }
}
new Main();