import { useContext, useState, useEffect, useMemo } from 'react';
import AuthContext from '../../context/AuthContext';
import { useLoaderData, useActionData, useSubmit } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  adminSchema,
  trainerSchema,
  memberSchema,
  addressAdminSchema,
  addressTrainerSchema,
  addressMemberSchema,
} from '../../schemas';
import { default as countries } from '../../data/countries.json';
import { convertEmptyStrToNull, convertNullToEmptyStr } from '../../helpers/sanitize';
import FCRHFSm from '../../components/formCtrlRHF/FCRHFSm';
import FCRHFSmPass from '../../components/formCtrlRHF/FCRHFSmPass';
import SpinnerNoNav from '../../components/ui/SpinnerNoNav';

export default function ProfileEditAccount() {
  const { authenticatedUser } = useContext(AuthContext);
  const [topMsg, setTopMsg] = useState('');
  const [botMsg, setBotMsg] = useState('');
  const { user, emails } = useLoaderData();
  const actionData = useActionData();

  // ??? In animal app, user edit page, `console.log(formData)` fires 4 times after initial mount & fires 6 times after POST req
  useEffect(() => {
    if (!actionData) {
      return;
    }
    if (actionData?.status !== 200) {
      return;
    }
    switch (actionData._action) {
      case 'updateAdminById':
        (async () => {
          setTopMsg(`✅ ${actionData.message}`);
          await new Promise(r => setTimeout(r, 5_000));
          setTopMsg('');
        })();
        break;
      case 'updateAddressByAdminId':
        (async () => {
          setBotMsg(`✅ ${actionData.message}`);
          await new Promise(r => setTimeout(r, 5_000));
          setBotMsg('');
        })();
        break;
      case 'updateTrainerById':
        (async () => {
          setTopMsg(`✅ ${actionData.message}`);
          await new Promise(r => setTimeout(r, 5_000));
          setTopMsg('');
        })();
        break;
      case 'updateAddressByTrainerId':
        (async () => {
          setBotMsg(`✅ ${actionData.message}`);
          await new Promise(r => setTimeout(r, 5_000));
          setBotMsg('');
        })();
        break;
      case 'updateMemberById':
        (async () => {
          setTopMsg(`✅ ${actionData.message}`);
          await new Promise(r => setTimeout(r, 5_000));
          setTopMsg('');
        })();
        break;
      case 'updateAddressByMemberId':
        (async () => {
          setBotMsg(`✅ ${actionData.message}`);
          await new Promise(r => setTimeout(r, 5_000));
          setBotMsg('');
        })();
        break;
      default:
        break;
    }

    return () => {
      setTopMsg('');
      setBotMsg('');
    };
  }, [actionData]);

  function renderSwitchUpdateUserForm(role) {
    switch (role) {
      case 'Admin':
        return <UpdateAdminForm topMsg={topMsg} user={user} emails={emails} authenticatedUser={authenticatedUser} />;
      case 'Trainer':
        return <UpdateTrainerForm topMsg={topMsg} user={user} emails={emails} authenticatedUser={authenticatedUser} />;
      case 'Member':
        return <UpdateMemberForm topMsg={topMsg} user={user} emails={emails} authenticatedUser={authenticatedUser} />;
      default:
        return <></>;
    }
  }

  function renderSwitchUpdateUserAddrForm(role) {
    switch (role) {
      case 'Admin':
        return <UpdateAdminAddrForm botMsg={botMsg} user={user} authenticatedUser={authenticatedUser} />;
      case 'Trainer':
        return <UpdateTrainerAddrForm botMsg={botMsg} user={user} authenticatedUser={authenticatedUser} />;
      case 'Member':
        return <UpdateMemberAddrForm botMsg={botMsg} user={user} authenticatedUser={authenticatedUser} />;
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

function UpdateAdminForm({ topMsg, user, emails, authenticatedUser }) {
  const [duplicateEmailMsg, setDuplicateEmailMsg] = useState('');
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
        setDuplicateEmailMsg('');
        if (data.email !== user.email && emails.find(e => e.email === data.email)) {
          setDuplicateEmailMsg('Email has already been used');
          return;
        }
        const sanitizedData = convertEmptyStrToNull(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'
    >
      <FCRHFSm label='Email' register={register('email')} issue={duplicateEmailMsg || errors.email?.message} />
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
      <p className='text-success self-center mt-4'>{topMsg}</p>
    </form>
  );
}

function UpdateAdminAddrForm({ botMsg, user, authenticatedUser }) {
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addressAdminSchema),
    defaultValues: useMemo(
      () => ({ ...user, adminId: authenticatedUser?.adminId, _action: 'updateAddressByAdminId' }),
      [user, authenticatedUser]
    ),
  });

  useEffect(
    () => reset({ ...user, adminId: authenticatedUser?.adminId, _action: 'updateAddressByAdminId' }),
    [reset, user, authenticatedUser]
  );

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
      <FCRHFSm label='Country' issue={errors.country?.message}>
        <select {...register('country')} className='font-normal select select-bordered select-sm'>
          <option value='' disabled>
            -- Choose Country --
          </option>
          {countries.map((c, i) => (
            <option value={c.name} key={i}>
              {c.name}
            </option>
          ))}
        </select>
      </FCRHFSm>
      <input type='hidden' {...register('adminId', { valueAsNumber: true })} />
      <input type='hidden' {...register('_action')} />
      <button type='submit' className='btn btn-primary btn-sm mt-5'>
        Save
      </button>
      <p className='text-success self-center mt-4'>{botMsg}</p>
    </form>
  );
}

