const galleryItems = [...document.querySelectorAll(".gallery-item")];
const Buttons = document.querySelectorAll(".btn");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const caption = document.getElementById("caption");

const closeButton = document.querySelector(".close");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let visibleItems = [...galleryItems];
let currentIndex = 0;


Buttons.forEach((button) =>{
  button.addEventListener(("click"), ()=>{
    Buttons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    galleryItems.forEach((item) =>{
      const category = item.dataset.category;

      if(filter === "all" || category === filter){
        item.classList.remove("hidden");
      }
      else{
        item.classList.add("hidden");
      }
    });

    visibleItems = galleryItems.filter(
      (item) => !item.classList.contains("hidden")
    );
  });
});

galleryItems.forEach((item) =>{
  item.addEventListener("click", ()=>{
    visibleItems = galleryItems.filter(
      (galleryItem) => !galleryItem.classList.contains("hidden")
    );

    currentIndex = visibleItems.indexOf(item);
    
    showItem(currentIndex);
    lightbox.classList.add("active");
  });
});

function showItem(index) {
  const item = visibleItems[index];

  if(!item) return;

  const image = item.querySelector("img");
  const title = item.querySelector("h3");

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  caption.textContent = title ? title.textContent : image.alt;
}

//previous image
function previousImage() {
  currentIndex--;
  if(currentIndex < 0){
    currentIndex = visibleItems.length - 1;
  }

  showItem(currentIndex);
}

//next image
function nextImage(){
  currentIndex++;
  if(currentIndex >= visibleItems.length){
    currentIndex = 0;
  }

  showItem(currentIndex);
}

prevButton.addEventListener("click", previousImage);
nextButton.addEventListener("click", nextImage);

//close button
function closeLightbox(){
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

closeButton.addEventListener("click", closeLightbox);

//Close when clicking dark background
lightbox.addEventListener("click", (event) =>{
  if(event.target === lightbox){
    closeLightbox()
  }
});

//keyboard nevigation
document.addEventListener("keydown", (event)=>{
  if(!lightbox.classList.contains("active")) return;

  if(event.key === "ArrowRight"){
    nextImage();
  }

  if(event.key === "ArrowLeft"){
    previousImage();
  }

  if(event.key === "Escape"){
    closeLightbox();
  }
});
