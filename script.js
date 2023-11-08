let numberPeople;
let nameLength;
let gender;

document.querySelector('.number-people').value = localStorage.getItem('number-people');

let generatedNames = JSON.parse(localStorage.getItem('generated-names')) || [];
let fullName = '';

if (generatedNames.length !== 0) {
  display();
}

const boyName = [
  "ကျော်", "အောင်", "ထက်", "မင်း",
  "လှ", "ဝင်း", "မျိုး", "ကို",
  "စိုး", "နိုင်", "ထွန်း", "သူရ",
  "လွင်", "မိုး", "မောင်", "ရဲ",
  "သူ", "ဖြိုး", "သန့်", "ဝေ",
  "ဟိန်း", "နေ", "စော", "ထက်",
  "ဇင်", "မြင့်", "ဦး", "ခန့်",
  "ဇော်", "သက်", "စိုင်း",
  "ဟန်", "သော်", "မြတ်",
  "ကောင်း", "စည်သူ", "ရန်", "ထူး",
  "စုံ", "ပြည့်", "လင်း", "ပိုင်"
  , "သန်း"
];

const girlName = [
  "အေး", "ခင်", "သဇင်", "နှင်း",
  "ဆု", "နွယ်", "သီရိ", "မေ",
  "အိ", "မြတ်", "ဖြူ", "ယဉ်",
  "မြ", "ချော", "ပွင့်", "ဇင်",
  "ဇော်", "ရွှေ", "ဝေ", "မိုး",
  "စု", "ဝင့်", "စန္ဒာ",
  "လှိုင်", "ယု", "ယွန်း", "သွယ်",
  "ဘုန်း", "ခိုင်",
  "ပြည့်", "သဲ", "မွန်", "ငြိမ်း",
  "ချမ်း", "ဖူး", "ရတီ", "ဦး"
  , "ဝတီ", "ကြည်", "ဆောင်း"
];


function generateToggled() {
  const inputElement = document.querySelector('.number-people');
  const displayElement = document.querySelector('.display-section');
  emptyErrorMessage();
  getUserInput();
  generatedNames = [];
  generateNames();

  emptyDisplay();

  setTimeout(function(){
    display();
    saveToLocalStorage();
    generatedNames = [];
  }, 1000);
  displayElement.innerHTML = `<p class="start-display">Generating . . .</p>`;
}

function getUserInput() {
  const inputElement = document.querySelector('.number-people');
  const numberPeopleValue = Number(inputElement.value);

  if (isNaN(numberPeopleValue)) {
    errorMessage();
  }

  else if (numberPeopleValue === 0) {
    numberPeople = 1;
    inputElement.value = '1';
  }
  else {
    numberPeople = numberPeopleValue;
  }

  const lengthElement = document.querySelector('.name-length');
  const selectedLength = lengthElement[lengthElement.selectedIndex];
  nameLength = Number(selectedLength.value);

  const genderElement = document.querySelector('.select-gender');
  gender = genderElement[genderElement.selectedIndex].value;
}

function generateNames() {
  let nameArrayLength;
  let nameArray;
  let index;

  if (gender === 'boy') {
    nameArrayLength = boyName.length;
    nameArray = boyName;
  }
  else {
    nameArrayLength = girlName.length;
    nameArray = girlName;
  }

  for (let j = 0; j < numberPeople; j++) {

    for (let i = 0; i < nameLength; i++) {
      index = Math.floor(Math.random() * nameArrayLength);
      fullName += nameArray[index];
    }

    generatedNames.push(fullName);
    fullName = '';
  }
}

function display() {
  let displayElement = document.querySelector('.display-section');
  let display = '';

  for (let i = 0; i < generatedNames.length; i++) {
    let nameContainer = `
      <div class="name-container">
        <div class="number">${i + 1}</div>
        <div class="name">${generatedNames[i]}</div>
       <!-- <img class="copy-icon" src="images/icons8_copy.svg"> -->
      </div>
    `;
    display += nameContainer;
  }
  displayElement.innerHTML = `
  <div class="clear-button-container">
    <button class="clear-button" onclick="
    clearDisplay();
    ">Clear All</button>
    <div class="tooltip">Clear all names</div>
  </div>
  ${display}
  `;
}

function errorMessage() {
  const errorElement = document.querySelector('.error-message');
  errorElement.innerHTML = `
  <img class="error-icon" src="images/icons8_error.svg">
  Please don't enter letters or leave empty!
  `;
}

function emptyErrorMessage() {
  const errorElement = document.querySelector('.error-message');
  errorElement.innerHTML = '';
}

function emptyDisplay() {
  const displayElement = document.querySelector('.display-section');
  displayElement.innerHTML = '';
}

function saveToLocalStorage() {
  const numberPeopleElement = document.querySelector('.number-people');
  const numberPeople = numberPeopleElement.value;

  const generatedNamesString = JSON.stringify(generatedNames);
  localStorage.setItem('number-people', numberPeople);
  localStorage.setItem('generated-names', generatedNamesString);
}

function clearDisplay() {
  const displayElement = document.querySelector('.display-section');
  displayElement.innerHTML = `
  <p class="start-display">Generated names will be shown here.</p>
  `;
  document.querySelector('.number-people').value = '';

  localStorage.removeItem('number-people');
  localStorage.removeItem('generated-names');
  localStorage.removeItem('gender');
}

/*function coyName(){
  const nameBox = document.querySelector('.name');
  nameBox.select();
 // document.execCommand("copy");
}*/

function generatorWithEnter(event){
  if (event.key === 'Enter'){
    generateToggled();
  }
}