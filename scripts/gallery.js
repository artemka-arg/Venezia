const galleryImages = document.querySelectorAll('.gallery-grid img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentIndex = 0;
const imageArray = Array.from(galleryImages);

galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
    currentIndex = index;
  });
});

function showImage(index) {
  if (index < 0) index = imageArray.length - 1;
  if (index >= imageArray.length) index = 0;
  currentIndex = index;
  lightboxImg.src = imageArray[currentIndex].src;
}

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

nextBtn.addEventListener('click', () => {
  showImage(currentIndex + 1);
});

prevBtn.addEventListener('click', () => {
  showImage(currentIndex - 1);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') lightbox.style.display = 'none';
  if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
});

const leftZone = document.querySelector('.left-zone');
const rightZone = document.querySelector('.right-zone');

leftZone.addEventListener('click', () => {
  showImage(currentIndex - 1);
});

rightZone.addEventListener('click', () => {
  showImage(currentIndex + 1);
});
