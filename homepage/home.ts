import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import "/css/style.css";
import { nav } from "../components/nav";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { setupMenuAndAnimation } from "../menu/menu";

(document.querySelector("header") as HTMLDivElement).innerHTML = nav;

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CSSRulePlugin);
const defaultBackground = "#f9f0de";
const defaultTextColor = "#1d1d1b";
const palette = ["#1d1d1b", "#f9f0de"];
const textPalette = ["#f9f0de", "#1d1d1b"];
const sectionClasses = [".ex", ".tw", ".sh"];
const introText: SplitType = new SplitType("h1", { types: "words" });
const words: any = introText.words;
const timeLine = gsap.timeline();
setupMenuAndAnimation(nav);
contentAnimation();

function contentAnimation() {
  words.forEach((word) => {
    timeLine.fromTo(
      word,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.7, duration: 1, ease: "power4.out" }
    );
  });

  timeLine.fromTo(
    ".arrow",
    { y: -200, opacity: 0, display: "none" },
    { y: 0, display: "inline", opacity: 1, duration: 1, ease: "bounce.out" }
  );

  timeLine.to(words, {
    color: "#1d1d1b",
    duration: 2,
    ease: "power4.out",
  });

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
      onLeave: () => {
        gsap.to(".arrow", { opacity: 0 });
      },
    },
  });

  const sections = gsap.utils.toArray(".pitch");
  sections.forEach((section, index) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.querySelector(".content"),
        start: "center center",
        end: "bottom-=20% center",
        pin: true,
        markers: true,
        onEnter: () => changeSectionColor(index),
        onLeave: () => fadeOut(index),
        onEnterBack: () => {
          fadeIn(index);
          changeSectionColor(index);
        },
        onLeaveBack: () => resetSectionColor(),
      },
    });
  });
  function fadeOut(index) {
    gsap.to(sectionClasses[index], { opacity: 0 });
    gsap.to("dotlottie-player", { opacity: 0 });
  }
  function fadeIn(index) {
    gsap.to(sectionClasses[index], { opacity: 1 });
    gsap.to("dotlottie-player", { opacity: 1 });
  }
  function changeSectionColor(index) {
    gsap.to("body", {
      background: palette[index % 2],
      color: textPalette[index % 2],
      duration: 0.5,
    });
    gsap.to("dotlottie-player", { opacity: 1 });
  }

  function resetSectionColor() {
    gsap.to("body", {
      background: defaultBackground,
      color: defaultTextColor,
      duration: 0.5,
    });
  }
  timeLine.to(".ready", {
    scrollTrigger: {
      trigger: ".ready",
      start: "top top",
      end: "bottom center",
      onEnter: () => changeSectionColor(1),
    },
  });
}
