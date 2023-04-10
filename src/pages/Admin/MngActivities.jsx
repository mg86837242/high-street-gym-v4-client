import { useMemo, useEffect } from 'react';
import { useLoaderData, Outlet, Form, useSubmit, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { activitySchema } from '../../schemas';
import { convertEmptyStrToNull } from '../../helpers/sanitize';
import FCRHFSm from '../../components/formCtrlRHF/FCRHFSm';

export function MngActivities() {
  const { activities } = useLoaderData();

  return (
    <div className='flex flex-col w-full gap-0 overflow-x-auto'>
      <ListActivities activities={activities} />
      <Outlet />
    </div>
  );
}

function ListActivities({ activities }) {
  return (
    <div className='py-6 overflow-x-auto'>
      <table className='table w-full table-compact'>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>category</th>
            <th>description</th>
            <th>intensity level</th>
            <th>max people allowed</th>
            <th>requirement 1</th>
            <th>requirement 2</th>
            <th>duration (minutes)</th>
            <th>price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {activities.map(
            ({
              id,
              name,
              category,
              description,
              intensityLevel,
              maxPeopleAllowed,
              requirementOne,
              requirementTwo,
              durationMinutes,
              price,
            }) => (
              <tr key={`r${id}`} className='hover'>
                <th>{id}</th>
                <td>{name}</td>
                <td>{category}</td>
                <td>{description}</td>
                <td>{intensityLevel}</td>
                <td>{maxPeopleAllowed}</td>
                <td>{requirementOne}</td>
                <td>{requirementTwo}</td>
                <td>{durationMinutes}</td>
                <td>{price}</td>
                <td>
                  <Form action={`${id}/edit`}>
                    <button className='shadow btn btn-outline btn-primary btn-xs text-primary-content shadow-black/50'>
                      Edit
                    </button>
                  </Form>
                </td>
                <td>
                  <Form
                    method='post'
                    action={`${id}/destroy`}
                    onSubmit={e => {
                      if (!confirm('Please confirm you want to delete this activity.')) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <button type='submit' className='shadow btn btn-outline btn-xs text-accent-content shadow-black/50'>
                      Delete
                    </button>
                  </Form>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export function NewActivity() {
  return (
    <div className='flex justify-end py-6'>
      <Form method='post' action='new'>
        <button type='submit' className='btn btn-outline btn-primary btn-sm'>
          Create New
        </button>
      </Form>
    </div>
  );
}

export function EditActivity() {
  const { activity } = useLoaderData();
  const submit = useSubmit();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(activitySchema),
    defaultValues: useMemo(() => activity, [activity]),
  });
  // NB Subscribe to the change of `activity` returned by loader:
  //  -- https://stackoverflow.com/questions/62242657/how-to-change-react-hook-form-defaultvalue-with-useeffect
  //  -- API ref: https://react-hook-form.com/api/useform/reset/
  useEffect(() => reset(activity), [reset, activity]);

  return (
    <div className='grid py-6 place-items-center'>
      <form
        onSubmit={handleSubmit(data => {
          const sanitizedData = convertEmptyStrToNull(data);
          submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
        })}
        noValidate
        className='grid w-full grid-cols-2 justify-items-center xl:grid-cols-3 gap-x-5'
      >
        <FCRHFSm label='Activity Name' register={register('name')} issue={errors.name?.message} />
        <FCRHFSm label='Category' issue={errors.category?.message} isRequired={false}>
          <select {...register('category')} className='font-normal select select-bordered select-sm'>
            <option value=''>-- Choose Category --</option>
            <option value='Aerobic'>Aerobic</option>
            <option value='Strength'>Strength</option>
            <option value='Aerobic & Strength'>Aerobic & Strength</option>
            <option value='Flexibility'>Flexibility</option>
          </select>
        </FCRHFSm>
        <FCRHFSm
          label='Description'
          register={register('description')}
          issue={errors.description?.message}
          isRequired={false}
        />
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
        <FCRHFSm
          label='Max People Allowed'
          type='number'
          register={register('maxPeopleAllowed', { valueAsNumber: true })}
          issue={errors.maxPeopleAllowed?.message}
          isRequired={false}
        />
        <FCRHFSm
          label='Requirement 1'
          register={register('requirementOne')}
          issue={errors.requirementOne?.message}
          isRequired={false}
        />
        <FCRHFSm
          label='Requirement 2'
          register={register('requirementTwo')}
          issue={errors.requirementTwo?.message}
          isRequired={false}
        />
        <FCRHFSm
          label='Duration (minutes)'
          type='number'
          register={register('durationMinutes', { valueAsNumber: true })}
          issue={errors.durationMinutes?.message}
        />
        <FCRHFSm
          label='Price'
          type='number'
          register={register('price', { valueAsNumber: true })}
          issue={errors.price?.message}
          isRequired={false}
        />
        <div className='flex justify-end w-full col-span-2 gap-10 py-6 xl:col-span-3'>
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
