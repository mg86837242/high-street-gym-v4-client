// Use case: POST req within `<AuthProvider>` and `useAuth` custom Hook
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
