export function convertEmptyStrToNull(obj) {
  return Object.keys(obj).reduce((acc, cv) => {
    if (typeof obj[cv] === 'string') {
      const trimmed = obj[cv].trim();
      if (trimmed === '') {
        acc[cv] = null;
      } else {
        acc[cv] = trimmed;
      }
    } else {
      acc[cv] = obj[cv];
    }
    return acc;
  }, {});
}

// NB If `lineTwo` input is null, `WHERE lineTwo = null` returns false i/o true so that `getAddressesByDetails()`
//  in the model won't recognize the identical addr row, thus the type conversion of falsy `lineTwo` to empty string
export function convertNullToEmptyStr(obj) {
  return Object.keys(obj).reduce((acc, cv) => {
    if (typeof obj[cv] === 'string') {
      const trimmed = obj[cv].trim();
      acc[cv] = trimmed;
    } else if (obj[cv] === null) {
      acc[cv] = '';
    } else {
      acc[cv] = obj[cv];
    }
    return acc;
  }, {});
}
