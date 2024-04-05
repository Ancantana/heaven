let bgImage;
let textInput;
let galleryVisible = false;
let galleryImages = [];
let plusButton, downloadButton;
let galleryArea;

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
  textColorPicker.changed(() => {
    textInput.style('color', textColorPicker.value());
  });

  let bgColorPicker = createColorPicker('#ffffff');
  bgColorPicker.position(20, 50);
  bgColorPicker.changed(() => {
    textInput.style('background-color', bgColorPicker.value());
  });

  // Setup plus button
  plusButton = createImg('path_to_your_plus_button.png', 'plus button');
  plusButton.position(width - 50, 50);
  plusButton.mousePressed(toggleGallery);

  // Setup download button
  downloadButton = createImg('path_to_your_download_button.png', 'download button');
  downloadButton.position(width - 50, 100);

  downloadButton.mousePressed(() => {
    saveCanvas('myCanvas', 'png');
  });

  // Define the gallery area
  galleryArea = {
    x: width - 327,
    y: 0,
    width: 327,
    height: 344
  };
}

function draw() {
  if (bgImage) {
    background(bgImage);
  }

  if (galleryVisible) {
    fill(255);
    rect(galleryArea.x, galleryArea.y, galleryArea.width, galleryArea.height);
    // Draw images in the gallery
    galleryImages.forEach((img, i) => {
      image(img, galleryArea.x + 10, galleryArea.y + i * 100 + 10, 80, 80);
    });
  }
}

function toggleGallery() {
  galleryVisible = !galleryVisible;
}

function drop(event) {
  event.preventDefault();
  let file = event.dataTransfer.files[0];
  if (file.type.startsWith('image/')) {
    let droppedImage = createImg(URL.createObjectURL(file), () => {
      droppedImage.hide();
      galleryImages.push(droppedImage);
    });
  }
}
