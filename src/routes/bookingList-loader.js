import { API_URL } from '../data/constants';

// NB Must be named export, o/w dynamic import won't work in the router
export default async function loader({ params }) {
  const response = await fetch(`${API_URL}/bookings/by-date/${params.date}`, { credentials: 'include' });
  // Special error handling to let 404 pass
  if (response?.status !== 200 && response?.status !== 404) {
    const json = await response.json();
    const message = `${json.status} ${
      typeof json.message === 'string' ? json.message : json.message.map((issue) => issue.message).join('; ')
    }`;
    throw new Response(message);
  }
  return response;
}
