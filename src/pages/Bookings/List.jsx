import { useContext, useMemo, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { useLoaderData, NavLink, Outlet } from 'react-router-dom';
import { getDateNotation } from '../../helpers/mapDates';

export default function List() {
  const { authenticatedUser } = useContext(AuthContext);
  const { bookings } = useLoaderData();

  // PS DA `authenticatedUser` to `{ role, memberId, trainerId }` will break the code for some reason
  switch (authenticatedUser?.role) {
    case 'Member':
      return <BookingListMemberView bookings={bookings} userMemberId={authenticatedUser?.memberId} />;
    case 'Trainer':
      return <BookingListTrainerView bookings={bookings} userTrainerId={authenticatedUser?.trainerId} />;
    case 'Admin':
      if (bookings?.length) {
        return <BookingListAdminView bookings={bookings} />;
      } else {
        return <NoBookingAdminView />;
      }
    default:
      if (bookings?.length) {
        return <BookingListGuestView bookings={bookings} />;
      } else {
        return <NoBookingGuestView />;
      }
  }
}

function BookingListMemberView({ bookings, userMemberId }) {
  const [filter, setFilter] = useState('all');
  const allBookingList = useMemo(
    () =>
      bookings?.length ? (
        <ul className='grid justify-items-center content-start w-full gap-4'>
          {bookings.map(
            ({
              id,
              memberId,
              memberFirstName,
              memberLastName,
              trainerFirstName,
              trainerLastName,
              activityName,
              dateTime,
              durationMinutes,
            }) =>
              userMemberId === memberId ? (
                <li id='booking-list-card' key={id} className='w-full rounded-lg bg-base-300 max-w-[22rem]'>
                  <NavLink
                    to={`${id}`}
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
                    <p className='p-1'>{getDateNotation(dateTime)}</p>
                    <p className='p-1 bg-base-100'>Time:</p>
                    <p className='p-1 bg-base-100'>{dateTime.slice(-8)}</p>
                    <p className='p-1'>Duration:</p>
                    <p className='p-1'>{durationMinutes} minutes</p>
                  </NavLink>
                </li>
              ) : (
                <li id='booking-list-card' key={id} className='w-full rounded-lg bg-base-300 max-w-[22rem]'>
                  <NavLink to={``} className={`grid grid-cols-2 px-4 xl:px-6 py-2 cursor-auto`}>
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
                    <p className='p-1'>{getDateNotation(dateTime)}</p>
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
        <p className='text-center mt-4'>No booking found on this date</p>
      ),
    [bookings, userMemberId]
  );
  const myBookingList = useMemo(() => {
    const hasMyBooking = bookings.find(({ memberId }) => memberId === userMemberId);
    return hasMyBooking ? (
      <ul className='grid justify-items-center content-start w-full gap-4'>
        {bookings.map(
          ({
            id,
            memberId,
            memberFirstName,
            memberLastName,
            trainerFirstName,
            trainerLastName,
            activityName,
            dateTime,
            durationMinutes,
          }) =>
            memberId === userMemberId && (
              <li id='booking-list-card' key={id} className='w-full rounded-lg bg-base-300 max-w-[22rem]'>
                <NavLink
                  to={`${id}`}
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
                  <p className='p-1'>{getDateNotation(dateTime)}</p>
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
      <p className='text-center mt-4'>No booking found on this date</p>
    );
  }, [bookings, userMemberId]);

  return (
    <>
      <div
        id='booking-list-wrapper'
        className='flex flex-col items-center gap-5 w-full col-[1_/_2] row-[2_/_3] lg:col-[2_/_3] lg:row-[1_/_2]'
      >
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          aria-label='Dropdown list for filtering bookings'
          className='select select-primary select-sm w-full max-w-xs'
        >
          <option value='all'>All bookings</option>
          <option value='my'>My bookings</option>
        </select>
        {filter === 'all' ? allBookingList : myBookingList}
      </div>
      <Outlet />
    </>
  );
}

function BookingListTrainerView({ bookings, userTrainerId }) {
  const [filter, setFilter] = useState('all');
  const allBookingList = useMemo(
    () =>
      bookings?.length ? (
        <ul className='grid justify-items-center content-start w-full gap-4'>
          {bookings.map(
            ({
              id,
              trainerId,
              memberFirstName,
              memberLastName,
              trainerFirstName,
              trainerLastName,
              activityName,
              dateTime,
              durationMinutes,
            }) =>
              userTrainerId === trainerId ? (
                <li id='booking-list-card' key={id} className='w-full rounded-lg bg-base-300 max-w-[22rem]'>
                  <NavLink
                    to={`${id}`}
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
                    <p className='p-1'>{getDateNotation(dateTime)}</p>
                    <p className='p-1 bg-base-100'>Time:</p>
                    <p className='p-1 bg-base-100'>{dateTime.slice(-8)}</p>
                    <p className='p-1'>Duration:</p>
                    <p className='p-1'>{durationMinutes} minutes</p>
                  </NavLink>
                </li>
              ) : (
                <li id='booking-list-card' key={id} className='w-full rounded-lg bg-base-300 max-w-[22rem]'>
                  <NavLink to={``} className={`grid grid-cols-2 px-4 xl:px-6 py-2 cursor-auto`}>
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
                    <p className='p-1'>{getDateNotation(dateTime)}</p>
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
        <p className='text-center mt-4'>No booking found on this date</p>
      ),
    [bookings, userTrainerId]
  );
  const myBookingList = useMemo(() => {
    const hasMyBooking = bookings.find(({ trainerId }) => trainerId === userTrainerId);
    return hasMyBooking ? (
      <ul className='grid justify-items-center content-start w-full gap-4'>
        {bookings.map(
          ({
            id,
            trainerId,
            memberFirstName,
            memberLastName,
            trainerFirstName,
            trainerLastName,
            activityName,
            dateTime,
            durationMinutes,
          }) =>
            trainerId === userTrainerId && (
              <li id='booking-list-card' key={id} className='w-full rounded-lg bg-base-300 max-w-[22rem]'>
                <NavLink
                  to={`${id}`}
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
                  <p className='p-1'>{getDateNotation(dateTime)}</p>
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
      <p className='text-center mt-4'>No booking found on this date</p>
    );
  }, [bookings, userTrainerId]);

  return (
    <>
      <div
        id='booking-list-wrapper'
        className='flex flex-col items-center gap-5 w-full col-[1_/_2] row-[2_/_3] lg:col-[2_/_3] lg:row-[1_/_2]'
      >
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          aria-label='Dropdown list for filtering bookings'
          className='select select-primary select-sm w-full max-w-xs'
        >
          <option value='all'>All bookings</option>
          <option value='my'>My bookings</option>
        </select>
        {filter === 'all' ? allBookingList : myBookingList}
      </div>
      <Outlet />
    </>
  );
}

function BookingListAdminView({ bookings }) {
  const bookingList = useMemo(
    () => (
      <ul className='grid justify-items-center content-start w-full gap-4'>
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
            <li id='booking-list-card' key={id} className='w-full rounded-lg bg-base-300 max-w-[22rem]'>
              <NavLink
                to={`${id}`}
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
                <p className='p-1'>{getDateNotation(dateTime)}</p>
                <p className='p-1 bg-base-100'>Time:</p>
                <p className='p-1 bg-base-100'>{dateTime.slice(-8)}</p>
                <p className='p-1'>Duration:</p>
                <p className='p-1'>{durationMinutes} minutes</p>
              </NavLink>
            </li>
          )
        )}
      </ul>
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

function NoBookingAdminView() {
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
    () => (
      <ul
        id='booking-list-wrapper'
        className='grid justify-items-center content-start w-full gap-4 md:grid-cols-2 2xl:grid-cols-3 col-[1_/_2] row-[2_/_4] lg:col-[2_/_4] lg:row-[1_/_2]'
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
            <li id='booking-list-card' key={id} className='w-full rounded-lg bg-base-300 max-w-[22rem]'>
              <div className='grid grid-cols-2 px-4 xl:px-6 py-2'>
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
                <p className='p-1'>{getDateNotation(dateTime)}</p>
                <p className='p-1 bg-base-100'>Time:</p>
                <p className='p-1 bg-base-100'>{dateTime.slice(-8)}</p>
                <p className='p-1'>Duration:</p>
                <p className='p-1'>{durationMinutes} minutes</p>
              </div>
            </li>
          )
        )}
      </ul>
    ),
    [bookings]
  );

  return <>{bookingList}</>;
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
