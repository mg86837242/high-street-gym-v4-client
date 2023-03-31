import { useMemo, useEffect } from 'react';
import { useLoaderData, Outlet, Form, useSubmit, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import blogSchema from '../../schemas/blogs.js';
import sanitize from '../../utils/sanitize';
import FCRHFSm from '../FormControlRHF/FCRHFSm';

export function AdminMngBlogs() {
  const { blogs } = useLoaderData();

  return (
    <div className='flex flex-col w-full gap-0 overflow-x-auto'>
      <AdminListBlogs blogs={blogs} />
      <Outlet />
    </div>
  );
}

function AdminListBlogs({ blogs }) {
  return (
    <div className='py-6 overflow-x-auto'>
      <table className='table w-full table-compact'>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>body</th>
            <th>username</th>
            <th>role</th>
            <th>created At</th>
            <th>updated At</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(({ id, title, body, username, role, createdAt, updatedAt }, i) => (
            <tr key={`r${i}`} className='hover'>
              <th>{id}</th>
              <td>{title}</td>
              <td className='max-w-xs truncate'>{body}</td>
              <td>{username}</td>
              <td>{role}</td>
              <td>{createdAt}</td>
              <td>{updatedAt}</td>
              <td>
                <Form action={`id/${id}/edit`}>
                  <button className='normal-case shadow btn btn-outline btn-primary btn-xs text-primary-content shadow-black/50'>
                    Edit
                  </button>
                </Form>
              </td>
              <td>
                <Form
                  method='post'
                  action={`id/${id}/destroy`}
                  onSubmit={(e) => {
                    if (!confirm('Please confirm you want to delete this blog.')) {
                      e.preventDefault();
                    }
                  }}
                >
                  <button
                    type='submit'
                    className='normal-case shadow btn btn-outline btn-xs text-accent-content shadow-black/50'
                  >
                    Delete
                  </button>
                </Form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AdminNewBlog() {
  return (
    <div className='flex justify-end gap-10 py-6'>
      <Form method='post' action='new'>
        <button type='submit' className='btn btn-outline btn-primary btn-sm'>
          Create New
        </button>
      </Form>
    </div>
  );
}

export function AdminEditBlog() {
  const { blog } = useLoaderData();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: useMemo(() => {
      return blog;
    }, [blog]),
  });

  useEffect(() => {
    reset(blog);
  }, [reset, blog]);
  const submit = useSubmit();
  const navigate = useNavigate();

  return (
    <div className='grid py-6 place-items-center'>
      <form
        onSubmit={handleSubmit((data) => {
          const sanitizedData = sanitize(data);
          submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
        })}
        noValidate
        className='grid w-full grid-cols-2 justify-items-center xl:grid-cols-3 gap-x-5'
      >
        <FCRHFSm label='Blog Post Title' issue={errors.title?.message}>
          <input {...register('title')} className='input input-bordered input-sm' />
        </FCRHFSm>
        <FCRHFSm label='Author Username' issue={errors.username?.message} isRequired={false}>
          <input {...register('username')} disabled className='input input-bordered input-sm' />
        </FCRHFSm>
        <FCRHFSm label='Author Role' issue={errors.role?.message} isRequired={false}>
          <input {...register('role')} disabled className='input input-bordered input-sm' />
        </FCRHFSm>
        <FCRHFSmTextarea label='Blog Post Body' issue={errors.body?.message}>
          <textarea
            {...register('body')}
            rows={10}
            placeholder='Enter blog post body here ...'
            className='textarea textarea-bordered'
          />
        </FCRHFSmTextarea>
        <input type='hidden' {...register('loginId')} className='input input-bordered input-sm' />
        <div className='flex justify-end w-full col-span-2 gap-10 mt-5 xl:col-span-3'>
          <button type='submit' className='w-20 btn btn-outline btn-primary btn-sm'>
            Save
          </button>
          <button type='button' onClick={() => navigate(-1)} className='w-20 btn btn-outline btn-sm'>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default function FCRHFSmTextarea({ children, label, issue, isRequired }) {
  return (
    <div className='w-full form-control col-span-2 xl:col-span-3'>
      <label className='py-1 3xl:py-2 label'>
        <span className='label-text'>{label}:</span>
        {isRequired === false || <span className='label-text-alt'>Required</span>}
      </label>
      {children}
      <label className='py-1 3xl:py-2 label'>
        {issue ? (
          <span className='text-rose-500 label-text-alt'>{issue}</span>
        ) : (
          <span className='label-text-alt'>Validation info will appear here</span>
        )}
      </label>
    </div>
  );
}