import { gsap } from "gsap";
import SplitType from 'split-type'

const introText: SplitType = new SplitType('h1', { types: 'words' });
const words = introText.words;
console.log(words);

gsap.fromTo(
    words,
    {
        y: 100,
        opacity: 0
    },
    {
        y: 0,
        opacity: 1,
        stagger: 0.5,
        duration: 4,
        ease: 'power4.out',
    }
)

