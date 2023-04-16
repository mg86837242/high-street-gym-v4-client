import { useContext, useMemo, useEffect } from 'react';
import AuthContext from '../../context/AuthContext.jsx';
import { useLoaderData, Outlet, Form, useSubmit, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { blogSchema } from '../../schemas/index.js';
import { convertEmptyStrToNull } from '../../helpers/sanitize.js';
import { Btn1Xs, Btn1Sm } from '../../components/ui/Btn1';
import { Btn2Xs, Btn2Sm } from '../../components/ui/Btn2';
import FCRHFSm from '../../components/formCtrlRHF/FCRHFSm.jsx';
import FCRHFSmBlogBody from '../../components/formCtrlRHF/FCRHFSmBlogBody.jsx';

export function MngBlogs() {
  const { blogs } = useLoaderData();

  return (
    <div className='flex flex-col w-full gap-0 overflow-x-auto'>
      <ListBlogs blogs={blogs} />
      <Outlet />
    </div>
  );
}

function ListBlogs({ blogs }) {
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
            <th>created at</th>
            <th>updated at</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(({ id, title, body, username, role, createdAt, updatedAt }) => (
            <tr key={`r${id}`} className='hover'>
              <th>{id}</th>
              <td>{title}</td>
              <td className='max-w-xs truncate'>{body}</td>
              <td>{username}</td>
              <td>{role}</td>
              <td>{createdAt}</td>
              <td>{updatedAt}</td>
              <td>
                <Form action={`${id}/edit`}>
                  <Btn2Xs>Edit</Btn2Xs>
                </Form>
              </td>
              <td>
                <Form
                  method='post'
                  action={`${id}/destroy`}
                  onSubmit={e => {
                    if (!confirm('Please confirm you want to delete this blog.')) {
                      e.preventDefault();
                    }
                  }}
                >
                  <Btn1Xs>Delete</Btn1Xs>
                </Form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function NewBlog() {
  const { authenticatedUser } = useContext(AuthContext);

  return (
    <div className='flex justify-end py-6'>
      <Form method='post' action='new'>
        <input type='hidden' name='loginId' value={authenticatedUser.id} />
        <Btn2Sm>Create New</Btn2Sm>
      </Form>
    </div>
  );
}

export function EditBlog() {
  const { blog } = useLoaderData();
  const submit = useSubmit();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: useMemo(() => blog, [blog]),
  });

  useEffect(() => reset(blog), [reset, blog]);

  return (
    <div className='grid py-6 place-items-center'>
      <form
        onSubmit={handleSubmit(data => {
          const sanitizedData = convertEmptyStrToNull(data);
          submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
        })}
        noValidate
        className='grid w-full grid-cols-2 justify-items-center xl:grid-cols-3 gap-x-5'
      >
        <FCRHFSm label='Blog Post Title' register={register('title')} issue={errors.title?.message} />
        <FCRHFSm label='Author Username' register={register('username')} issue={errors.username?.message} />
        <FCRHFSm label='Author Role' register={register('role')} issue={errors.role?.message} />
        <FCRHFSmBlogBody label='Blog Post Body' register={register('body')} issue={errors.body?.message} />
        <input type='hidden' {...register('loginId', { valueAsNumber: true })} />
        <div className='flex justify-end w-full col-span-2 gap-10 py-6 xl:col-span-3'>
          <Btn2Sm w='w-20'>Save</Btn2Sm>
          <Btn1Sm type='button' onClick={() => navigate(-1)} w='w-20'>
            Cancel
          </Btn1Sm>
        </div>
      </form>
    </div>
  );
}
