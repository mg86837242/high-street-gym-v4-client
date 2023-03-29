import { API_URL } from '../data/constants';
import {
  lineOneSchema,
  lineTwoSchema,
  suburbSchema,
  postcodeSchema,
  stateSchema,
  countrySchema,
} from '../schemas/addresses';
import fetchJSON from '../utils/fetchJSON';

export async function updateAddressByAdminId(values) {
  const { adminId, ...updates } = values;
  const { lineOne, lineTwo, suburb, postcode, state, country } = updates;
  // #region validation
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
  // NB Even if `lineTwo` is null, `WHERE lineTwo = null` returns false i/o true in which case `getAddressesByDetails`
  //  in the model won't identify a duplicate row, thus the conversion of falsy `lineTwo` to empty string
  // #endregion
  updates.lineTwo ||= '';

  const json = await fetchJSON(`${API_URL}/addresses/adminid/${adminId}`, 'patch', updates);
  return { ...json, _action: 'updateAddressByAdminId' };
}

export async function updateAddressByTrainerId(values) {
  const { trainerId, ...updates } = values;
  const { lineOne, lineTwo, suburb, postcode, state, country } = updates;
  // #region validation
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
  // #endregion
  updates.lineTwo ||= '';

  const json = await fetchJSON(`${API_URL}/addresses/trainerid/${trainerId}`, 'patch', updates);
  return { ...json, _action: 'updateAddressByTrainerId' };
}

export async function updateAddressByMemberId(values) {
  const { memberId, ...updates } = values;
  const { lineOne, lineTwo, suburb, postcode, state, country } = updates;
  // #region validation
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
  // #endregion
  updates.lineTwo ||= '';

  const json = await fetchJSON(`${API_URL}/addresses/memberid/${memberId}`, 'patch', updates);
  return { ...json, _action: 'updateAddressByMemberId' };
}
