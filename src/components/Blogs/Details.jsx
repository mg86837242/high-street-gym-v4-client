import { useLoaderData, Form } from 'react-router-dom';
import Button2Sm from '../UI/Button2Sm';
import Button5Sm from '../UI/Button5Sm';

export default function Details() {
  const {
    blog: { id, title, body, createdAt, updatedAt, username },
  } = useLoaderData();

  return (
    <div className='flex flex-col'>
      <article className='prose prose-zinc'>
        <h1>{title}</h1>
        <div className='flex flex-col'>
          <span>by {username}</span>
          <i className='text-[13px] leading-5'>created at: {createdAt}</i>
          {updatedAt && <i className='text-[13px] leading-5'>updated at: {updatedAt}</i>}
        </div>
        <p>{body}</p>
      </article>
      <div className='flex justify-end gap-10 py-6'>
        <Form action='edit'>
          <Button2Sm>Edit</Button2Sm>
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
          <Button5Sm type='submit'>Delete</Button5Sm>
        </Form>
      </div>
    </div>
  );
}
