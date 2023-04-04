import { redirect } from 'react-router-dom';
import { API_URL } from '../data/constants';
import fetchJSON from '../utils/fetchJSON';
import fetchRes from '../utils/fetchRes';
import getSubmittedData from '../utils/getSubmittedData';

export async function getAllBlogs() {
  const response = await fetchRes(`${API_URL}/blogs`);
  return response;
}

export async function getBlogById({ params }) {
  const response = await fetchRes(`${API_URL}/blogs/id/${params.id}`);
  return response;
}

export async function createBlog({ request }) {
  const formData = await request.formData();
  const creations = Object.fromEntries(formData);
  // await fetchJSON(`${API_URL}/blogs`, 'post', creations);
  // return redirect(`..`);
  return null;
}

export async function createBlogSimple({ request }) {
  const formData = await request.formData();
  const loginId = formData.get('loginId');
  const creations = { title: 'New Blog', body: 'Lorem Ipsum', loginId };
  const json = await fetchJSON(`${API_URL}/blogs`, 'post', creations);
  return redirect(`../${json.insertId}/edit`);
}

export async function updateBlogById({ params, request }) {
  const updates = await getSubmittedData(request);
  await fetchRes(`${API_URL}/blogs/id/${params.id}`, 'patch', updates);
  return redirect(`..`);
}

export async function deleteBlogById({ params }) {
  await fetchRes(`${API_URL}/blogs/id/${params.id}`, 'delete');
  return redirect(`..`);
}
