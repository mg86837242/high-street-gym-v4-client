import { useMemo } from 'react';
import { getDateNotation } from '../../helpers/mapDates';

export default function BookingListGuestView({ bookings }) {
  const bookingList = useMemo(
    () => (
      <ul
        id='booking-list-wrapper'
        className='col-[1_/_2] row-[2_/_4] grid w-full content-start justify-items-center gap-4 md:grid-cols-2 lg:col-[2_/_4] lg:row-[1_/_2] 2xl:grid-cols-3'
      >
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
              <div className='grid grid-cols-2 px-4 py-2 xl:px-6'>
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
              </div>
            </li>
          ),
        )}
      </ul>
    ),
    [bookings],
  );

  return <>{bookingList}</>;
}
