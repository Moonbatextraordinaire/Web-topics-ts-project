import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import "/css/style.css";
import { nav } from "../components/nav";

(document.querySelector("header") as HTMLDivElement).innerHTML = nav;

gsap.registerPlugin(ScrollTrigger);

const palette = ["#e51531", "#2a70ae", "#fab511"];
const introText: SplitType = new SplitType("h1", { types: "words" });
const words: any = introText.words;

let timeLine = gsap.timeline();

words.forEach((word) => {
  timeLine.fromTo(
    word,
    { y: 100, opacity: 0, color: palette[words.indexOf(word)] },
    { y: 0, opacity: 1, stagger: 0.7, duration: 1, ease: "power4.out" }
  );
});

timeLine.fromTo(
  ".arrow",
  { y: -200, opacity: 0, display: "none" },
  { y: 0, display: "inline", opacity: 1, duration: 1, ease: "bounce.out" }
);

timeLine.to(words, { color: "#1d1d1b", duration: 2, ease: "power4.out" });
timeLine.to(words, {
  scrollTrigger: {
    trigger: "h1",
    start: "top center-=40%",
    end: "top center+=10%",
    scrub: true,
    onLeave: () => gsap.to("h1", { opacity: 0 }),
    onEnterBack: () => gsap.to("h1", { opacity: 1 }),
  },
});
timeLine.to(".arrow", {
  scrollTrigger: {
    trigger: ".arrow",
    start: "top+=10vh",
    end: "bottom-=2.6vh",
    scrub: true,
    onEnter: () => gsap.to(".arrow", { opacity: 1 }),
    onLeave: () => gsap.to(".arrow", { opacity: 0 }),
  },
});
timeLine.to(".explore", {
  scrollTrigger: {
    trigger: "h2",
    start: "top center",
    end: "bottom center",
    scrub: 2,
    pin: true,
  },
  background: "#2a70ae",
  color: "#f9f0de",
});
