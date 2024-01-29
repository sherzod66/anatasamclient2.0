export const lazyImage = () => {
  const lazyImages: NodeListOf<HTMLImageElement> =
    document.querySelectorAll("img[data-src]");
  const windowHeight = document.documentElement.clientHeight;
  let lazyImagesPositions: number[] = [];
  if (lazyImages.length > 0) {
    lazyImages.forEach((img) => {
      if (img.src) {
        lazyImagesPositions.push(img.getBoundingClientRect().top + scrollY);
        lazyScrollCheck();
      }
    });
  }
  window.addEventListener("scroll", lazyScroll);
  function lazyScroll() {
    if (document.querySelectorAll("img[data-src]").length > 0) {
      lazyScrollCheck();
    }
  }
  function lazyScrollCheck() {
    let imgIndex: number = lazyImagesPositions.findIndex(
      (item) => scrollY > item - windowHeight
    );
    if (imgIndex >= 0) {
      if (lazyImages[imgIndex].dataset.src) {
        lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src as string;
        lazyImages[imgIndex].removeAttribute("data-src");
      }
      delete lazyImagesPositions[imgIndex];
    }
  }
};
