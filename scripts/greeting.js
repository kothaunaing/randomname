import { today } from './main.js';

export function greetUser() {
  const hour = Number(today.format('h'));
  const amPm = today.format('a');
  let greeting;
  let time;

  if (amPm === 'am' && (hour >= 1 && hour <= 4)) {
    time = 'night';
  }
  else if (amPm == 'am' && (hour >= 5 && hour <= 11)) {
    time = 'morning';
  }
  else if (amPm === 'pm' && (hour >= 12 && hour <= 4)) {
    time = 'afternoon';
  }
  else if (amPm === 'pm' && (hour >= 5 && hour <= 8)) {
    time = 'evening';
  }
  else if (amPm === 'pm' && (hour >= 9 && hour <= 11)) {
    time = 'night';
  }
  else if (amPm === 'am' && hour === 12) {
    time = 'night';
  }
  else if (amPm === 'pm' && hour === 12) {
    time = 'afternoon';
  }

  return time;
}

export function updateTimeIcon() {
  let time = greetUser();
  let iconImage;

  if (time === 'night') {
    iconImage = 'night';
  }
  else if (time === 'evening') {
    iconImage = 'evening';
  }
  else if (time === 'afternoon') {
    iconImage = 'afternoon';
  }
  else {
    iconImage = 'day';
  }
  return iconImage;
}