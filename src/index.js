import getImages from './js/getImages';

const gallery = document.getElementById('gallery');
const form = document.querySelector('.search-form');

getImages('sea', 1).then(({ hits }) => renderImages(hits));

function renderImages(arr) {
  const murkup = arr
    .map(
      item =>
        `<a class='gallery_item' href='${item.largeImageURL}' data-source='${item.largeImageURL}'><img src='${item.webformatURL}' alt='${item.tags}'/></a>`
    )
    .join('');
  return gallery.insertAdjacentHTML('beforeend', murkup);
}
