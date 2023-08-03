import fetchJSON from '../helpers/fetchJSON';
import API_URL from '../data/constants';

export async function updateAddressByAdminId(values) {
  const { _action, adminId, ...updates } = values;
  const json = await fetchJSON.patch(`${API_URL}/addresses/admins/${adminId}`, updates);
  return { ...json, _action };
}

export async function updateAddressByTrainerId(values) {
  const { _action, trainerId, ...updates } = values;
  const json = await fetchJSON.patch(`${API_URL}/addresses/trainers/${trainerId}`, updates);
  return { ...json, _action };
}

export async function updateAddressByMemberId(values) {
  const { _action, memberId, ...updates } = values;
  const json = await fetchJSON.patch(`${API_URL}/addresses/members/${memberId}`, updates);
  return { ...json, _action };
}
