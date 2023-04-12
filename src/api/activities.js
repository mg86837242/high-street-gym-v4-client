import { redirect } from 'react-router-dom';
import { API_URL } from '../data/constants';
import fetchResp from '../helpers/fetchResp';
import fetchJSON from '../helpers/fetchJSON';
import fetchRaw from '../helpers/fetchRaw';
import getSubmittedData from '../helpers/getSubmittedData';
import defaultNewActivity from '../data/defaultNewActivity';

export async function getAllActivities() {
  const response = await fetchResp.get(`${API_URL}/activities`);
  return response;
}

export async function getActivityById({ params }) {
  const response = await fetchResp.get(`${API_URL}/activities/${params.id}`);
  return response;
}

export async function createActivity() {
  const creations = defaultNewActivity;
  const json = await fetchJSON.post(`${API_URL}/activities`, creations);
  return redirect(`../${json.insertId}/edit`);
}

export async function createActivityByXML({ request }) {
  const formData = await request.formData();
  const response = await fetchRaw.postFile(`${API_URL}/activities/upload/xml`, formData);
  if (!response.ok) {
    return redirect(`..`);
  }
  return redirect(`..`);
}

export async function updateActivityById({ params, request }) {
  const updates = await getSubmittedData(request);
  await fetchResp.patch(`${API_URL}/activities/${params.id}`, updates);
  return redirect(`..`);
}

export async function deleteActivityById({ params }) {
  await fetchResp.delete(`${API_URL}/activities/${params.id}`);
  return redirect(`..`);
}