function UpdateTrainerForm({ topMsg, user, emails, authenticatedUser }) {
  const [duplicateEmailMsg, setDuplicateEmailMsg] = useState('');
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
        setDuplicateEmailMsg('');
        if (data.email !== user.email && emails.find(e => e.email === data.email)) {
          setDuplicateEmailMsg('Email has already been used');
          return;
        }
        const sanitizedData = convertEmptyStrToNull(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'
    >
      <FCRHFSm label='Email' register={register('email')} issue={duplicateEmailMsg || errors.email?.message} />
      <FCRHFSmPass label='Password' register={register('password')} issue={errors.password?.message} />
      <FCRHFSm label='Username' register={register('username')} issue={errors.username?.message} />
      <FCRHFSm label='First Name' register={register('firstName')} issue={errors.firstName?.message} />
      <FCRHFSm label='Last Name' register={register('lastName')} issue={errors.lastName?.message} />
      <FCRHFSm label='Phone' register={register('phone')} issue={errors.phone?.message} />
      <FCRHFSm label='Description' register={register('description')} issue={errors.description?.message} />
      <FCRHFSm label='Specialty' register={register('specialty')} issue={errors.specialty?.message} />
      <FCRHFSm label='Certificate' register={register('certificate')} issue={errors.certificate?.message} />
      <FCRHFSm label='Image URL' register={register('imageUrl')} issue={errors.imageUrl?.message} />
      <input type='hidden' {...register('id', { valueAsNumber: true })} />
      <input type='hidden' {...register('_action')} />
      <button type='submit' className='btn btn-primary btn-sm mt-4'>
        Save
      </button>
      <p className='text-success self-center mt-4'>{topMsg}</p>
    </form>
  );
}

function UpdateTrainerAddrForm({ botMsg, user, authenticatedUser }) {
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addressTrainerSchema),
    defaultValues: useMemo(
      () => ({ ...user, trainerId: authenticatedUser?.trainerId, _action: 'updateAddressByTrainerId' }),
      [user, authenticatedUser]
    ),
  });

  useEffect(
    () => reset({ ...user, trainerId: authenticatedUser?.trainerId, _action: 'updateAddressByTrainerId' }),
    [reset, user, authenticatedUser]
  );

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
      <FCRHFSm label='Country' issue={errors.country?.message}>
        <select {...register('country')} className='font-normal select select-bordered select-sm'>
          <option value='' disabled>
            -- Choose Country --
          </option>
          {countries.map((c, i) => (
            <option value={c.name} key={i}>
              {c.name}
            </option>
          ))}
        </select>
      </FCRHFSm>
      <input type='hidden' {...register('trainerId', { valueAsNumber: true })} />
      <input type='hidden' {...register('_action')} />
      <button type='submit' className='btn btn-primary btn-sm mt-5'>
        Save
      </button>
      <p className='text-success self-center mt-4'>{botMsg}</p>
    </form>
  );
}

function UpdateMemberForm({ topMsg, user, emails, authenticatedUser }) {
  const [duplicateEmailMsg, setDuplicateEmailMsg] = useState('');
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
        setDuplicateEmailMsg('');
        if (data.email !== user.email && emails.find(e => e.email === data.email)) {
          setDuplicateEmailMsg('Email has already been used');
          return;
        }
        const sanitizedData = convertEmptyStrToNull(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'
    >
      <FCRHFSm label='Email' register={register('email')} issue={duplicateEmailMsg || errors.email?.message} />
      <FCRHFSmPass label='Password' register={register('password')} issue={errors.password?.message} />
      <FCRHFSm label='Username' register={register('username')} issue={errors.username?.message} />
      <FCRHFSm label='First Name' register={register('firstName')} issue={errors.firstName?.message} />
      <FCRHFSm label='Last Name' register={register('lastName')} issue={errors.lastName?.message} />
      <FCRHFSm label='Phone' register={register('phone')} issue={errors.phone?.message} />
      <FCRHFSm label='Age' register={register('age')} issue={errors.age?.message} />
      <FCRHFSm label='Gender' issue={errors.gender?.message}>
        <select {...register('gender')} className='font-normal select select-bordered select-sm'>
          <option value=''>-- Choose Gender --</option>
          <option value='Female'>Female</option>
          <option value='Male'>Male</option>
          <option value='Other'>Other</option>
        </select>
      </FCRHFSm>
      <input type='hidden' {...register('id', { valueAsNumber: true })} />
      <input type='hidden' {...register('_action')} />
      <button type='submit' className='btn btn-primary btn-sm mt-4'>
        Save
      </button>
      <p className='text-success self-center mt-4'>{topMsg}</p>
    </form>
  );
}

function UpdateMemberAddrForm({ botMsg, user, authenticatedUser }) {
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addressMemberSchema),
    defaultValues: useMemo(
      () => ({ ...user, memberId: authenticatedUser?.memberId, _action: 'updateAddressByMemberId' }),
      [user, authenticatedUser]
    ),
  });

  useEffect(
    () => reset({ ...user, memberId: authenticatedUser?.memberId, _action: 'updateAddressByMemberId' }),
    [reset, user, authenticatedUser]
  );

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
      <FCRHFSm label='Country' issue={errors.country?.message}>
        <select {...register('country')} className='font-normal select select-bordered select-sm'>
          <option value='' disabled>
            -- Choose Country --
          </option>
          {countries.map((c, i) => (
            <option value={c.name} key={i}>
              {c.name}
            </option>
          ))}
        </select>
      </FCRHFSm>
      <input type='hidden' {...register('memberId', { valueAsNumber: true })} />
      <input type='hidden' {...register('_action')} />
      <button type='submit' className='btn btn-primary btn-sm mt-5'>
        Save
      </button>
      <p className='text-success self-center mt-4'>{botMsg}</p>
    </form>
  );
}
