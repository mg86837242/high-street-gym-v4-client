import { redirect } from 'react-router-dom';
import { API_URL } from '../data/constants';
import patch from '../helpers/patch';

export default async function updateTrainerById(values) {
  const { id, ...updates } = values;
  const response = await patch(`${API_URL}/trainers//${id}`, updates);
  const json = await response.json();
  // Special error handling to let 409 pass to NOT trigger error boundary, since it's already handled in the component
  if (response.status === 409) {
    return redirect('.');
  }
  if (response.status !== 200) {
    const message = `${json.status} ${typeof json.message === 'string' ? json.message : json.message[0].message}`;
    throw new Response(message);
  }
  return { ...json, _action: 'updateTrainerById' };
}
