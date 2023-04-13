export function convertEmptyStrToNull(obj) {
  return Object.keys(obj).reduce((acc, curr) => {
    if (typeof obj[curr] === 'string') {
      const trimmed = obj[curr].trim();
      if (trimmed === '') {
        acc[curr] = null;
      } else {
        acc[curr] = trimmed;
      }
    } else {
      acc[curr] = obj[curr];
    }
    return acc;
  }, {});
}

// NB If `lineTwo` input is null, `WHERE lineTwo = null` returns false i/o true so that `getAddressesByDetails()`
//  in the model won't recognize the identical addr row, thus the type conversion of falsy `lineTwo` to empty string
export function convertNullToEmptyStr(obj) {
  return Object.keys(obj).reduce((acc, curr) => {
    if (typeof obj[curr] === 'string') {
      const trimmed = obj[curr].trim();
      acc[curr] = trimmed;
    } else if (obj[curr] === null) {
      acc[curr] = '';
    } else {
      acc[curr] = obj[curr];
    }
    return acc;
  }, {});
}
