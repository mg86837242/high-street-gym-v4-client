export default function sanitize(obj) {
  return Object.keys(obj).reduce((acc, cur) => {
    obj[cur] === '' ? (acc[cur] = null) : (acc[cur] = obj[cur]);
    return acc;
  }, {});
}
