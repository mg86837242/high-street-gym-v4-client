import fetchJSON from '../helpers/fetchJSON';

export async function updateAddressByAdminId(values) {
  const { _action, adminId, ...updates } = values;
  const json = await fetchJSON.patch(`${__API_URL__}/addresses/admins/${adminId}`, updates);
  return { ...json, _action };
}

export async function updateAddressByTrainerId(values) {
  const { _action, trainerId, ...updates } = values;
  const json = await fetchJSON.patch(`${__API_URL__}/addresses/trainers/${trainerId}`, updates);
  return { ...json, _action };
}

export async function updateAddressByMemberId(values) {
  const { _action, memberId, ...updates } = values;
  const json = await fetchJSON.patch(`${__API_URL__}/addresses/members/${memberId}`, updates);
  return { ...json, _action };
}
