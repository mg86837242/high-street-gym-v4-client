import { useLoaderData } from 'react-router-dom';

export default function Details() {
  const {
    blog: { id, title, body, createdAt, updatedAt, username },
  } = useLoaderData();

  return (
    <div>
      <h1>{title}</h1>
      <p>by {username}</p>
      <p className='italic'>created at: {createdAt}</p>
      {updatedAt && <p className='italic'>updated at: {updatedAt}</p>}
      <p>{body}</p>
    </div>
  );
}
