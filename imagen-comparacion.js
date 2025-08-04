    const container = document.getElementById("image-container");
    const beforeImage = document.getElementById("before-image");
    const afterImage = document.getElementById("after-image");
    const slider = document.getElementById("slider");

    let isDragging = false;
    let sliderPosition = 50;

    const updateSlider = (position) => {
    sliderPosition = Math.min(Math.max(position, 0), 100);
    // Clip visual según el porcentaje del slider
    beforeImage.style.clipPath = `inset(0 0 0 ${sliderPosition}%)`;          // recorta desde la izquierda
    afterImage.style.clipPath = `inset(0 ${100 - sliderPosition}% 0 0)`;     // recorta desde la derecha
    slider.style.left = `${sliderPosition}%`;
    container.setAttribute("aria-valuenow", Math.round(sliderPosition));
    };

    container.addEventListener("mousedown", () => {
    isDragging = true;
    });

    document.addEventListener("mouseup", () => {
    isDragging = false;
    });

    document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const position = (x / rect.width) * 100;
    updateSlider(position);
    });

    container.addEventListener("touchstart", () => {
    isDragging = true;
    });

    container.addEventListener("touchend", () => {
    isDragging = false;
    });

    container.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const rect = container.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const position = (x / rect.width) * 100;
    updateSlider(position);
    });

    container.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        updateSlider(sliderPosition - 1);
    } else if (e.key === "ArrowRight") {
        updateSlider(sliderPosition + 1);
    }
    });
