import { redirect } from 'react-router-dom';

import API_URL from '../data/constants';
import defaultNewBlog from '../data/defaultNewBlog';
import fetchJSON from '../helpers/fetchJSON';
import fetchResp from '../helpers/fetchResp';
import getSubmittedData from '../helpers/getSubmittedData';

export async function getAllBlogs() {
  const response = await fetchResp.get(`${API_URL}/blogs`);
  return response;
}

export async function getBlogById({ params }) {
  const response = await fetchResp.get(`${API_URL}/blogs/${params.id}`);
  return response;
}

export async function createBlog({ request }) {
  const formData = await request.formData();
  const creations = defaultNewBlog(parseInt(formData.get('loginId'), 10));
  const json = await fetchJSON.post(`${API_URL}/blogs`, creations);
  return redirect(`../${json.insertId}/edit`);
}

export async function updateBlogById({ params, request }) {
  const updates = await getSubmittedData(request);
  await fetchResp.patch(`${API_URL}/blogs/${params.id}`, updates);
  return redirect(`..`);
}

export async function deleteBlogById({ params }) {
  await fetchResp.delete(`${API_URL}/blogs/${params.id}`);
  return redirect(`../..`);
}
