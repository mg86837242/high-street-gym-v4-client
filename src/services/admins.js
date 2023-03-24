import { redirect } from 'react-router-dom';
import { API_URL } from '../data/constants';
import { emailSchema, passwordSchema, usernameSchema } from './schemas/logins';
import { firstNameSchema, lastNameSchema, phoneSchema } from './schemas/members';
import patch from '../utils/patch';

export default async function updateAdminById(values) {
  const { id, ...updates } = values;
  const { email, password, firstName, lastName, username, phone } = updates;
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
  if (Object.keys(messages).length) {
    return messages;
  }
  // #endregion

  const response = await patch(`${API_URL}/admins/${id}`, updates);
  const json = await response.json();
  // Special error handling to let 409 pass to NOT trigger error boundary, since `useActionData` already handled validation
  if (response.status === 409) {
    return redirect('/profile/account');
  }
  if (response.status !== 200) {
    const message = `${json.status} ${typeof json.message === 'string' ? json.message : json.message[0].message}`;
    throw new Response(message);
  }
  return { ...json, _action: 'updateAdminById' };
}
