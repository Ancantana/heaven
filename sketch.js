let bgImage;
let textInput;
let galleryVisible = false;
let galleryImages = [];
let draggedImages = [];
let plusButton, downloadButton;
let selectedImage = null;
let offsetX, offsetY;
let draggedImage = null;
let dragOffsetX, dragOffsetY;
let imageScaleFactor = 1;

function preload() {
  bgImage = loadImage('AFTERLIFE.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textInput = createInput('');
  textInput.position(width / 2 - textInput.width / 2, height / 2);

  plusButton = createImg('https://ancantana.github.io/heaven/plusbutton.png', 'plus button');
  plusButton.position(20, 80);
  plusButton.size(30, 30);
  plusButton.mousePressed(toggleGallery);

  downloadButton = createImg('https://ancantana.github.io/heaven/heaveanangel.png', 'download button');
  downloadButton.position(20, 120);
  downloadButton.size(30, 30);
  downloadButton.mousePressed(() => saveCanvas('myCanvas', 'png'));

  loadGalleryImages();
}

function draw() {
  background(bgImage); // Draw the background image first

  if (galleryVisible) {
    drawGallery();
  }

  // Draw dragged images on top
  draggedImages.forEach(({ img, x, y, w, h, isDragged }, i) => {
    if (isDragged) {
      image(img, mouseX - dragOffsetX, mouseY - dragOffsetY, w * imageScaleFactor, h * imageScaleFactor);
    } else {
      image(img, x, y, w, h);
    }
  });
}

function loadGalleryImages() {
  let imgUrls = [
    'https://ancantana.github.io/heaven/original_77f8f96b25a80928f3f31b83d967fd2d.png',
    'https://ancantana.github.io/heaven/original_77f8f96b25a80928f3f31b83d967fd2d.png',
    'https://ancantana.github.io/heaven/original_77f8f96b25a80928f3f31b83d967fd2d.png'
  ];

  imgUrls.forEach((url, i) => {
    let img = loadImage(url, () => {
      galleryImages[i] = img;
    });
  });
}

// ... (the rest of the code remains the same) ...
