import { API_URL } from '../data/constants';
import fetchRes from '../helpers/fetchRes';
import get from '../helpers/get';
import post from '../helpers/post';

export async function getAllEmails() {
  const response = await fetchRes(`${API_URL}/users/all-emails`);
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
  const response = await post(`${API_URL}/users/login`, { email, password });
  const json = await response.json();
  return json;
}

export async function logout(accessKey) {
  const response = await post(`${API_URL}/users/logout`, { accessKey });
  const json = await response.json();
  return json;
}
