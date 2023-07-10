import { redirect } from 'react-router-dom';
import fetchResp from '../helpers/fetchResp';
import fetchJSON from '../helpers/fetchJSON';
import defaultNewActivity from '../data/defaultNewActivity';
import getSubmittedData from '../helpers/getSubmittedData';

export async function getAllActivities() {
  const response = await fetchResp.get(`${__API_URL__}/activities`);
  return response;
}

export async function getActivityById({ params }) {
  const response = await fetchResp.get(`${__API_URL__}/activities/${params.id}`);
  return response;
}

export async function createActivity() {
  const creations = defaultNewActivity;
  const json = await fetchJSON.post(`${__API_URL__}/activities`, creations);
  return redirect(`../${json.insertId}/edit`);
}

export async function createActivityByXML({ request }) {
  const formData = await request.formData();
  await fetchResp.postFile(`${__API_URL__}/activities/upload/xml`, formData);
  return redirect(`..`);
}

export async function updateActivityById({ params, request }) {
  const updates = await getSubmittedData(request);
  await fetchResp.patch(`${__API_URL__}/activities/${params.id}`, updates);
  return redirect(`..`);
}

export async function deleteActivityById({ params }) {
  await fetchResp.delete(`${__API_URL__}/activities/${params.id}`);
  return redirect(`..`);
}
