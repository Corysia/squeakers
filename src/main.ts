import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, Vector3, Color4, FreeCamera } from "@babylonjs/core";

import { SceneManager } from "./SceneManager";
import { WilsonsMazeGenerator } from "./WilsonsMazeGenerator";

class Main {

    constructor() {
        console.debug("Main");

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
        const sceneManager = SceneManager.instance;
        console.debug("generateMaze");
        sceneManager.Engine.displayLoadingUI();
        const maze = new WilsonsMazeGenerator(10, 10, 1);
        maze.Initialize();
        // maze.Generate();

        let scene = new Scene(sceneManager.Engine);
        let camera = new FreeCamera("camera", new Vector3(0, 5, -10), scene);
        camera.setTarget(Vector3.Zero());
        camera.attachControl(sceneManager.Canvas, true);

        await scene.whenReadyAsync();
        sceneManager.Engine.hideLoadingUI();
        SceneManager.instance.currentScene = scene;
        maze.Draw();
    }
}
new Main();