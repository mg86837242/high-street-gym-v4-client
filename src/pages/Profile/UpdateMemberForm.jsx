import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useSubmit } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import FCRHF1Sm from '../../components/formCtrlRHF/FCRHF1';
import FCRHFPass1Sm from '../../components/formCtrlRHF/FCRHFPass1';
import { Btn1Sm } from '../../components/ui/Btn1';
import { convertEmptyStrToNull } from '../../helpers/sanitize';
import { memberSchema } from '../../schemas';

export default function UpdateMemberForm({ inputEmailMsg, setInputEmailMsg, topMsg, user }) {
  const submit = useSubmit();
  const userDefaultValues = useMemo(() => {
    const { email, username, firstName, lastName, phone, age, gender, id } = user;
    return {
      email,
      password: '●●●●●●●●●●',
      username,
      firstName,
      lastName,
      phone,
      age,
      gender,
      id,
      _action: 'updateMemberById',
    };
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

  useEffect(() => reset(userDefaultValues), [reset, userDefaultValues]);

  return (
    <form
      onSubmit={handleSubmit(data => {
        const sanitizedData = convertEmptyStrToNull(data);
        submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
      })}
      noValidate
      className='grid w-full grid-cols-1 gap-x-5 lg:grid-cols-2'
    >
      <FCRHF1Sm label='Email' register={register('email')} issue={errors.email?.message || inputEmailMsg} />
      <FCRHFPass1Sm
        label='Password'
        register={register('password', { setValueAs: val => (isDirty ? val : user.password) })}
        issue={errors.password?.message}
      />
      <FCRHF1Sm label='Username' register={register('username')} issue={errors.username?.message} />
      <FCRHF1Sm label='First Name' register={register('firstName')} issue={errors.firstName?.message} />
      <FCRHF1Sm label='Last Name' register={register('lastName')} issue={errors.lastName?.message} />
      <FCRHF1Sm label='Phone' register={register('phone')} issue={errors.phone?.message} />
      <FCRHF1Sm
        label='Age'
        type='number'
        register={register('age', { valueAsNumber: true })}
        issue={errors.age?.message}
        isRequired={false}
      />
      <FCRHF1Sm label='Gender' issue={errors.gender?.message} isRequired={false}>
        <select {...register('gender')} className='select select-bordered select-sm font-normal'>
          <option value=''>-- Choose Gender --</option>
          <option value='Female'>Female</option>
          <option value='Male'>Male</option>
          <option value='Other'>Other</option>
        </select>
      </FCRHF1Sm>
      <input type='hidden' {...register('id', { valueAsNumber: true })} />
      <input type='hidden' {...register('_action')} />
      <div className='mt-4'>
        <Btn1Sm onClick={() => setInputEmailMsg('')} w='w-full'>
          Save
        </Btn1Sm>
      </div>
      <p className='mt-4 self-center text-success'>{topMsg}</p>
    </form>
  );
}
