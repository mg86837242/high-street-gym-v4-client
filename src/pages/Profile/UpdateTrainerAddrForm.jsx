import { useEffect, useMemo } from 'react';
import { useSubmit } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateAddressByTrainerIdSchema } from '../../schemas';
import { Btn2Sm } from '../../components/ui/Btn2';
import FCRHF1Sm from '../../components/formCtrlRHF/FCRHF1';
import countries from '../../data/countries.json'; // Vite's feature
import { convertNullToEmptyStr } from '../../helpers/sanitize';

export default function UpdateTrainerAddrForm({ botMsg, user }) {
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
    resolver: zodResolver(updateAddressByTrainerIdSchema),
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
      className='grid w-full grid-cols-1 gap-x-5 lg:grid-cols-2'
    >
      <FCRHF1Sm label='Line 1' register={register('lineOne')} issue={errors.lineOne?.message} />
      <FCRHF1Sm label='Line 2' register={register('lineTwo')} issue={errors.lineTwo?.message} isRequired={false} />
      <FCRHF1Sm label='Suburb' register={register('suburb')} issue={errors.suburb?.message} />
      <FCRHF1Sm label='Postcode' register={register('postcode')} issue={errors.postcode?.message} />
      <FCRHF1Sm label='State' register={register('state')} issue={errors.state?.message} />
      <FCRHF1Sm label='Country' issue={errors.country?.message}>
        <select {...register('country')} className='select select-bordered select-sm font-normal'>
          <option value='' disabled>
            -- Choose Country --
          </option>
          {countries.map(c => (
            <option value={c.name} key={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </FCRHF1Sm>
      <input type='hidden' {...register('trainerId', { valueAsNumber: true })} />
      <input type='hidden' {...register('_action')} />
      <div className='mt-4'>
        <Btn2Sm w='w-full'>Save</Btn2Sm>
      </div>
      <p className='mt-4 self-center text-success'>{botMsg}</p>
    </form>
  );
}
