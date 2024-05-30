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
  const markup = arr.map(item => {
    const thumb = document.createElement('a');
    thumb.classList.add('gallery_item');
    thumb.href = item.largeImageURL;
    thumb.setAttribute('data-source', item.largeImageURL);

    const image = document.createElement('img');
    image.src = item.webformatURL;
    image.alt = item.tags;
    image.loading = 'lazy';

    // const comments = document.createElement('span')
    // comments.textContent = item.comments

    // const likes = document.createElement('span');
    // likes.textContent = item.likes

    thumb.appendChild(image);
    // thumb.appendChild(comments)
    // thumb.appendChild(likes)
    return thumb;
  });
  markup.forEach(item => gallery.appendChild(item));
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
