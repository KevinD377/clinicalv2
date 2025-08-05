const container = document.getElementById("image-container");
const beforeImage = document.getElementById("before-image");
const afterImage = document.getElementById("after-image");
const slider = document.getElementById("slider");

let isDragging = false;
let sliderPosition = 50;

const updateSlider = (position) => {
  sliderPosition = Math.min(Math.max(position, 0), 100);
  // Recorte visual con clip-path
  beforeImage.style.clipPath = `inset(0 0 0 ${sliderPosition}%)`;         // recorta desde la izquierda
  afterImage.style.clipPath = `inset(0 ${100 - sliderPosition}% 0 0)`;    // recorta desde la derecha
  slider.style.left = `${sliderPosition}%`;
  container.setAttribute("aria-valuenow", Math.round(sliderPosition));
};

// Mouse
container.addEventListener("mousedown", (e) => {
  isDragging = true;
  e.preventDefault(); // bloquea selección de texto y scroll
  document.body.style.cursor = "grabbing";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.cursor = "";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const position = (x / rect.width) * 100;
  updateSlider(position);
});

// Touch
container.addEventListener("touchstart", () => {
  isDragging = true;
});

container.addEventListener("touchend", () => {
  isDragging = false;
});

container.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  e.preventDefault(); // ✅ evita scroll en mobile
  const rect = container.getBoundingClientRect();
  const x = e.touches[0].clientX - rect.left;
  const position = (x / rect.width) * 100;
  updateSlider(position);
}, { passive: false }); // ✅ necesario para que e.preventDefault() funcione

// Teclado
container.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    updateSlider(sliderPosition - 1);
  } else if (e.key === "ArrowRight") {
    updateSlider(sliderPosition + 1);
  }
});
