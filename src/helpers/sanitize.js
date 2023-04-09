export function convertEmptyStrToNull(obj) {
  return Object.keys(obj).reduce((acc, cur) => {
    obj[cur] === '' ? (acc[cur] = null) : (acc[cur] = obj[cur]);
    return acc;
  }, {});
}

// NB If `lineTwo` input is null, `WHERE lineTwo = null` returns false i/o true so that `getAddressesByDetails()`
//  in the model won't identify a duplicate addr row, thus the type conversion of falsy `lineTwo` to empty string
export function convertNullToEmptyStr(obj) {
  return Object.keys(obj).reduce((acc, cur) => {
    obj[cur] === null ? (acc[cur] = '') : (acc[cur] = obj[cur]);
    return acc;
  }, {});
}
