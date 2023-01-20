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
        this.sceneManager = SceneManager.instance;
        this.main().catch((err) => {
            console.error(err);
        });
    }

    private async main(): Promise<void> {
        // await this.goToStart();
        await this.generateMaze();
        SceneManager.instance.StartRenderLoop();
    }

    private async generateMaze() {
        console.debug("generateMaze");
        const engine = this.sceneManager.Engine;
        engine.displayLoadingUI();
        const maze = new WilsonsMazeGenerator(30, 30, 6);
        maze.Initialize();
        maze.Generate();

        let scene = new Scene(engine);
        let camera = new FreeCamera("camera", new Vector3(0, 50, -50), scene);
        const hemisphericLight = scene.createDefaultLight(true);
        camera.setTarget(Vector3.Zero());
        camera.attachControl(this.sceneManager.Canvas, true);
        maze.Draw(scene);

        await scene.whenReadyAsync();
        engine.hideLoadingUI();
        SceneManager.instance.currentScene = scene;
    }
}
new Main();