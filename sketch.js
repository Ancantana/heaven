let bgImage;
let textInput;
let galleryVisible = false;
let galleryImages = [];
let plusButton, downloadButton;

function preload() {
  bgImage = loadImage('AFTERLIFE.png'); // Make sure the path is correct
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textInput = createInput('');
  textInput.position(width / 2 - textInput.width / 2, height / 2);

  // Setup color pickers
  let textColorPicker = createColorPicker('#000000');
  textColorPicker.position(20, 20);
  textColorPicker.input(() => {
    textInput.style('color', textColorPicker.value());
  });

  let bgColorPicker = createColorPicker('#ffffff');
  bgColorPicker.position(20, 50);
  bgColorPicker.input(() => {
    textInput.style('background-color', bgColorPicker.value());
  });

  // Setup plus button with adjusted position and size
  plusButton = createImg('plusbutton.png', 'plus button');
  plusButton.position(20, 80); // Adjusted to the left
  plusButton.size(30, 30); // Smaller size
  plusButton.mousePressed(toggleGallery);

  // Setup download button with adjusted position and size
  downloadButton = createImg('heaveanangel.png', 'download button');
  downloadButton.position(20, 120); // Adjusted to the left
  downloadButton.size(30, 30); // Smaller size
  downloadButton.mousePressed(() => saveCanvas('myCanvas', 'png'));

  // Initialize gallery area
  initGallery();
}

function draw() {
  if (bgImage) {
    background(bgImage);
  }

  if (galleryVisible) {
    drawGallery();
  }
}

function initGallery() {
  let imgUrls = ['original_77f8f96b25a80928f3f31b83d967fd2d.png', 'original_77f8f96b25a80928f3f31b83d967fd2d.png', 'original_77f8f96b25a80928f3f31b83d967fd2d.png']; // Replace with actual URLs
  imgUrls.forEach(url => {
    let img = createImg(url, 'image');
    img.hide();
    galleryImages.push(img);
  });
}

function toggleGallery() {
  galleryVisible = !galleryVisible;
  drawGallery();
}

function drawGallery() {
  fill(255);
  rect(width - 330, 0, 327, 344); // Adjust size as needed
  galleryImages.forEach((img, i) => {
    if (galleryVisible) {
      img.show();
      img.position(width - 320, i * 110 + 10); // Adjust position as needed
    } else {
      img.hide();
    }
  });
}

function mousePressed() {
  if (dist(mouseX, mouseY, 20, 80) < 15) {
    toggleGallery();
  }
}

