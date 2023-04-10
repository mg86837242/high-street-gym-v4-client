export function convertEmptyStrToNull(obj) {
  return Object.keys(obj).reduce((acc, cur) => {
    if (typeof obj[cur] === 'string') {
      const trimmed = obj[cur].trim();
      if (trimmed === '') {
        acc[cur] = null;
      } else {
        acc[cur] = trimmed;
      }
    } else {
      acc[cur] = obj[cur];
    }
    return acc;
  }, {});
}

// NB If `lineTwo` input is null, `WHERE lineTwo = null` returns false i/o true so that `getAddressesByDetails()`
//  in the model won't identify a duplicate addr row, thus the type conversion of falsy `lineTwo` to empty string
export function convertNullToEmptyStr(obj) {
  return Object.keys(obj).reduce((acc, cur) => {
    if (typeof obj[cur] === 'string') {
      const trimmed = obj[cur].trim();
      acc[cur] = trimmed;
    } else if (obj[cur] === null) {
      acc[cur] = '';
    } else {
      acc[cur] = obj[cur];
    }
    return acc;
  }, {});
}
