import { useContext, useState } from 'react';
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

  // TODO (1) edit testing rhf, (2) delete buttons by using RRD action. (3) new button that jump to edit
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
  } = useForm({
    resolver: zodResolver(activitySchema),
  });

  return (
    <div className='grid px-4 py-6 place-items-center'>
      <form onSubmit={handleSubmit((_formData) => console.log(_formData))} noValidate className='flex flex-col gap-3'>
        <div>
          <label>Name:</label>
          <input {...register('name')} />
          {errors.name?.message && <p>{errors.name?.message}</p>}
        </div>
        <div>
          <label>Category:</label>
          <input {...register('category')} />
          {errors.category?.message && <p>{errors.category?.message}</p>}
        </div>
        <div>
          <label>Description:</label>
          <input {...register('description')} />
          {errors.description?.message && <p>{errors.description?.message}</p>}
        </div>
        <div>
          <label>Intensity Level:</label>
          <input {...register('intensityLevel')} />
          {errors.intensityLevel?.message && <p>{errors.intensityLevel?.message}</p>}
        </div>
        <div>
          <label>Max People Allowed:</label>
          <input {...register('maxPeopleAllowed')} />
          {errors.maxPeopleAllowed?.message && <p>{errors.maxPeopleAllowed?.message}</p>}
        </div>
        <div>
          <label>Requriement 1:</label>
          <input {...register('requirementOne')} />
          {errors.requirementOne?.message && <p>{errors.requirementOne?.message}</p>}
        </div>
        <div>
          <label>Requriement 2:</label>
          <input {...register('requirementTwo')} />
          {errors.requirementTwo?.message && <p>{errors.requirementTwo?.message}</p>}
        </div>
        <div>
          <label>Duration (minutes):</label>
          <input {...register('durationMinutes')} />
          {errors.durationMinutes?.message && <p>{errors.durationMinutes?.message}</p>}
        </div>
        <div>
          <label>Price:</label>
          <input {...register('price', { valueAsNumber: true })} />
          {errors.price?.message && <p>{errors.price?.message}</p>}
        </div>
        <button type='submit'>Save</button>
      </form>
    </div>
  );
}

export function AdminEditActivityNoRHF() {
  const { activity } = useLoaderData();
  console.log(activity);
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
    <div className='grid grid-cols-2 px-4 py-6 place-items-center xl:grid-cols-3 gap-x-2'>
      <form onSubmit={() => console.log(formData)}>
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
