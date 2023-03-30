import { redirect } from 'react-router-dom';
import { API_URL } from '../data/constants';
import fetchJSON from '../utils/fetchJSON';
import fetchRes from '../utils/fetchRes';
import getSubmitData from '../utils/getSubmitData';

export async function getAllActivities() {
  const response = await fetchRes(`${API_URL}/activities`);
  return response;
}

export async function getActivityById({ params }) {
  const response = await fetchRes(`${API_URL}/activities/id/${params.id}`);
  return response;
}

export async function createActivity() {
  const creations = { name: 'New Activity', durationMinutes: 45 };
  const json = await fetchJSON(`${API_URL}/activities`, 'post', creations);
  return redirect(`/admin/activities/id/${json.insertId}/edit`);
}

export async function updateActivityById({ params, request }) {
  const updates = await getSubmitData(request);
  await fetchRes(`${API_URL}/activities/id/${params.id}`, 'patch', updates);
  return redirect(`/admin/activities`);
}

export async function deleteActivityById({ params }) {
  await fetchRes(`${API_URL}/activities/id/${params.id}`, 'delete');
  return redirect(`/admin/activities`);
}
