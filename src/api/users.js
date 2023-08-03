import fetchResp from '../helpers/fetchResp';
import fetchRaw from '../helpers/fetchRaw';
import API_URL from '../data/constants';

export async function getUserWithAllDetails() {
  const accessKey = localStorage.getItem('accessKey');
  const response = await fetchResp.get(`${API_URL}/users/keys/${accessKey}/detailed`);
  return response;
}

export async function getUserByKey(accessKey) {
  const response = await fetchRaw.get(`${API_URL}/users/keys/${accessKey}`);
  const json = await response.json();
  return json;
}

export async function login(email, password) {
  const response = await fetchRaw.post(`${API_URL}/users/login`, { email, password });
  const json = await response.json();
  return json;
}

export async function logout(accessKey) {
  const response = await fetchRaw.post(`${API_URL}/users/logout`, { accessKey });
  const json = await response.json();
  return json;
}
