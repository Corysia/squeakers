import { Scene, Engine } from "@babylonjs/core";

export class SceneManager {
    private static _instance: SceneManager;
    private _scene: Scene;
    private canvas: HTMLCanvasElement;
    private engine: Engine;

    public static get instance(): SceneManager {
        if (!SceneManager._instance) {
            SceneManager._instance = new SceneManager();
        }
        return SceneManager._instance;
    }

    public get Canvas(): HTMLCanvasElement {
        return this.canvas;
    }
    
    public get Engine(): Engine {
        return this.engine;
    }

    public get currentScene(): Scene {
        return this._scene;
    }

    public set currentScene(scene: Scene) {
        if (this._scene) {
            this._scene.dispose();
        }
        this._scene = scene;
    }

    private constructor() {
        this.canvas = this.createCanvas();
        this.engine = new Engine(this.canvas, true);
        this._scene = new Scene(this.engine);

        // handle the browser's resize
        window.addEventListener("resize", () => {
            this.engine.resize();
        });

        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            // keyCode 73 = I, need to use this because ev.key === "I" doesn't work on a Mac
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                if (this._scene.debugLayer.isVisible()) {
                    this._scene.debugLayer.hide();
                } else {
                    this._scene.debugLayer.show();
                }
            }
        });
    }

    private createCanvas(): HTMLCanvasElement {
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);
        return canvas;
    }

    public StartRenderLoop() {
        this.engine.runRenderLoop(() => {
            this._scene.render();
        });
    }

    public static dispose() {
        SceneManager._instance = null;
    }
}