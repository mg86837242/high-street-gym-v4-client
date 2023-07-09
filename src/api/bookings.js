import { redirect } from 'react-router-dom';
import API_URL from '../data/constants';
import fetchResp from '../helpers/fetchResp';
import fetchRaw from '../helpers/fetchRaw';
import fetchJSON from '../helpers/fetchJSON';
import getErrorMsg from '../helpers/getErrorMsg';

export async function getAllBookings() {
  const response = await fetchResp.get(`${API_URL}/bookings`);
  return response;
}

export async function getAllBookingOptions() {
  const response = await fetchResp.get(`${API_URL}/bookings/options`);
  return response;
}

export async function getBookingsByDate({ params }) {
  const response = await fetchRaw.get(`${API_URL}/bookings/by/date/${params.date}`);
  // Special error handling to let 404 pass
  if (response?.status !== 200 && response?.status !== 404) {
    const json = await response.json();
    const message = getErrorMsg(json);
    throw new Response(message);
  }
  return response;
}

export async function getBookingById({ params }) {
  const response = await fetchResp.get(`${API_URL}/bookings/${params.id}`);
  return response;
}

export async function getBookingWithOptionsById({ params }) {
  // Prefer to build customized API endpoint (1) is much simpler to code loader, (2) has one less nesting layer/level
  //  to DA loader data, e.g., in `Bookings/Edit.jsx`, `bookingJSON:` can be rid of – easier to code component, same
  //  applies to breadcrumbs/`useMatches`.
  const response = await fetchResp.get(`${API_URL}/bookings/${params.id}/with_options`);
  return response;
  // Alternatively, fetch multiple endpoints with `Promise.all([])`, example: https://stackoverflow.com/questions/74719956
}

export async function createBooking({ request }) {
  const formData = await request.formData();
  const creations = Object.fromEntries(formData);
  const json = await fetchJSON.post(`${API_URL}/bookings`, creations);
  return redirect(`../${creations.date}/${json.insertId}`);
}

export async function updateBookingById({ params, request }) {
  // "`<Form>` prevents(hijacks) the browser from sending the request to the server and sends it to your route
  //  `action` instead", see: https://reactrouter.com/en/main/start/tutorial#creating-contacts
  // NB "If the value is neither a `Blob` nor a `File`, the value is converted (by `Request.formData()`) to a
  //  STRING", see: https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await fetchResp.patch(`${API_URL}/bookings/${params.id}`, updates);
  return redirect(`../../${updates.date}/${params.id}`);
}

export async function deleteBookingById({ params }) {
  await fetchResp.delete(`${API_URL}/bookings/${params.id}`);
  return redirect(`..`);
}
