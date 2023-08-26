export function getCredentials() {
  return window.localStorage.getItem('accessKey');
}

export function storeCredentials(credentials) {
  return window.localStorage.setItem('accessKey', credentials);
}

export function deleteCredentials() {
  return window.localStorage.removeItem('accessKey');
}
