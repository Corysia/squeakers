export class MapLocation
{
    public _x: number;
    public _z: number;
    
    constructor(x: number, z: number) {
        console.debug("Map Location")
        this._x = x;
        this._z = z;
    }
}