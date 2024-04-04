let bgImage;
let textInput;
let galleryVisible = false;
let galleryImages = [];
let plusButton, downloadButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textInput = createInput('');
  textInput.position(width/2 - textInput.width/2, height/2);
  
  // Load images using createImg() and loadPixels()
  bgImage = createImg('AFTERLIFE.png', () => {
    bgImage.hide();
    loadPixels();
  });
  
  plusButton = createImg('https://assets.editor.p5js.org/user/asset/plus-button.png', () => {
    plusButton.hide();
    loadPixels();
  });
  
  downloadButton = createImg('https://assets.editor.p5js.org/user/asset/download-button.png', () => {
    downloadButton.hide();
    loadPixels();
  });
  
  let img1 = createImg('https://assets.editor.p5js.org/user/asset/image1.png', () => {
    img1.hide();
    loadPixels();
    galleryImages.push(img1);
  });
  
  let img2 = createImg('https://assets.editor.p5js.org/user/asset/image2.png', () => {
    img2.hide();
    loadPixels();
    galleryImages.push(img2);
  });
  
  let img3 = createImg('https://assets.editor.p5js.org/user/asset/image3.png', () => {
    img3.hide();
    loadPixels();
    galleryImages.push(img3);
  });
}

function draw() {
  if (bgImage && bgImage.elt.complete) {
    background(bgImage);
  }
  
  if (plusButton && plusButton.elt.complete && downloadButton && downloadButton.elt.complete) {
    imageMode(CENTER);
    image(plusButton, width - 50, 50, 40, 40);
    image(downloadButton, width - 50, 100, 40, 40);
  }
  
  if (galleryVisible && galleryImages.length > 0 && galleryImages.every(img => img.elt.complete)) {
    drawGallery();
  }
}

function mousePressed() {
  if (dist(mouseX, mouseY, width - 50, 50) < 20) {
    galleryVisible = !galleryVisible;
  }
  
  if (dist(mouseX, mouseY, width - 50, 100) < 20) {
    saveCanvas('myCanvas', 'png');
  }
}

function drawGallery() {
  fill(255);
  rect(width - 200, 0, 200, height);
  
  for (let i = 0; i < galleryImages.length; i++) {
    image(galleryImages[i], width - 190, i * 100 + 50, 80, 80);
  }
}

function dragEnter() {
  background(200);
}

function dragLeave() {
  if (bgImage && bgImage.elt.complete) {
    background(bgImage);
  }
}

function drop(file) {
  if (file.type === 'image') {
    let droppedImage = createImg(file.data, () => {
      droppedImage.hide();
      loadPixels();
      image(droppedImage, mouseX, mouseY, 100, 100);
    });
  }
}