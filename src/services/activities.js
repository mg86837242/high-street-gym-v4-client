import { redirect } from 'react-router-dom';
import { API_URL } from '../data/constants';
import fetchRes from '../utils/fetchRes';

export async function getAllActivities() {
  const response = await fetchRes(`${API_URL}/activities`);
  return response;
}

export async function getActivityById({ params }) {
  const response = await fetchRes(`${API_URL}/activities/id/${params.id}`);
  return response;
}

export async function updateActivityById({ params, request }) {
  const formData = await request.formData();
  const updates = JSON.parse(formData.get('body'));
  await fetchRes(`${API_URL}/activities/id/${params.id}`, 'patch', updates);
  return redirect(`/admin/activities/id/${params.id}/edit`);
}

export async function deleteActivityById({ params }) {
  await fetchRes(`${API_URL}/activities/id/${params.id}`, 'delete');
  return redirect(`/admin/activities`);
}
