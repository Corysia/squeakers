import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, Vector3, Color4, FreeCamera } from "@babylonjs/core";
import { AdvancedDynamicTexture, Button, Control  } from "@babylonjs/gui";

import { WilsonsMazeGenerator } from "./WilsonsMazeGenerator";

class Main {
    private scene: Scene;
    private canvas: HTMLCanvasElement;
    private engine: Engine;

    constructor() {
        console.debug("Main");
        this.canvas = this.createCanvas();

        // initialize babylon scene and engine
        this.engine = new Engine(this.canvas, true);
        this.scene = new Scene(this.engine);

        // handle the browser's resize
        window.addEventListener("resize", () => {
            this.engine.resize();
        });

        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            // keyCode 73 = I, need to use this because ev.key === "I" doesn't work on a Mac
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                if (this.scene.debugLayer.isVisible()) {
                    this.scene.debugLayer.hide();
                } else {
                    this.scene.debugLayer.show();
                }
            }
        });

        this.main().catch((err) => {
            console.error(err);
        });
    }

    private async main(): Promise<void> {
        // await this.goToStart();
        await this.generateMaze();

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    private async generateMaze() {
        console.debug("generateMaze");
        this.engine.displayLoadingUI();
        const maze = new WilsonsMazeGenerator(10, 10, 1);
        maze.Initialize();
        // maze.Generate();

        let scene = new Scene(this.engine);
        let camera = new FreeCamera("camera", new Vector3(0, 0, 0), scene);
        camera.setTarget(Vector3.Zero());

        await scene.whenReadyAsync();
        this.engine.hideLoadingUI();
        this.scene.dispose()
        this.scene = scene;
    }

    // Not called for the moment while we are testing the maze generator
    private async goToStart() {
        console.debug("goToStart");
        this.engine.displayLoadingUI();
        this.scene.detachControl();



        let scene = new Scene(this.engine);
        scene.clearColor = new Color4(0, 0, 0, 1);
        let camera = new FreeCamera("camera", new Vector3(0, 0, 0), scene);
        camera.setTarget(Vector3.Zero());

        // create a fullscreen UI
        const guiMenu = AdvancedDynamicTexture.CreateFullscreenUI("UI");
        guiMenu.idealHeight = 720;

        // create the start button
        const startButton = Button.CreateSimpleButton("start", "Start Game");
        startButton.width = 0.2;
        startButton.height = "40px";
        startButton.color = "white";
        startButton.thickness = 0;
        startButton.verticalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER | Control.VERTICAL_ALIGNMENT_CENTER;
        startButton.cornerRadius = 20;
        startButton.background = "green";
        guiMenu.addControl(startButton);

        startButton.onPointerUpObservable.add(() => {
            // Start the game
            console.debug("startButton");
            startButton.textBlock.text = "Loading...";
            scene.detachControl();
        });

        await scene.whenReadyAsync();
        this.engine.hideLoadingUI();
        this.scene.dispose()
        this.scene = scene;
    }

    createCanvas(): HTMLCanvasElement {
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);
        return canvas;
    }
}
new Main();