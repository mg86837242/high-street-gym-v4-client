import { redirect } from 'react-router-dom';
import { API_URL } from '../data/constants';
import fetchJSON from '../__unusedFiles__/fetchJSONWithSwitch';
import fetchRes from '../helpers/fetchRes';
import getSubmittedData from '../helpers/getSubmittedData';
import defaultNewBlog from '../data/defaultNewBlog';

export async function getAllBlogs() {
  const response = await fetchRes(`${API_URL}/blogs`);
  return response;
}

export async function getBlogById({ params }) {
  const response = await fetchRes(`${API_URL}/blogs/${params.id}`);
  return response;
}

export async function createBlog({ request }) {
  const formData = await request.formData();
  const creations = { ...defaultNewBlog, loginId: parseInt(formData.get('loginId'), 10) };
  const json = await fetchJSON(`${API_URL}/blogs`, 'post', creations);
  return redirect(`../${json.insertId}/edit`);
}

export async function updateBlogById({ params, request }) {
  const updates = await getSubmittedData(request);
  await fetchRes(`${API_URL}/blogs/${params.id}`, 'patch', updates);
  return redirect(`..`);
}

export async function deleteBlogById({ params }) {
  await fetchRes(`${API_URL}/blogs/${params.id}`, 'delete');
  return redirect(`..`);
}
