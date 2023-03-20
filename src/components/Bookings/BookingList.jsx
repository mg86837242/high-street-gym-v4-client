import { useMemo } from 'react';
import { useLoaderData, NavLink, Outlet } from 'react-router-dom';
import { monthNames, getOrdinal } from '../../utils/mapDates';

export default function BookingList() {
  const { bookings } = useLoaderData();
  const bookingList = useMemo(
    () =>
      bookings.length ? (
        // FIX This booking list component should take 2/3 of the right screen should the user is not logged in
        <ul
          id='booking-list-wrapper'
          className='grid content-start w-full gap-5 justify-items-center col-[1_/_2] row-[2_/_3] lg:col-[2_/_3] lg:row-[1_/_2]'
        >
          {bookings.map(
            (
              {
                id,
                memberFirstName,
                memberLastName,
                trainerFirstName,
                trainerLastName,
                activityName,
                dateTime,
                durationMinutes,
              },
              i
            ) => (
              <li id='booking-list-card' key={i} className='w-full rounded-lg bg-base-300 max-w-[22rem]'>
                <NavLink
                  to={`id/${id}`}
                  className={({ isActive, isPending }) =>
                    `grid grid-cols-2 px-4 xl:px-6 py-2 ${isActive && 'ring ring-secondary-focus rounded-lg'} ${
                      isPending && ''
                    }`
                  }
                >
                  <p className='p-1'>Booking ID:</p>
                  <p className='p-1'>{id}</p>
                  <p className='p-1 bg-base-100'>Member:</p>
                  <p className='p-1 bg-base-100'>
                    {memberFirstName} {memberLastName}
                  </p>
                  <p className='p-1'>Trainer:</p>
                  <p className='p-1'>
                    {trainerFirstName} {trainerLastName}
                  </p>
                  <p className='p-1 bg-base-100'>Activity:</p>
                  <p className='p-1 bg-base-100'>{activityName}</p>
                  <p className='p-1'>Date:</p>
                  <p className='p-1'>
                    {dateTime.slice(8, 9) === '0' ? dateTime.slice(9, 10) : dateTime.slice(8, 10)}
                    {getOrdinal(dateTime.slice(8, 10))} {monthNames[Number(dateTime.slice(5, 7))]}{' '}
                    {dateTime.slice(0, 4)}
                  </p>
                  <p className='p-1 bg-base-100'>Time:</p>
                  <p className='p-1 bg-base-100'>{dateTime.slice(-8)}</p>
                  <p className='p-1'>Duration:</p>
                  <p className='p-1'>{durationMinutes} minutes</p>
                </NavLink>
              </li>
            )
          )}
        </ul>
      ) : (
        <div
          id='booking-list-wrapper'
          className='w-full lg:grid lg:place-items-center col-[1_/_2] row-[2_/_3] lg:col-[2_/_3] lg:row-[1_/_2] lg:min-h-[80vh] lg:sticky lg:top-28'
        >
          <p className='text-lg'>😢 No booking found on this date.</p>
        </div>
      ),
    [bookings]
  );

  return (
    <>
      {bookingList}
      <Outlet />
    </>
  );
}
