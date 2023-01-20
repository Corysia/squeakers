import { Scene } from "@babylonjs/core";

export interface Drawable {
    Draw(scene: Scene): void;
}