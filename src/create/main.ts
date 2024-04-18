import { Renderer } from "./Drawing/Renderer";
import { fibPack } from "./Math/RecPack";
import { Canvas } from "./Drawing/Canvas";
import { Noise } from "./Math/Noise";
import { nav } from "../components/nav";
import { setupMenuAndAnimation } from "../menu/menu";
import "./create.css";
import { NoiseFunction3D, createNoise3D } from "simplex-noise";
import { Console } from "console";
let c: Canvas;
let p: Renderer;
let t: number = 0;
let val: number = 0;
const colors: number[] = [];
const modIncX: number[] = [];
const modIncY: number[] = [];
const palettes = [
  ["#f9f0de", "#1c2137", "#284555", "#de4639", "#db6528", "#f5ad0d"],
  [
    "#f9f0de",
    "#d7312e",
    "#f0ac00",
    "#0c7e45",
    "#2c52a0",
    "#f7bab6",
    "#5ec5ee",
    "#1d1d1b",
  ],
  ["#f9f0de", "#d2b0a3", "#efd1ae", "#f39b00", "#ec6907", "#2c52a0", "#1d1d1b"],
  ["#f9f0de", "#412147", "#7b2776", "#bb2a17", "#e94e23", "#f49700", "#bd8b5f"],
  ["#f299a5", "#084698", "#1a86c8", "#74afe0", "#a0d6da", "#f8f9f2"],
];
let colorSelect = rand(palettes.length);
const segments: number[][] = [];
const rows: number[] = [];
let noise = createNoise3D();
let time: number;
let offset: number;
setupMenuAndAnimation(nav);

function setup() {
  const canvasContainer = document.querySelector(
    ".canvas-container"
  ) as HTMLDivElement;

  // Get the width and height of the container
  const width = canvasContainer.clientWidth;
  const height = canvasContainer.clientHeight;
  c = new Canvas(width, height);
  p = new Renderer(c.createCanvas());
  time = 0;
  let amount = 55;
  // Make an amount of length wise segments rows.
  for (let i = 0; i < amount; i++) {
    let segs: number[] = [];
    segs = fibPack(233, segs);
    segments.push(segs);
  }
  offset = c.height / amount;
  p.noFill();

  // attribute color to each segment by going through each line and then its segments
  for (let i = 0; i < segments.length; i++) {
    for (let j = 0; j < segments[i].length; j++) {
      colors.push(Math.floor(Math.random() * palettes[colorSelect].length));
    }
  }
  // Make an array that will describe the "wobbliness" of the horizontal line in each of the segments
  let shapeWobble: number[] = [];
  let count = 0;

  // to fill the array of the horizontal segments' wobbliness, we need to go to each line, then each segment and then calculate the details for each of those segments.
  console.log(segments);
  for (let i = 0; i < segments.length; i++) {
    for (let j = 0; j < segments[i].length; j++) {}
  }
  for (let j = 0; j < segments.length; j++) {
    for (let i = 0; i < segments[j].length; i += 1) {
      shapeWobble.push(map(i, 0, segments[j][i], 0, 233));
      shapeWobble.push(map(noise(j, i, count), -1, 1, -offset, offset));
      count++;
    }
  }
  console.log(shapeWobble);
  p.strokeWeight(0.1);
}
function draw() {
  //p.background(palettes[colorSelect][0]);

  let x = 0;
  let y = 0;

  for (let i = 0; i < segments.length; i++) {
    if (i !== 0) y += offset;
    x = 0;
    for (let j = 0; j < segments[i].length; j++) {
      p.stroke(palettes[colorSelect][colors[j]]);
      p.push();
      p.translate(map(x, 0, 233, 0, c.width), y);
      p.rotate(map(noise(i, j, t / 1000000), 0, 1, -2, 2));
      shape(segments[i][j], x, y, t);
      p.pop();
      t++;
      x += segments[i][j] + t / 1000000;
    }
  }

  t++;
  window.requestAnimationFrame(draw);
}

setup();
window.requestAnimationFrame(draw);

function map(
  x: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number
): number {
  return ((out_max - out_min) / (in_max - in_min)) * (x - in_min) + out_min;
}
function rand(max: number = 1, min: number = 0): number {
  if (min > max) {
    let temp = min;
    min = max;
    max = temp;
  }
  return Math.floor(Math.random() * (max - min) + min);
}
function shape(segment: number, x: number, y: number, count: number) {
  let shapeWobble: number[] = [];
  p.beginShape();
  for (let i = 0; i < map(segment, 0, 233, 0, c.width); i += 1) {
    shapeWobble.push(i);
    shapeWobble.push(
      map(noise(i / 20, y, count / 100000), -1, 1, -offset, offset)
    );
    p.vertex(i, map(noise(i / 20, y, count / 100000), -1, 1, -offset, offset));
  }
  p.vertex(shapeWobble[shapeWobble.length], offset / 2);
  for (let i = shapeWobble.length; i >= 0; i -= 2) {
    p.vertex(shapeWobble[i], shapeWobble[i - 1] + offset / 2);
  }
  p.endShape();
  y += shapeWobble[shapeWobble.length] + offset;
}
