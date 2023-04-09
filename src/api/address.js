import { API_URL } from '../data/constants';
import fetchJSON from '../helpers/fetchJSON';

export async function updateAddressByAdminId(values) {
  const { adminId, ...updates } = values;
  const json = await fetchJSON(`${API_URL}/addresses/adminid/${adminId}`, 'patch', updates);
  return { ...json, _action: 'updateAddressByAdminId' };
}

export async function updateAddressByTrainerId(values) {
  const { trainerId, ...updates } = values;
  const json = await fetchJSON(`${API_URL}/addresses/trainerid/${trainerId}`, 'patch', updates);
  return { ...json, _action: 'updateAddressByTrainerId' };
}

export async function updateAddressByMemberId(values) {
  const { memberId, ...updates } = values;
  const json = await fetchJSON(`${API_URL}/addresses/memberid/${memberId}`, 'patch', updates);
  return { ...json, _action: 'updateAddressByMemberId' };
}
