# Web topics project

I made this project for one of my courses at [Odisee](https://www.odisee.be/). The aim was to implement various web topics explored during the course in a project of our chosing.

The final result can be seen [here] (https://tcwt.000webhostapp.com/)

The topics I originally chose were:

- Creative coding
- Web animations
- IPFS

The topics that are implemented are:

- Creative coding
- Web animations
- lottie files

Additionally, the project was written in Typescript instead of pure javascript. This was chosen to add type safety (primarily for the algorithmic art).

## Creative coding library

The implementation of creative coding finds itself on the create page.

There are many libraries that can be used to harvest the HTML Canvas API, however I chose to write my own library for this project. This is to avoid loading a multitude of unused functions, which only contributes to a slower experience. P5js adds roughly 3Mb of load time on a refresh, which was a non desirable trait for my application.

The library I wrote was based heavily on p5js. For this I created a Canvas and Renderer class. Those can be seen under src/create/Drawing.

### Canvas class
