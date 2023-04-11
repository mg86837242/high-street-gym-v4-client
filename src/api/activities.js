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

export async function createActivityXML({ request }) {
  const formData = await request.formData();
  const xml = formData.get('xml');
  console.log(xml);
  // const json = await fetchJSON(`${API_URL}/activities/upload/xml`, 'post', xml);
  // TODO (1) api design (2) revisit this redirect
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
