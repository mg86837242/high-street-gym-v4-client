import { useLoaderData, Outlet } from 'react-router-dom';

export default function Details() {
  const {
    blog: { id, title, body, createdAt, updatedAt, username },
  } = useLoaderData();

  return (
    <div className='flex flex-col gap-4'>
      <article className='prose prose-zinc'>
        <h1>{title}</h1>
        <div className='flex flex-col'>
          <span>by {username}</span>
          <i className='text-[13px] leading-5'>created at: {createdAt}</i>
          {updatedAt && <i className='text-[13px] leading-5'>updated at: {updatedAt}</i>}
        </div>
        {/* FIX blog.body should be rendered by using TipTap API */}
        <p>{body}</p>
      </article>
      <Outlet />
    </div>
  );
}
