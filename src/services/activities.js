import { API_URL } from '../data/constants';
import fetchRes from '../utils/fetchRes';

// FIX Decide if it's a default
export async function getAllActivities() {
  const response = await fetchRes(`${API_URL}/activities`);
  return response;
}
