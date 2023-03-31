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
            {Object.keys(blogs[0]).map((key, j) => (
              <th key={j}>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</th>
            ))}
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((a, i) => (
            <tr key={`r${i}`} className='hover'>
              <th>{a.id}</th>
              {Object.values(a).map((val, j) => j > 0 && <td key={10 * i + j}>{val}</td>)}
              <td>
                <Form action={`id/${a.id}/edit`}>
                  <button className='normal-case shadow btn btn-outline btn-primary btn-xs text-primary-content shadow-black/50'>
                    Edit
                  </button>
                </Form>
              </td>
              <td>
                <Form
                  method='post'
                  action={`id/${a.id}/destroy`}
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
        <FCRHFSm label='Title' issue={errors.title?.message}>
          <input {...register('title')} className='input input-bordered input-sm' />
        </FCRHFSm>
        <FCRHFSm label='Body' issue={errors.body?.message}>
          <input {...register('body')} className='input input-bordered input-sm' />
        </FCRHFSm>
        <FCRHFSm label='loginId' issue={errors.loginId?.message} isRequired={false}>
          <input
            type='number'
            {...register('loginId', { valueAsNumber: true })}
            className='input input-bordered input-sm'
          />
        </FCRHFSm>
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
