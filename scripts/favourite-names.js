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
    const nameLower = name.toLowerCase();
    html += `
      <div class="fav-name fav-name-${name}">
        <div class="col1-name">${name}</div>
        <button class="faved-btn" 
        data-faved-name="${name}">
          <img class="faved-icon" src="images/fav-added.png" />
        </button>
      </div>
    `;
  });

  document.querySelector('.fav-names')
    .innerHTML = html;
  removeFavouriteNames();
}

export function removeFavouriteNames() {
  document.querySelectorAll('.faved-btn')
    .forEach((buttonElement) => {
      buttonElement.addEventListener('click', () => {
        const { favedName } = buttonElement.dataset;
        removeNames(favedName);
        saveToStorage();
        favouriteNamesHTML();
      });
    });
}


