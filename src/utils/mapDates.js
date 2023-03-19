export const monthNames = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
};

export const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function getOrdinal(n) {
  let ord = 'th';

  if (n % 10 === 1 && n % 100 !== 11) {
    ord = 'st';
  } else if (n % 10 === 2 && n % 100 !== 12) {
    ord = 'nd';
  } else if (n % 10 === 3 && n % 100 !== 13) {
    ord = 'rd';
  }

  return ord;
}

export const today = new Date();

// TODO Make `tomorrow` only allows weekdays & date picker's range only allows weekdays (google "input type date only weekdays site:stackoverflow.com"
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
export const tomorrowStr = `${tomorrow.getFullYear()}-${
  tomorrow.getMonth() < 9 ? `0${tomorrow.getMonth() + 1}` : tomorrow.getMonth() + 1
}-${tomorrow.getDate() < 10 ? `0${tomorrow.getDate()}` : tomorrow.getDate()}`;

const threeWeeksLater = new Date(today);
threeWeeksLater.setDate(threeWeeksLater.getDate() + 21);
export const threeWeeksLaterStr = `${threeWeeksLater.getFullYear()}-${
  threeWeeksLater.getMonth() < 9 ? `0${threeWeeksLater.getMonth() + 1}` : threeWeeksLater.getMonth() + 1
}-${threeWeeksLater.getDate() < 10 ? `0${threeWeeksLater.getDate()}` : threeWeeksLater.getDate()}`;

// References:
// -- https://www.sitepoint.com/convert-numbers-to-ordinals-javascript/: Get ordinals
// -- https://flaviocopes.com/how-to-get-tomorrow-date-javascript/: Get tomorrow's date
