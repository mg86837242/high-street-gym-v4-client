export function getCredentials() {
  return localStorage.getItem('accessKey');
}

export function storeCredentials(credentials) {
  return localStorage.setItem('accessKey', credentials);
}

export function deleteCredentials() {
  return localStorage.removeItem('accessKey');
}
