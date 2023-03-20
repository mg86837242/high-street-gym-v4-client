// Use case: POST req within `<AuthProvider>`
export default async function get(url) {
  const requestOptions = {
    method: 'GET',
    credentials: 'include',
  };

  const response = await fetch(url);
  return response;
}
