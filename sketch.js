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

  // Create color pickers and set their positions
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
  plusButton = createImg('path_to_your_plus_button.png', 'plus button');
  plusButton.position(width - 50, 50);
  plusButton.mousePressed(toggleGallery);

  // Setup download button
  downloadButton = createImg('path_to_your_download_button.png', 'download button');
  downloadButton.position(width - 50, 100);
  downloadButton.mousePressed(() => {
    saveCanvas('myCanvas', 'png');
  });

  // Placeholder images for gallery
  let imgUrls = ['placeholder1.png', 'placeholder2.png', 'placeholder3.png'];
  imgUrls.forEach(url => {
    let img = createImg(url, '', () => {
      img.hide();
      galleryImages.push(img);
    });
  });
}

function draw() {
  if (bgImage) {
    background(bgImage);
  }

  if (galleryVisible && galleryImages.length > 0) {
    drawGallery();
  }
}

function toggleGallery() {
  galleryVisible = !galleryVisible;
}

function drawGallery() {
  fill(255);
  rect(width - 200, 0, 200, height);
  for (let i = 0; i < galleryImages.length; i++) {
    image(galleryImages[i], width - 190, i * 100 + 50, 80, 80);
  }
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

