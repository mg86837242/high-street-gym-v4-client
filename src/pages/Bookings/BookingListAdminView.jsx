import { useMemo } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { getDateNotation } from '../../helpers/mapDates';

export default function BookingListAdminView({ bookings }) {
  const bookingList = useMemo(
    () => (
      <ul className='grid w-full content-start justify-items-center gap-4'>
        {bookings.map(
          ({
            id,
            memberFirstName,
            memberLastName,
            trainerFirstName,
            trainerLastName,
            activityName,
            dateTime,
            durationMinutes,
          }) => (
            <li id={`booking-list-card-${id}`} key={id} className='w-full max-w-[22rem] rounded-lg bg-base-300'>
              <NavLink
                to={`${id}`}
                className={({ isActive, isPending }) =>
                  `grid grid-cols-2 px-4 py-2 xl:px-6 ${isActive && 'rounded-lg ring ring-secondary-focus'} ${
                    isPending && ''
                  }`
                }
              >
                <p className='p-1'>Booking ID:</p>
                <p className='p-1'>{id}</p>
                <p className='bg-base-100 p-1'>Member:</p>
                <p className='bg-base-100 p-1'>
                  {memberFirstName} {memberLastName}
                </p>
                <p className='p-1'>Trainer:</p>
                <p className='p-1'>
                  {trainerFirstName} {trainerLastName}
                </p>
                <p className='bg-base-100 p-1'>Activity:</p>
                <p className='bg-base-100 p-1'>{activityName}</p>
                <p className='p-1'>Date:</p>
                <p className='p-1'>{getDateNotation(dateTime)}</p>
                <p className='bg-base-100 p-1'>Time:</p>
                <p className='bg-base-100 p-1'>{dateTime.slice(-8)}</p>
                <p className='p-1'>Duration:</p>
                <p className='p-1'>{durationMinutes} minutes</p>
              </NavLink>
            </li>
          ),
        )}
      </ul>
    ),
    [bookings],
  );

  return (
    <>
      {bookingList}
      <Outlet />
    </>
  );
}
