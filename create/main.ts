import { Renderer } from "./Drawing/Renderer";
import { Vector } from "./Math/Vector";
import { fibPack } from "./Math/RecPack";
import { Canvas } from "./Drawing/Canvas";
import { Helper } from "./Utilities/Helper";
import { Noise } from "./Math/Noise";
import { nav } from "../components/nav";
import "/css/style.css";
import { gsap } from "gsap";
import { setupMenuAndAnimation } from "../menu/menu";

let c: Canvas;
let p: Renderer;
let g: Vector[];
let f: number;

let palette = ["#f8f9f2", "#084698", "#1a86c8", "#74afe0", "#a0d6da"];

setupMenuAndAnimation(nav);

function setup() {
  fxrand = sfc32(...hashes);
  let t: number[] = [];
  c = new Canvas(window.innerWidth * 0.8, window.innerHeight * 0.8);
  p = new Renderer(c.createCanvas());
  p.background(palette[0]);
  let noise = new Noise();
  noise.noiseSeed(12);
  g = Helper.verticalGrid(4, 4, c.width / 4, c.height / 4);
  let initX = 0;
  let initY;
  p.stroke(palette[2]);
  p.strokeWeight(1);
  const values = [];
  // change the dividor of i to speed up or slow down
  for (let i = 0; i < 712; i++) {
    let n = noise.perlin(i / 100, i / 300);
    values.push(n);
  }
  console.log(values);
  //p.noStroke();
  p.translate(50, 50);
  for (let i = 0; i < 13; i++) {
    let rh = rand(13, 76.25);
    let offset = 76.25 / 2 - rh / 2;
    if (i === 0) initY = 0;
    else initY = 76.25 * i;
    t.length = 0;
    initX = 0;
    t = fibPack(55, t);
    let cell = 610 / 55;
    for (let j = 0; j < t.length; j++) {
      if (t[j] < 3) p.fill(palette[4]);
      else if (t[j] < 8) p.fill(palette[1]);
      else if (t[j] < 13) p.fill(palette[3]);
      else p.fill(palette[0]);

      //p.rect(new Vector(initX, initY), Helper.map(t[j], 1, 34, 0, 377),  55);
      //p.noFill();

      p.rect(new Vector(initX, initY + offset), cell * t[j], rh);
      initX += cell * t[j];
    }
  }
}

function draw() {
  //Helper.displayGrid(p, g);
  let startV = new Vector(30, 75);
  let endV = new Vector(58, 20);
  let ellipseV = new Vector(50, 50);
  let arcV = new Vector(200, 55);
  let rectV = new Vector(250, 120);
  //p.fill('red');
  //p.ellipse(ellipseV, 50, 50);
  //p.line(startV, endV);
  //p.arc(arcV, 50, 50, 0,4.2);
  //p.rect(rectV, 80)

  //p.regularPolygon(6, 40);
}

setup();
window.requestAnimationFrame(draw);

function rand(max: number = 1, min: number = 0): number {
  if (min > max) {
    let temp = min;
    min = max;
    max = temp;
  }
  return fxrand() * (max - min) + min;
}
