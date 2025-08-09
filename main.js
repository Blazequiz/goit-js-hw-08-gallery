const galleryItems = [
  {
    preview: "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original: "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview: "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original: "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview: "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original: "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview: "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original: "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview: "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original: "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview: "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original: "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview: "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original: "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview: "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original: "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview: "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original: "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const gallery = document.querySelector(".gallery");
const lightboxImage = document.querySelector(".lightbox__image");
const jsLightbox = document.querySelector(".js-lightbox");
const closeBtn = document.querySelector('[data-action="close-lightbox"]');

let currentIndex = 0;

function fillGallery(items) {
  const fragment = document.createDocumentFragment();

  items.forEach(({ preview, original, description }, index) => {
    const li = document.createElement("li");
    li.classList.add("gallery__item");

    const link = document.createElement("a");
    link.classList.add("gallery__link");
    link.href = original;

    const img = document.createElement("img");
    img.classList.add("gallery__image");
    img.src = preview;
    img.dataset.source = original;
    img.dataset.index = index;
    img.alt = description;

    link.appendChild(img);
    li.appendChild(link);
    fragment.appendChild(li);
  });

  gallery.appendChild(fragment);
}

// Lightbox 
function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  jsLightbox.classList.add("is-open");
}

function closeLightbox() {
  jsLightbox.classList.remove("is-open");
  lightboxImage.src = "";
  lightboxImage.alt = "";
}

function showImageByIndex(index) {
  const item = galleryItems[index];
  if (!item) return;
  lightboxImage.src = item.original;
  lightboxImage.alt = item.description;
  currentIndex = index;
}

// Events 

gallery.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") return;

  const source = event.target.dataset.source;
  const alt = event.target.alt;
  currentIndex = Number(event.target.dataset.index);

  openLightbox(source, alt);
});

closeBtn.addEventListener("click", closeLightbox);

jsLightbox.addEventListener("click", (event) => {
  if (event.target.classList.contains("lightbox__overlay")) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (!jsLightbox.classList.contains("is-open")) return;

  switch (event.code) {
    case "Escape":
      closeLightbox();
      break;
    case "ArrowRight":
      if (currentIndex < galleryItems.length - 1) {
        showImageByIndex(currentIndex + 1);
      }
      break;
    case "ArrowLeft":
      if (currentIndex > 0) {
        showImageByIndex(currentIndex - 1);
      }
      break;
  }
});

fillGallery(galleryItems);
