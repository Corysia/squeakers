import { FreeCamera, FreeCameraInputsManager, Scene, Tools, Vector3 } from "@babylonjs/core";
import { SceneManager } from "./SceneManager";

export class FirstPersonController {
    private camera: FreeCamera;
    private scene: Scene;

    constructor(location = new Vector3(0, 0, 0), scene = SceneManager.Instance.Scene, canvas = SceneManager.Instance.Canvas, ) {
        console.debug("FirstPersonController");
        this.scene = scene;
        this.camera = new FreeCamera("FirstPersonController", location, scene);
        this.camera.setTarget(Vector3.Zero());
        this.camera.attachControl(canvas, true);
        this.camera.speed = 0.5;
        this.camera.minZ = 0.45;
        this.camera.angularSensibility = 4000;

        this.camera.inputs.removeByType("FreeCameraKeyboardMoveInput");
        this.camera.inputs.removeByType("FreeCameraMouseInput");

        this.ActivateWASD();
        this.SetupCollisions();
        this.SetupMouseLook();
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

            //Key Input Manager To Use Keys to Move Forward and BackWard and Look to the Left or Right
        var FreeCameraKeyboardWalkInput = function () {
            this._keys = [];
            this.keysUp = [87];
            this.keysDown = [83];
            this.keysLeft = [65];
            this.keysRight = [68];
        }

          //Add attachment controls
    FreeCameraKeyboardWalkInput.prototype.attachControl = function (noPreventDefault) {
        var _this = this;
        var engine = this.camera.getEngine();
        var element = engine.getInputElement();
        if (!this._onKeyDown) {
            element.tabIndex = 1;
            this._onKeyDown = function (evt) {                 
                if (_this.keysUp.indexOf(evt.keyCode) !== -1 ||
                    _this.keysDown.indexOf(evt.keyCode) !== -1 ||
                    _this.keysLeft.indexOf(evt.keyCode) !== -1 ||
                    _this.keysRight.indexOf(evt.keyCode) !== -1) {
                    var index = _this._keys.indexOf(evt.keyCode);
                    if (index === -1) {
                        _this._keys.push(evt.keyCode);
                    }
                    if (!noPreventDefault) {
                        evt.preventDefault();
                    }
                }
            };
            this._onKeyUp = function (evt) {
                if (_this.keysUp.indexOf(evt.keyCode) !== -1 ||
                    _this.keysDown.indexOf(evt.keyCode) !== -1 ||
                    _this.keysLeft.indexOf(evt.keyCode) !== -1 ||
                    _this.keysRight.indexOf(evt.keyCode) !== -1) {
                    var index = _this._keys.indexOf(evt.keyCode);
                    if (index >= 0) {
                        _this._keys.splice(index, 1);
                    }
                    if (!noPreventDefault) {
                        evt.preventDefault();
                    }
                }
            };
            element.addEventListener("keydown", this._onKeyDown, false);
            element.addEventListener("keyup", this._onKeyUp, false);
        }
    };


    //Add detachment controls
    FreeCameraKeyboardWalkInput.prototype.detachControl = function () {
        var engine = this.camera.getEngine();
        var element = engine.getInputElement();
        if (this._onKeyDown) {
            element.removeEventListener("keydown", this._onKeyDown);
            element.removeEventListener("keyup", this._onKeyUp);
            Tools.UnregisterTopRootEvents(this.canvas, [
                { name: "blur", handler: this._onLostFocus }
            ]);
            this._keys = [];
            this._onKeyDown = null;
            this._onKeyUp = null;
        }
    };

    //Keys movement control by checking inputs
    FreeCameraKeyboardWalkInput.prototype.checkInputs = function () {
        if (this._onKeyDown) {
            var camera = this.camera;
            for (var index = 0; index < this._keys.length; index++) {
                var keyCode = this._keys[index];
                var speed = camera.speed;
                if (this.keysLeft.indexOf(keyCode) !== -1) {
                    camera.rotation.y -= camera.angularSpeed;
                    camera.direction.copyFromFloats(0, 0, 0);                
                }
                else if (this.keysUp.indexOf(keyCode) !== -1) {
                    camera.direction.copyFromFloats(0, 0, speed);               
                }
                else if (this.keysRight.indexOf(keyCode) !== -1) {
                    camera.rotation.y += camera.angularSpeed;
                    camera.direction.copyFromFloats(0, 0, 0);
                }
                else if (this.keysDown.indexOf(keyCode) !== -1) {
                    camera.direction.copyFromFloats(0, 0, -speed);
                }
                if (camera.getScene().useRightHandedSystem) {
                    camera.direction.z *= -1;
                }
                camera.getViewMatrix().invertToRef(camera._cameraTransformMatrix);
                Vector3.TransformNormalToRef(camera.direction, camera._cameraTransformMatrix, camera._transformedDirection);
                camera.cameraDirection.addInPlace(camera._transformedDirection);
            }
        }
    };

    //Add the onLostFocus function
    FreeCameraKeyboardWalkInput.prototype._onLostFocus = function (e) {
        this._keys = [];
    };
    
    //Add the two required functions for the control Name
    FreeCameraKeyboardWalkInput.prototype.getClassName = function () {
        return "FreeCameraKeyboardWalkInput";
    };

    FreeCameraKeyboardWalkInput.prototype.getSimpleName = function () {
        return "keyboard";
    };

        //Add the new keys input manager to the camera.
        this.camera.inputs.add(new FreeCameraKeyboardWalkInput());
    }

    private SetupMouseLook(): void {
        this.scene.onPointerDown = (evt) => {
            if (evt.button === 2) { // right mouse
                SceneManager.Instance.Engine.enterPointerlock();
            }
        };

        this.scene.onPointerUp = (evt) => {
            if (evt.button === 2) { // right mouse
                SceneManager.Instance.Engine.exitPointerlock();
            }
        }
    }
}