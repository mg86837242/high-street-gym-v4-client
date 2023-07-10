import { redirect } from 'react-router-dom';
import { emailSchema, passwordSchema, usernameSchema, firstNameSchema, lastNameSchema, phoneSchema } from '../schemas';
import fetchResp from '../helpers/fetchResp';
import fetchRaw from '../helpers/fetchRaw';
import fetchJSON from '../helpers/fetchJSON';
import getErrorMsg from '../helpers/getErrorMsg';
import getSubmittedData from '../helpers/getSubmittedData';
import defaultNewMember from '../data/defaultNewMember';

export async function getAllMembersWithDetails() {
  const response = await fetchResp.get(`${__API_URL__}/members/detailed`);
  return response;
}

export async function getMemberWithDetailsById({ params }) {
  const response = await fetchResp.get(`${__API_URL__}/members/${params.id}/detailed`);
  return response;
}

// FIXME Rewrite <Signup> page by using RHF and use action data to check 409
export async function signupMembers({ request }) {
  const formData = await request.formData();
  const {
    email,
    password,
    username,
    firstName,
    lastName,
    phone,
    age = null,
    gender = null,
  } = Object.fromEntries(formData);
  // #region validation
  const errors = {};
  if (!emailSchema.safeParse(email).success) {
    messages.email = emailSchema.safeParse(email).error.issues[0].message;
  }
  if (!passwordSchema.safeParse(password).success) {
    messages.password = passwordSchema.safeParse(password).error.issues[0].message;
  }
  if (!usernameSchema.safeParse(username).success) {
    messages.username = usernameSchema.safeParse(username).error.issues[0].message;
  }
  if (!firstNameSchema.safeParse(firstName).success) {
    messages.firstName = firstNameSchema.safeParse(firstName).error.issues[0].message;
  }
  if (!lastNameSchema.safeParse(lastName).success) {
    messages.lastName = lastNameSchema.safeParse(lastName).error.issues[0].message;
  }
  if (!phoneSchema.safeParse(phone).success) {
    messages.phone = phoneSchema.safeParse(phone).error.issues[0].message;
  }
  if (Object.keys(messages).length) {
    return errors;
  }

  const creations = { email, password, username, firstName, lastName, phone, age, gender };
  const response = await fetchRaw.post(`${__API_URL__}/members/signup`, creations);
  // Special error handling to let 409 pass to NOT trigger error boundary, since it's already handled the in component
  if (response?.status === 409) {
    const json = await response.json();
    return json;
  }
  if (response?.status !== 200) {
    const json = await response.json();
    const message = getErrorMsg(json);
    throw new Response(message);
  }
  return redirect('/login');
}

export async function createMember() {
  const creations = await defaultNewMember();
  const json = await fetchJSON.post(`${__API_URL__}/members/detailed`, creations);
  return redirect(`../${json.insertId}/edit`);
}

export async function createMemberByXML({ request }) {
  const formData = await request.formData();
  await fetchResp.postFile(`${__API_URL__}/members/upload/xml`, formData);
  return redirect(`..`);
}

export async function updateMemberById(values) {
  const { _action, id, ...updates } = values;
  const response = await fetchRaw.patch(`${__API_URL__}/members/${id}`, updates);
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
  const response = await fetchRaw.patch(`${__API_URL__}/members/${params.id}/detailed`, updates);
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
  await fetchResp.delete(`${__API_URL__}/members/${params.id}`);
  return redirect(`..`);
}
