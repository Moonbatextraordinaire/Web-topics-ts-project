import { Renderer } from "./Drawing/Renderer";
import { fibPack } from "./Math/RecPack";
import { Canvas } from "./Drawing/Canvas";
import { Noise } from "./Math/Noise";
import { nav } from "../components/nav";
import { setupMenuAndAnimation } from "../menu/menu";
import { palette } from "./Palettes/palette";
import "./create.css";
import { NoiseFunction3D, createNoise3D } from "simplex-noise";
let c: Canvas;
let p: Renderer;
let t: number = 0;
const colors: number[] = [];
const modIncX: number[] = [];
const modIncY: number[] = [];
const palettes = [
  ["#1c2137", "#284555", "#de4639", "#db6528", "#f5ad0d"],
  [
    "#d7312e",
    "#f9f0de",
    "#f0ac00",
    "#0c7e45",
    "#2c52a0",
    "#f7bab6",
    "#5ec5ee",
    "#1d1d1b",
  ],
  ["#d2b0a3", "#efd1ae", "#f39b00", "#ec6907", "#2c52a0", "#1d1d1b", "#f9f0de"],
  ["#412147", "#7b2776", "#bb2a17", "#e94e23", "#f49700", "#bd8b5f", "#f9f0de"],
];
let colorSelect = rand(palettes.length);
let segments: number[] = [];
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
  let amount = 10;
  for (let i = 0; i < amount; i++) {
    modIncX.push(Math.random() / 10);
    modIncY.push(Math.random() / 10);
    segments = fibPack(89, segments);
  }
  console.log(modIncX);
  console.log(segments);
  offset = c.height / 10;
  p.background(palette[0].params[0].value);
  p.strokeWeight(10);
  for (let i = 0; i < segments.length; i++) {
    colors.push(Math.floor(rand(1, palettes[colorSelect].length)));
  }
  p.noFill();
}

function draw() {
  let x = 0;
  let y = 0;
  p.background(palettes[colorSelect][0]);
  for (let i = 0; i < segments.length; i++) {
    if (x % 89 === 0 && i != 0) {
      y += offset;
      x = 0;
    }
    let vertices = [];
    for (let j = 0; j < segments[i]; j++) {
      vertices.push(x + map(j, 0, segments[i], 0, c.width));
      vertices.push(y + noise(x, y, t / 1000) * offset);
      p.point(
        map(j, 0, segments[i], 0, c.width),
        noise(x, y, t / 1000) * offset
      );
    }
    let startX = map(x, 0, 89, 0, c.width) + 2;
    let startY = y + offset / 2;
    let endX = map(x + segments[i], 0, 89, 0, c.width) - 2;
    let endY = y + offset / 2;
    let ctrlAX = map(x + segments[i] / 2, 0, 89, 0, c.width);
    let ctrlBX = map(x + segments[i] / 2, 0, 89, 0, c.width);
    let ctrlAY = y + offset / 2;
    let ctrlBY = y + offset / 2;
    //p.line(startX, startY, endX, endY);
    p.stroke(palettes[colorSelect][colors[i]]);
    p.beginShape(vertices);
    //p.bezier( startX, startY, ctrlAX - 50, ctrlAY + noise(x, y, t / 1000) * offset, ctrlBX + 50, ctrlBY, endX, endY );
    x += segments[i];
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
