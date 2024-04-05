let bgImage;
let textInput;
let galleryVisible = false;
let galleryImages = [];
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

  plusButton = createImg('plusbutton.png', 'plus button');
  plusButton.position(20, 80);
  plusButton.size(30, 30);
  plusButton.mousePressed(toggleGallery);

  downloadButton = createImg('heaveanangel.png', 'download button');
  downloadButton.position(20, 120);
  downloadButton.size(30, 30);
  downloadButton.mousePressed(() => saveCanvas('myCanvas', 'png'));

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
  let imgUrls = [
    'https://ancantana.github.io/heaven/original_77f8f96b25a80928f3f31b83d967fd2d.png',
    'https://ancantana.github.io/heaven/original_77f8f96b25a80928f3f31b83d967fd2d.png',
    'https://ancantana.github.io/heaven/original_77f8f96b25a80928f3f31b83d967fd2d.png'
  ];
  imgUrls.forEach(url => {
    let img = createImg(url, 'image');
    img.hide();
    galleryImages.push(img);
  });
}

function toggleGallery() {
  galleryVisible = !galleryVisible;
}

function drawGallery() {
  fill(255);
  rect(width - 330, 0, 327, 344);

  galleryImages.forEach((img, i) => {
    let imgX = width - 320;
    let imgY = i * 110 + 10;
    let imgW = 100;
    let imgH = 100;

    if (galleryVisible) {
      image(img, imgX, imgY, imgW, imgH);
    }

    // Check if the mouse is over this image
    if (mouseX >= imgX && mouseX <= imgX + imgW && mouseY >= imgY && mouseY <= imgY + imgH) {
      cursor(MOVE);
    } else {
      cursor(ARROW);
    }
  });

  // Draw the dragged image on top
  if (draggedImage) {
    let imgX = mouseX - dragOffsetX;
    let imgY = mouseY - dragOffsetY;
    let imgW = draggedImage.width * imageScaleFactor;
    let imgH = draggedImage.height * imageScaleFactor;
    image(draggedImage, imgX, imgY, imgW, imgH);
  }
}

function mousePressed() {
  if (dist(mouseX, mouseY, 20, 80) < 15) {
    toggleGallery();
  } else {
    galleryImages.forEach((img, i) => {
      let imgX = width - 320;
      let imgY = i * 110 + 10;
      let imgW = 100;
      let imgH = 100;

      if (mouseX >= imgX && mouseX <= imgX + imgW && mouseY >= imgY && mouseY <= imgY + imgH) {
        draggedImage = img;
        dragOffsetX = mouseX - imgX;
        dragOffsetY = mouseY - imgY;

        // Add a new copy of the image to the gallery
        let newImg = createImg(img.elt.src, 'image');
        newImg.hide();
        galleryImages.push(newImg);
      }
    });
  }
}

function mouseDragged() {
  if (draggedImage) {
    // Update the position of the dragged image
  }
}

function mouseReleased() {
  draggedImage = null;
}

function mouseWheel(event) {
  if (draggedImage) {
    imageScaleFactor += event.delta * 0.01; // Adjust the scaling factor based on the scroll direction
    imageScaleFactor = constrain(imageScaleFactor, 0.5, 2); // Constrain the scaling factor to a reasonable range
  }
  return false; // Prevent default scrolling behavior
}
