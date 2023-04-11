import { redirect } from 'react-router-dom';
import { API_URL } from '../data/constants';
import fetchResp from '../helpers/fetchResp';
import fetchJSON from '../helpers/fetchJSON';
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
  const json = fetchJSON.postFile(`${API_URL}/activities/upload/xml`, formData);
  // FIX (1) This action might not be needed, if it can really work, revisit these redirects (2) branching actions to share the same 'new' route ?
  return redirect(`..`) || redirect(`../${json.insertId}/edit`);
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
