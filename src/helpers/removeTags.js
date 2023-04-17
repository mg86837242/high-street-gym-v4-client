export default function removeTags(str) {
  return str
    .replace(/<[^>]*>/g, '')
    .replace(/\n/g, ' ')
    .trim();
}

// References:
// -- https://stackoverflow.com/questions/11229831/regular-expression-to-remove-html-tags-from-a-string
