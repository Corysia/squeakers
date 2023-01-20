export class MapLocation
{
    private x: number;
    private z: number;
    
    constructor(x: number, z: number) {
        console.debug("Map Location")
        this.x = x;
        this.z = z;
    }
    
    public get X(): number {
        return this.x;
    }

    public get Z(): number { 
        return this.z;
    }
}