// Use case: fetch and error handling in loader and action
const fetchJSON = {
  async get(url) {
    const requestOptions = {
      method: 'GET',
      credentials: 'include',
    };
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    if (!response?.ok) {
      const message = `${json.status} ${
        typeof json.message === 'string'
          ? json.message
          : json.message?.map(issue => `${issue.path[0]}: ${issue.message}`).join('; ')
      }`;
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
      const message = `${json.status} ${
        typeof json.message === 'string'
          ? json.message
          : json.message?.map(issue => `${issue.path[0]}: ${issue.message}`).join('; ')
      }`;
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
      const message = `${json.status} ${
        typeof json.message === 'string'
          ? json.message
          : json.message?.map(issue => `${issue.path[0]}: ${issue.message}`).join('; ')
      }`;
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
      const message = `${json.status} ${
        typeof json.message === 'string'
          ? json.message
          : json.message?.map(issue => `${issue.path[0]}: ${issue.message}`).join('; ')
      }`;
      throw new Response(message);
    }
    return json;
  },
};

export default fetchJSON;
