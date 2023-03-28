import { API_URL } from '../data/constants';
import fetchRes from '../utils/fetchRes';
import get from '../utils/get';
import post from '../utils/post';

export async function getAllEmails() {
  const response = await fetchRes(`${API_URL}/logins/all-emails`);
  return response;
}

export async function getUserWithAllDetailsAndAllEmails() {
  const accessKey = localStorage.getItem('accessKey');
  const response = await fetchRes(`${API_URL}/users/user-with-all-details-and-all-emails/key/${accessKey}`);
  return response;
}

export async function getUserByKey(accessKey) {
  const response = await get(`${API_URL}/users/key/${accessKey}`);
  const json = await response.json();
  return json;
}

export async function login(email, password) {
  const response = await post(`${API_URL}/login`, { email, password });
  const json = await response.json();
  return json;
}

export async function logout(accessKey) {
  const response = await post(`${API_URL}/logout`, { accessKey });
  const json = await response.json();
  return json;
}
