import { API_URL } from '../data/constants';
import fetchRes from '../utils/fetchRes';

export async function getAllActivities() {
  const response = await fetchRes(`${API_URL}/activities`);
  return response;
}

export async function getActivityById({ params }) {
  const response = await fetchRes(`${API_URL}/activities/id/${params.id}}`);
  return response;
}
