import { useLoaderData } from 'react-router-dom';
import { Form } from 'react-router-dom';
import Button1Sm from '../UI/Button1Sm';

export default function Details() {
  const {
    blog: { id, title, body, createdAt, updatedAt, username },
  } = useLoaderData();

  return (
    <div className='flex flex-col gap-6'>
      <article className='prose prose-zinc'>
        <h1>{title}</h1>
        <p>by {username}</p>
        <p className='italic'>created at: {createdAt}</p>
        {updatedAt && <p className='italic'>updated at: {updatedAt}</p>}
        <p>{body}</p>
      </article>
      <div className='flex justify-between gap-5'>
        <Form action='edit'>
          <Button1Sm>Edit</Button1Sm>
        </Form>
        <Form
          method='post'
          action='destroy'
          onSubmit={(e) => {
            if (!confirm('Please confirm you want to delete this activity.')) {
              e.preventDefault();
            }
          }}
        >
          <button type='submit' className='shadow btn btn-sm text-accent-content shadow-black/50'>
            Delete
          </button>
        </Form>
      </div>
    </div>
  );
}
