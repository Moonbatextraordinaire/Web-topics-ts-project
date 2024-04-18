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

export class Renderer {
  canvas: HTMLCanvasElement;
  renderer: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
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
    this.renderer.strokeStyle = "rgba(0,0,0,0)";
  }

  strokeWeight(n: number) {
    if (n === 0) this.renderer.lineWidth = 0.0001;
    else this.renderer.lineWidth = n;
  }
  translate(x: number, y: number) {
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
  point(
    x: number,
    y: number,
    radius: number = 1,
    startAngle: number = 0,
    endAngle: number = 2 * Math.PI
  ) {
    this.renderer.beginPath();
    this.renderer.arc(x, y, radius, startAngle, endAngle);
    this.renderer.fill();
    this.closeShape();
  }

  /**
   * Draws a line on the canvas.
   * @method line
   * @param start line start point.
   * @param end  line end point. */
  line(startX: number, startY: number, endX: number, endY: number) {
    this.renderer.beginPath();
    this.renderer.moveTo(startX, startY);
    this.renderer.lineTo(endX, endY);
    this.renderer.stroke();
    this.closeShape();
  }

  /**
   * Draws a triangle on the canvas.
   * @method triangle
   * @param v1 the coordinates of the first vertex of the triangle.
   * @param v2 the coordinates of the second vertex of the triangle.
   * @param v3 the coordinates of the third vertex of the triangle. */

  triangle(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number
  ) {
    this.renderer.beginPath();
    this.renderer.moveTo(x1, y1);
    this.renderer.lineTo(x2, y2);
    this.renderer.lineTo(x3, y3);
    this.closeShape(); // Assuming there is a closePath method or use stroke/fill as needed
  }

  /**
   * Draws a rectangle on the canvas.
   * @method rect
   * @param vector the coordinates of the arc.
   * @param w the width of the rectangle in pixels.
   * @param h the height of the rectangle in pixels. */
  rect(x: number, y: number, width: number, height: number = 0 | width) {
    this.renderer.fillRect(x, y, width, height);
    this.renderer.strokeRect(x, y, width, height);
  }

  /**
   * Draws an ellipse on the canvas.
   * @method ellipse
   * @param vector the coordinates of the arc.
   * @param width the width of the ellipse in pixels.
   * @param height the height of the ellipse in pixels.
   */
  ellipse(x: number, y: number, width: number, height: number = 0 | width) {
    this.renderer.beginPath();
    this.renderer.ellipse(x, y, width / 2, height / 2, 0, 0, 2 * Math.PI);
    this.renderer.fill(); // Assuming you want to fill the ellipse
    this.closeShape();
  }

  // Modify the arc method to accept x and y coordinates directly
  arc(
    x: number,
    y: number,
    w: number,
    h: number,
    start: number,
    stop: number,
    mode: string = ""
  ) {
    this.renderer.beginPath();
    this.renderer.ellipse(x, y, w / 2, h / 2, 0, start, stop, mode === "OPEN");
    this.renderer.stroke(); // Assuming you want to stroke the arc
  }

  // Modify the bezier method to accept x and y coordinates for control and end points
  bezier(
    startX: number,
    startY: number,
    ctrlAX: number,
    ctrlAY: number,
    ctrlBX: number,
    ctrlBY: number,
    endX: number,
    endY: number
  ) {
    this.renderer.beginPath();
    this.renderer.moveTo(startX, startY);
    this.renderer.bezierCurveTo(ctrlAX, ctrlAY, ctrlBX, ctrlBY, endX, endY);
    this.renderer.stroke();
  }
  push() {
    this.renderer.save();
  }
  pop() {
    this.renderer.restore();
  }
  text(str: string | number): void {
    this.renderer.fillText(
      str.toString(),
      this.canvas.width / 2,
      this.canvas.height / 2
    );
    this.closeShape();
  }
  beginShape() {
    this.renderer.beginPath();
    this.renderer.moveTo(0, 0);
  }
  vertex(x: number, y: number) {
    this.renderer.lineTo(x, y);
  }
  endShape() {
    this.renderer.closePath();
    this.closeShape();
  }
  scale(x: number, y: number) {
    this.renderer.scale(x, y);
  }
  rotate(angle: number) {
    this.renderer.rotate(angle);
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
    this.closeShape();
    }*/

  /**
   * Draws an irregular polygon on the canvas.
   * @method irregularPolygon
   * @param vertices an array of vectors that represent the vertices of the polygon. The order of the vertices determines the shape of the polygon.
   */
  irregularPolygon(vertices: Vector[]) {
    this.renderer.beginPath();
    this.renderer.moveTo(vertices[0].x, vertices[0].y);
    for (let i = 0; i < vertices.length; i++) {
      this.renderer.lineTo(vertices[i].x, vertices[i].y);
    }
    this.closeShape();
  }
  closeShape(): void {
    this.renderer.fill();
    this.renderer.stroke();
    this.renderer.closePath();
  }
}
