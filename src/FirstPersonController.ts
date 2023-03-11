import { FreeCamera, Scene, Vector3 } from "@babylonjs/core";
import { SceneManager } from "./SceneManager";

export class FirstPersonController {
    private camera: FreeCamera;
    private scene: Scene;

    constructor(location = new Vector3(0, 0, 0), scene = SceneManager.Instance.Scene, canvas = SceneManager.Instance.Canvas, ) {
        console.debug("FirstPersonController");
        this.scene = scene;
        this.camera = new FreeCamera("FirstPersonController", location, scene);
        this.camera.inputs.addMouse();
        this.camera.inputs._mouseInput.buttons = [2];
        this.camera.setTarget(Vector3.Zero());
        this.camera.attachControl(canvas, true);
        this.camera.speed = 0.5;
        this.camera.minZ = 0.45;
        this.camera.angularSensibility = 4000;

        this.ActivateWASD();
        this.SetupCollisions();
        this.PointerLock();
        this.EnableGravity();
    }

    public get Camera(): FreeCamera {
        return this.camera;
    }

    public get Speed(): number {
        return this.camera.speed;
    }

    public set Speed(speed: number) {
        this.camera.speed = speed;
    }

    public set Scene(scene: Scene) {
        this.scene = scene;
        this.camera._scene = scene;
    }

    private SetupCollisions(): void {
        this.camera.checkCollisions = true;
        this.camera.ellipsoid = new Vector3(1, 2, 1);
        this.scene.collisionsEnabled = true;
    }

    private EnableGravity(): void {
        let gravity = -9.81;
        let framesPerSecond = 60; // should come from the engine
        this.scene.gravity = new Vector3(0, gravity / framesPerSecond, 0);
        this.camera.applyGravity = true;
    }

    private DisableGravity(): void {
        this.scene.gravity = new Vector3(0, 0, 0);
        this.camera.applyGravity = false;
    }

    private ActivateWASD(): void {
        this.camera.keysUp.push(87); // W
        this.camera.keysDown.push(83); // S
        this.camera.keysLeft.push(65); // A
        this.camera.keysRight.push(68); // D
    }

    private PointerLock(): void {
        this.scene.onPointerDown = (evt) => {
            // evt.button === 0 is the left mouse button
            // evt.button === 1 is the middle mouse button
            // evt.button === 2 is the right mouse button
            if (evt.button === 2) {
                SceneManager.Instance.Engine.enterPointerlock();
            // } else if (evt.button === 1) { // middle mouse
            //     SceneManager.Instance.Engine.exitPointerlock();
            }
        };

        this.scene.onPointerUp = (evt) => {
            if (evt.button === 2) {
                SceneManager.Instance.Engine.exitPointerlock();
            }
        }
    }
}