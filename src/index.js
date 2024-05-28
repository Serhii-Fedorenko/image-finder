import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import getImages from './js/getImages';

const gallery = document.getElementById('gallery');
const form = document.querySelector('.search-form');

form.addEventListener('submit', handleInputChange);
gallery.addEventListener('click', handleGalleryItemClick);

function renderImages(arr) {
  const murkup = arr
    .map(
      item =>
        `<a class='gallery_item' href='${item.largeImageURL}' data-source='${item.largeImageURL}'><img src='${item.webformatURL}' alt='${item.tags}' loading="lazy"/></a>`
    )
    .join('');
  return gallery.insertAdjacentHTML('beforeend', murkup);
}

function handleInputChange(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  const form = e.target;
  const currentPage = 1;
  getImages(form.elements.query.value, 1).then(({ hits }) =>
    renderImages(hits)
  );
  form.reset();
}

function handleGalleryItemClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') return;
  const currentImgOriginal = e.target.src;
  handleShowImage(currentImgOriginal)
}

function handleShowImage(src) {
  const lightbox = new SimpleLightbox('.gallery_item', {
    sourceAttr: 'data-source',
    captionsData: 'alt',
    captionDelay: 250,
    overlayOpacity: 0.5
  });
  lightbox.open([src]);
}
