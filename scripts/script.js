import { boyNameMy, girlNameMy, boyNameEn, girlNameEn } from '../data/names.js';
import { addToFavourites, favouriteNamesHTML, favouriteNames } from './favourite-names.js';

let generatedNames = JSON.parse(localStorage.getItem('generated-names')) || [];

let language;
let numberPeople;
let nameLength;
let gender;

if (generatedNames.length !== 0) {
  displayHTML();
}

favouriteNamesHTML();

let generateTimeOutId;
function generateRandomNames() {
  const displayElement = document.querySelector('.display-section');
  getUserInput();
  generateNames();
  saveToLocalStorage();
  clearTimeout(generateTimeOutId);
  generateTimeOutId = setTimeout(function () {
    displayHTML();
  }, 2000);
  displayElement.innerHTML = `
  <div class="loading-icon-container">
    <img class="loading-icon" src="images/loading 2.gif">
  </div>`;
}

function getUserInput() {
  language = document.querySelector('.name-language-selector').value;
  const numberPeopleValue = Number(document.querySelector('.number-people').value) || 0;

  if (numberPeopleValue === 0) {
    numberPeople = 5;
    document.querySelector('.number-people').value = '5';
  } else {
    numberPeople = numberPeopleValue;
  }

  nameLength = Number(document.querySelector('.name-length').value);
  gender = document.querySelector('.select-gender').value;
  console.log(language)
}

function generateNames() {
  generatedNames = [];
  let nameArrayLength;
  let nameArray;
  let index;

  if (language === 'my') {
    if (gender === 'boy') {
      nameArrayLength = boyNameMy.length;
      nameArray = boyNameMy;
    } else {
      nameArrayLength = girlNameMy.length;
      nameArray = girlNameMy;
    }
  }
  else if (language === 'en') {
    if (gender === 'boy') {
      nameArrayLength = boyNameEn.length;
      nameArray = boyNameEn;
    } else {
      nameArrayLength = girlNameEn.length;
      nameArray = girlNameEn;
    }
  }

  for (let i = 0; i < numberPeople; i++) {
    let fullName = '';
    for (let j = 0; j < nameLength; j++) {
      index = Math.floor(Math.random() * nameArrayLength);

      if (language === 'my') {
        fullName += nameArray[index];
      } else if (language === 'en') {
        fullName += nameArray[index] + ' ';
      }
    }

    generatedNames.push(fullName);
  }
}

function displayHTML() {
  const displayElement = document.querySelector('.display-section');
  let html = '';

  generatedNames.forEach((name, i) => {
    html += `
      <div class="name-container">
        <div class="number">${i + 1}</div>
        <div class="name">${name}</div>
        <button class="copy-btn" 
        data-name="${name}">
          <img class="copy-icon" src="images/icons8_copy.svg">
       </button>
          ${changeFavIcon(name)}
      </div>
    `;
  });

  displayElement.innerHTML = `
  <div class="clear-button-container">
    <button class="clear-button">Clear All</button>
    <div class="tooltip">Clear all names</div>
  </div>
  ${html}
  `;

  copyToClipboard();
  clearAll();
  addToFavourites();
}

document.querySelector('.number-people')
  .addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      generateRandomNames();
    }
  });

document.querySelector('.generate-btn')
  .addEventListener('click', () => {
    generateRandomNames();
  });


function saveToLocalStorage() {
  const generatedNamesString = JSON.stringify(generatedNames);
  localStorage.setItem('generated-names', generatedNamesString);
}

function removeFromStorage() {
  localStorage.removeItem('generated-names');
}

function clearDisplay() {
  const displayElement = document
    .querySelector('.display-section');
  displayElement.innerHTML = `
  <p class="start-display">Generated names will be shown here.</p>
  `;
  removeFromStorage();
}

function clearAll() {
  document.querySelector('.clear-button')
    .addEventListener('click', () => {
      clearDisplay();
    });
}

function copyToClipboard() {
  document.querySelectorAll('.copy-btn').forEach((copyElement, index) => {
    copyElement.addEventListener('click', () => {
      const { name } = copyElement.dataset;
      navigator.clipboard.writeText(name);
      copiedToClipboard(copyElement, index);
    });
  });
}

function changeFavIcon(name) {
  let image = 'not-added';

  favouriteNames.forEach((favedName) => {
    if (name === favedName) {
      image = 'added';
    }
  });

  return `
  <button class="add-to-fav-btn ${image}" 
  data-name="${name}">
  <img class="faved-icon" src="images/fav-${image}.png">
 </button>
  `;
}

let timeOutId = [];
function copiedToClipboard(copyElement, index) {
  copyElement.innerHTML = `
  <img class="copy-icon" src="images/icons8_check_all_480px.png">
  `;
  clearTimeout(timeOutId[index]);
  timeOutId[index] = setTimeout(() => {
    copyElement.innerHTML = `
    <img class="copy-icon" src="images/icons8_copy.svg">
    `;
  }, 3000);
}

document.querySelector('.menu')
  .addEventListener('click', () => {
    showSidbar();
  });


/*document.querySelector('.bottom-section')
  .addEventListener('click', () => {
    hideSidebar();
  });
  */

document.querySelector('.close-menu-bar')
  .addEventListener('click', () => {
    hideSidebar();
  });

function showSidbar() {
  document.querySelector('.sidebar')
    .classList.add('sidebar-active');
}

function hideSidebar() {
  document.querySelector('.sidebar')
    .classList.remove('sidebar-active');
}


