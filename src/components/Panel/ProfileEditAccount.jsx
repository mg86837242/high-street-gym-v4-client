import { useContext, useState, useEffect, useMemo } from 'react';
import AuthContext from '../../context/AuthContext';
import { useLoaderData, useActionData, useSubmit } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { adminSchema, trainerSchema, memberSchema, addressSchema } from '../../schemas';
import SpinnerNoNav from '../UI/SpinnerNoNav';
import FCRHFSm from '../FormControlRHF/FCRHFSm';
import FCRHFSmPass from '../FormControlRHF/FCRHFSmPass';
import { convertEmptyStrToNull, convertNullToEmptyStr } from '../../helpers/sanitize';

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
            authenticatedUser={authenticatedUser}
            user={user}
            emails={emails}
          />
        );
      case 'Trainer':
        return (
          <UpdateTrainerForm
            topStatusText={topStatusText}
            authenticatedUser={authenticatedUser}
            user={user}
            emails={emails}
          />
        );
      case 'Member':
        return (
          <UpdateMemberForm
            topStatusText={topStatusText}
            authenticatedUser={authenticatedUser}
            user={user}
            emails={emails}
          />
        );
      default:
        return <></>;
    }
  }

  function renderSwitchUpdateUserAddrForm(role) {
    switch (role) {
      case 'Admin':
        return <UpdateAdminAddrForm botStatusText={botStatusText} authenticatedUser={authenticatedUser} user={user} />;
      case 'Trainer':
        return (
          <UpdateTrainerAddrForm botStatusText={botStatusText} authenticatedUser={authenticatedUser} user={user} />
        );
      case 'Member':
        return <UpdateMemberAddrForm botStatusText={botStatusText} authenticatedUser={authenticatedUser} user={user} />;
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

function UpdateAdminForm({ topStatusText, authenticatedUser, user, emails }) {
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
        const sanitizedData = convertEmptyStrToNull(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'
    >
      <FCRHFSm label='Email' register={register('email')} issue={duplicateEmailStatusText || errors.email?.message} />
      <FCRHFSmPass label='Password' register={register('password')} issue={errors.password?.message} />
      <FCRHFSm label='Username' register={register('username')} issue={errors.username?.message} />
      <FCRHFSm label='First Name' register={register('firstName')} issue={errors.firstName?.message} />
      <FCRHFSm label='Last Name' register={register('lastName')} issue={errors.lastName?.message} />
      <FCRHFSm label='Phone' register={register('phone')} issue={errors.phone?.message} />
      <input type='hidden' {...register('id', { valueAsNumber: true })} />
      <input type='hidden' {...register('_action')} />
      <button type='submit' className='btn btn-primary btn-sm mt-4'>
        Save
      </button>
      <p className='text-success self-center mt-4'>{topStatusText}</p>
    </form>
  );
}

function UpdateAdminAddrForm({ botStatusText, authenticatedUser, user }) {
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
        const sanitizedData = convertNullToEmptyStr(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'
    >
      <FCRHFSm label='Line 1' register={register('lineOne')} issue={errors.lineOne?.message} />
      <FCRHFSm label='Line 2' register={register('lineTwo')} issue={errors.lineTwo?.message} isRequired={false} />
      <FCRHFSm label='Suburb' register={register('suburb')} issue={errors.suburb?.message} />
      <FCRHFSm label='Postcode' register={register('postcode')} issue={errors.postcode?.message} />
      <FCRHFSm label='State' register={register('state')} issue={errors.state?.message} />
      <FCRHFSm label='Country' register={register('country')} issue={errors.country?.message} />
      <input type='hidden' name='adminId' value={authenticatedUser.adminId} />
      <button type='submit' name='_action' value='updateAddressByAdminId' className='btn btn-primary btn-sm mt-5'>
        Save
      </button>
      <p className='text-success self-center mt-4'>{botStatusText}</p>
    </form>
  );
}

// TODO role specific inputs (also check if it's NOT required & if it's number) && select dropdowns
function UpdateTrainerForm({ topStatusText, authenticatedUser, user, emails }) {
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
        const sanitizedData = convertEmptyStrToNull(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'
    >
      <FCRHFSm label='Email' register={register('email')} issue={duplicateEmailStatusText || errors.email?.message} />
      <FCRHFSmPass label='Password' register={register('password')} issue={errors.password?.message} />
      <FCRHFSm label='Username' register={register('username')} issue={errors.username?.message} />
      <FCRHFSm label='First Name' register={register('firstName')} issue={errors.firstName?.message} />
      <FCRHFSm label='Last Name' register={register('lastName')} issue={errors.lastName?.message} />
      <FCRHFSm label='Phone' register={register('phone')} issue={errors.phone?.message} />
      <input type='hidden' {...register('id', { valueAsNumber: true })} />
      <input type='hidden' {...register('_action')} />
      <button type='submit' className='btn btn-primary btn-sm mt-4'>
        Save
      </button>
      <p className='text-success self-center mt-4'>{topStatusText}</p>
    </form>
  );
}

function UpdateTrainerAddrForm({ botStatusText, authenticatedUser, user }) {
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
        const sanitizedData = convertNullToEmptyStr(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'
    >
      <FCRHFSm label='Line 1' register={register('lineOne')} issue={errors.lineOne?.message} />
      <FCRHFSm label='Line 2' register={register('lineTwo')} issue={errors.lineTwo?.message} isRequired={false} />
      <FCRHFSm label='Suburb' register={register('suburb')} issue={errors.suburb?.message} />
      <FCRHFSm label='Postcode' register={register('postcode')} issue={errors.postcode?.message} />
      <FCRHFSm label='State' register={register('state')} issue={errors.state?.message} />
      <FCRHFSm label='Country' register={register('country')} issue={errors.country?.message} />
      <input type='hidden' name='trainerId' value={authenticatedUser.trainerId} />
      <button type='submit' name='_action' value='updateAddressByTrainerId' className='btn btn-primary btn-sm mt-5'>
        Save
      </button>
      <p className='text-success self-center mt-4'>{botStatusText}</p>
    </form>
  );
}

function UpdateMemberForm({ topStatusText, authenticatedUser, user, emails }) {
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
        const sanitizedData = convertEmptyStrToNull(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'
    >
      <FCRHFSm label='Email' register={register('email')} issue={duplicateEmailStatusText || errors.email?.message} />
      <FCRHFSmPass label='Password' register={register('password')} issue={errors.password?.message} />
      <FCRHFSm label='Username' register={register('username')} issue={errors.username?.message} />
      <FCRHFSm label='First Name' register={register('firstName')} issue={errors.firstName?.message} />
      <FCRHFSm label='Last Name' register={register('lastName')} issue={errors.lastName?.message} />
      <FCRHFSm label='Phone' register={register('phone')} issue={errors.phone?.message} />
      <input type='hidden' {...register('id', { valueAsNumber: true })} />
      <input type='hidden' {...register('_action')} />
      <button type='submit' className='btn btn-primary btn-sm mt-4'>
        Save
      </button>
      <p className='text-success self-center mt-4'>{topStatusText}</p>
    </form>
  );
}

function UpdateMemberAddrForm({ botStatusText, authenticatedUser, user }) {
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
        const sanitizedData = convertNullToEmptyStr(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'
    >
      <FCRHFSm label='Line 1' register={register('lineOne')} issue={errors.lineOne?.message} />
      <FCRHFSm label='Line 2' register={register('lineTwo')} issue={errors.lineTwo?.message} isRequired={false} />
      <FCRHFSm label='Suburb' register={register('suburb')} issue={errors.suburb?.message} />
      <FCRHFSm label='Postcode' register={register('postcode')} issue={errors.postcode?.message} />
      <FCRHFSm label='State' register={register('state')} issue={errors.state?.message} />
      <FCRHFSm label='Country' register={register('country')} issue={errors.country?.message} />
      <input type='hidden' name='memberId' value={authenticatedUser.memberId} />
      <button type='submit' name='_action' value='updateAddressByMemberId' className='btn btn-primary btn-sm mt-5'>
        Save
      </button>
      <p className='text-success self-center mt-4'>{botStatusText}</p>
    </form>
  );
}
