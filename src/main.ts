import './style.css';
import p5 from 'p5';
import { Point } from './types';

new p5((p5Instance) => {
  const p = p5Instance as unknown as p5;

  const point: Point = {
    x: 10,
  };

  p.setup = function setup() {
    p.createCanvas(500, 500);
  };

  p.draw = function draw() {
    p.background('blue');
    p.fill('red');
    p.rect(100, 100, 300, 300);
  };
}, document.querySelector<HTMLDivElement>('#app')!);
