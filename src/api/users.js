import fetchResp from '../helpers/fetchResp';
import fetchRaw from '../helpers/fetchRaw';

export async function getUserWithAllDetails() {
  const accessKey = localStorage.getItem('accessKey');
  const response = await fetchResp.get(`${__API_URL__}/users/keys/${accessKey}/detailed`);
  return response;
}

export async function getUserByKey(accessKey) {
  const response = await fetchRaw.get(`${__API_URL__}/users/keys/${accessKey}`);
  const json = await response.json();
  return json;
}

export async function login(email, password) {
  const response = await fetchRaw.post(`${__API_URL__}/users/login`, { email, password });
  const json = await response.json();
  return json;
}

export async function logout(accessKey) {
  const response = await fetchRaw.post(`${__API_URL__}/users/logout`, { accessKey });
  const json = await response.json();
  return json;
}
