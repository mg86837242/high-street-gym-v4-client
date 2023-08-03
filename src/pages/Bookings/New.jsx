import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useLoaderData, Form, useNavigate } from 'react-router-dom';
import { tomorrowStr, threeWeeksLaterStr } from '../../data/keyDates';

export default function New() {
  const auth = useContext(AuthContext);
  const { members, trainers, activities } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div
      id='booking-new-wrapper'
      className='col-[1_/_2] row-[2_/_3] grid w-full content-start justify-items-center lg:sticky lg:top-28 lg:col-[2_/_3] lg:row-[1_/_2] lg:min-h-[80vh]'
    >
      <div
        id='booking-new-form-wrapper'
        className='flex w-[22rem] flex-col gap-5 rounded-lg bg-base-300 px-4 pb-4 pt-2 xl:w-[30rem] xl:px-6 3xl:pt-4'
      >
        <h1 className='text-center text-secondary'>New Booking</h1>
        <p>
          <em>
            Note: If the specified member or trainer is not available at the specified time, the booking will get
            denied.
          </em>
        </p>
        <Form method='post' className='flex flex-col gap-5'>
          <label
            id='activity-select-group'
            className='input-group grid grid-cols-1 xl:grid-cols-[minmax(1rem,_1fr)_minmax(3rem,_3fr)]'
          >
            <span className='p-0'>Activity:</span>
            <select
              name='activityId'
              defaultValue={'-- Choose Activity --'}
              required
              className='select select-bordered select-sm text-base font-normal'
            >
              <option disabled>-- Choose Activity --</option>
              {activities.map((a, i) => {
                return (
                  <option value={a.id} key={i}>
                    {a.name}
                  </option>
                );
              })}
            </select>
          </label>
          <label
            id='date-select-group'
            className='input-group grid grid-cols-1 xl:grid-cols-[minmax(1rem,_1fr)_minmax(3rem,_3fr)]'
          >
            <span className='p-0'>Date:</span>
            <input
              type='date'
              name='date'
              defaultValue={tomorrowStr}
              min={tomorrowStr}
              max={threeWeeksLaterStr}
              required
              className='input input-bordered input-sm text-base'
            />
          </label>
          <label
            id='time-select-group'
            className='input-group grid grid-cols-1 xl:grid-cols-[minmax(1rem,_1fr)_minmax(3rem,_3fr)]'
          >
            <span className='p-0'>Time:</span>
            <select
              name='time'
              defaultValue={`-- Choose Booking Time --`}
              required
              className='select select-bordered select-sm text-base font-normal'
            >
              <option disabled>-- Choose Booking Time --</option>
              {[...Array(10)].map((_, i) => (
                <option value={i < 2 ? `0${8 + i}:00:00` : `${8 + i}:00:00`} key={i}>
                  {i < 2 ? `0${8 + i}:00` : `${8 + i}:00`}
                </option>
              ))}
            </select>
          </label>
          {auth.user?.memberId ? (
            <label
              id='member-select-group'
              className='input-group grid grid-cols-1 xl:grid-cols-[minmax(1rem,_1fr)_minmax(3rem,_3fr)]'
            >
              <span className='p-0'>Member:</span>
              <select
                name='memberId'
                defaultValue={auth.user.memberId}
                required
                className='select select-bordered select-sm text-base font-normal'
              >
                <option disabled>-- Choose Member --</option>
                {members
                  .filter(m => m.id === auth.user.memberId)
                  .map((m, i) => (
                    <option value={m.id} key={i}>
                      {m.firstName} {m.lastName}
                    </option>
                  ))}
              </select>
            </label>
          ) : (
            <label
              id='member-select-group'
              className='input-group grid grid-cols-1 xl:grid-cols-[minmax(1rem,_1fr)_minmax(3rem,_3fr)]'
            >
              <span className='p-0'>Member:</span>
              <select
                name='memberId'
                defaultValue={'-- Choose Member --'}
                required
                className='select select-bordered select-sm text-base font-normal'
              >
                <option disabled>-- Choose Member --</option>
                {members.map((m, i) => (
                  <option value={m.id} key={i}>
                    {m.firstName} {m.lastName}
                  </option>
                ))}
              </select>
            </label>
          )}
          {auth.user?.trainerId ? (
            <label
              id='trainer-select-group'
              className='input-group grid grid-cols-1 xl:grid-cols-[minmax(1rem,_1fr)_minmax(3rem,_3fr)]'
            >
              <span className='p-0'>Trainer:</span>
              <select
                name='trainerId'
                defaultValue={auth.user.trainerId}
                required
                className='select select-bordered select-sm text-base font-normal'
              >
                <option disabled>-- Choose Trainer --</option>
                {trainers
                  .filter(t => t.id === auth.user.trainerId)
                  .map((t, i) => (
                    <option value={t.id} key={i}>
                      {t.firstName} {t.lastName}
                    </option>
                  ))}
              </select>
            </label>
          ) : (
            <label
              id='trainer-select-group'
              className='input-group grid grid-cols-1 xl:grid-cols-[minmax(1rem,_1fr)_minmax(3rem,_3fr)]'
            >
              <span className='p-0'>Trainer:</span>
              <select
                name='trainerId'
                defaultValue={'-- Choose Trainer --'}
                required
                className='select select-bordered select-sm text-base font-normal'
              >
                <option disabled>-- Choose Trainer --</option>
                {trainers.map((t, i) => (
                  <option value={t.id} key={i}>
                    {t.firstName} {t.lastName}
                  </option>
                ))}
              </select>
            </label>
          )}
          <div className='flex justify-between gap-5 text-center'>
            <button
              type='submit'
              className='btn btn-secondary h-10 min-h-0 w-36 text-primary-content shadow shadow-black/50 lg:w-[6.5rem] xl:w-36'
            >
              Submit
            </button>
            <button
              type='button'
              onClick={() => {
                navigate(-1);
              }}
              className='btn glass h-10 min-h-0 w-36 bg-base-100 text-accent-content shadow shadow-black/50 lg:w-[6.5rem] xl:w-36'
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
