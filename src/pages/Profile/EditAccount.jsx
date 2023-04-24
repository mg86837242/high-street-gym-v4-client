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
import sleep from '../../helpers/sleep';
import { convertEmptyStrToNull, convertNullToEmptyStr } from '../../helpers/sanitize';

// TODO Limit the ability to edit demo users' email and pass
export default function EditAccount() {
  const auth = useContext(AuthContext);
  const [inputEmailMsg, setInputEmailMsg] = useState('');
  const [topMsg, setTopMsg] = useState('');
  const [botMsg, setBotMsg] = useState('');
  const { user } = useLoaderData();
  const actionData = useActionData();

  useEffect(() => {
    if (!actionData) {
      return;
    }
    if (actionData?.status !== 409 && actionData?.status !== 200) {
      return;
    }
    if (actionData?.status === 409) {
      setInputEmailMsg(actionData.message);
      return;
    }
    switch (actionData._action) {
      case 'updateAdminById':
        setTopMsg(`✅ ${actionData.message}`);
        sleep().then(() => setTopMsg(''));
        break;
      case 'updateAddressByAdminId':
        setBotMsg(`✅ ${actionData.message}`);
        sleep().then(() => setBotMsg(''));
        break;
      case 'updateTrainerById':
        setTopMsg(`✅ ${actionData.message}`);
        sleep().then(() => setTopMsg(''));
        break;
      case 'updateAddressByTrainerId':
        setBotMsg(`✅ ${actionData.message}`);
        sleep().then(() => setBotMsg(''));
        break;
      case 'updateMemberById':
        setTopMsg(`✅ ${actionData.message}`);
        sleep().then(() => setTopMsg(''));
        break;
      case 'updateAddressByMemberId':
        setBotMsg(`✅ ${actionData.message}`);
        sleep().then(() => setBotMsg(''));
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
        return (
          <UpdateAdminForm
            inputEmailMsg={inputEmailMsg}
            setInputEmailMsg={setInputEmailMsg}
            topMsg={topMsg}
            user={user}
          />
        );
      case 'Trainer':
        return (
          <UpdateTrainerForm
            inputEmailMsg={inputEmailMsg}
            setInputEmailMsg={setInputEmailMsg}
            topMsg={topMsg}
            user={user}
          />
        );
      case 'Member':
        return (
          <UpdateMemberForm
            inputEmailMsg={inputEmailMsg}
            setInputEmailMsg={setInputEmailMsg}
            topMsg={topMsg}
            user={user}
          />
        );
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

  return user ? (
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

function UpdateAdminForm({ inputEmailMsg, setInputEmailMsg, topMsg, user }) {
  const submit = useSubmit();
  const userDefaultValues = useMemo(() => {
    const { password, ...values } = user;
    return { ...values, password: '●●●●●●●●●●', _action: 'updateAdminById' };
  }, [user]);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(adminSchema),
    defaultValues: userDefaultValues,
  });

  useEffect(() => reset(userDefaultValues), [reset, user]);

  return (
    <form
      onSubmit={handleSubmit(data => {
        const sanitizedData = convertEmptyStrToNull(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'
    >
      <FCRHFSm label='Email' register={register('email')} issue={errors.email?.message || inputEmailMsg} />
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
        <Btn2Sm onClick={() => setInputEmailMsg('')} w='w-full'>
          Save
        </Btn2Sm>
      </div>
      <p className='text-success self-center mt-4'>{topMsg}</p>
    </form>
  );
}

function UpdateAdminAddrForm({ botMsg, user }) {
  const submit = useSubmit();
  const addressDefaultValue = useMemo(() => {
    const { id, ...values } = user;
    return { ...values, adminId: id, _action: 'updateAddressByAdminId' };
  }, [user]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addressAdminSchema),
    defaultValues: addressDefaultValue,
  });

  useEffect(() => reset(addressDefaultValue), [reset, user]);

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

function UpdateTrainerForm({ inputEmailMsg, setInputEmailMsg, topMsg, user }) {
  const submit = useSubmit();
  const userDefaultValues = useMemo(() => {
    const { password, ...values } = user;
    return { ...values, password: '●●●●●●●●●●', _action: 'updateTrainerById' };
  }, [user]);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(trainerSchema),
    defaultValues: userDefaultValues,
  });

  useEffect(() => reset(userDefaultValues), [reset, user]);

  return (
    <form
      onSubmit={handleSubmit(data => {
        const sanitizedData = convertEmptyStrToNull(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'
    >
      <FCRHFSm label='Email' register={register('email')} issue={errors.email?.message || inputEmailMsg} />
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
        <Btn2Sm onClick={() => setInputEmailMsg('')} w='w-full'>
          Save
        </Btn2Sm>
      </div>
      <p className='text-success self-center mt-4'>{topMsg}</p>
    </form>
  );
}

function UpdateTrainerAddrForm({ botMsg, user }) {
  const submit = useSubmit();
  const addressDefaultValue = useMemo(() => {
    const { id, ...values } = user;
    return { ...values, trainerId: id, _action: 'updateAddressByTrainerId' };
  }, [user]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addressTrainerSchema),
    defaultValues: addressDefaultValue,
  });

  useEffect(() => reset(addressDefaultValue), [reset, user]);

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

function UpdateMemberForm({ inputEmailMsg, setInputEmailMsg, topMsg, user }) {
  const submit = useSubmit();
  const userDefaultValues = useMemo(() => {
    const { password, ...values } = user;
    return { ...values, password: '●●●●●●●●●●', _action: 'updateMemberById' };
  }, [user]);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(memberSchema),
    defaultValues: userDefaultValues,
  });

  useEffect(() => reset(userDefaultValues), [reset, user]);

  return (
    <form
      onSubmit={handleSubmit(data => {
        const sanitizedData = convertEmptyStrToNull(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'
    >
      <FCRHFSm label='Email' register={register('email')} issue={errors.email?.message || inputEmailMsg} />
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
        <Btn2Sm onClick={() => setInputEmailMsg('')} w='w-full'>
          Save
        </Btn2Sm>
      </div>
      <p className='text-success self-center mt-4'>{topMsg}</p>
    </form>
  );
}

function UpdateMemberAddrForm({ botMsg, user }) {
  const submit = useSubmit();
  const addressDefaultValue = useMemo(() => {
    const { id, ...values } = user;
    return { ...values, memberId: id, _action: 'updateAddressByMemberId' };
  }, [user]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addressMemberSchema),
    defaultValues: addressDefaultValue,
  });

  useEffect(() => reset(addressDefaultValue), [reset, user]);

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
