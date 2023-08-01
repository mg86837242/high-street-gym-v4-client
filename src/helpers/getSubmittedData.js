import { json } from 'react-router-dom';

export default async function getSubmittedData(request) {
  const formData = await request.formData();
  // It's expecting a json, however, agnostic-ally called `rawBody`
  const rawBody = formData.get('body');
  if (!rawBody) {
    throw json('Missing body', { status: 400 });
  }
  if (typeof rawBody !== 'string') {
    throw json('Malformed JSON body: expected string body', { status: 400 });
  }
  try {
    return JSON.parse(rawBody);
  } catch {
    throw json('Malformed JSON body: could not parse', { status: 400 });
  }
}

// References:
// -- https://github.com/remix-run/remix/discussions/3680 (source: google "remix action request json")

// Alternatively, submit a `FormData` obj to the route action, which implies conversion from plain obj (`data`
//  returned by React Hook Form's `handleSubmit`) to `FormData` obj, which entails a util like this:
//  https://stackoverflow.com/questions/22783108/convert-js-object-to-form-data; be careful if there's any need of
//  extra type conversions (e.g. empty string to null) in the route action in order to bypass the db constraint (i.e.,
//  db only accepts null but not accepts empty string as falsy value)
//
// For example, in <EditActivity> component:
//   const formData = getFormData(data);
//   submit(formData, { method: 'post' });
