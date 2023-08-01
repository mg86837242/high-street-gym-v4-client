export const today = new Date();

// TODO Use react-datepicker => tried it, UI works as intended, but couldn't serialize the form data, future test is needed
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
