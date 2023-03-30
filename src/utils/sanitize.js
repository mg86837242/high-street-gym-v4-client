export default function sanitize(obj) {
  const sanitizedObj = Object.keys(obj).reduce(
    (acc, cur) => (obj[cur] === '' ? (acc[cur] = null) : (acc[cur] = obj[cur]), acc),
    {}
  );
  return sanitizedObj;
}
