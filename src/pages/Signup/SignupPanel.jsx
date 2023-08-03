import { useState, useEffect } from 'react';
import { Link, useSubmit, useActionData, useNavigation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../../schemas';
import defaultSignup from '../../data/defaultSignup';
import FCRHF2Sm from '../../components/formCtrlRHF/FCRHF2';
import FCRHFPass2Sm from '../../components/formCtrlRHF/FCRHFPass2';
import { Btn2Sm } from '../../components/ui/Btn2';
import { convertEmptyStrToNull } from '../../helpers/sanitize';

export default function SignupPanel() {
  return (
    <div
      id='signup-panel-wrapper'
      className='my-auto flex w-full max-w-lg flex-col gap-6 rounded-3xl bg-neutral px-5 pb-5 pt-8 shadow-[0_0_30px_15px_rgba(255,255,255,0.2)] sm:px-10 sm:pb-8 sm:pt-12 md:max-w-2xl'
    >
      <Directions />
      <SignupForm />
    </div>
  );
}

function Directions() {
  return (
    <div className='flex flex-col gap-5'>
      <p className='text-3xl font-extrabold text-primary-content focus:outline-none'>Sign up form</p>
      <p className='text-sm font-medium leading-none text-primary-content focus:outline-none'>
        Already have account?{' '}
        <Link
          to='/login'
          className={`link link-primary cursor-pointer text-sm font-medium leading-none underline focus:outline-none`}
        >
          Log in here
        </Link>
      </p>
    </div>
  );
}

function SignupForm() {
  const [inputEmailMsg, setInputEmailMsg] = useState('');
  const actionData = useActionData();
  const submit = useSubmit();
  const signupDefaultValues = defaultSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: signupDefaultValues,
  });
  const navigation = useNavigation();
  const btnMsg =
    navigation.state === 'submitting' ? 'Submitting...' : navigation.state === 'loading' ? 'Submitted!' : 'Submit';

  useEffect(() => {
    if (!actionData) {
      return;
    }
    if (actionData.status === 409) {
      setInputEmailMsg(actionData.message);
      return;
    }

    return () => setInputEmailMsg('');
  }, [actionData]);

  return (
    <form
      onSubmit={handleSubmit(data => {
        const sanitizedData = convertEmptyStrToNull(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 gap-x-5 lg:grid-cols-2'
    >
      <FCRHF2Sm label='Email' register={register('email')} issue={errors.email?.message || inputEmailMsg} />
      <FCRHFPass2Sm label='Password' register={register('password')} issue={errors.password?.message} />
      <FCRHF2Sm label='Username' register={register('username')} issue={errors.username?.message} />
      <FCRHF2Sm label='First Name' register={register('firstName')} issue={errors.firstName?.message} />
      <FCRHF2Sm label='Last Name' register={register('lastName')} issue={errors.lastName?.message} />
      <FCRHF2Sm label='Phone' register={register('phone')} issue={errors.phone?.message} />
      <FCRHF2Sm
        label='Age'
        type='number'
        register={register('age', { valueAsNumber: true })}
        issue={errors.age?.message}
        isRequired={false}
      />
      <FCRHF2Sm label='Gender' issue={errors.gender?.message} isRequired={false}>
        <select {...register('gender')} className='select select-primary select-sm font-normal'>
          <option value=''>-- Choose Gender --</option>
          <option value='Female'>Female</option>
          <option value='Male'>Male</option>
          <option value='Other'>Other</option>
        </select>
      </FCRHF2Sm>
      <input type='hidden' {...register('id', { valueAsNumber: true })} />
      <input type='hidden' {...register('_action')} />
      <div className='col-span-1 mt-4 md:col-span-2'>
        <Btn2Sm onClick={() => setInputEmailMsg('')} w='w-full'>
          {btnMsg}
        </Btn2Sm>
      </div>
    </form>
  );
}
