import { Camera } from "@babylonjs/core";

export interface ICameraInput<TCamera extends Camera> {
    // the input manager will fill the parent camera
    camera: TCamera;

    //this function must return the class name of the camera, it could be used for serializing your scene
    getClassName(): string;

    //this function must return the simple name that will be injected in the input manager as short hand
    //for example "mouse" will turn into camera.inputs.attached.mouse
    getSimpleName(): string;

    //this function must activate your input, event if your input does not need a DOM element
    attachControl: (element: HTMLElement, noPreventDefault?: boolean) => void;

    //detach control must deactivate your input and release all pointers, closures or event listeners
    detachControl: (element: HTMLElement) => void;

    //this optional function will get called for each rendered frame, if you want to synchronize your input to rendering,
    //no need to use requestAnimationFrame. It's a good place for applying calculations if you have to
    checkInputs?: () => void;
}