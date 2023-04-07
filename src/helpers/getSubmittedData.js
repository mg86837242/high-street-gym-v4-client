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
// -- https://github.com/react-hook-form/react-hook-form/issues/656#issuecomment-680674438: strip out all values with
//  empty strings with lodash util
// -- https://stackoverflow.com/questions/22783108/convert-js-object-to-form-data (source: google "lodash convert
//  specific object values") => from which how to only convert values with empty strings within an obj is extrapolated

// NB Alternatively, submit a `FormData` obj to the route action, which implies conversion from plain obj
//  (`data` returned by React Hook Form's `handleSubmit`) to `FormData` obj, which entails a util like this:
//  https://stackoverflow.com/questions/22783108/convert-js-object-to-form-data; this method has a huge
//  downside since `FormData` can only hold strings in most cases, which implies extra type conversions from
//  empty string to null in the route action in order to bypass the db constraint (i.e., db only accepts null)
//
// Example in `<AdminEditActivity>` component:
// const formData = getFormData(data);
// submit(formData, { method: 'post' });
