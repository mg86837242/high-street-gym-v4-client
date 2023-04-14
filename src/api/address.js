import { API_URL } from '../data/constants';
import fetchJSON from '../helpers/fetchJSON';

export async function updateAddressByAdminId(values) {
  const { adminId, ...updates } = values;
  const json = await fetchJSON.patch(`${API_URL}/addresses/by/admin_id/${adminId}`, updates);
  return { ...json, _action: 'updateAddressByAdminId' };
}

export async function updateAddressByTrainerId(values) {
  const { trainerId, ...updates } = values;
  const json = await fetchJSON.patch(`${API_URL}/addresses/by/trainer_id/${trainerId}`, updates);
  return { ...json, _action: 'updateAddressByTrainerId' };
}

export async function updateAddressByMemberId(values) {
  const { memberId, ...updates } = values;
  const json = await fetchJSON.patch(`${API_URL}/addresses/by/member_id/${memberId}`, updates);
  return { ...json, _action: 'updateAddressByMemberId' };
}
