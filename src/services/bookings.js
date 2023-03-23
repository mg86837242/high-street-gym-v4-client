import { redirect } from 'react-router-dom';
import { API_URL } from '../data/constants';
import fetchRes from '../utils/fetchRes';
import fetchJSON from '../utils/fetchJSON';
import get from '../utils/get';

export async function getAllBookings() {
  const response = await fetchRes(`${API_URL}/bookings`, 'get');
  return response;
}

export async function getAllBookingOptions() {
  const response = await fetchRes(`${API_URL}/bookings/options-only`, 'get');
  return response;
}

export async function getBookingsByDate({ params }) {
  const response = await get(`${API_URL}/bookings/booking-with-details-by-date/${params.date}`);
  // Special error handling to let 404 pass
  if (response?.status !== 200 && response?.status !== 404) {
    const json = await response.json();
    const message = `${json.status} ${typeof json.message === 'string' ? json.message : json.message.map((issue) => issue.message).join('; ')}`;
    throw new Response(message);
  }
  return response;
}

export async function getBookingById({ params }) {
  const response = await fetchRes(`${API_URL}/bookings/booking-with-details-by-id/${params.id}`, 'get');
  return response;
}

export async function getBookingAndOptionsById({ params }) {
  // Building customized API endpoint (1) is much simpler to code loader, (2) has one less nesting layer/level
  //  to DA loader data, e.g., in `BookingEdit.jsx`, `bookingJSON:` can be rid of – easier to code component, same
  //  applies to breadcrumbs/`useMatches`.
  const response = await fetchRes(`${API_URL}/bookings/booking-with-options-by-id/${params.id}`);
  return response;
  // Alternatively, fetch multiple endpoints with `Promise.all([])`, example: https://stackoverflow.com/questions/74719956/can-i-handle-multiple-loaders-for-a-single-url-in-remix
}

export async function createBooking({ request }) {
  const formData = await request.formData();
  const creations = Object.fromEntries(formData);
  const json = await fetchJSON(`${API_URL}/bookings`, 'post', creations);
  return redirect(`/bookings/${creations.date}/id/${json.insertId}`);
}

export async function updateBookingById({ params, request }) {
  // "`<Form>` prevents(hijacks) the browser from sending the request to the server and sends it to your route
  //  `action` instead", see: https://reactrouter.com/en/main/start/tutorial#creating-contacts
  // NB "If the value is neither a `Blob` nor a `File`, the value is converted (by `Request.formData()`) to a
  //  STRING", see: https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects =>
  //  Observation: `{typeof a.id}` in `BookingEdit.jsx` shows 'number', while `console.log(formData)` here
  //  shows `string`.
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await fetchRes(`${API_URL}/bookings/${params.id}`, 'patch', updates);
  return redirect(`/bookings/${updates.date}/id/${params.id}`);
}

export async function deleteBookingById({ params }) {
  await fetchRes(`${API_URL}/bookings/${params.id}`, 'delete');
  return redirect(`/bookings/${params.date}`);
}
