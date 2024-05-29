import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import getImages from './js/getImages';

const gallery = document.getElementById('gallery');
const form = document.querySelector('.search-form');
const target = document.getElementById('guard');

form.addEventListener('submit', handleInputChange);

let currentPage = 1;
let queryValue = '';

const options = {
  root: null,
  rootMargin: '500px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(handleLoadMore, options);
observer.observe(target);

const lightbox = new SimpleLightbox('.gallery_item', {
  sourceAttr: 'data-source',
  captionsData: 'alt',
  captionDelay: 250,
  overlayOpacity: 0.5,
});

function renderImages(arr) {
  const murkup = arr
    .map(
      item =>
        `<a class='gallery_item' href='${item.largeImageURL}' data-source='${item.largeImageURL}'><img src='${item.webformatURL}' alt='${item.tags}' loading="lazy"/></a>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', murkup);
  lightbox.refresh();
}

function handleInputChange(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  const form = e.target;
  queryValue = form.elements.query.value;
  currentPage = 1;
  getImages(queryValue, currentPage).then(({ hits }) => renderImages(hits));
  form.reset();
}

function handleLoadMore() {
  currentPage += 1;
  getImages(queryValue, currentPage).then(({ hits }) => renderImages(hits));
}
