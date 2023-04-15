import { API_URL } from '../data/constants';
import fetchResp from '../helpers/fetchResp';
import fetchRaw from '../helpers/fetchRaw';

// TODO Don't fetch all emails to the component to check 409, useActionData to handle it in the component, this applies to <EditAccount> & <SignupForm>
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
