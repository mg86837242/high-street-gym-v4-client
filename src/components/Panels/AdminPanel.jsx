import { useContext, useMemo, useEffect } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { Outlet, NavLink, Navigate, useLoaderData, Form, useNavigate } from 'react-router-dom';
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
      className='flex flex-col w-full h-full px-4 py-6 lg:flex-row max-w-screen-2xl min-h-[calc(100vh-7.5rem)]'
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
      <Outlet />
    </div>
  );
}

const activitySchema = z.object({
  name: z.string().max(4),
  category: z.string().max(45),
  description: z.string().max(45),
  intensityLevel: z.string().max(45),
  maxPeopleAllowed: z.string().max(45),
  requirementOne: z.string().max(255),
  requirementTwo: z.string().max(255),
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
  const navigate = useNavigate();

  // TODO (1) submit handler, (2) delete buttons by using RRD action. (3) new button that create an empty new and auto direct to edit
  return (
    <div className='grid px-4 py-6 place-items-center'>
      <form
        onSubmit={handleSubmit((_formData) => console.log(_formData))}
        noValidate
        className='grid w-full grid-cols-2 justify-items-center xl:grid-cols-3 gap-x-5'
      >
        <InputGrpSm labelText='Activity Name' issue={errors.name?.message}>
          <input {...register('name')} className='w-full max-w-xs input input-bordered input-sm' />
        </InputGrpSm>
        <InputGrpSm labelText='Category' issue={errors.category?.message}>
          <input {...register('category')} className='w-full max-w-xs input input-bordered input-sm' />
        </InputGrpSm>
        <InputGrpSm labelText='Description' issue={errors.description?.message}>
          <input {...register('description')} className='w-full max-w-xs input input-bordered input-sm' />
        </InputGrpSm>
        <InputGrpSm labelText='Intensity Level' issue={errors.intensityLevel?.message}>
          <input {...register('intensityLevel')} className='w-full max-w-xs input input-bordered input-sm' />
        </InputGrpSm>
        <InputGrpSm labelText='Max People Allowed' issue={errors.maxPeopleAllowed?.message}>
          <input {...register('maxPeopleAllowed')} className='w-full max-w-xs input input-bordered input-sm' />
        </InputGrpSm>
        <InputGrpSm labelText='Requirement 1' issue={errors.requirementOne?.message}>
          <input {...register('requirementOne')} className='w-full max-w-xs input input-bordered input-sm' />
        </InputGrpSm>
        <InputGrpSm labelText='Requirement 2' issue={errors.requirementTwo?.message}>
          <input {...register('requirementTwo')} className='w-full max-w-xs input input-bordered input-sm' />
        </InputGrpSm>
        <InputGrpSm labelText='Duration (minutes)' issue={errors.durationMinutes?.message}>
          <input {...register('durationMinutes')} className='w-full max-w-xs input input-bordered input-sm' />
        </InputGrpSm>
        <InputGrpSm labelText='Price' issue={errors.price?.message}>
          <input {...register('price')} className='w-full max-w-xs input input-bordered input-sm' />
        </InputGrpSm>
        <div className='flex w-full col-span-2 xl:col-span-3 mt-5 justify-end gap-10'>
          <button type='button' onClick={() => navigate(-1)} className='btn btn-sm'>
            Cancel
          </button>
          <button type='submit' className='btn btn-primary btn-sm'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

function InputGrpSm({ children, labelText, issue, isRequired }) {
  return (
    <div className='w-full max-w-xs form-control'>
      <label className='py-1 3xl:py-2 label'>
        <span className='label-text'>{labelText}:</span>
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
