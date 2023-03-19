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

// References:
// -- https://www.sitepoint.com/convert-numbers-to-ordinals-javascript/: Get ordinals
// -- https://flaviocopes.com/how-to-get-tomorrow-date-javascript/: Get tomorrow's date
