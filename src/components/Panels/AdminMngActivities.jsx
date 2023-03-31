import { useMemo, useEffect } from 'react';
import { Outlet, useLoaderData, Form, useSubmit, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import activitySchema from '../../schemas/activities';
import sanitize from '../../utils/sanitize';
import FCRHFSm from '../FormControlRHF/FCRHFSm';

export function AdminMngActivities() {
  const { activities } = useLoaderData();

  return (
    <div className='flex flex-col gap-0 overflow-x-auto'>
      <AdminListActivities activities={activities} />
      <Outlet />
    </div>
  );
}

function AdminListActivities({ activities }) {
  return (
    <div className='w-full py-6 overflow-x-auto'>
      <table className='table w-full table-compact'>
        <thead>
          <tr>
            {Object.keys(activities[0]).map((key, j) => (
              <th key={j}>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</th>
            ))}
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((a, i) => (
            <tr key={`r${i}`} className='hover'>
              <th>{a.id}</th>
              {Object.values(a).map((val, j) => j > 0 && <td key={10 * i + j}>{val}</td>)}
              <td>
                <Form action={`id/${a.id}/edit`}>
                  <button className='normal-case shadow btn btn-outline btn-primary btn-xs text-primary-content shadow-black/50'>
                    Edit
                  </button>
                </Form>
              </td>
              <td>
                <Form
                  method='post'
                  action={`id/${a.id}/destroy`}
                  onSubmit={(e) => {
                    if (!confirm('Please confirm you want to delete this activity.')) {
                      e.preventDefault();
                    }
                  }}
                >
                  <button
                    type='submit'
                    className='normal-case shadow btn btn-outline btn-xs text-accent-content shadow-black/50'
                  >
                    Delete
                  </button>
                </Form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AdminNewActivity() {
  return (
    <div className='flex justify-end w-full gap-10 py-6'>
      {/* <button type='button' className='btn btn-outline btn-sm'>
          To be implemented
        </button> */}
      <Form method='post' action='new'>
        <button type='submit' className='btn btn-outline btn-primary btn-sm'>
          Create New
        </button>
      </Form>
    </div>
  );
}

export function AdminEditActivity() {
  const { activity } = useLoaderData();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(activitySchema),
    defaultValues: useMemo(() => {
      return activity;
    }, [activity]),
  });
  // NB Subscribe to the change of `activity` returned by loader:
  //  -- https://stackoverflow.com/questions/62242657/how-to-change-react-hook-form-defaultvalue-with-useeffect
  //  -- API ref: https://react-hook-form.com/api/useform/reset/
  useEffect(() => {
    reset(activity);
  }, [reset, activity]);
  const submit = useSubmit();
  const navigate = useNavigate();

  return (
    <div className='grid py-6 place-items-center'>
      <form
        onSubmit={handleSubmit((data) => {
          const sanitizedData = sanitize(data);
          submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
        })}
        noValidate
        className='grid w-full grid-cols-2 justify-items-center xl:grid-cols-3 gap-x-5'
      >
        <FCRHFSm label='Activity Name' issue={errors.name?.message}>
          <input {...register('name')} className='input input-bordered input-sm' />
        </FCRHFSm>
        <FCRHFSm label='Category' issue={errors.category?.message} isRequired={false}>
          <select {...register('category')} className='font-normal select select-bordered select-sm'>
            <option value=''>-- Choose Category --</option>
            <option value='Aerobic'>Aerobic</option>
            <option value='Strength'>Strength</option>
            <option value='Aerobic & Strength'>Aerobic & Strength</option>
            <option value='Flexibility'>Flexibility</option>
          </select>
        </FCRHFSm>
        <FCRHFSm label='Description' issue={errors.description?.message} isRequired={false}>
          <input {...register('description')} className='input input-bordered input-sm' />
        </FCRHFSm>
        <FCRHFSm label='Intensity Level' issue={errors.intensityLevel?.message} isRequired={false}>
          <select {...register('intensityLevel')} className='font-normal select select-bordered select-sm'>
            <option value=''>-- Choose Intensity Level --</option>
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
            <option value='Very High'>Very High</option>
            <option value='Varies with Type'>Varies with Type</option>
          </select>
        </FCRHFSm>
        <FCRHFSm label='Max People Allowed' issue={errors.maxPeopleAllowed?.message} isRequired={false}>
          <input
            type='number'
            {...register('maxPeopleAllowed', { valueAsNumber: true })}
            className='input input-bordered input-sm'
          />
        </FCRHFSm>
        <FCRHFSm label='Requirement 1' issue={errors.requirementOne?.message} isRequired={false}>
          <input {...register('requirementOne')} className='input input-bordered input-sm' />
        </FCRHFSm>
        <FCRHFSm label='Requirement 2' issue={errors.requirementTwo?.message} isRequired={false}>
          <input {...register('requirementTwo')} className='input input-bordered input-sm' />
        </FCRHFSm>
        <FCRHFSm label='Duration (minutes)' issue={errors.durationMinutes?.message}>
          <input
            type='number'
            {...register('durationMinutes', { valueAsNumber: true })}
            className='input input-bordered input-sm'
          />
        </FCRHFSm>
        <FCRHFSm label='Price' issue={errors.price?.message} isRequired={false}>
          <input
            type='number'
            {...register('price', { valueAsNumber: true })}
            className='input input-bordered input-sm'
          />
        </FCRHFSm>
        <div className='flex justify-end w-full col-span-2 gap-10 mt-5 xl:col-span-3'>
          <button type='submit' className='w-20 btn btn-outline btn-primary btn-sm'>
            Save
          </button>
          <button type='button' onClick={() => navigate(-1)} className='w-20 btn btn-outline btn-sm'>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
