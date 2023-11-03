let numberPeople;
let nameLength;
let gender;

let generatedNames = [];
let fullName = '';

const boyName = [
  "Kyaw", "Aung", "Htet", "Min",
  "Hla", "Win", "Myo", "Ko",
  "Soe", "Naing", "Tun", "Thura",
  "Lwin", "Moe", "Maung", "Ye",
  "Thu", "Phyo", "Thant", "Wai",
  "Hein", "Nay", "Saw", "Htet",
  "Zin", "Myint", "Oo", "Khant",
  "Zaw", "Thet", "Sai", "Soe",
  "Han", "San", "Thaw", "Myat",
  "Kaung", "Sithu", "Yan", "Htoo",
  "Sone", "Pyae", "Lin", "Paing"
  , "Htay", "Than"
];

const girlName = [
  "Aye", "Khin", "Thazin", "Hnin",
  "Su", "Nwe", "Thiri", "May",
  "Ei", "Myat", "Phyu", "Yin",
  "Mya", "Chaw", "Pwint", "Zin",
  "Zaw", "Shwe", "Wai", "Moe",
  "Hsu", "Hsu", "Wint", "Sandar",
  "Hlaing", "Yu", "Yoon", "Thwe",
  "Htay", "Bhone", "Hnin", "Khaing",
  "Pyae", "Thae", "Mon", "Nyein",
  "Chan", "Phoo", "Yati", "Oo"
  , "Wati", "Kyi", "Yu", "Saung"
];


function generateToggled() {
  const inputElement = document.querySelector('.number-people');
  emptyErrorMessage();
  getUserInput();
  generateNames();

  emptyDisplay();
  display();
  generatedNames = [];
}

function getUserInput() {
  const inputElement = document.querySelector('.number-people');
  const numberPeopleValue = Number(inputElement.value);

  if (numberPeopleValue){
    numberPeople = numberPeopleValue;
  }
  else {
    errorMessage();
    numberPeople = 0;
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
      fullName += nameArray[index] + ' ';
    }

    generatedNames[j] = fullName;
    fullName = '';
  }

  console.log(generatedNames);
}

function display(){
  let displayElement = document.querySelector('.display-section');
  let display = '';

  for (let i = 0; i < generatedNames.length; i++){
    let nameContainer = `
    <div class="name-container">
        <div class="number">${i+1}</div>
        <div class="name">${generatedNames[i]}</div>
      </div>
    `;
    display += nameContainer;
  }
  displayElement.innerHTML = display;
  console.log(display);
}

function errorMessage(){
  const errorElement = document.querySelector('.error-message');
  errorElement.innerHTML = `
  <img class="error-icon" src="images/icons8_error.svg">
  Please don't enter letters or leave empty!
  `;
}

function emptyErrorMessage(){
  const errorElement = document.querySelector('.error-message');
  errorElement.innerHTML = '';
}

function emptyDisplay(){
  const displayElement = document.querySelector('.display-section');
  displayElement.innerHTML = '';
}