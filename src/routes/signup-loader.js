import { API_URL } from '../data/constants';
import fetchRes from '../utils/fetchRes';

// NB Must be named export, o/w dynamic import won't work in the router
export default async function loader() {
  const response = await fetchRes(`${API_URL}/logins/emails`);
  return response;
}
