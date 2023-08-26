import { redirect } from 'react-router-dom';

import API_URL from '../data/constants';
import defaultNewMember from '../data/defaultNewMember';
import fetchJSON from '../helpers/fetchJSON';
import fetchRaw from '../helpers/fetchRaw';
import fetchResp from '../helpers/fetchResp';
import getErrorMsg from '../helpers/getErrorMsg';
import getSubmittedData from '../helpers/getSubmittedData';

export async function getAllMembersWithDetails() {
  const response = await fetchResp.get(`${API_URL}/members/detailed`);
  return response;
}

export async function getMemberWithDetailsById({ params }) {
  const response = await fetchResp.get(`${API_URL}/members/${params.id}/detailed`);
  return response;
}

export async function signupMembers({ request }) {
  const creations = await getSubmittedData(request);
  const response = await fetchRaw.post(`${API_URL}/members/signup`, creations);
  const json = await response.json();
  // Special error handling to let 409 pass to NOT trigger error boundary, since it's already handled the in component
  if (response?.status === 409) {
    return json;
  }
  if (response?.status !== 200) {
    const message = getErrorMsg(json);
    throw new Response(message);
  }
  return redirect('/login');
}

export async function createMember() {
  const creations = await defaultNewMember();
  const json = await fetchJSON.post(`${API_URL}/members/detailed`, creations);
  return redirect(`../${json.insertId}/edit`);
}

export async function createMemberByXML({ request }) {
  const formData = await request.formData();
  await fetchResp.postFile(`${API_URL}/members/upload/xml`, formData);
  return redirect(`..`);
}

export async function updateMemberById(values) {
  const { _action, id, ...updates } = values;
  const response = await fetchRaw.patch(`${API_URL}/members/${id}`, updates);
  const json = await response.json();
  // Special error handling to let 409 pass to NOT trigger error boundary, since it's already handled the in component
  if (response?.status === 409) {
    return json;
  }
  if (response?.status !== 200) {
    const message = getErrorMsg(json);
    throw new Response(message);
  }
  return { ...json, _action };
}

export async function updateMemberWithDetailsById({ params, request }) {
  const updates = await getSubmittedData(request);
  const response = await fetchRaw.patch(`${API_URL}/members/${params.id}/detailed`, updates);
  const json = await response.json();
  // Special error handling to let 409 pass to NOT trigger error boundary, since it's already handled the in component
  if (response?.status === 409) {
    return json;
  }
  if (response?.status !== 200) {
    const message = getErrorMsg(json);
    throw new Response(message);
  }
  return redirect(`..`);
}

export async function deleteMemberById({ params }) {
  await fetchResp.delete(`${API_URL}/members/${params.id}`);
  return redirect(`..`);
}
