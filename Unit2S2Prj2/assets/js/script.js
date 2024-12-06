const carouselRows = document.querySelectorAll(".carousel-item .row");

let offset = 0;
let isAnimating = false;
let isPaused = false;

const containerWidth = carouselRows[0].parentElement.offsetWidth;
const totalWidth = carouselRows[0].scrollWidth;
function slideImages() {
  if (isAnimating || isPaused) return;
  isAnimating = true;

  offset += containerWidth;

  if (offset >= totalWidth) {
    offset = 0;
    carouselRows.forEach((row) => {
      row.style.transition = "none";
      row.style.transform = `translateX(-${offset}px)`;
    });

    setTimeout(() => {
      carouselRows.forEach((row) => {
        row.style.transition = "transform 1s ease";
      });
      isAnimating = false;
    });
  } else {
    carouselRows.forEach((row) => {
      if (!row.classList.contains("paused")) {
        row.style.transform = `translateX(-${offset}px)`;
      }
    });
    isAnimating = false;
  }
}

setInterval(slideImages, 2500);

// Ferma l'animazione quando il mouse è sopra una riga
carouselRows.forEach((row) => {
  row.addEventListener("mouseenter", () => {
    row.classList.add("paused"); // Aggiunge la classe 'paused' per fermare la transizione solo su quella riga
  });

  row.addEventListener("mouseleave", () => {
    row.classList.remove("paused"); // Rimuove la classe 'paused' per riprendere la transizione solo su quella riga

    row.style.transition = "transform 0.5s ease-out";
  });
});
