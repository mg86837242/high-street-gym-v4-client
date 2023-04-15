export function convertEmptyStrToNull(obj) {
  return Object.keys(obj).reduce((acc, cv) => {
    cv !== 'lineTwo' && obj[cv] === '' ? (acc[cv] = null) : (acc[cv] = obj[cv]);
    return acc;
  }, {});
}

// NB If `lineTwo` input is null, `WHERE lineTwo = null` returns false i/o true so that `getAddressesByDetails()`
//  in the model won't recognize the identical addr row, thus the type conversion of falsy `lineTwo` to empty string
export function convertNullToEmptyStr(obj) {
  return Object.keys(obj).reduce((acc, cv) => {
    obj[cv] === null ? (acc[cv] = '') : (acc[cv] = obj[cv]);
    return acc;
  }, {});
}
