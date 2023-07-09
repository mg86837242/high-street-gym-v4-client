import API_URL from '../data/constants';
import fetchJSON from '../helpers/fetchJSON';

export async function updateAddressByAdminId(values) {
  const { _action, adminId, ...updates } = values;
  const json = await fetchJSON.patch(`${API_URL}/addresses/by/admin_id/${adminId}`, updates);
  return { ...json, _action };
}

export async function updateAddressByTrainerId(values) {
  const { _action, trainerId, ...updates } = values;
  const json = await fetchJSON.patch(`${API_URL}/addresses/by/trainer_id/${trainerId}`, updates);
  return { ...json, _action };
}

export async function updateAddressByMemberId(values) {
  const { _action, memberId, ...updates } = values;
  const json = await fetchJSON.patch(`${API_URL}/addresses/by/member_id/${memberId}`, updates);
  return { ...json, _action };
}
