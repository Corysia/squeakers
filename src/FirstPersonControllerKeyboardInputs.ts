import { FreeCamera } from "@babylonjs/core";
import { ICameraInput } from "./ICameraInput";

export class FirstPersonControllerKeyboardInputs implements ICameraInput<FreeCamera> {
    camera: FreeCamera;
    private _keys: number[] = [];
    private keysUp: number[] = [87];
    private keysDown: number[] = [83];
    private keysLeft: number[] = [65];
    private keysRight: number[] = [68];
    private _onKeyDown: (evt: KeyboardEvent) => void;
    private _onKeyUp: (evt: KeyboardEvent) => void;
    private _onLostFocus: (evt: FocusEvent) => void;
    
    constructor() {
        this._onKeyDown = evt => {
            if (this._keys.indexOf(evt.keyCode) === -1) {
                this._keys.push(evt.keyCode);
            }
        };

        this._onKeyUp = evt => {
            var index = this._keys.indexOf(evt.keyCode);

            if (index >= 0) {
                this._keys.splice(index, 1);
            }
        };

        this._onLostFocus = () => {
            this._keys = [];
        };
    }
    attachControl: (element: HTMLElement, noPreventDefault?: boolean) => void;
    detachControl: (element: HTMLElement) => void;
    checkInputs?: () => void;

    public getClassName(): string {
        return "FirstPersonControllerKeyboardInputs";
    }

    public getSimpleName(): string {
        return "keyboard";
    }
}