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
import { Btn2Sm } from '../../components/ui/Btn2';
import FCRHFSm from '../../components/formCtrlRHF/FCRHFSm';
import FCRHFSmPass from '../../components/formCtrlRHF/FCRHFSmPass';
import countries from '../../data/countries.json'; // Vite's feature
import SpinnerNoNav from '../../components/ui/SpinnerNoNav';
import { convertEmptyStrToNull, convertNullToEmptyStr } from '../../helpers/sanitize';

export default function EditAccount() {
  const auth = useContext(AuthContext);
  const [topMsg, setTopMsg] = useState('');
  const [botMsg, setBotMsg] = useState('');
  const { user, emails } = useLoaderData();
  const actionData = useActionData();

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
        return <UpdateAdminForm topMsg={topMsg} user={user} emails={emails} />;
      case 'Trainer':
        return <UpdateTrainerForm topMsg={topMsg} user={user} emails={emails} />;
      case 'Member':
        return <UpdateMemberForm topMsg={topMsg} user={user} emails={emails} />;
      default:
        return <></>;
    }
  }

  function renderSwitchUpdateUserAddrForm(role) {
    switch (role) {
      case 'Admin':
        return <UpdateAdminAddrForm botMsg={botMsg} user={user} />;
      case 'Trainer':
        return <UpdateTrainerAddrForm botMsg={botMsg} user={user} />;
      case 'Member':
        return <UpdateMemberAddrForm botMsg={botMsg} user={user} />;
      default:
        return <></>;
    }
  }

  return user && emails ? (
    <div className='flex-grow px-4 py-6'>
      <h1 className='font-sans text-3xl text-accent'>Edit My Account</h1>
      {renderSwitchUpdateUserForm(auth.user?.role)}
      <div className='divider'></div>
      <h1 className='font-sans text-3xl text-accent'>Edit My Address</h1>
      {renderSwitchUpdateUserAddrForm(auth.user?.role)}
    </div>
  ) : (
    <SpinnerNoNav />
  );
}

