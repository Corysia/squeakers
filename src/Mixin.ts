// Each mixin is a traditional ES class
export class Jumpable {
    jump() {
        console.log("jump");
    }
}

export class Duckable {
    duck() {
        console.log("duck");
    }
}

// Including the base
export class Sprite {
    x = 0;
    y = 0;
}

// Then you create an interface which merges
// the expected mixins with the same name as your base
export interface Sprite extends Jumpable, Duckable { }
// Apply the mixins into the base class via
// the JS at runtime
applyMixins(Sprite, [Jumpable, Duckable]);

// This can live anywhere in your codebase:
function applyMixins(derivedCtor: any, constructors: any[]) {
    constructors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            Object.defineProperty(
                derivedCtor.prototype,
                name,
                Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
                Object.create(null)
            );
        });
    });
}