import { useContext, useState, useMemo, useEffect } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { Outlet, NavLink, Navigate, useLoaderData, Form } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faPersonRunning } from '@fortawesome/free-solid-svg-icons';
import UnderConstruction from '../UnderConstruction';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export function AdminPanel() {
  return (
    <div
      id='admin-panel-wrapper'
      className='flex flex-col w-full h-full px-4 py-6 md:flex-row max-w-screen-2xl min-h-[calc(100vh-7.5rem)]'
    >
      <LeftSidePanel />
      <Outlet />
    </div>
  );
}

function LeftSidePanel() {
  const { authenticatedUser } = useContext(AuthContext);

  return (
    <div id='admin-sidebar-wrapper' className='flex flex-col gap-5 py-6 pr-6 min-w-[18.5rem]'>
      <div className='flex items-center justify-between gap-5'>
        <div className='avatar'>
          <div className='rounded-full w-14 ring ring-primary ring-offset-base-100 ring-offset-2'>
            <img src='https://picsum.photos/200/200?random=1&grayscale' />
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <p className='text-lg'>Admin Panel</p>
          <p className='text-base'>
            Role: <span className='text-primary'>{authenticatedUser?.role && authenticatedUser.role}</span>
          </p>
        </div>
      </div>
      <nav>
        <ul className='flex flex-col'>
          {authenticatedUser?.role === 'Admin' && (
            <li>
              <NavLink
                to='blogs'
                className={({ isActive }) =>
                  `flex items-center justify-start w-full h-full gap-2 px-2 font-normal btn btn-sm btn-ghost py-1.5 ${
                    isActive && 'btn-active'
                  }`
                }
              >
                <span>
                  <FontAwesomeIcon icon={faPenToSquare} className='w-4 h-4' />
                </span>
                <span className='flex items-center justify-start text-sm'>Manage Blog Posts</span>
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to='activities'
              className={({ isActive }) =>
                `flex items-center justify-start w-full h-full gap-2 px-2 font-normal btn btn-sm btn-ghost py-1.5 ${
                  isActive && 'btn-active'
                }`
              }
            >
              <span>
                <FontAwesomeIcon icon={faPersonRunning} className='w-4 h-4' />
              </span>
              <span className='flex items-center justify-start text-sm'>Manage Activities</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export function AdminIndex() {
  const { authenticatedUser } = useContext(AuthContext);

  return authenticatedUser?.role === 'Admin' ? (
    <Navigate to='blogs' replace />
  ) : authenticatedUser?.role === 'Trainer' ? (
    <Navigate to='activities' replace />
  ) : (
    <Navigate to='/' replace />
  );
}

export function AdminMngBlogs() {
  // FIX Use `loginId` as the FK in `Blogs` table i/o `memberId`
  return <UnderConstruction pageName={'admin edit blogs'} />;
}

export function AdminMngActivities() {
  const { activities } = useLoaderData();

  return (
    <div className='flex flex-col gap-0 overflow-x-auto'>
      <div className='w-full px-4 py-6 overflow-x-auto'>
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
                    <button className='normal-case shadow btn btn-outline btn-secondary btn-xs text-primary-content shadow-black/50'>
                      Edit
                    </button>
                  </Form>
                </td>
                <td>Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Outlet />
    </div>
  );
}

const activitySchema = z.object({
  name: z.string().max(45),
  category: z.string().max(45),
  description: z.string().max(45),
  intensityLevel: z.string().max(45),
  maxPeopleAllowed: z.string().max(45),
  requirementOne: z.string().max(45),
  requirementTwo: z.string().max(45),
  durationMinutes: z.string().max(45),
  price: z.string().max(45),
});

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
  // NB Subscribe to the change of `activity` returned by `useLoaderData`:
  //  -- https://stackoverflow.com/questions/62242657/how-to-change-react-hook-form-defaultvalue-with-useeffect
  //  -- API ref: https://react-hook-form.com/api/useform/reset/
  useEffect(() => {
    reset(activity);
  }, [reset, activity]);

  // TODO (1) extract the form control group + submit handler, (2) delete buttons by using RRD action. (3) new button that jump to edit
  return (
    <div className='grid px-4 py-6 place-items-center'>
      <form
        onSubmit={handleSubmit((_formData) => console.log(_formData))}
        noValidate
        className='grid grid-cols-2 lg:grid-cols-3 gap-x-5'
      >
        <InputGrpSmall labelName='Name' issue={errors.name?.message}>
          <input {...register('name')} />
        </InputGrpSmall>
        <button type='submit'>Save</button>
      </form>
    </div>
  );
}

function InputGrpSmall({ children, labelName, issue, isRequired }) {
  return (
    <div className='w-full max-w-xs form-control'>
      <label className='py-1 3xl:py-2 label'>
        <span className='label-text'>{labelName}:</span>
        {isRequired === false || <span className='label-text-alt'>Required</span>}
      </label>
      {children}
      <label className='py-1 3xl:py-2 label'>
        {issue ? (
          <span className='text-rose-500 label-text-alt'>{issue}</span>
        ) : (
          <span className='label-text-alt'>Validation info will appear here</span>
        )}
      </label>
    </div>
  );
}

export function AdminEditActivityNoRHF() {
  const { activity } = useLoaderData();
  const [formData, setFormData] = useState(
    activity
    // {
    //   id: '',
    //   name: '',
    //   category: '',
    //   description: '',
    //   intensityLevel: '',
    //   maxPeopleAllowed: '',
    //   requirementOne: '',
    //   requirementTwo: '',
    //   durationMinutes: '',
    //   price: '',
    // }
  );

  return (
    <div className='grid px-4 py-6 place-items-center'>
      <form
        onSubmit={() => console.log(formData)}
        className='grid grid-cols-2 place-items-center xl:grid-cols-3 gap-x-2'
      >
        <div className='w-full max-w-xs form-control'>
          <label className='label'>
            <span className='label-text'>Name:</span>
            <span className='label-text-alt'>Top Right label</span>
          </label>
          <input
            type='text'
            placeholder='Type here'
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className='w-full max-w-xs input input-bordered input-sm'
          />
          <label className='label'>
            <span className='label-text-alt'>Bottom Left label</span>
          </label>
        </div>
        <div className='w-full max-w-xs form-control'>
          <label className='label'>
            <span className='label-text'>Category:</span>
            <span className='label-text-alt'>Top Right label</span>
          </label>
          <input
            type='text'
            placeholder='Type here'
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className='w-full max-w-xs input input-bordered input-sm'
          />
          <label className='label'>
            <span className='label-text-alt'>Bottom Left label</span>
          </label>
        </div>
        <div className='w-full max-w-xs form-control'>
          <label className='label'>
            <span className='label-text'>Description:</span>
            <span className='label-text-alt'>Top Right label</span>
          </label>
          <input
            type='text'
            placeholder='Type here'
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className='w-full max-w-xs input input-bordered input-sm'
          />
          <label className='label'>
            <span className='label-text-alt'>Bottom Left label</span>
          </label>
        </div>
        <div className='w-full max-w-xs form-control'>
          <label className='label'>
            <span className='label-text'>IntensityLevel:</span>
            <span className='label-text-alt'>Top Right label</span>
          </label>
          <input
            type='text'
            placeholder='Type here'
            value={formData.intensityLevel}
            onChange={(e) => setFormData({ ...formData, intensityLevel: e.target.value })}
            className='w-full max-w-xs input input-bordered input-sm'
          />
          <label className='label'>
            <span className='label-text-alt'>Bottom Left label</span>
          </label>
        </div>
        <div className='w-full max-w-xs form-control'>
          <label className='label'>
            <span className='label-text'>MaxPeopleAllowed:</span>
            <span className='label-text-alt'>Top Right label</span>
          </label>
          <input
            type='text'
            placeholder='Type here'
            value={formData.maxPeopleAllowed}
            onChange={(e) => setFormData({ ...formData, maxPeopleAllowed: e.target.value })}
            className='w-full max-w-xs input input-bordered input-sm'
          />
          <label className='label'>
            <span className='label-text-alt'>Bottom Left label</span>
          </label>
        </div>
        <div className='w-full max-w-xs form-control'>
          <label className='label'>
            <span className='label-text'>RequirementOne:</span>
            <span className='label-text-alt'>Top Right label</span>
          </label>
          <input
            type='text'
            placeholder='Type here'
            value={formData.requirementOne}
            onChange={(e) => setFormData({ ...formData, requirementOne: e.target.value })}
            className='w-full max-w-xs input input-bordered input-sm'
          />
          <label className='label'>
            <span className='label-text-alt'>Bottom Left label</span>
          </label>
        </div>
        <div className='w-full max-w-xs form-control'>
          <label className='label'>
            <span className='label-text'>RequirementTwo:</span>
            <span className='label-text-alt'>Top Right label</span>
          </label>
          <input
            type='text'
            placeholder='Type here'
            value={formData.requirementTwo}
            onChange={(e) => setFormData({ ...formData, requirementTwo: e.target.value })}
            className='w-full max-w-xs input input-bordered input-sm'
          />
          <label className='label'>
            <span className='label-text-alt'>Bottom Left label</span>
          </label>
        </div>
        <div className='w-full max-w-xs form-control'>
          <label className='label'>
            <span className='label-text'>DurationMinutes:</span>
            <span className='label-text-alt'>Top Right label</span>
          </label>
          <input
            type='text'
            placeholder='Type here'
            value={formData.durationMinutes}
            onChange={(e) => setFormData({ ...formData, durationMinutes: e.target.value })}
            className='w-full max-w-xs input input-bordered input-sm'
          />
          <label className='label'>
            <span className='label-text-alt'>Bottom Left label</span>
          </label>
        </div>
        <div className='w-full max-w-xs form-control'>
          <label className='label'>
            <span className='label-text'>Price:</span>
            <span className='label-text-alt'>Top Right label</span>
          </label>
          <input
            type='text'
            placeholder='Type here'
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className='w-full max-w-xs input input-bordered input-sm'
          />
          <label className='label'>
            <span className='label-text-alt'>Bottom Left label</span>
          </label>
        </div>
      </form>
    </div>
  );
}
