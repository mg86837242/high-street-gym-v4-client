import { useContext, useState, useEffect, useMemo } from 'react';
import AuthContext from '../../context/AuthContext';
import { useLoaderData, useActionData, useSubmit } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import sanitize from '../../helpers/sanitize';
import FCRHFSm from '../FormControlRHF/FCRHFSm';

export default function ProfileEditAccount() {
  const { authenticatedUser } = useContext(AuthContext);
  const [topStatusText, setTopStatusText] = useState('');
  const [botStatusText, setBotStatusText] = useState('');
  const { emails, user } = useLoaderData();
  const actionData = useActionData();

  // ??? In animal app, user edit page, `console.log(formData)` fires 4 times after initial mount & fires 6 times after POST req
  // TODO Rewrite the following forms by using RHF
  useEffect(() => {
    if (!actionData) {
      return;
      // PS If this Effect doesn't have this short-circuit, Effect will goes into `else` block and causes
      //  `actionData` to fire twice again)
    }
    if (actionData?.status !== 200) {
      return;
    }
    switch (actionData._action) {
      case 'updateAdminById':
        (async () => {
          setTopStatusText(`✅ ${actionData.message}`);
          await new Promise((r) => setTimeout(r, 5_000));
          setTopStatusText('');
        })();
        break;
      case 'updateAddressByAdminId':
        (async () => {
          setBotStatusText(`✅ ${actionData.message}`);
          await new Promise((r) => setTimeout(r, 5_000));
          setBotStatusText('');
        })();
        break;
      case 'updateTrainerById':
        (async () => {
          setTopStatusText(`✅ ${actionData.message}`);
          await new Promise((r) => setTimeout(r, 5_000));
          setTopStatusText('');
        })();
        break;
      case 'updateAddressByTrainerId':
        (async () => {
          setBotStatusText(`✅ ${actionData.message}`);
          await new Promise((r) => setTimeout(r, 5_000));
          setBotStatusText('');
        })();
        break;
      case 'updateMemberById':
        (async () => {
          setTopStatusText(`✅ ${actionData.message}`);
          await new Promise((r) => setTimeout(r, 5_000));
          setTopStatusText('');
        })();
        break;
      case 'updateAddressByMemberId':
        (async () => {
          setBotStatusText(`✅ ${actionData.message}`);
          await new Promise((r) => setTimeout(r, 5_000));
          setBotStatusText('');
        })();
        break;
      default:
        break;
    }

    return () => {
      setTopStatusText('');
      setBotStatusText('');
    };
  }, [actionData]);

  switch (authenticatedUser?.role) {
    case 'Admin':
      return (
        <div className='flex-grow px-4 py-6'>
          <h1 className='font-sans text-3xl text-accent'>Edit My Account</h1>
          <UpdateAdminForm topStatusText={topStatusText} emails={emails} user={user} />
          <div className='divider'></div>
          <h1 className='font-sans text-3xl text-accent'>Edit My Address</h1>
          <UpdateAdminAddrForm botStatusText={botStatusText} user={user} />
        </div>
      );
    case 'Trainer':
      return (
        <div className='flex-grow px-4 py-6'>
          <h1 className='font-sans text-3xl text-accent'>Edit My Account</h1>
          <UpdateTrainerForm topStatusText={topStatusText} emails={emails} user={user} />
          <div className='divider'></div>
          <h1 className='font-sans text-3xl text-accent'>Edit My Address</h1>
          <UpdateTrainerAddrForm botStatusText={botStatusText} user={user} />
        </div>
      );
    case 'Member':
      return (
        <div className='flex-grow px-4 py-6'>
          <h1 className='font-sans text-3xl text-accent'>Edit My Account</h1>
          <UpdateMemberForm topStatusText={topStatusText} emails={emails} user={user} />
          <div className='divider'></div>
          <h1 className='font-sans text-3xl text-accent'>Edit My Address</h1>
          <UpdateMemberAddrForm botStatusText={botStatusText} user={user} />
        </div>
      );
    default:
      return <></>;
  }
}

function UpdateAdminForm({ topStatusText, emails, user }) {
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(userSchema), defaultValues: useMemo(() => user, [user]) });

  useEffect(() => reset(user), [reset, user]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        const sanitizedData = sanitize(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'
    >
      <FCRHFSm label='Email' issue={errors.email?.message} isRequired={false}>
        <input {...register('email')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Password' issue={errors.password?.message} isRequired={false}>
        <input {...register('password')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Username' issue={errors.username?.message} isRequired={false}>
        <input {...register('username')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='First Name' issue={errors.firstName?.message} isRequired={false}>
        <input {...register('firstname')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Last Name' issue={errors.lastName?.message} isRequired={false}>
        <input {...register('last name')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Phone' issue={errors.phone?.message} isRequired={false}>
        <input {...register('phone')} className='input input-bordered input-sm' />
      </FCRHFSm>
    </form>
  );
}

function UpdateAdminAddrForm({ botStatusText, user }) {
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(userSchema), defaultValues: useMemo(() => user, [user]) });

  useEffect(() => reset(user), [reset, user]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        const sanitizedData = sanitize(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'
    ></form>
  );
}

function UpdateTrainerForm({ topStatusText, emails, user }) {
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(userSchema), defaultValues: useMemo(() => user, [user]) });

  useEffect(() => reset(user), [reset, user]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        const sanitizedData = sanitize(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'
    >
      <FCRHFSm label='Email' issue={errors.email?.message} isRequired={false}>
        <input {...register('email')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Password' issue={errors.password?.message} isRequired={false}>
        <input {...register('password')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Username' issue={errors.username?.message} isRequired={false}>
        <input {...register('username')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='First Name' issue={errors.firstName?.message} isRequired={false}>
        <input {...register('firstname')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Last Name' issue={errors.lastName?.message} isRequired={false}>
        <input {...register('last name')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Phone' issue={errors.phone?.message} isRequired={false}>
        <input {...register('phone')} className='input input-bordered input-sm' />
      </FCRHFSm>
    </form>
  );
}

function UpdateTrainerAddrForm({ botStatusText, user }) {
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(userSchema), defaultValues: useMemo(() => user, [user]) });

  useEffect(() => reset(user), [reset, user]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        const sanitizedData = sanitize(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'
    ></form>
  );
}

function UpdateMemberForm({ topStatusText, emails, user }) {
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(userSchema), defaultValues: useMemo(() => user, [user]) });

  useEffect(() => reset(user), [reset, user]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        const sanitizedData = sanitize(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'
    >
      <FCRHFSm label='Email' issue={errors.email?.message} isRequired={false}>
        <input {...register('email')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Password' issue={errors.password?.message} isRequired={false}>
        <input {...register('password')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Username' issue={errors.username?.message} isRequired={false}>
        <input {...register('username')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='First Name' issue={errors.firstName?.message} isRequired={false}>
        <input {...register('firstname')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Last Name' issue={errors.lastName?.message} isRequired={false}>
        <input {...register('last name')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Phone' issue={errors.phone?.message} isRequired={false}>
        <input {...register('phone')} className='input input-bordered input-sm' />
      </FCRHFSm>
    </form>
  );
}

function UpdateMemberAddrForm({ botStatusText, user }) {
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(userSchema), defaultValues: useMemo(() => user, [user]) });

  useEffect(() => reset(user), [reset, user]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        const sanitizedData = sanitize(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'
    ></form>
  );
}
