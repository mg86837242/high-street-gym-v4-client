// Use case: fetch and error handling in loader and action
import getErrorMsg from './getErrorMsg';

const fetchJSON = {
  async get(url) {
    const requestOptions = {
      method: 'GET',
      credentials: 'include',
    };
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    if (!response?.ok) {
      const message = getErrorMsg(json);
      throw new Response(message);
    }
    return json;
  },
  async post(url, body) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include',
    };
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    if (!response?.ok) {
      const message = getErrorMsg(json);
      throw new Response(message);
    }
    return json;
  },
  async patch(url, body) {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include',
    };
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    if (!response?.ok) {
      const message = getErrorMsg(json);
      throw new Response(message);
    }
    return json;
  },
  async delete(url) {
    const requestOptions = {
      method: 'DELETE',
      credentials: 'include',
    };
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    if (!response?.ok) {
      const message = getErrorMsg(json);
      throw new Response(message);
    }
    return json;
  },
};

export default fetchJSON;
