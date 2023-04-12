// Use case: fetch with customized error handling in loader and action
const fetchRaw = {
  async get(url) {
    const requestOptions = {
      method: 'GET',
      credentials: 'include',
    };
    const response = await fetch(url, requestOptions);
    return response;
  },
  async post(url, body) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include',
    };
    const response = await fetch(url, requestOptions);
    return response;
  },
  async postFile(url, body) {
    const requestOptions = {
      method: 'POST',
      body,
      credentials: 'include',
    };
    const response = await fetch(url, requestOptions);
    return response;
  },
  async patch(url, body) {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include',
    };
    const response = await fetch(url, requestOptions);
    return response;
  },
  async delete(url) {
    const requestOptions = {
      method: 'DELETE',
      credentials: 'include',
    };
    const response = await fetch(url, requestOptions);
    return response;
  },
};

export default fetchRaw;
