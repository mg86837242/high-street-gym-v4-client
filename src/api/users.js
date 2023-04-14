import { API_URL } from '../data/constants';
import fetchResp from '../helpers/fetchResp';
import fetchRaw from '../helpers/fetchRaw';

// TODO Move the logic of checking identical email to the backend, thru a func in model, and handle it by special error handling of letting 409 pass
export async function getAllEmails() {
  const response = await fetchResp.get(`${API_URL}/users/all_emails`);
  return response;
}

export async function getUserWithAllDetailsAndAllEmails() {
  const accessKey = localStorage.getItem('accessKey');
  const response = await fetchResp.get(`${API_URL}/users/by_key/${accessKey}/detailed/with_all_emails`);
  return response;
}

export async function getUserByKey(accessKey) {
  const response = await fetchRaw.get(`${API_URL}/users/by_key/${accessKey}`);
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
