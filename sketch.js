let bgImage;
let textInput;
let galleryVisible = false;
let galleryImages = [];
let plusButton, downloadButton;

function preload() {
  bgImage = loadImage('AFTERLIFE.png'); // Update with the correct path
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

  // Setup plus button
  plusButton = createImg('original_68a6e54cf27de8b5bd0d2b9e7fc871f5.gif', 'plus button');
  plusButton.position(width - 100, 50);
  plusButton.mousePressed(toggleGallery);

  // Setup download button
  downloadButton = createImg('heaveanangel.png', 'download button');
  downloadButton.position(width - 100, 100);
  downloadButton.mousePressed(() => saveCanvas('myCanvas', 'png'));

  // Initialize gallery area
  initGallery();
}

function initGallery() {
  let imgUrls = ['placeholder1.png', 'placeholder2.png', 'placeholder3.png']; // Replace with actual URLs
  imgUrls.forEach(url => {
    let img = createImg(url, 'image');
    img.hide();
    galleryImages.push(img);
  });
}

function draw() {
  if (bgImage) {
    background(bgImage);
  }

  if (galleryVisible) {
    drawGallery();
  }
}

function toggleGallery() {
  galleryVisible = !galleryVisible;
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
  if (dist(mouseX, mouseY, width - 100, 50) < 20) {
    toggleGallery();
  }
}

