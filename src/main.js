'use strict';
import { searchImages } from './js/pixabay-api';
// import { onFetchError } from './js/render-functions';
import { renderImages, onFetchError } from './js/render-functions';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.querySelector('.gallery');

const form = document.querySelector('.form');
const input = document.querySelector('.input');

const loader = document.querySelector('.loader');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  loader.classList.remove('visually-hidden');

  const inputValue = input.value.trim();
  if (inputValue === '') {
    loader.classList.add('visually-hidden');
    iziToast.error({
      maxWidth: '370px',
      position: 'topRight',
      messageColor: 'white',
      backgroundColor: 'red',
      message: 'This field can not be empty! Please, write your request!',
    });
    return;
  }

  searchImages(inputValue)
    .then(images => {
      loader.classList.add('visually-hidden');
      if (images.hits.length === 0) {
        iziToast.error({
          maxWidth: '370px',
          position: 'topRight',
          messageColor: 'white',
          backgroundColor: 'red',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        loader.classList.add('visually-hidden');
        renderImages(images);
      }
    })
    .catch(onFetchError);

  form.reset();
}
