import { useContext, useMemo } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { useLoaderData, NavLink, Outlet } from 'react-router-dom';
import { monthNames, getOrdinal } from '../../utils/mapDates';
// TODO Dup booking: same member can't book at the same time, even the trainer is available

export default function BookingList() {
  const { authenticatedUser } = useContext(AuthContext);
  const { bookings } = useLoaderData();

  if (authenticatedUser) {
    if (bookings.length) {
      return <BookingListAuthedView bookings={bookings} user={authenticatedUser} />;
    } else {
      return <NoBookingAuthedView />;
    }
  } else {
    if (bookings.length) {
      return <BookingListGuestView bookings={bookings} />;
    } else {
      return <NoBookingGuestView />;
    }
  }
}

function BookingListAuthedView({ bookings, user }) {
  // TODO (1) if user.memberId same, link to details, (2) if user.memberId not the same, no link to details, (3) my booking list view (dropdown), with all list having the link to details
  const bookingList = useMemo(
    () =>
      bookings.map(
        (
          {
            id,
            memberId,
            memberFirstName,
            memberLastName,
            trainerId,
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
                {getOrdinal(dateTime.slice(8, 10))} {monthNames[Number(dateTime.slice(5, 7))]} {dateTime.slice(0, 4)}
              </p>
              <p className='p-1 bg-base-100'>Time:</p>
              <p className='p-1 bg-base-100'>{dateTime.slice(-8)}</p>
              <p className='p-1'>Duration:</p>
              <p className='p-1'>{durationMinutes} minutes</p>
            </NavLink>
          </li>
        )
      ),
    [bookings]
  );

  return (
    <>
      <div
        id='booking-list-wrapper'
        className='flex flex-col items-center gap-5 w-full col-[1_/_2] row-[2_/_3] lg:col-[2_/_3] lg:row-[1_/_2]'
      >
        <select className='select select-primary select-sm w-full max-w-xs'>
          <option>All bookings</option>
          <option>My bookings</option>
        </select>
        <ul className='grid justify-items-center content-start w-full gap-4'>{bookingList}</ul>
      </div>
      <Outlet />
    </>
  );
}

function NoBookingAuthedView() {
  return (
    <>
      <div
        id='empty-list-wrapper'
        className='grid w-full place-items-center col-[1_/_2] row-[2_/_3] lg:col-[2_/_3] lg:row-[1_/_2] lg:min-h-[80vh] lg:sticky lg:top-28'
      >
        <p className='text-lg'>😢 No booking found on this date.</p>
      </div>
      <Outlet />
    </>
  );
}

function BookingListGuestView({ bookings }) {
  const bookingList = useMemo(
    () =>
      bookings.map(
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
                {getOrdinal(dateTime.slice(8, 10))} {monthNames[Number(dateTime.slice(5, 7))]} {dateTime.slice(0, 4)}
              </p>
              <p className='p-1 bg-base-100'>Time:</p>
              <p className='p-1 bg-base-100'>{dateTime.slice(-8)}</p>
              <p className='p-1'>Duration:</p>
              <p className='p-1'>{durationMinutes} minutes</p>
            </NavLink>
          </li>
        )
      ),
    [bookings]
  );

  return (
    <ul
      id='booking-list-wrapper'
      className='grid justify-items-center content-start w-full gap-4 md:grid-cols-2 2xl:grid-cols-3 col-[1_/_2] row-[2_/_4] lg:col-[2_/_4] lg:row-[1_/_2]'
    >
      {bookingList}
    </ul>
  );
}

function NoBookingGuestView() {
  return (
    <div
      id='empty-list-wrapper'
      className='grid w-full place-items-center col-[1_/_2] row-[2_/_4] lg:col-[2_/_4] lg:row-[1_/_2] lg:min-h-[80vh] lg:sticky lg:top-28'
    >
      <p className='text-lg'>😢 No booking found on this date.</p>
    </div>
  );
}
