import { API_URL } from '../data/constants';
import fetchRes from '../utils/fetchRes';

export async function getAllBookings() {
  const response = await fetchRes(`${API_URL}/bookings`, 'get');
  return response;
}

export async function getBookingByDate(date) {
  const response = await fetchRes(`${API_URL}/bookings/by-date/${date}`, 'get');
  return response;
}

export async function getBookingById(id) {
  const response = await fetchRes(`${API_URL}/bookings/by-id/${id}`, 'get');
  return response;
}

export async function getBookingAndOptionsById(id) {
  const response = await fetchRes(`${API_URL}/bookings/booking-and-options-by-id/${id}`, 'get');
  return response;
}

export async function getBookingOptionsOnly() {
  const response = await fetchRes(`${API_URL}/bookings/options-only`, 'get');
  return response;
}

export async function createBooking(creations) {
  const response = await fetchRes(`${API_URL}/bookings`, 'post', creations);
  return response;
}

export async function updateBooking(id, updates) {
  const response = await fetchRes(`${API_URL}/${id}`, 'patch', updates);
  return response;
}

export async function deleteBooking(id) {
  const response = await fetchRes(`${API_URL}/${id}`, 'delete');
  return response;
}
