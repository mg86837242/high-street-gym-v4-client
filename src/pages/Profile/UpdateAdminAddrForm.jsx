import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useSubmit } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import FCRHF1Sm from '../../components/formCtrlRHF/FCRHF1';
import { Btn1Sm } from '../../components/ui/Btn1';
import countries from '../../data/countries.json'; // Vite's feature
import { convertNullToEmptyStr } from '../../helpers/sanitize';
import { updateAddressByAdminIdSchema } from '../../schemas';

export default function UpdateAdminAddrForm({ botMsg, user }) {
  const submit = useSubmit();
  const addressDefaultValue = useMemo(() => {
    const { lineOne, lineTwo, suburb, postcode, state, country, id: adminId } = user;
    return { lineOne, lineTwo, suburb, postcode, state, country, adminId, _action: 'updateAddressByAdminId' };
  }, [user]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(updateAddressByAdminIdSchema),
    defaultValues: addressDefaultValue,
  });

  useEffect(() => reset(addressDefaultValue), [reset, addressDefaultValue]);

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
      <input type='hidden' {...register('adminId', { valueAsNumber: true })} />
      <input type='hidden' {...register('_action')} />
      <div className='mt-4'>
        <Btn1Sm w='w-full'>Save</Btn1Sm>
      </div>
      <p className='mt-4 self-center text-success'>{botMsg}</p>
    </form>
  );
}
