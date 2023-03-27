import { API_URL } from '../data/constants';
import fetchRes from '../utils/fetchRes';

export async function getAllEmails() {
  const response = await fetchRes(`${API_URL}/logins/all-emails`);
  return response;
}

export async function getUserWithAllDetailsAndAllEmails() {
  const accessKey = localStorage.getItem('accessKey');
  const response = await fetchRes(`${API_URL}/users/user-with-all-details-and-all-emails/by-key/${accessKey}`);
  return response;
}
