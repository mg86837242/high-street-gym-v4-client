import { redirect } from 'react-router-dom';
import { API_URL } from '../data/constants';
import {
  lineOneSchema,
  lineTwoSchema,
  suburbSchema,
  postcodeSchema,
  stateSchema,
  countrySchema,
} from '../data/schemas/addresses';
import patch from '../utils/patch';

export async function updateAddressByMemberId(memberIdAndUpdates) {
  let { memberId, ...updates } = memberIdAndUpdates;
  let { lineOne, lineTwo, suburb, postcode, state, country } = updates;
  // #region validation and type conversion
  const messages = {};
  if (!lineOneSchema.safeParse(lineOne).success) {
    messages.lineOne = lineOneSchema.safeParse(lineOne).error.issues[0].message;
  }
  if (!lineTwoSchema.safeParse(lineTwo).success) {
    messages.lineTwo = lineTwoSchema.safeParse(lineTwo).error.issues[0].message;
  }
  if (!suburbSchema.safeParse(suburb).success) {
    messages.suburb = suburbSchema.safeParse(suburb).error.issues[0].message;
  }
  if (!postcodeSchema.safeParse(postcode).success) {
    messages.postcode = postcodeSchema.safeParse(postcode).error.issues[0].message;
  }
  if (!stateSchema.safeParse(state).success) {
    messages.state = stateSchema.safeParse(state).error.issues[0].message;
  }
  if (!countrySchema.safeParse(country).success) {
    messages.country = countrySchema.safeParse(country).error.issues[0].message;
  }
  if (Object.keys(messages).length) {
    return messages;
  }
  // NB Even if `lineTwo` is null, `WHERE lineTwo = null` returns false i/o true and `getAddressesByDetails` in the
  //  model won't return any duplicate row, thus the conversion => Solution: convert falsy `lineTwo` to empty string
  lineTwo ||= '';
  // #endregion

  updates = { lineOne, lineTwo, suburb, postcode, state, country };
  const response = await patch(`${API_URL}/addresses/by-memberid/${memberId}`, updates);
  // Special error handling to let 409 pass to NOT trigger error boundary, since `useActionData` already handled validation
  if (response.status === 409) {
    return redirect('/profile/account');
  }
  if (response.status !== 200) {
    const json = await response.json();
    const message = `${json.status} ${typeof json.message === 'string' ? json.message : json.message[0].message}`;
    throw new Response(message);
  }
  const json = await response.json();
  return { ...json, _action: 'updateAddressByMemberId' };
}

export async function updateAddressByTrainerId(values) {
  return null;
}

export async function updateAddressByAdminId(values) {
  return null;
}
