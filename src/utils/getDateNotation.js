export default function getDateNotation(dateTime) {
  return `${dateTime.slice(8, 9) === '0' ? dateTime.slice(9, 10) : dateTime.slice(8, 10)}${getOrdinal(
    dateTime.slice(8, 10)
  )} ${monthNames[Number(dateTime.slice(5, 7))]} ${dateTime.slice(0, 4)}`;
}
