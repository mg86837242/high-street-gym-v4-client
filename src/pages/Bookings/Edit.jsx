import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useLoaderData, Form, useNavigate } from 'react-router-dom';
import { tomorrowStr, threeWeeksLaterStr } from '../../data/keyDates';

export default function Edit() {
  const { authenticatedUser } = useContext(AuthContext);
  const { booking, members, trainers, activities } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div
      id='booking-edit-wrapper'
      className='grid content-start w-full lg:w-fit justify-items-center col-[1_/_2] row-[3_/_4] lg:col-[3_/_4] lg:row-[1_/_2] lg:min-h-[80vh] lg:sticky lg:top-28 lg:justify-self-start'
    >
      <div
        id='booking-edit-form-wrapper'
        className='flex flex-col w-full gap-5 px-4 py-4 rounded-lg bg-base-300 max-w-[22rem] lg:max-w-[30rem] xl:px-6'
      >
        <h1 className='text-center text-secondary'>Edit Booking</h1>
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
              defaultValue={activities.find(a => a.id === booking.activityId).id}
              required
              className='text-base font-normal select select-bordered select-sm'
            >
              <option disabled>-- Choose Activity --</option>
              {activities.map((a, i) => (
                <option value={a.id} key={i}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>
          <label
            id='date-select-group'
            className='input-group grid grid-cols-1 xl:grid-cols-[minmax(1rem,_1fr)_minmax(3rem,_3fr)]'
          >
            <span className='p-0'>Date:</span>
            <input
              name='date'
              type='date'
              min={tomorrowStr}
              max={threeWeeksLaterStr}
              defaultValue={booking.dateTime.slice(0, 10)}
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
              defaultValue={booking.dateTime.slice(-8)}
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
                defaultValue={authenticatedUser.memberId}
                required
                className='text-base font-normal select select-bordered select-sm'
              >
                <option disabled>-- Choose Member --</option>
                {members
                  .filter(m => m.id === authenticatedUser.memberId)
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
                defaultValue={members.find(m => m.id === booking.memberId).id}
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
                defaultValue={authenticatedUser.trainerId}
                required
                className='text-base font-normal select select-bordered select-sm'
              >
                <option disabled>-- Choose Trainer --</option>
                {trainers
                  .filter(t => t.id === authenticatedUser.trainerId)
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
                defaultValue={trainers.find(t => t.id === booking.trainerId).id}
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
              className='h-10 min-h-0 shadow btn btn-secondary text-primary-content shadow-black/50 w-36 lg:w-[6.5rem] xl:w-36'
            >
              Submit
            </button>
            <button
              type='button'
              onClick={() => navigate(-1)}
              className='h-10 min-h-0 shadow btn glass bg-base-100 text-accent-content shadow-black/50 w-36 lg:w-[6.5rem] xl:w-36'
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
