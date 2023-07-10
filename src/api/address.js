import fetchJSON from '../helpers/fetchJSON';

export async function updateAddressByAdminId(values) {
  const { _action, adminId, ...updates } = values;
  const json = await fetchJSON.patch(`${__API_URL__}/addresses/by/admin_id/${adminId}`, updates);
  return { ...json, _action };
}

export async function updateAddressByTrainerId(values) {
  const { _action, trainerId, ...updates } = values;
  const json = await fetchJSON.patch(`${__API_URL__}/addresses/by/trainer_id/${trainerId}`, updates);
  return { ...json, _action };
}

export async function updateAddressByMemberId(values) {
  const { _action, memberId, ...updates } = values;
  const json = await fetchJSON.patch(`${__API_URL__}/addresses/by/member_id/${memberId}`, updates);
  return { ...json, _action };
}
