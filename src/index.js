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
loadMoreBtn.addEventListener('click', onLoadMoreBtn);
loadMoreBtn.style.display = 'none';

function onSearch(e) {
    e.preventDefault();

    page = 1;
    gallery.innerHTML = '';

    const query = input.value.trim();

    if (query !== '') {
        pixabay(query);
        
    } else {
        loadMoreBtn.style.display = 'none';

        return Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
        );
    }
}

function onLoadMoreBtn() {
    const query = input.value.trim();
    page += 1;
    pixabay(query, page);
}

async function pixabay(query, page) {
    const API_URL = 'https://pixabay.com/api/';

    const options = {
        params: {
            key: '34459623-b0ea211fe3985b98adc104771',
            q: query,
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

function createMarkup(array) {
    const markup = array.hits
        .map(item =>
            `<a class="photo-link" href="${item.largeImageURL}">
            <div class="photo-card">
            <div class="photo">
            <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy"/>
            </div>
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b>
                            ${item.likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b>
                            ${item.views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b>
                            ${item.comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b>
                            ${item.downloads}
                        </p>
                    </div>
            </div>
        </a>`
        
    ).join('');
    gallery.insertAdjacentHTML('beforeend', markup);
    simpleLightbox.refresh();
}

const simpleLightbox = new SimpleLightbox('.gallery arr', {
    captionsData: 'alt',
    captionDelay: 250,
});

function notification(length, totalHits) {
    if (length === 0) {
        Notiflix.Notify.failure(
'Sorry, there are no images matching your search query. Please try again.'
    );
        return;
    }

    if (page === 1) {
        loadMoreBtn.style.display = 'flex';

Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }

    if (length < 40) {
        loadMoreBtn.style.display = 'none';
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
}


 