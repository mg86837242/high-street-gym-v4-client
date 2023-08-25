export function convertEmptyStrToNull(obj) {
  return Object.keys(obj).reduce((acc, cv) => {
    if (obj[cv] === '' && cv !== 'lineTwo') {
      acc[cv] = null;
    } else {
      acc[cv] = obj[cv];
    }
    return acc;
  }, {});
}

// NB If `lineTwo` input is null, `WHERE lineTwo = null` returns false i/o true so that `getIdenticalAddressesByDetails
//  ()` in the model won't recognize the identical addr row, thus the type conversion of falsy `lineTwo` to empty string
export function convertNullToEmptyStr(obj) {
  return Object.keys(obj).reduce((acc, cv) => {
    if (obj[cv] === null) {
      acc[cv] = '';
    } else {
      acc[cv] = obj[cv];
    }
    return acc;
  }, {});
}
