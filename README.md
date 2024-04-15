# Web topics project

I made this project for one of my courses at [Odisee](https://www.odisee.be/). The aim was to implement various web topics explored during the course in a project of our chosing.

The final result can be seen [here](https://tcwt.000webhostapp.com/)

The topics I originally chose were:

- Creative coding
- Web animations
- IPFS

The topics that are implemented are:

- Creative coding
- Web animations
- lottie files

All libraries were installed with npm.

Additionally, the project was written in Typescript instead of pure javascript. This was chosen to add type safety (primarily for the algorithmic art).

## Creative coding library

The implementation of creative coding finds itself on the create page.

There are many libraries that can be used to harvest the HTML Canvas API, however I chose to write my own library for this project. This is to avoid loading a multitude of unused functions, which only contributes to a slower experience. P5js adds roughly 3Mb of load time on a refresh, which was a non desirable trait for my application.

The library I wrote was based heavily on p5js. For this I created a Canvas and Renderer class. Those can be seen under src/create/Drawing.

### Drawing

The first aspect of the drawing takes place in two classes described below. This section only encompasses the "drawing support" (canvas) and what controls the "drawing" (rendering)

#### Canvas class

The canvas class serves to create a canvas within the HTML document. It is, as its name indicates, the canvas we will use to draw on with the renderer class.

#### Renderer class

The renderer class is used to "draw" on the canvas. It can be seen as a hand holding a pen. Movements but also colors and sizes can be altered. Within it are different methods to draw shapes or text, change the color of what is being drawn and move where items are being drawn.

## Maths

Maths plays a pivotal role in creative coding. All coordinates, transformations, rotations, etc... are done using various branches of maths (Vectors, trigonometry, matrices, etc...).

For this project I chose to write a Vector class, a noise class and a rectangle packing class. The class LinkHashing in the repo isn't used for this project, but serves to create a unique hash that can then be used elsewhere as a seed for random generators.

### Noise

The noise class is used to create [simplex](https://en.wikipedia.org/wiki/Simplex_noise) and [perlin](https://en.wikipedia.org/wiki/Perlin_noise).
Noise is used to create smooth random where the following values generated are closely linked to the previous ones. The class is limited to 2 dimentional noise fields. For higher dimensions a library was used.

### RecPack

The reckPack class is used to divide a any segment into a subdivision of segments following the [fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_sequence). This is because the relationship of two consecutive numbers approximates the golden ratio. In turn, any segment can be divided into a harmonious sub segmentation, creating a random but also pleasing division.

The algorithm uses recursion, so be mindful to not try and divide incredibly large segments.

### Vector

[Vectors](<https://en.wikipedia.org/wiki/Vector_(mathematics_and_physics)>) are the foundation for coordinates in 2D and 3D spaces. This class was adapted from the one found on the p5js repo with a couple of improvements for certain calculations specific to this project.

## Web animations

All the animations of the landing page and navigation menu are done using [GSAP](https://gsap.com/).

A separate timeline was used to animate the menu and I therefore put the code in an exportable function to be reused for the different pages that require it.

The landing or home page has its own animation timeline which mostly use [scrollTriggers](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).

As GSAP has paying plugins, I used the [SplitType](https://github.com/lukePeavey/SplitType) library to animate the words when first going to the website. This is to achieve the same effect without having to require a paid subscription with GSAP.

## Lottie files

I originally wrote different paragraphs to describe the different aspects of my website. After some time, I opted to used animated SVGs as they conveyed the same message without risking to bore the user.

The files used here were taken from free files on [lottifiles](https://lottiefiles.com/) and I then tweaked them to my needs (mostly changing color palettes).

Using the lottie files cdn proved to be problematic, so I opted for an npm library which made it work flawlessy in my testing environements.
