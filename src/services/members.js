import { redirect } from 'react-router-dom';
import { API_URL } from '../data/constants';
import { emailSchema, passwordSchema, usernameSchema } from './schemas/logins';
import { firstNameSchema, lastNameSchema, phoneSchema, ageSchema, genderSchema } from './schemas/members';
import fetchJSON from '../utils/fetchJSON';
import post from '../utils/post';
import patch from '../utils/patch';

export async function getMemberWithAllDetailsById(memberId) {
  const json = await fetchJSON(`${API_URL}/members/member-with-all-details-by-id/${memberId}`);
  return json;
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
  // NB Age input with `type="number"` will convert invalid input (such as letters) value to empty string, which will
  ///  be let pass by zod's `nullable()` rather than caught by `regex(/^\d*$/)`, i.e., age input type should be of
  //  `type="text"`
  if (!ageSchema.safeParse(age).success) {
    messages.age = ageSchema.safeParse(age).error.issues[0].message;
  }
  if (!genderSchema.safeParse(gender).success) {
    messages.gender = genderSchema.safeParse(gender).error.issues[0].message;
  }
  if (Object.keys(messages).length) {
    return messages;
  }
  // NB Convert these inputs' values from empty string to null, so (1) the backend and frontend can share a same
  //  zod schema – using `nullable()`, (2) it reflects that these attributes are nullable in DB; for whether to
  //  use NULL or undefined as the falsy value in the SQL query => "recommend only setting variables to null",
  //  see: https://stackoverflow.com/questions/5076944/what-is-the-difference-between-null-and-undefined-in-javascript/5076989#5076989,
  // (3) there is an only 1 exception, which is `lineTwo` in `Addresses` table
  // #endregion
  creations.age = parseInt(age, 10) || null;
  creations.gender = gender || null;

  const response = await post(`${API_URL}/members/signup`, creations);
  // Special error handling to let 409 pass to NOT trigger error boundary, since `useActionData` already handled validation
  if (response.status === 409) {
    return redirect('/signup');
  }
  if (response.status !== 200) {
    const json = await response.json();
    const message = `${json.status} ${typeof json.message === 'string' ? json.message : json.message[0].message}`;
    throw new Response(message);
  }
  return redirect('/login');
}

export async function updateMemberById(values) {
  const { id, ...updates } = values;
  const { email, password, firstName, lastName, username, phone, age, gender } = updates;
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
  if (!ageSchema.safeParse(age).success) {
    messages.age = ageSchema.safeParse(age).error.issues[0].message;
  }
  if (!genderSchema.safeParse(gender).success) {
    messages.gender = genderSchema.safeParse(gender).error.issues[0].message;
  }
  if (Object.keys(messages).length) {
    return messages;
  }
  // #endregion
  updates.age = parseInt(age, 10) || null;
  updates.gender ||= null;

  const response = await patch(`${API_URL}/members/${id}`, updates);
  const json = await response.json();
  // Special error handling to let 409 pass to NOT trigger error boundary, since `useActionData` already handled validation
  if (response.status === 409) {
    return redirect('/profile/account');
  }
  if (response.status !== 200) {
    const message = `${json.status} ${typeof json.message === 'string' ? json.message : json.message[0].message}`;
    throw new Response(message);
  }
  return { ...json, _action: 'updateMemberById' };
}
