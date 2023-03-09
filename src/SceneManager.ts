import { Scene, Engine } from "@babylonjs/core";

export class SceneManager {
    private static instance: SceneManager;
    private scene: Scene;
    private canvas: HTMLCanvasElement;
    private engine: Engine;

    public static get Instance(): SceneManager {
        if (!SceneManager.instance) {
            SceneManager.instance = new SceneManager();
        }
        return SceneManager.instance;
    }

    public get Canvas(): HTMLCanvasElement {
        return this.canvas;
    }

    public get Engine(): Engine {
        return this.engine;
    }

    public get Scene(): Scene {
        return this.scene;
    }

    public set Scene(scene: Scene) {
        if (this.scene) {
            this.scene.dispose();
        }
        this.scene = scene;
    }

    private constructor() {
        this.canvas = this.CreateCanvas();
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
            // Shift-Ctrl-F to toggle fullscreen
            if (ev.shiftKey && ev.ctrlKey && ev.keyCode === 70) {
                this.engine.switchFullscreen(false);
            }

        });
    }

    private CreateCanvas(): HTMLCanvasElement {
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);
        return canvas;
    }

    public StartRenderLoop() {
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    public static dispose() {
        SceneManager.instance = null;
    }
}