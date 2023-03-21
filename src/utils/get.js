// Use case: GET req with customized error handling, esp.  in `<AppProviders>`
export default async function get(url) {
  const requestOptions = {
    method: 'GET',
    credentials: 'include',
  };

  const response = await fetch(url, requestOptions);
  return response;
}