function UpdateAdminForm({ topMsg, user, emails }) {
  const auth = useContext(AuthContext);
  const [inputEmailMsg, setInputEmailMsg] = useState('');
  const submit = useSubmit();
  const userDefaultValues = useMemo(() => {
    const { password, ...values } = user;
    return { ...values, password: '●●●●●●●●●●', id: auth.user?.adminId, _action: 'updateAdminById' };
  }, [user, auth.user]);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(adminSchema),
    defaultValues: userDefaultValues,
  });

  useEffect(() => reset(userDefaultValues), [reset, user, auth.user]);

  return (
    <form
      onSubmit={handleSubmit(data => {
        setInputEmailMsg('');
        const emailExists = data.email !== user.email && emails.some(e => e.email === data.email);
        if (emailExists) {
          setInputEmailMsg('Email has already been used');
          return;
        }
        const sanitizedData = convertEmptyStrToNull(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'
    >
      <FCRHFSm label='Email' register={register('email')} issue={inputEmailMsg || errors.email?.message} />
      <FCRHFSmPass
        label='Password'
        register={register('password', { setValueAs: val => (isDirty ? val : user.password) })}
        issue={errors.password?.message}
      />
      <FCRHFSm label='Username' register={register('username')} issue={errors.username?.message} />
      <FCRHFSm label='First Name' register={register('firstName')} issue={errors.firstName?.message} />
      <FCRHFSm label='Last Name' register={register('lastName')} issue={errors.lastName?.message} />
      <FCRHFSm label='Phone' register={register('phone')} issue={errors.phone?.message} />
      <input type='hidden' {...register('id', { valueAsNumber: true })} />
      <input type='hidden' {...register('_action')} />
      <div className='mt-4'>
        <Btn2Sm w='w-full'>Save</Btn2Sm>
      </div>
      <p className='text-success self-center mt-4'>{topMsg}</p>
    </form>
  );
}

function UpdateAdminAddrForm({ botMsg, user }) {
  const auth = useContext(AuthContext);
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addressAdminSchema),
    defaultValues: useMemo(
      () => ({ ...user, adminId: auth.user?.adminId, _action: 'updateAddressByAdminId' }),
      [user, auth.user]
    ),
  });

  useEffect(
    () => reset({ ...user, adminId: auth.user?.adminId, _action: 'updateAddressByAdminId' }),
    [reset, user, auth.user]
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
          {countries.map(c => (
            <option value={c.name} key={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </FCRHFSm>
      <input type='hidden' {...register('adminId', { valueAsNumber: true })} />
      <input type='hidden' {...register('_action')} />
      <div className='mt-4'>
        <Btn2Sm w='w-full'>Save</Btn2Sm>
      </div>
      <p className='text-success self-center mt-4'>{botMsg}</p>
    </form>
  );
}

function UpdateTrainerForm({ topMsg, user, emails }) {
  const auth = useContext(AuthContext);
  const [inputEmailMsg, setInputEmailMsg] = useState('');
  const submit = useSubmit();
  const userDefaultValues = useMemo(() => {
    const { password, ...values } = user;
    return { ...values, password: '●●●●●●●●●●', id: auth.user?.trainerId, _action: 'updateTrainerById' };
  }, [user, auth.user]);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(trainerSchema),
    defaultValues: userDefaultValues,
  });

  useEffect(() => reset(userDefaultValues), [reset, user, auth.user]);

  return (
    <form
      onSubmit={handleSubmit(data => {
        setInputEmailMsg('');
        const emailExists = data.email !== user.email && emails.some(e => e.email === data.email);
        if (emailExists) {
          setInputEmailMsg('Email has already been used');
          return;
        }
        const sanitizedData = convertEmptyStrToNull(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'
    >
      <FCRHFSm label='Email' register={register('email')} issue={inputEmailMsg || errors.email?.message} />
      <FCRHFSmPass
        label='Password'
        register={register('password', { setValueAs: val => (isDirty ? val : user.password) })}
        issue={errors.password?.message}
      />
      <FCRHFSm label='Username' register={register('username')} issue={errors.username?.message} />
      <FCRHFSm label='First Name' register={register('firstName')} issue={errors.firstName?.message} />
      <FCRHFSm label='Last Name' register={register('lastName')} issue={errors.lastName?.message} />
      <FCRHFSm label='Phone' register={register('phone')} issue={errors.phone?.message} />
      <FCRHFSm
        label='Description'
        register={register('description')}
        issue={errors.description?.message}
        isRequired={false}
      />
      <FCRHFSm
        label='Specialty'
        register={register('specialty')}
        issue={errors.specialty?.message}
        isRequired={false}
      />
      <FCRHFSm
        label='Certificate'
        register={register('certificate')}
        issue={errors.certificate?.message}
        isRequired={false}
      />
      <FCRHFSm label='Image URL' register={register('imageUrl')} issue={errors.imageUrl?.message} isRequired={false} />
      <input type='hidden' {...register('id', { valueAsNumber: true })} />
      <input type='hidden' {...register('_action')} />
      <div className='mt-4'>
        <Btn2Sm w='w-full'>Save</Btn2Sm>
      </div>
      <p className='text-success self-center mt-4'>{topMsg}</p>
    </form>
  );
}

function UpdateTrainerAddrForm({ botMsg, user }) {
  const auth = useContext(AuthContext);
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addressTrainerSchema),
    defaultValues: useMemo(
      () => ({ ...user, trainerId: auth.user?.trainerId, _action: 'updateAddressByTrainerId' }),
      [user, auth.user]
    ),
  });

  useEffect(
    () => reset({ ...user, trainerId: auth.user?.trainerId, _action: 'updateAddressByTrainerId' }),
    [reset, user, auth.user]
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
          {countries.map(c => (
            <option value={c.name} key={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </FCRHFSm>
      <input type='hidden' {...register('trainerId', { valueAsNumber: true })} />
      <input type='hidden' {...register('_action')} />
      <div className='mt-4'>
        <Btn2Sm w='w-full'>Save</Btn2Sm>
      </div>
      <p className='text-success self-center mt-4'>{botMsg}</p>
    </form>
  );
}

function UpdateMemberForm({ topMsg, user, emails }) {
  const [inputEmailMsg, setInputEmailMsg] = useState('');
  const submit = useSubmit();
  const userDefaultValues = useMemo(() => {
    const { password, ...values } = user;
    return { ...values, password: '●●●●●●●●●●', id: auth.user?.memberId, _action: 'updateMemberById' };
  }, [user, auth.user]);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(memberSchema),
    defaultValues: userDefaultValues,
  });

  useEffect(() => reset(userDefaultValues), [reset, user, auth.user]);

  return (
    <form
      onSubmit={handleSubmit(data => {
        setInputEmailMsg('');
        const emailExists = data.email !== user.email && emails.some(e => e.email === data.email);
        if (emailExists) {
          setInputEmailMsg('Email has already been used');
          return;
        }
        const sanitizedData = convertEmptyStrToNull(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'
    >
      <FCRHFSm label='Email' register={register('email')} issue={inputEmailMsg || errors.email?.message} />
      <FCRHFSmPass
        label='Password'
        register={register('password', { setValueAs: val => (isDirty ? val : user.password) })}
        issue={errors.password?.message}
      />
      <FCRHFSm label='Username' register={register('username')} issue={errors.username?.message} />
      <FCRHFSm label='First Name' register={register('firstName')} issue={errors.firstName?.message} />
      <FCRHFSm label='Last Name' register={register('lastName')} issue={errors.lastName?.message} />
      <FCRHFSm label='Phone' register={register('phone')} issue={errors.phone?.message} />
      <FCRHFSm
        label='Age'
        type='number'
        register={register('age', { valueAsNumber: true })}
        issue={errors.age?.message}
        isRequired={false}
      />
      <FCRHFSm label='Gender' issue={errors.gender?.message} isRequired={false}>
        <select {...register('gender')} className='font-normal select select-bordered select-sm'>
          <option value=''>-- Choose Gender --</option>
          <option value='Female'>Female</option>
          <option value='Male'>Male</option>
          <option value='Other'>Other</option>
        </select>
      </FCRHFSm>
      <input type='hidden' {...register('id', { valueAsNumber: true })} />
      <input type='hidden' {...register('_action')} />
      <div className='mt-4'>
        <Btn2Sm w='w-full'>Save</Btn2Sm>
      </div>
      <p className='text-success self-center mt-4'>{topMsg}</p>
    </form>
  );
}

function UpdateMemberAddrForm({ botMsg, user }) {
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addressMemberSchema),
    defaultValues: useMemo(
      () => ({ ...user, memberId: auth.user?.memberId, _action: 'updateAddressByMemberId' }),
      [user, auth.user]
    ),
  });

  useEffect(
    () => reset({ ...user, memberId: auth.user?.memberId, _action: 'updateAddressByMemberId' }),
    [reset, user, auth.user]
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
          {countries.map(c => (
            <option value={c.name} key={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </FCRHFSm>
      <input type='hidden' {...register('memberId', { valueAsNumber: true })} />
      <input type='hidden' {...register('_action')} />
      <div className='mt-4'>
        <Btn2Sm w='w-full'>Save</Btn2Sm>
      </div>
      <p className='text-success self-center mt-4'>{botMsg}</p>
    </form>
  );
}
