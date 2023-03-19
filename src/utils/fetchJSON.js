// Use case: (1) fetch within loader and action, (2) `useEffect` in `<AuthProvider>`
export default async function fetchJSON(url, method, body) {
  let requestOptions;
  switch (method) {
    case 'post':
      requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      };
      break;
    case 'get':
      requestOptions = {
        method: 'GET',
      };
      break;
    case 'patch':
      requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      };
      break;
    case 'delete':
      requestOptions = {
        method: 'DELETE',
      };
      break;
    default:
      requestOptions = {
        method: 'GET',
      };
  }

  const response = await fetch(url, requestOptions);
  const json = await response.json();
  if (!response?.ok) {
    const message = `${json.status} ${
      typeof json.message === 'string' ? json.message : json.message.map((issue) => issue.message).join('; ')
    }`;
    throw new Response(message);
  }

  return json;
}
