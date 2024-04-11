import { gsap } from "gsap";
interface MenuElements {
  openTimeLine: GSAPTimeline;
  navItems: NodeListOf<Element>;
  closeTimeLine: GSAPTimeline;
  navContainer: HTMLDivElement;
  navBtn: HTMLDivElement;
}

export function setupMenuAndAnimation(nav: string): MenuElements {
  const header = document.querySelector("header") as HTMLDivElement;
  header.innerHTML = nav;
  const navBtn = document.querySelector("#menu-toggle-btn") as HTMLDivElement;
  const navContainer = document.querySelector(
    ".nav-container"
  ) as HTMLDivElement;
  navBtn.classList.remove("clicked");
  navContainer.classList.remove("open");
  const navItems = document.querySelectorAll(".nav-container ul li");

  const openTimeLine = gsap.timeline({ paused: true });
  const closeTimeLine = gsap.timeline({
    paused: true,
    onComplete: () => (navContainer.style.visibility = "hidden"),
  });

  openTimeLine.to(navContainer, { background: "#1d1d1b", duration: 0.3 });
  navItems.forEach((item, index) => {
    openTimeLine.fromTo(
      item,
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.5, delay: index * 0.1 },
      0
    );
    closeTimeLine.to(
      item,
      { y: "100%", opacity: 0, duration: 0.5, delay: index * 0.1 },
      0
    );
  });
  closeTimeLine.to(navContainer, { background: "#f9f0de", duration: 0.3 });
  closeTimeLine.add(() => {
    if (!navContainer.classList.contains("open")) {
      navContainer.style.visibility = "hidden";
    }
  });

  navBtn.addEventListener("click", function () {
    this.parentElement.classList.toggle("clicked");
    navContainer.classList.toggle("open");
    if (navContainer.classList.contains("open")) {
      navContainer.style.visibility = "visible";
      openTimeLine.restart();
    } else {
      closeTimeLine.restart();
    }
  });
  return { openTimeLine, navItems, closeTimeLine, navContainer, navBtn };
}
