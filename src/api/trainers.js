import fetchRaw from '../helpers/fetchRaw';
import getErrorMsg from '../helpers/getErrorMsg';

export default async function updateTrainerById(values) {
  const { _action, id, ...updates } = values;
  const response = await fetchRaw.patch(`${__API_URL__}/trainers//${id}`, updates);
  const json = await response.json();
  // Special error handling to let 409 pass to NOT trigger error boundary, since it's already handled in the component
  if (response?.status === 409) {
    return json;
  }
  if (response?.status !== 200) {
    const message = getErrorMsg(json);
    throw new Response(message);
  }
  return { ...json, _action };
}
