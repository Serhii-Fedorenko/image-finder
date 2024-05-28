export default function getImages(query, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '35272793-b80026b1270d14e27c5199e53';
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${query}&per_page=40&page=${page}&image_type=photo&orientation=horizontal`
  )
    .then(response => response.json())
    .catch(error => {
      throw new Error(error.statusText);
    });
}
