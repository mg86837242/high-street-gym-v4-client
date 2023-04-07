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

export function getDateNotation(dateTime) {
  return dateTime
    ? `
      ${dateTime.slice(8, 9) === '0' ? dateTime.slice(9, 10) : dateTime.slice(8, 10)}
      ${monthNames[Number(dateTime.slice(5, 7))]}
      ${dateTime.slice(0, 4)}
      `
    : '';
}
