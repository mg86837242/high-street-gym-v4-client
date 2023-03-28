// Use case: POST req with highly-specialized error handling
export default async function post(url, body) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include',
  };

  const response = await fetch(url, requestOptions);
  return response;
}
