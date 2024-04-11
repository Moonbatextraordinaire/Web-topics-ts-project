/**
 * A class to describe a renderer object that can draw shapes on a canvas element
 * A renderer has a canvas and a context that are used to set the properties and method
 * for drawing on the canvas
 * 
 * @class Renderer
 * @constructor
 * @param width the width of the canvas element in pixels
 * @param height the height of the canvas element in pixels
 * @author Tanguy Clavareau */

import { Vector } from "../Math/Vector.ts";
const TWO_PI = 2 * Math.PI;

export class Renderer{
    canvas: HTMLCanvasElement;
    renderer: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement){
        this.canvas = canvas;
        this.renderer = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    }
    
    /**
     * Sets the background color of the canvas element.
     * @method background
     * @param color the color to fill the canvas with. Can be a string, a gradient, or a pattern. */
    background(color: any) {
        this.renderer.fillStyle = color;
        this.renderer.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    /**
     * Sets the fill color of the shapes to be drawn on the canvas.
     * @method fill
     * @param color the color to fill the shapes with. Can be a string, a gradient, or a pattern. */
    fill(color: string) {
        this.renderer.fillStyle = color;
    }
    
    /**
     * Disables filling the shape interiors.
     * @method noFill */
    noFill() {
        this.renderer.fillStyle = "rgba(0, 0, 0, 0)";
    }
    
    /**
     * Sets the stroke color of the shapes to be drawn on the canvas.
     * @method stroke
     * @param color the color to stroke the shapes with. Can be a string, a gradient, or a pattern. */
    stroke(color: string) {
        this.renderer.strokeStyle = color;
    }
    
    /**
     * Disables drawing the shape outlines.
     * @method noStroke */
    noStroke() {
        this.renderer.strokeStyle = 'rgba(0,0,0,0)';
    }   

    strokeWeight(n : number){
        if (n === 0) this.renderer.lineWidth = 0.0001;
        else this.renderer.lineWidth = n;
    }
    translate(x: number, y: number){
        this.renderer.translate(x, y);
    }
    // ************************ //
    // // // // SHAPES // // // // 
    // ************************ //

    /**
     * Draws a point on the canvas.
     * @method point
     * @param vector coordinates of point. 
     * @param radius point radius, default to 1
     * @param startAngle is 0
     * @param endAngle is 2 * PI (TAU);
     * 
     * 
     */
    point(...args: any[]) {
        if (args.length === 1){
            let others = [1, 0, 2 * Math.PI];
            args = [...others];
        }
        this.renderer.beginPath();
        this.renderer.arc(args[0].x, args[0].y, args[1], args[2], args[3]);
        this.renderer.fill();
        this.renderer.closePath();
    }

    /**
     * Draws a line on the canvas.
     * @method line
     * @param start line start point.
     * @param end  line end point. */
    line(start: Vector, end: Vector) {
        this.renderer.beginPath();
        this.renderer.moveTo(start.x, end.y);
        this.renderer.lineTo(end.x, end.y);
        this.renderer.stroke();
        this.renderer.closePath();
    }

    /**
     * Draws a triangle on the canvas.
     * @method triangle
     * @param v1 the coordinates of the first vertex of the triangle.
     * @param v2 the coordinates of the second vertex of the triangle.
     * @param v3 the coordinates of the third vertex of the triangle. */
    triangle(v1: Vector, v2: Vector, v3: Vector) {
        this.renderer.beginPath();
        this.renderer.moveTo(v1.x, v1.y);
        this.renderer.lineTo(v2.x, v2.y);
        this.renderer.lineTo(v3.x, v3.y);
        this.endShape();
    }

    /**
     * Draws a rectangle on the canvas.
     * @method rect
     * @param vector the coordinates of the arc.
     * @param w the width of the rectangle in pixels.
     * @param h the height of the rectangle in pixels. */
    rect(vector: Vector, width: number, height: number = 0) {
        if (height === 0)
            height = width;
        this.renderer.fillRect(vector.x, vector.y, width, height);
        this.renderer.strokeRect(vector.x, vector.y, width, height);
    }

    /**
     * Draws an ellipse on the canvas.
     * @method ellipse
     * @param vector the coordinates of the arc.
     * @param width the width of the ellipse in pixels.
     * @param height the height of the ellipse in pixels. 
     */
    ellipse(vector: Vector, width: number, height: number) {
        this.renderer.beginPath();
        this.renderer.ellipse(vector.x, vector.y, width / 2, height / 2, 0, 0, 2 * Math.PI);
        this.endShape();
    }

    /**
     * Draws an arc on the canvas.
     * @method arc
     * @param vector the coordinates of the arc.
     * @param w the width of the arc in pixels.
     * @param h the height of the arc in pixels.
     * @param start the angle at which the arc starts, measured clockwise from the positive x-axis and expressed in radians.
     * @param stop the angle at which the arc ends, measured clockwise from the positive x-axis and expressed in radians.
     * @param mode the drawing mode to use for the arc. Can be "OPEN", "CHORD", or "PIE". The default is "OPEN". 
     */
    arc(vector: Vector, w: number, h: number, start: number, stop: number, mode: string = '') {
        this.renderer.beginPath();
        this.renderer.ellipse(vector.x, vector.y, w / 2, h / 2, 0, start, stop, mode === "OPEN");
        this.endShape();
    }
    

    /// /// /// /// TO DEBUG /// /// /// ///
    /**
     * Draws a regular polygon on the canvas.
     * @method regularPolygon
     * @param edges the number of edges (or sides) of the polygon.
     * @param scalar the scaling factor of the polygon. Determines the size of the polygon relative to the origin.
     */
    /*regularPolygon(edges: number, scalar: number){
    this.renderer.beginPath();
    let p = new Vector(0 , 0 );
    this.renderer.moveTo(p.x + 200, p.y + 200);
    for (let i = 1; i < edges; i++){
        p = new Vector(Math.cos((TWO_PI/edges) * i) * scalar, Math.sin((TWO_PI/edges) * i) * scalar);
        this.renderer.lineTo(p.x + 200, p.y + 200);
    }
    this.endShape();
    }*/

/**
 * Draws an irregular polygon on the canvas.
 * @method irregularPolygon
 * @param vertices an array of vectors that represent the vertices of the polygon. The order of the vertices determines the shape of the polygon.
 */
    irregularPolygon(vertices: Vector[]){
    this.renderer.beginPath();
    this.renderer.moveTo(vertices[0].x, vertices[0].y);
    for (let i = 0; i < vertices.length; i++){
        this.renderer.lineTo(vertices[i].x, vertices[i].y);
    }
    this.endShape();

    }
    endShape(): void{
        this.renderer.fill();
        this.renderer.stroke();
        this.renderer.closePath();
    }
}    