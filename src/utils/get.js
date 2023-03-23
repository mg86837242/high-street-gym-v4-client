// Use case: GET req with highly-specialized error handling, esp. in `<AppProviders>`
export default async function get(url) {
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };

  const response = await fetch(url, requestOptions);
  return response;
}
