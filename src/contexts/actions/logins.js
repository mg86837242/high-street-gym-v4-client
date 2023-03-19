import { redirect } from 'react-router-dom';
import { API_URL } from '../../data/constants';
import { emailSchema, passwordSchema, usernameSchema } from '../../data/schemas/logins';
import { firstNameSchema, lastNameSchema, phoneSchema, ageSchema, genderSchema } from '../../data/schemas/members';
import post from '../../utils/post';

export default async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  const username = formData.get('username');
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const phone = formData.get('phone');
  const age = formData.get('age');
  const gender = formData.get('gender');

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

  const creations = Object.fromEntries(formData);
  // NB Coerce these inputs' values from empty string to null, so (1) the backend and frontend can share a same
  //  zod schema – using `nullable()`, (2) it reflects that these attributes are nullable in DB; for whether to
  //  use NULL or undefined as the falsy value in the SQL query => "recommend only setting variables to null",
  //  see: https://stackoverflow.com/questions/5076944/what-is-the-difference-between-null-and-undefined-in-javascript/5076989#5076989
  creations.age = parseInt(age, 10) || null;
  creations.gender ||= null;
  const response = await post(`${API_URL}/members/signup`, creations);
  // Special error handling to let 409 pass
  if (response.status === 409) {
    return redirect('/signup');
  }
  if (response.status !== 200) {
    const json = response.json();
    const message = `${json.status} ${
      typeof json.message === 'string' ? json.message : json.message.map((issue) => issue.message).join('; ')
    }`;
    throw new Response(message);
  }
  return redirect('/login');
}
