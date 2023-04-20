import { redirect } from 'react-router-dom';
import { API_URL } from '../data/constants';
import {
  emailSchema,
  passwordSchema,
  usernameSchema,
  firstNameSchema,
  lastNameSchema,
  phoneSchema,
  ageNoRHFSchema,
  genderSchema,
} from '../schemas';
import fetchResp from '../helpers/fetchResp';
import fetchRaw from '../helpers/fetchRaw';
import fetchJSON from '../helpers/fetchJSON';
import defaultNewMember from '../data/defaultNewMember';
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
  const formData = await request.formData();
  const creations = Object.fromEntries(formData);
  const { email, password, username, firstName, lastName, phone, age, gender } = creations;
  // #region validation
  const messages = {};
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
  if (!ageNoRHFSchema.safeParse(age).success) {
    messages.age = ageNoRHFSchema.safeParse(age).error.issues[0].message;
  }
  if (!genderSchema.safeParse(gender).success) {
    messages.gender = genderSchema.safeParse(gender).error.issues[0].message;
  }
  if (Object.keys(messages).length) {
    return messages;
  }
  // NB Convert these inputs' values from empty string to null, so (1) the backend and frontend can share almost the
  //  same zod schema that uses `nullable()`, (2) it reflects that these attributes are nullable in DB (for whether to
  //  use NULL or undefined as the falsy value in the SQL query => "recommend only setting variables to null",
  //  see: https://stackoverflow.com/questions/5076944/5076989#5076989), (3) there is only 1 exception to this rule,
  //  which is the `lineTwo` column in the `Addresses` table
  // #endregion
  // Type conversion for db constraint
  creations.age = parseInt(age, 10) || null;
  creations.gender ||= null;

  const response = await fetchRaw.post(`${API_URL}/members/signup`, creations);
  // Special error handling to let 409 pass to NOT trigger error boundary, since it's already handled the in component
  if (response.status === 409) {
    return redirect('/signup');
  }
  if (response.status !== 200) {
    const json = await response.json();
    const message = `${json.status} ${
      typeof json.message === 'string'
        ? json.message
        : json.message?.map(issue => `${issue.path[0]}: ${issue.message}`).join('; ')
    }`;
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
  if (response.status === 409) {
    return redirect('.');
  }
  if (response.status !== 200) {
    const message = `${json.status} ${
      typeof json.message === 'string'
        ? json.message
        : json.message?.map(issue => `${issue.path[0]}: ${issue.message}`).join('; ')
    }`;
    throw new Response(message);
  }
  return { ...json, _action };
}

export async function updateMemberWithDetailsById({ params, request }) {
  const updates = await getSubmittedData(request);
  const response = await fetchRaw.patch(`${API_URL}/members/${params.id}/detailed`, updates);
  const json = await response.json();
  // Special error handling to let 409 pass to NOT trigger error boundary, since it's already handled the in component
  if (response.status === 409) {
    return json;
  }
  if (response.status !== 200) {
    const message = `${json.status} ${
      typeof json.message === 'string'
        ? json.message
        : json.message?.map(issue => `${issue.path[0]}: ${issue.message}`).join('; ')
    }`;
    throw new Response(message);
  }
  return redirect(`..`);
}

export async function deleteMemberById({ params }) {
  await fetchResp.delete(`${API_URL}/members/${params.id}`);
  return redirect(`..`);
}
