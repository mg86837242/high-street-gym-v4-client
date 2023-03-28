import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { useLoaderData, Form, useNavigate } from 'react-router-dom';
import { tomorrowStr, threeWeeksLaterStr } from '../../data/keyDates';

export default function BookingNew() {
  const { authenticatedUser } = useContext(AuthContext);
  const { members, trainers, activities } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div
      id='booking-new-wrapper'
      className='grid content-start w-full justify-items-center col-[1_/_2] row-[2_/_3] lg:col-[2_/_3] lg:row-[1_/_2] lg:min-h-[80vh] lg:sticky lg:top-28'
    >
      <div
        id='booking-new-form-wrapper'
        className='flex flex-col gap-5 px-4 pt-2 pb-4 rounded-lg bg-base-300 w-[22rem] xl:w-[30rem] xl:px-6 3xl:pt-4'
      >
        <h1 className='text-center text-secondary'>New Booking</h1>
        <p>
          Note: If the specified member or trainer is not available at the specified time, the booking will get denied.
        </p>
        <Form method='post' className='flex flex-col gap-5'>
          <label
            id='activity-select-group'
            className='input-group grid grid-cols-1 xl:grid-cols-[minmax(1rem,_1fr)_minmax(3rem,_3fr)]'
          >
            <span className='p-0'>Activity:</span>
            <select
              name='activityId'
              initialValue={'-- Choose Activity --'}
              required
              className='text-base font-normal select select-bordered select-sm'
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
              initialValue={tomorrowStr}
              min={tomorrowStr}
              max={threeWeeksLaterStr}
              required
              className='text-base input input-bordered input-sm'
            />
          </label>
          <label
            id='time-select-group'
            className='input-group grid grid-cols-1 xl:grid-cols-[minmax(1rem,_1fr)_minmax(3rem,_3fr)]'
          >
            <span className='p-0'>Time:</span>
            <select
              name='time'
              initialValue={`-- Choose Booking Time --`}
              required
              className='text-base font-normal select select-bordered select-sm'
            >
              <option disabled>-- Choose Booking Time --</option>
              {[...Array(10)].map((_, i) => (
                <option value={i < 2 ? `0${8 + i}:00:00` : `${8 + i}:00:00`} key={i}>
                  {i < 2 ? `0${8 + i}:00` : `${8 + i}:00`}
                </option>
              ))}
            </select>
          </label>
          {authenticatedUser?.memberId ? (
            <label
              id='member-select-group'
              className='input-group grid grid-cols-1 xl:grid-cols-[minmax(1rem,_1fr)_minmax(3rem,_3fr)]'
            >
              <span className='p-0'>Member:</span>
              <select
                name='memberId'
                initialValue={authenticatedUser.memberId}
                required
                className='text-base font-normal select select-bordered select-sm'
              >
                <option disabled>-- Choose Member --</option>
                {members
                  .filter((m) => m.id === authenticatedUser.memberId)
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
                initialValue={'-- Choose Member --'}
                required
                className='text-base font-normal select select-bordered select-sm'
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
          {authenticatedUser?.trainerId ? (
            <label
              id='trainer-select-group'
              className='input-group grid grid-cols-1 xl:grid-cols-[minmax(1rem,_1fr)_minmax(3rem,_3fr)]'
            >
              <span className='p-0'>Trainer:</span>
              <select
                name='trainerId'
                initialValue={authenticatedUser.trainerId}
                required
                className='text-base font-normal select select-bordered select-sm'
              >
                <option disabled>-- Choose Trainer --</option>
                {trainers
                  .filter((t) => t.id === authenticatedUser.trainerId)
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
                initialValue={'-- Choose Trainer --'}
                required
                className='text-base font-normal select select-bordered select-sm'
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
              className='h-10 min-h-0 normal-case shadow btn btn-secondary text-primary-content shadow-black/50 w-36 lg:w-[6.5rem] xl:w-36'
            >
              Submit
            </button>
            <button
              type='button'
              onClick={() => {
                navigate(-1);
              }}
              className='h-10 min-h-0 normal-case shadow btn glass bg-base-100 text-accent-content shadow-black/50 w-36 lg:w-[6.5rem] xl:w-36'
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
