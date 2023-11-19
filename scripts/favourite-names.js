import {displayHTML} from './main.js';
import { copyToClipboard } from './main.js';

export let favouriteNames = JSON.parse(localStorage.getItem('favourite-names')) || [];

export function addToFavourites() {
  document.querySelectorAll('.add-to-fav-btn')
    .forEach((favElement) => {
      favElement.addEventListener('click', () => {
        const { name } = favElement.dataset;
        addOrRemove(favElement, name);
        saveToStorage();
        favouriteNamesHTML();
      });
    });
}

function saveToStorage() {
  localStorage.setItem('favourite-names', JSON.stringify(favouriteNames));
}

function addOrRemove(favElement, name) {
  let isFaved;

  if (!favElement.classList.contains('added')) {
    favElement.classList.add('added');
    favElement.classList.remove('not-added');
    isFaved = 'added';
    checkAndAdd(name);
  }
  else {
    favElement.classList.remove('added');
    isFaved = 'not-added';
    removeNames(name);
  }
  favElement.innerHTML = `
  <img class="faved-icon" src="images/fav-${isFaved}.png">
  `;
}

function checkAndAdd(name) {
  let repeat = false;

  favouriteNames.forEach((favName) => {
    if (name === favName) {
      repeat = true;
    }
  });

  if (!repeat) {
    favouriteNames.push(name);
  }
}

function removeNames(name) {
  let newFavNames = [];

  favouriteNames.forEach((favName) => {
    if (name !== favName) {
      newFavNames.push(favName);
    }
  });
  favouriteNames = newFavNames;
}

export function favouriteNamesHTML() {
  let html = '';

  favouriteNames.forEach((name) => {
    html += `
      <div class="fav-name">
        <div class="col1-name">${name}</div>
        <div>
        <button class="faved-btn" 
        data-faved-name="${name}">
          <img class="faved-icon" src="images/fav-added.png" />
        </button>
        <button class="copy-btn copy-btn-faved" 
        data-name="${name}">
          <img class="copy-icon" src="images/icons8_copy.svg">
        </button>
        </div>
      </div>
    `;
  });

  if (favouriteNames.length === 0){
    html = `Empty !`;
  }

  document.querySelector('.fav-names')
    .innerHTML = html;
  removeFavouriteNames();
  copyToClipboard();
  updateNamesCount();
}

export function removeFavouriteNames() {
  document.querySelectorAll('.faved-btn')
    .forEach((buttonElement) => {
      buttonElement.addEventListener('click', () => {
        const { favedName } = buttonElement.dataset;
        removeNames(favedName);
        saveToStorage();
        favouriteNamesHTML();
        displayHTML();
      });
    });
}

function updateNamesCount(){
  document.querySelector('.faved-names-count')
    .innerHTML = favouriteNames.length;
}

