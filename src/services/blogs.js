import { redirect } from 'react-router-dom';
import { API_URL } from '../data/constants';
import fetchJSON from '../utils/fetchJSON';
import fetchRes from '../utils/fetchRes';
import getSubmittedData from '../utils/getSubmittedData';

export async function getAllBlogs() {
  const response = await fetchRes(`${API_URL}/blogs`);
  return response;
}
