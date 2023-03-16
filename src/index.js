import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;

form.addEventListener('submit', onSearch);
loadMoreBtn.style.display = 'none';
loadMoreBtn.addEventListener('click', onLoadMoreBtn);

function onSearch(e) {
    e.preventDefault();

    page = 1;
    gallery = innerHTML = '';

    const name = input.value.trim();

    if (name !== '') {
        pixabay(name);
        
    } loadMoreBtn.style.display = 'none';

    return Notiflix.Notify.failure(
'Sorry, there are no images matching your search query. Please try again.'
    );
}

function onLoadMoreBtn() {
    const name = input.value.trim();
    page += 1;
    pixabay(name, page);
}

async function pixabay(name, page) {
    const API_URL = 'https://pixabay.com/api/';

    const options = {
        params: {
            key: '34459623-b0ea211fe3985b98adc104771',
            q: name,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            page: page,
            per_page: 40,
        },
    };

    try {
        const response = await axios.get(API_URL, options);

        notification(
            response.data.hits.length,
            response.data.total
        );

        createMarkup(response.data);
    } catch (error) {
        console.log(error);
    }
}
