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
  const loginId = formData.get('loginId');
  const creations = {
    title: 'New Blog',
    body: `
      <h2>
        Hi there,
      </h2>
      <p>
        this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
      </p>
      <ul>
        <li>
          That’s a bullet list with one …
        </li>
        <li>
          … or two list items.
        </li>
      </ul>
      <p>
        Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
      </p>
      <pre><code class="language-css">body {
        display: none;
      }</code></pre>
      <p>
        I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
      </p>
      <blockquote>
        Wow, that’s amazing. Good work, boy!
      </blockquote>
    `,
    loginId,
  };
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
