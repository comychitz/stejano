# stejano
[Steganography](https://en.wikipedia.org/wiki/Steganography) module for concealing text in bitmap image files (for now, only support PNG image files).

# motivation
When I was in school, a classmate of mine demonstrated hiding a video file within an image, with no noticable differences to the original image. Since then, I have always wanted to implement my own flavor of an application that uses steganography. This project is an attempt at that. Furthermore, I've lately been interested in getting my hands dirty with Javascript, thus why its the language of choice here. This project will start out as simple as possible, and maybe evolving to a more complete and secure steganographic application when I'm more confortable with the different techniques and Javascript. 

# approach
Each image is simply a bitmap of pixels, each pixel having an RGB (red, green, and blue) color within it (and an alpha, for opaqueness of the pixel), ranging from 0-255. If we modify the values of the pixels in an elegant way, we can include any type of information within the image itself. I'll be using the popular Javascript image library known as [Jimp](https://www.npmjs.com/package/jimp).

Concealing our super secret message within the image without producing noise (a noticeable difference) is essential; because if we introduce too much noise, we defeat the whole purpose of *hiding*. To keep things simple, we will steal the least significant bit from each color and the alpha within each pixel. Thus, the max length of our secret message will depend on the size of our image. For example, if we had a 500x400 image, the maximum length of our message will be 100,000 characters/bytes (500 * 400 * 4 / 8 = 100,000). Furthermore, we'll be sticking to ASCII text messages for now.

# notes
* Regarding PNGs - PNG uses a lossless image compression format, thus why our (simple) algorithm works with PNGs. During the intial phases, I was at a loss for words when I was testing this with JPEGs, then after hours of wasted debugging I realized that [JPEG is a lossy compression for images](https://en.wikipedia.org/wiki/JPEG).