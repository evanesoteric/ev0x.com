// Headroom
(function() {
    new Headroom(document.querySelector("#header"), {
        tolerance: 10,
        offset : 205,
        classes: {
            initial: "slide",
            pinned: "headroom--pinned",
            unpinned: "headroom--unpinned"
        }
    }).init();
}());


// Scroll To Top
var scrollToTop = document.getElementById("scrollToTop");
window.addEventListener("scroll", function() {
    if (window.scrollY < 300) {
        scrollToTop.classList.add("hide-from-print");
    }
    else {
        scrollToTop.classList.remove("hide-from-print");
        scrollToTop.classList.add("uk-animation-slide-right");
    }
});


// Matrix canvas
document.addEventListener('DOMContentLoaded', (event) => {
  // Matrix canvas
  const canvas1 = document.getElementById("matrix-canvas");
  const canvasCTX = canvas1.getContext("2d");

  let symbol = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";

  symbol = symbol.split("");

  let font_size;
  let columns;
  let drops = [];

  // Variable to track if we're in the initial scanning state
  let isInitialScan = true;

  function onResize() {
    canvas1.height = window.innerHeight; // Set canvas height to viewport height
    canvas1.width = window.innerWidth;   // Set canvas width to viewport width

    // Adjust other parameters based on new dimensions
    const BASE_FONT_SIZE = 9;
    const scaleFactor = canvas1.width / (BASE_FONT_SIZE * symbol.length);
    font_size = BASE_FONT_SIZE * scaleFactor;

    // Check if it's a mobile device (viewport width less than 768px, can be adjusted)
    if (window.innerWidth <= 768) {
        font_size *= 1.32; // Increase font size by 68% :: 1.68
    }
    else if (window.innerWidth > 1024) {
        font_size *= 0.72;
    }

    columns = canvas1.width / font_size;

    // Reinitialize the drops array
    drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
  }

  // Drawing the characters
  function draw() {
    canvasCTX.fillStyle = "rgba(0, 0, 0, 0.05)";
    canvasCTX.fillRect(0, 0, canvas1.width, canvas1.height);

    canvasCTX.fillStyle = "#0F0";
    canvasCTX.font = `${font_size}px arial`;

    for (let i = 0; i < drops.length; i++) {
      const text = symbol[Math.floor(Math.random() * symbol.length)];
      canvasCTX.fillText(text, i * font_size, drops[i] * font_size);

      if (drops[i] * font_size > canvas1.height && Math.random() > 0.975) {
        drops[i] = 0;

        // Once a column reaches the bottom, mark the initial scan as done
        if (isInitialScan) {
          isInitialScan = false;
        }
      }

      // Increase rate of drops by 50% during initial scan, and reduce regular rate by 20%
      drops[i] += isInitialScan ? 1.5 : 0.8;
    }
  }

  window.addEventListener('resize', onResize);
  onResize();
  setInterval(draw, 33);
});