export class Canvas {
    width: number;
    height: number;
    constructor(width: number, height: number){
        this.width = width;
        this.height = height;
    }
    createCanvas(): HTMLCanvasElement{
        let canvasInstance = window.document.createElement("canvas");
        canvasInstance.id = "canvas";
        canvasInstance.width = this.width;
        canvasInstance.height = this.height
        window.document.body.appendChild(canvasInstance);
        canvasInstance = window.document.getElementById("canvas") as HTMLCanvasElement;
        return canvasInstance;
    }

    getWidth(): number {
        return this.width;
    }
    getHeight(): number {
        return this.height;
    }
}