import { redirect } from 'react-router-dom';
import { API_URL } from '../data/constants';
import fetchJSON from '../helpers/fetchJSON';
import fetchRes from '../helpers/fetchRes';
import getSubmittedData from '../helpers/getSubmittedData';
import defaultNewActivity from '../data/defaultNewActivity';

export async function getAllActivities() {
  const response = await fetchRes(`${API_URL}/activities`);
  return response;
}

export async function getActivityById({ params }) {
  const response = await fetchRes(`${API_URL}/activities/${params.id}`);
  return response;
}

export async function createActivity() {
  const creations = defaultNewActivity;
  const json = await fetchJSON(`${API_URL}/activities`, 'post', creations);
  return redirect(`../${json.insertId}/edit`);
}

export async function createActivityXML({ request }) {
  const formData = await request.formData();
  const xml = formData.get('xml');
  // const json = await fetchJSON(`${API_URL}/activities/upload/xml`, 'post', xml);
  // TODO Cleanup fetch() helpers, and write a customized fetch for this action
  return redirect(`..`) || redirect(`../${json.insertId}/edit`);
}

export async function updateActivityById({ params, request }) {
  const updates = await getSubmittedData(request);
  await fetchRes(`${API_URL}/activities/${params.id}`, 'patch', updates);
  return redirect(`..`);
}

export async function deleteActivityById({ params }) {
  await fetchRes(`${API_URL}/activities/${params.id}`, 'delete');
  return redirect(`..`);
}
