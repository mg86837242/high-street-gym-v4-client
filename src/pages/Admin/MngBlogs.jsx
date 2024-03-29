import { useContext, useEffect,useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Outlet, useFetcher, useLoaderData, useNavigate,useSubmit } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import FCRHF1Sm from '../../components/formCtrlRHF/FCRHF1.jsx';
import FCRHFBlogBody1Sm from '../../components/formCtrlRHF/FCRHFBlogBody1.jsx';
import { BtnSm,BtnXs } from '../../components/ui/Btn';
import { Btn1Sm,Btn1Xs } from '../../components/ui/Btn1';
import { AuthContext } from '../../context/AuthContext.jsx';
import { convertEmptyStrToNull } from '../../helpers/sanitize.js';
import { blogSchema } from '../../schemas/index.js';

export function MngBlogs() {
  const { blogs } = useLoaderData();

  return (
    <div className='flex w-full flex-col gap-0 overflow-x-auto'>
      <ListBlogs blogs={blogs} />
      <Outlet />
    </div>
  );
}

function ListBlogs({ blogs }) {
  const fetcher = useFetcher();
  const blogTableBodyCells = useMemo(
    () =>
      blogs.map(({ id, title, body, username, role, createdAt, updatedAt }) => (
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
              <Btn1Xs>Edit</Btn1Xs>
            </Form>
          </td>
          <td>
            <fetcher.Form
              method='post'
              action={`${id}/destroy`}
              onSubmit={e => {
                if (!confirm('Please confirm you want to delete this blog.')) {
                  e.preventDefault();
                }
              }}
            >
              <BtnXs>Delete</BtnXs>
            </fetcher.Form>
          </td>
        </tr>
      )),
    [blogs],
  );

  return (
    <div className='overflow-x-auto py-6'>
      <table className='table table-sm w-max min-w-full'>
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
        <tbody>{blogTableBodyCells}</tbody>
      </table>
    </div>
  );
}

export function NewBlog() {
  const auth = useContext(AuthContext);
  const fetcher = useFetcher();

  return (
    <div className='flex justify-end py-6'>
      <fetcher.Form method='post' action='new'>
        <input type='hidden' name='loginId' value={auth.user?.id} />
        <Btn1Sm>Create New</Btn1Sm>
      </fetcher.Form>
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
    <div className='grid place-items-center py-6'>
      <form
        onSubmit={handleSubmit(data => {
          const sanitizedData = convertEmptyStrToNull(data);
          submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
        })}
        noValidate
        className='grid w-full grid-cols-2 justify-items-center gap-x-5 xl:grid-cols-3'
      >
        <FCRHF1Sm label='Blog Post Title' register={register('title')} issue={errors.title?.message} />
        <FCRHF1Sm label='Author Username' register={register('username')} issue={errors.username?.message} />
        <FCRHF1Sm label='Author Role' register={register('role')} issue={errors.role?.message} />
        <FCRHFBlogBody1Sm label='Blog Post Body' register={register('body')} issue={errors.body?.message} />
        <input type='hidden' {...register('loginId', { valueAsNumber: true })} />
        <div className='col-span-2 flex w-full justify-end gap-10 py-6 xl:col-span-3'>
          <Btn1Sm w='w-20'>Save</Btn1Sm>
          <BtnSm type='button' onClick={() => navigate(-1)} w='w-20'>
            Cancel
          </BtnSm>
        </div>
      </form>
    </div>
  );
}
