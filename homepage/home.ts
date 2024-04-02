import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from 'split-type'

    const introText: SplitType = new SplitType('h1', { types: 'words' });
    const words: any = introText.words;
    gsap.registerPlugin(ScrollTrigger);

    let timeLine = gsap.timeline();
    
    timeLine.fromTo(
        words,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.7, duration: 1, ease: 'power4.out' }
    )
    timeLine.fromTo(".arrow",
    {y: -200, opacity: 0,display:"none"},
        { y: 0, display:"inline",opacity: 1, duration: 2, ease: 'bounce.out' }
        )
    timeLine.to(words,
    {
        scrollTrigger: {
            trigger: "h1",
            start: "top center-=40%",  
            end: "top center+=10%",
            scrub: true,
            onLeave: () => gsap.to("h1", { opacity: 0 }),
            onEnterBack: () => gsap.to("h1", { opacity: 1 }),
        }
    }
);
    timeLine.to(".arrow",
        {
            scrollTrigger: {
                trigger: ".arrow",
                start: "top+=10vh",
                end: "bottom-=2.6vh",
                scrub: true,
                onEnter: () => gsap.to(".arrow", { opacity: 1 }),
                onLeave: () => gsap.to(".arrow", { opacity: 0 }),
            }
        }
    );
    
    document.addEventListener('DOMContentLoaded', () => {
        const hamburger = document.querySelector('.hamburger') as HTMLButtonElement;
        const navMenu = document.getElementById('nav-menu') as HTMLElement;

        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    });