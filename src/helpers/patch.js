// Use case: PATCH req with highly-specialized error handling
export default async function patch(url, body) {
  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include',
  };

  const response = await fetch(url, requestOptions);
  return response;
}
