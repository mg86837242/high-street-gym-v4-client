import { useLoaderData, useFetcher, Form } from 'react-router-dom';
import { getDateNotation } from '../../helpers/mapDates';

export default function Details() {
  const fetcher = useFetcher();

  const {
    booking: {
      id,
      dateTime,
      memberFirstName,
      memberLastName,
      memberPhone,
      memberEmail,
      trainerFirstName,
      trainerLastName,
      trainerPhone,
      trainerEmail,
      activityName,
      category,
      description,
      intensityLevel,
      requirementOne,
      requirementTwo,
      durationMinutes,
      price,
    },
  } = useLoaderData();

  return (
    <div
      id='booking-details-wrapper'
      className='col-[1_/_2] row-[3_/_4] grid w-full content-start justify-items-center lg:sticky lg:top-28 lg:col-[3_/_4] lg:row-[1_/_2] lg:min-h-[80vh] lg:w-fit lg:justify-self-start'
    >
      <div
        id='booking-details-table'
        role='table'
        aria-label='Table containing booking detail information'
        aria-rowcount='19'
        className='flex w-full max-w-[22rem] flex-col gap-2 rounded-lg bg-base-300 px-4 pb-4 pt-2 lg:max-w-[30rem] xl:px-6 3xl:gap-5 3xl:pt-4'
      >
        <h1 className='text-center text-secondary max-3xl:mb-0'>Booking Details</h1>
        <div className='3xl:text:base grid grid-cols-[minmax(1rem,_2fr)_minmax(2rem,_3fr)] text-sm'>
          <p className='bg-base-100 px-1 py-0.5 3xl:py-1'>Booking ID: </p>
          <p className='bg-base-100 px-1 py-0.5 3xl:py-1'>{id}</p>
          <p className='px-1 py-0.5 3xl:py-1'>Date:</p>
          <p className='px-1 py-0.5 3xl:py-1'>{getDateNotation(dateTime)}</p>
          <p className='bg-base-100 px-1 py-0.5 3xl:py-1'>Time:</p>
          <p className='bg-base-100 px-1 py-0.5 3xl:py-1'>{dateTime.slice(-8)}</p>
          <p className='px-1 py-0.5 3xl:py-1'>Activity:</p>
          <p className='px-1 py-0.5 3xl:py-1'>{activityName}</p>
          <p className='bg-base-100 px-1 py-0.5 3xl:py-1'>Category:</p>
          <p className='bg-base-100 px-1 py-0.5 3xl:py-1'>{category}</p>
          <p className='px-1 py-0.5 3xl:py-1'>Description:</p>
          <p className='px-1 py-0.5 3xl:py-1'>{description}</p>
          <p className='bg-base-100 px-1 py-0.5 3xl:py-1'>Intensity Level:</p>
          <p className='bg-base-100 px-1 py-0.5 3xl:py-1'>{intensityLevel}</p>
          <p className='px-1 py-0.5 3xl:py-1'>Requirement:</p>
          <p className='px-1 py-0.5 3xl:py-1'>{requirementOne}</p>
          <p className='px-1 py-0.5 3xl:py-1'></p>
          <p className='px-1 py-0.5 3xl:py-1'>{requirementTwo}</p>
          <p className='bg-base-100 px-1 py-0.5 3xl:py-1'>Duration:</p>
          <p className='bg-base-100 px-1 py-0.5 3xl:py-1'>{durationMinutes} minutes</p>
          <p className='px-1 py-0.5 3xl:py-1'>Price:</p>
          <p className='px-1 py-0.5 3xl:py-1'>$ {price}</p>
          <p className='bg-base-100 px-1 py-0.5 3xl:py-1'>Member:</p>
          <p className='bg-base-100 px-1 py-0.5 3xl:py-1'>
            {memberFirstName} {memberLastName}
          </p>
          <p className='px-1 py-0.5 3xl:py-1'>Phone:</p>
          <p className='px-1 py-0.5 3xl:py-1'>{memberPhone}</p>
          <p className='bg-base-100 px-1 py-0.5 3xl:py-1'>Email:</p>
          <p className='bg-base-100 px-1 py-0.5 3xl:py-1'>{memberEmail}</p>
          <p className='px-1 py-0.5 3xl:py-1'>Trainer:</p>
          <p className='px-1 py-0.5 3xl:py-1'>
            {trainerFirstName} {trainerLastName}
          </p>
          <p className='bg-base-100 px-1 py-0.5 3xl:py-1'>Phone:</p>
          <p className='bg-base-100 px-1 py-0.5 3xl:py-1'>{trainerPhone}</p>
          <p className='px-1 py-0.5 3xl:py-1'>Email:</p>
          <p className='px-1 py-0.5 3xl:py-1'>{trainerEmail}</p>
        </div>
        <div className='flex justify-between gap-5 text-center'>
          <Form action='edit'>
            <button className='btn-secondary btn h-10 min-h-0 w-36 text-primary-content shadow shadow-black/50 lg:w-[6.5rem] xl:w-36'>
              Edit
            </button>
          </Form>
          <fetcher.Form
            method='post'
            action='destroy'
            onSubmit={e => {
              // TODO Convert to a modal dialog, see: https://react.dev/reference/react/useEffect#connecting-to-an-external-system, extending to other destroy actions
              if (!confirm('Please confirm you want to delete this booking.')) {
                e.preventDefault();
              }
            }}
          >
            <button
              type='submit'
              className='glass btn h-10 min-h-0 w-36 bg-base-100 text-accent-content shadow shadow-black/50 lg:w-[6.5rem] xl:w-36'
            >
              Delete
            </button>
          </fetcher.Form>
        </div>
      </div>
    </div>
  );
}
