export default function getErrorMsg(json) {
  return `${json?.status} ${json?.message}`;
}
