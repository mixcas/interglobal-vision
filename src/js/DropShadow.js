/* jshint esversion: 6, browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, document */

class DropShadow {
  constructor() {
    this.mobileThreshold = 601;
    // Get the canvas
    this.canvas = document.getElementById("dropshadow");
    this.context = this.canvas.getContext("2d");

    // Define the image dimensions
    this.width =  this.canvas.width = this.canvas.scrollWidth;
    this.height = this.canvas.height = this.canvas.scrollHeight;

    // Math constants
    this.radians = 6.28319;

    // Create "image"
    this.imagedata = this.context.createImageData(this.width, this.height);

    // Bind ready and resize
    this.onResize = this.onResize.bind(this)
    this.onReady = this.onReady.bind(this)
    $(window).resize(this.onResize);
    $(document).ready(this.onReady);

    // Bind other function
    this.animation = this.animation.bind(this)
    this.handleFrame = this.handleFrame.bind(this)
    this.startAnimation = this.startAnimation.bind(this)
    this.stopAnimation = this.stopAnimation.bind(this)

    // Bind animation to open/close project events
    $(window)
      .on('projectOpen', this.startAnimation)
      .on('projectClose', this.stopAnimation);


    if ($('body').hasClass('project-open')) {
      this.startAnimation();
    }
  }

  startAnimation() {
    this.animating = true;;
    this.handleFrame(0);
  }

  stopAnimation() {
    // Timeout to wait till the pane is closed to stop the animation
    setTimeout(() => this.animating = false, 700);
  }

  handleFrame(frame) {
    if(this.animating) {
      // Request animation frames
      window.requestAnimationFrame(this.handleFrame);

      // Create the image
      this.animation(Math.floor(frame / 10));

      // Draw the image data to the canvas
      this.context.putImageData(this.imagedata, 0, 0);
    }
  }


  animation(offset) {
    // Loop over all of the pixels
    for (var x = 0; x < this.width; x++) {
      for (var y = 0; y < this.height; y++) {

        // convert scale from 0 to 0.5
        const param = (x * Math.sin(1)) / this.width;

        if (Math.random() > Math.asin(param) || x === this.width) {
          // Get the pixel index
          var pixelindex = (y * this.width + x) * 4;

          // Generate a xor pattern with some random noise
          var prob = 1.06 / this.width * x;

          prob = prob * prob;//* (offset * 0.001);

          var value = Math.random() >= prob;

          if( x === this.width ) {
            value = true;
          }

          // Set the pixel data
          this.imagedata.data[pixelindex] = value ? 255 : 0; // Red
          this.imagedata.data[pixelindex + 1] = value ? 255 : 0; // Green
          this.imagedata.data[pixelindex + 2] = value ? 255 : 0; // Blue
          this.imagedata.data[pixelindex + 3] = value ? 0 : 255; // Alpha
        }
      }
    }
  }

  onResize() {
    // Define the image dimensions
    this.width =  this.canvas.width = this.canvas.scrollWidth;
    this.height = this.canvas.height = this.canvas.scrollHeight;
    this.imagedata = this.context.createImageData(this.width, this.height);
  }

  onReady() {
  }


}

export default DropShadow;
