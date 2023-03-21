import { useLoaderData, Form, useNavigate } from 'react-router-dom';
import { tomorrowStr, threeWeeksLaterStr } from '../../data/keyDates';

export default function BookingNew() {
  const { members, trainers, activities } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div
      id='booking-new-wrapper'
      className='grid justify-items-center content-start col-[1_/_2] row-[2_/_3] lg:col-[2_/_3] lg:row-[1_/_2] w-full lg:min-h-[80vh] lg:sticky lg:top-28'
    >
      <div
        id='booking-new-form-wrapper'
        className='flex flex-col gap-5 bg-base-300 rounded-lg w-[22rem] xl:w-[30rem] px-4 xl:px-6 pt-2 3xl:pt-4 pb-4'
      >
        <h1 className='text-secondary text-center'>New Booking</h1>
        <p>Note: If the specified trainer is not available in the specified time range, the booking will get denied.</p>
        <Form method='post' className='flex flex-col gap-5'>
          <label className='input-group grid grid-cols-1 xl:grid-cols-[minmax(1rem,_1fr)_minmax(3rem,_3fr)]'>
            <span className='p-0'>Activity:</span>
            <select
              name='activityId'
              defaultValue={activities[0]}
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
          <label className='input-group grid grid-cols-1 xl:grid-cols-[minmax(1rem,_1fr)_minmax(3rem,_3fr)]'>
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
          <label className='input-group grid grid-cols-1 xl:grid-cols-[minmax(1rem,_1fr)_minmax(3rem,_3fr)]'>
            <span className='p-0'>Time:</span>
            <select
              name='time'
              defaultValue={`08:00:00`}
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
          <label className='input-group grid grid-cols-1 xl:grid-cols-[minmax(1rem,_1fr)_minmax(3rem,_3fr)]'>
            <span className='p-0'>Member:</span>
            <select
              name='memberId'
              defaultValue={members[0]}
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
          <label className='input-group grid grid-cols-1 xl:grid-cols-[minmax(1rem,_1fr)_minmax(3rem,_3fr)]'>
            <span className='p-0'>Trainer:</span>
            <select
              name='trainerId'
              defaultValue={trainers[0]}
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
          <div className='flex justify-between gap-5 text-center'>
            {/* These `<button>`s are already wrapped within a `<Form>` */}
            <button
              type='submit'
              className='btn btn-secondary text-primary-content normal-case shadow shadow-black/50 min-h-0 w-36 lg:w-[6.5rem] xl:w-36 h-10'
            >
              Submit
            </button>
            <button
              type='button'
              onClick={() => {
                navigate(-1);
              }}
              className='btn glass bg-base-100 text-accent-content normal-case shadow shadow-black/50 min-h-0 w-36 lg:w-[6.5rem] xl:w-36 h-10'
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
