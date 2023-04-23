import { API_URL } from '../data/constants';
import fetchRaw from '../helpers/fetchRaw';

export default async function updateAdminById(values) {
  const { _action, id, ...updates } = values;
  const response = await fetchRaw.patch(`${API_URL}/admins/${id}`, updates);
  const json = await response.json();
  // Special error handling to let 409 pass to NOT trigger error boundary, since it's already handled in the component
  if (response.status === 409) {
    return json;
  }
  if (response.status !== 200) {
    const message = `${json.status} ${
      typeof json.message === 'string'
        ? json.message
        : json.message?.map(issue => `${issue.path[0]}: ${issue.message}`).join('; ')
    }`;
    throw new Response(message);
  }
  return { ...json, _action };
}
