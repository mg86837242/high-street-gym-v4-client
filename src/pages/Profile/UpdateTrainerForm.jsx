import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useSubmit } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import FCRHF1Sm from '../../components/formCtrlRHF/FCRHF1';
import FCRHFPass1Sm from '../../components/formCtrlRHF/FCRHFPass1';
import { Btn1Sm } from '../../components/ui/Btn1';
import { convertEmptyStrToNull } from '../../helpers/sanitize';
import { trainerSchema } from '../../schemas';

export default function UpdateTrainerForm({ inputEmailMsg, setInputEmailMsg, topMsg, user }) {
  const submit = useSubmit();
  const userDefaultValues = useMemo(() => {
    const { email, username, firstName, lastName, phone, description, specialty, certificate, imageUrl, id } = user;
    return {
      email,
      password: '●●●●●●●●●●',
      username,
      firstName,
      lastName,
      phone,
      description,
      specialty,
      certificate,
      imageUrl,
      id,
      _action: 'updateTrainerById',
    };
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
        label='Description'
        register={register('description')}
        issue={errors.description?.message}
        isRequired={false}
      />
      <FCRHF1Sm
        label='Specialty'
        register={register('specialty')}
        issue={errors.specialty?.message}
        isRequired={false}
      />
      <FCRHF1Sm
        label='Certificate'
        register={register('certificate')}
        issue={errors.certificate?.message}
        isRequired={false}
      />
      <FCRHF1Sm label='Image URL' register={register('imageUrl')} issue={errors.imageUrl?.message} isRequired={false} />
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
