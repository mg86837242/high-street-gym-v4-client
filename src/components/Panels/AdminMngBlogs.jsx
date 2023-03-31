import { useMemo, useEffect } from 'react';
import { useLoaderData, Outlet, Form, useSubmit, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import blogSchema from '../../schemas/blogs';
import sanitize from '../../utils/sanitize';
import FCRHFSm from '../FormControlRHF/FCRHFSm';

export function AdminMngBlogs() {
  const { blogs } = useLoaderData();

  return (
    <div className='flex flex-col gap-0 overflow-x-auto'>
      <AdminListBlogs blogs={blogs} />
      <Outlet />
    </div>
  );
}

function AdminListBlogs({ blogs }) {
  // [ ] Table full span of the parent container
  // [ ] Tweak API to get username and role from login table
  return (
    <div className='w-full py-6 overflow-x-auto'>
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
  return null;
}

export function AdminEditBlog() {
  return null;
}
