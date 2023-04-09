import { useContext, useState, useEffect, useMemo } from 'react';
import AuthContext from '../../context/AuthContext';
import { useLoaderData, useActionData, useSubmit } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
      return null; //22
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

  return null;
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

  return null;
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

  return null;
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

  return null;
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

  return null;
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

  return null;
}
