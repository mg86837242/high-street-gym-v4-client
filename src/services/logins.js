import { API_URL } from '../data/constants';
import fetchRes from '../utils/fetchRes';

export async function getAllLogins() {
  return null;
}

export async function getAllLoginEmails() {
  const response = await fetchRes(`${API_URL}/logins/emails`);
  return response;
}
