import { useContext, useState, useEffect, useMemo } from 'react';
import AuthContext from '../../context/AuthContext';
import { useLoaderData, useActionData, useSubmit } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { adminSchema, trainerSchema, memberSchema, addressSchema } from '../../schemas';
import sanitize from '../../helpers/sanitize';
import SpinnerNoNav from '../UI/SpinnerNoNav';
import FCRHFSm from '../FormControlRHF/FCRHFSm';

export default function ProfileEditAccount() {
  const { authenticatedUser } = useContext(AuthContext);
  const [topStatusText, setTopStatusText] = useState('');
  const [botStatusText, setBotStatusText] = useState('');
  const { user, emails } = useLoaderData();
  const actionData = useActionData();

  // ??? In animal app, user edit page, `console.log(formData)` fires 4 times after initial mount & fires 6 times after POST req
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
          await new Promise(r => setTimeout(r, 5_000));
          setTopStatusText('');
        })();
        break;
      case 'updateAddressByAdminId':
        (async () => {
          setBotStatusText(`✅ ${actionData.message}`);
          await new Promise(r => setTimeout(r, 5_000));
          setBotStatusText('');
        })();
        break;
      case 'updateTrainerById':
        (async () => {
          setTopStatusText(`✅ ${actionData.message}`);
          await new Promise(r => setTimeout(r, 5_000));
          setTopStatusText('');
        })();
        break;
      case 'updateAddressByTrainerId':
        (async () => {
          setBotStatusText(`✅ ${actionData.message}`);
          await new Promise(r => setTimeout(r, 5_000));
          setBotStatusText('');
        })();
        break;
      case 'updateMemberById':
        (async () => {
          setTopStatusText(`✅ ${actionData.message}`);
          await new Promise(r => setTimeout(r, 5_000));
          setTopStatusText('');
        })();
        break;
      case 'updateAddressByMemberId':
        (async () => {
          setBotStatusText(`✅ ${actionData.message}`);
          await new Promise(r => setTimeout(r, 5_000));
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

  function renderSwitchUpdateUserForm(role) {
    switch (role) {
      case 'Admin':
        return (
          <UpdateAdminForm
            topStatusText={topStatusText}
            user={user}
            emails={emails}
            authenticatedUser={authenticatedUser}
          />
        );
      case 'Trainer':
        return (
          <UpdateTrainerForm
            topStatusText={topStatusText}
            user={user}
            emails={emails}
            authenticatedUser={authenticatedUser}
          />
        );
      case 'Member':
        return (
          <UpdateMemberForm
            topStatusText={topStatusText}
            user={user}
            emails={emails}
            authenticatedUser={authenticatedUser}
          />
        );
      default:
        return <></>;
    }
  }

  function renderSwitchUpdateUserAddrForm(role) {
    switch (role) {
      case 'Admin':
        return <UpdateAdminAddrForm botStatusText={botStatusText} user={user} authenticatedUser={authenticatedUser} />;
      case 'Trainer':
        return (
          <UpdateTrainerAddrForm botStatusText={botStatusText} user={user} authenticatedUser={authenticatedUser} />
        );
      case 'Member':
        return <UpdateMemberAddrForm botStatusText={botStatusText} user={user} authenticatedUser={authenticatedUser} />;
      default:
        return <></>;
    }
  }

  return user && emails ? (
    <div className='flex-grow px-4 py-6'>
      <h1 className='font-sans text-3xl text-accent'>Edit My Account</h1>
      {renderSwitchUpdateUserForm(authenticatedUser?.role)}
      <div className='divider'></div>
      <h1 className='font-sans text-3xl text-accent'>Edit My Address</h1>
      {renderSwitchUpdateUserAddrForm(authenticatedUser?.role)}
    </div>
  ) : (
    <SpinnerNoNav />
  );
}

// TODO pass state for visibility && exception of sanitization for addr line 2 && role specific inputs && select dropdowns
function UpdateAdminForm({ topStatusText, user, emails, authenticatedUser }) {
  const [duplicateEmailStatusText, setDuplicateEmailStatusText] = useState('');
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(adminSchema),
    defaultValues: useMemo(
      () => ({ ...user, id: authenticatedUser?.adminId, _action: 'updateAdminById' }),
      [user, authenticatedUser]
    ),
  });

  useEffect(
    () => reset({ ...user, id: authenticatedUser?.adminId, _action: 'updateAdminById' }),
    [reset, user, authenticatedUser]
  );

  return (
    <form
      onSubmit={handleSubmit(data => {
        setDuplicateEmailStatusText('');
        if (data.email !== user.email && emails.find(e => e.email === data.email)) {
          setDuplicateEmailStatusText('Email has already been used');
          return;
        }
        const sanitizedData = sanitize(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'
    >
      <FCRHFSm label='Email' issue={duplicateEmailStatusText || errors.email?.message} isRequired={false}>
        <input {...register('email')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Password' issue={errors.password?.message} isRequired={false}>
        <input {...register('password')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Username' issue={errors.username?.message} isRequired={false}>
        <input {...register('username')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='First Name' issue={errors.firstName?.message} isRequired={false}>
        <input {...register('firstName')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Last Name' issue={errors.lastName?.message} isRequired={false}>
        <input {...register('lastName')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Phone' issue={errors.phone?.message} isRequired={false}>
        <input {...register('phone')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <input type='hidden' {...register('id', { valueAsNumber: true })} />
      <input type='hidden' {...register('_action')} />
      <button type='submit' className='btn btn-primary btn-sm mt-4'>
        Save
      </button>
      <p className='text-success self-center mt-4'>{topStatusText}</p>
    </form>
  );
}

function UpdateAdminAddrForm({ botStatusText, user, authenticatedUser }) {
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(addressSchema), defaultValues: useMemo(() => user, [user]) });

  useEffect(() => reset(user), [reset, user]);

  return (
    <form
      onSubmit={handleSubmit(data => {
        const sanitizedData = sanitize(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'
    >
      <FCRHFSm label='Line 1' issue={errors.lineOne?.message} isRequired={false}>
        <input {...register('lineOne')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Line 2' issue={errors.lineTwo?.message} isRequired={false}>
        <input {...register('lineTwo')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Suburb' issue={errors.suburb?.message} isRequired={false}>
        <input {...register('suburb')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Postcode' issue={errors.postcode?.message} isRequired={false}>
        <input {...register('postcode')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='State' issue={errors.state?.message} isRequired={false}>
        <input {...register('state')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Country' issue={errors.country?.message} isRequired={false}>
        <input {...register('country')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <input type='hidden' name='adminId' value={authenticatedUser.adminId} />
      <button type='submit' name='_action' value='updateAddressByAdminId' className='btn btn-primary btn-sm mt-5'>
        Save
      </button>
      <p className='text-success self-center mt-4'>{botStatusText}</p>
    </form>
  );
}

function UpdateTrainerForm({ topStatusText, user, emails, authenticatedUser }) {
  const [duplicateEmailStatusText, setDuplicateEmailStatusText] = useState('');
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(trainerSchema),
    defaultValues: useMemo(
      () => ({ ...user, id: authenticatedUser?.trainerId, _action: 'updateTrainerById' }),
      [user, authenticatedUser]
    ),
  });

  useEffect(
    () => reset({ ...user, id: authenticatedUser?.trainerId, _action: 'updateTrainerById' }),
    [reset, user, authenticatedUser]
  );

  return (
    <form
      onSubmit={handleSubmit(data => {
        setDuplicateEmailStatusText('');
        if (data.email !== user.email && emails.find(e => e.email === data.email)) {
          setDuplicateEmailStatusText('Email has already been used');
          return;
        }
        const sanitizedData = sanitize(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'
    >
      <FCRHFSm label='Email' issue={duplicateEmailStatusText || errors.email?.message} isRequired={false}>
        <input {...register('email')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Password' issue={errors.password?.message} isRequired={false}>
        <input {...register('password')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Username' issue={errors.username?.message} isRequired={false}>
        <input {...register('username')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='First Name' issue={errors.firstName?.message} isRequired={false}>
        <input {...register('firstName')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Last Name' issue={errors.lastName?.message} isRequired={false}>
        <input {...register('lastName')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Phone' issue={errors.phone?.message} isRequired={false}>
        <input {...register('phone')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <input type='hidden' {...register('id', { valueAsNumber: true })} />
      <input type='hidden' {...register('_action')} />
      <button type='submit' className='btn btn-primary btn-sm mt-4'>
        Save
      </button>
      <p className='text-success self-center mt-4'>{topStatusText}</p>
    </form>
  );
}

function UpdateTrainerAddrForm({ botStatusText, user, authenticatedUser }) {
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(addressSchema), defaultValues: useMemo(() => user, [user]) });

  useEffect(() => reset(user), [reset, user]);

  return (
    <form
      onSubmit={handleSubmit(data => {
        const sanitizedData = sanitize(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'
    >
      <FCRHFSm label='Line 1' issue={errors.lineOne?.message} isRequired={false}>
        <input {...register('lineOne')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Line 2' issue={errors.lineTwo?.message} isRequired={false}>
        <input {...register('lineTwo')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Suburb' issue={errors.suburb?.message} isRequired={false}>
        <input {...register('suburb')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Postcode' issue={errors.postcode?.message} isRequired={false}>
        <input {...register('postcode')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='State' issue={errors.state?.message} isRequired={false}>
        <input {...register('state')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Country' issue={errors.country?.message} isRequired={false}>
        <input {...register('country')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <input type='hidden' name='trainerId' value={authenticatedUser.trainerId} />
      <button type='submit' name='_action' value='updateAddressByTrainerId' className='btn btn-primary btn-sm mt-5'>
        Save
      </button>
      <p className='text-success self-center mt-4'>{botStatusText}</p>
    </form>
  );
}

function UpdateMemberForm({ topStatusText, user, emails, authenticatedUser }) {
  const [duplicateEmailStatusText, setDuplicateEmailStatusText] = useState('');
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(memberSchema),
    defaultValues: useMemo(
      () => ({ ...user, id: authenticatedUser?.memberId, _action: 'updateMemberById' }),
      [user, authenticatedUser]
    ),
  });

  useEffect(
    () => reset({ ...user, id: authenticatedUser?.memberId, _action: 'updateMemberById' }),
    [reset, user, authenticatedUser]
  );

  return (
    <form
      onSubmit={handleSubmit(data => {
        setDuplicateEmailStatusText('');
        if (data.email !== user.email && emails.find(e => e.email === data.email)) {
          setDuplicateEmailStatusText('Email has already been used');
          return;
        }
        const sanitizedData = sanitize(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'
    >
      <FCRHFSm label='Email' issue={duplicateEmailStatusText || errors.email?.message} isRequired={false}>
        <input {...register('email')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Password' issue={errors.password?.message} isRequired={false}>
        <input {...register('password')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Username' issue={errors.username?.message} isRequired={false}>
        <input {...register('username')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='First Name' issue={errors.firstName?.message} isRequired={false}>
        <input {...register('firstName')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Last Name' issue={errors.lastName?.message} isRequired={false}>
        <input {...register('lastName')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Phone' issue={errors.phone?.message} isRequired={false}>
        <input {...register('phone')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <input type='hidden' {...register('id', { valueAsNumber: true })} />
      <input type='hidden' {...register('_action')} />
      <button type='submit' className='btn btn-primary btn-sm mt-4'>
        Save
      </button>
      <p className='text-success self-center mt-4'>{topStatusText}</p>
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
  } = useForm({ resolver: zodResolver(addressSchema), defaultValues: useMemo(() => user, [user]) });

  useEffect(() => reset(user), [reset, user]);

  return (
    <form
      onSubmit={handleSubmit(data => {
        const sanitizedData = sanitize(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'
    >
      <FCRHFSm label='Line 1' issue={errors.lineOne?.message} isRequired={false}>
        <input {...register('lineOne')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Line 2' issue={errors.lineTwo?.message} isRequired={false}>
        <input {...register('lineTwo')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Suburb' issue={errors.suburb?.message} isRequired={false}>
        <input {...register('suburb')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Postcode' issue={errors.postcode?.message} isRequired={false}>
        <input {...register('postcode')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='State' issue={errors.state?.message} isRequired={false}>
        <input {...register('state')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <FCRHFSm label='Country' issue={errors.country?.message} isRequired={false}>
        <input {...register('country')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <input type='hidden' name='memberId' value={authenticatedUser.memberId} />
      <button type='submit' name='_action' value='updateAddressByMemberId' className='btn btn-primary btn-sm mt-5'>
        Save
      </button>
      <p className='text-success self-center mt-4'>{botStatusText}</p>
    </form>
  );
}
