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
let plusButtonImg, downloadButtonImg;

function preload() {
  bgImage = loadImage('https://ancantana.github.io/heaven/AFTERLIFE.png');
  plusButtonImg = loadImage('https://ancantana.github.io/heaven/plusbutton.png');
  downloadButtonImg = loadImage('https://ancantana.github.io/heaven/heaveanangel.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textInput = createInput('');
  textInput.position(width / 2 - textInput.width / 2, height / 2);

  plusButton = createImg(plusButtonImg, 'plus button');
  plusButton.position(20, 80);
  plusButton.size(30, 30);
  plusButton.mousePressed(toggleGallery);

  downloadButton = createImg(downloadButtonImg, 'download button');
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

function toggleGallery() {
  galleryVisible = !galleryVisible;
}

function drawGallery() {
  fill(255);
  rect(width - 330, 0, 327, 344);

  galleryImages.forEach((img, i) => {
    if (img && img.width > 0 && img.height > 0) {
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
    }
  });
}

function mousePressed() {
  if (dist(mouseX, mouseY, 20, 80) < 15) {
    toggleGallery();
  } else {
    galleryImages.forEach((img, i) => {
      if (img && img.width > 0 && img.height > 0) {
        let imgX = width - 320;
        let imgY = i * 110 + 10;
        let imgW = 100;
        let imgH = 100;

        if (mouseX >= imgX && mouseX <= imgX + imgW && mouseY >= imgY && mouseY <= imgY + imgH) {
          draggedImage = img;
          dragOffsetX = mouseX - (imgX + imgW / 2); // Calculate the offset from the center of the image
          dragOffsetY = mouseY - (imgY + imgH / 2);
          imageScaleFactor = 2; // Set the initial scale factor for dropped images
        }
      }
    });

    // Check if the mouse is over a dragged image
    draggedImages.forEach(({ img, x, y, w, h }, i) => {
      if (mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h) {
        draggedImages[i].isDragged = true;
        dragOffsetX = mouseX - (x + w / 2); // Calculate the offset from the center of the image
        dragOffsetY = mouseY - (y + h / 2);
      }
    });
  }
}

function mouseDragged() {
  if (draggedImage) {
    // Update the position of the dragged image
    let imgX = mouseX - dragOffsetX;
    let imgY = mouseY - dragOffsetY;
    let imgW = draggedImage.width * imageScaleFactor;
    let imgH = draggedImage.height * imageScaleFactor;

    // Add the dragged image to the draggedImages array
    draggedImages.push({ img: draggedImage, x: imgX, y: imgY, w: imgW, h: imgH, isDragged: false });
    draggedImage = null; // Reset draggedImage to allow dragging a new image from the gallery
  } else {
    // Check if a dragged image is being moved
    draggedImages.forEach(({ img, x, y, w, h, isDragged }, i) => {
      if (isDragged) {
        draggedImages[i].x = mouseX - dragOffsetX;
        draggedImages[i].y = mouseY - dragOffsetY;
      }
    });
  }
}

function mouseReleased() {
  draggedImage = null;
  draggedImages.forEach((draggedImage, i) => {
    draggedImages[i].isDragged = false;
  });
}

function mouseWheel(event) {
  let scaleFactor = event.delta * 0.01; // Adjust the scaling factor based on the scroll direction

  if (draggedImage) {
    imageScaleFactor += scaleFactor;
    imageScaleFactor = constrain(imageScaleFactor, 0.5, 2); // Constrain the scaling factor to a reasonable range
  } else {
    // Check if a dragged image is being resized
    draggedImages.forEach(({ img, x, y, w, h, isDragged }, i) => {
      if (isDragged) {
        let newW = w + w * scaleFactor;
        let newH = h + h * scaleFactor;
        draggedImages[i].w = newW;
        draggedImages[i].h = newH;
      }
    });
  }

  return false; // Prevent default scrolling behavior
}

// ... (the rest of the code remains the same) ...
