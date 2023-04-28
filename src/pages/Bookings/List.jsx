import { useContext, useMemo, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { useLoaderData, NavLink, Outlet } from 'react-router-dom';
import { getDateNotation } from '../../helpers/mapDates';

export default function List() {
  const auth = useContext(AuthContext);
  const { bookings } = useLoaderData();

  // PS DA `auth.user` to `{ role, memberId, trainerId }` will break the code b/c there's a state in which
  //  `auth.user` is not populated
  switch (auth.user?.role) {
    case 'Member':
      return <BookingListMemberView bookings={bookings} authUserMemberId={auth.user?.memberId} />;
    case 'Trainer':
      return <BookingListTrainerView bookings={bookings} authUserTrainerId={auth.user?.trainerId} />;
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

function BookingListMemberView({ bookings, authUserMemberId }) {
  const [filter, setFilter] = useState('all');
  const allBookingList = useMemo(
    () =>
      bookings?.length ? (
        <ul className='grid w-full content-start justify-items-center gap-4'>
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
              authUserMemberId === memberId ? (
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
              ) : (
                <li id={`booking-list-card-${id}`} key={id} className='w-full max-w-[22rem] rounded-lg bg-base-300'>
                  <NavLink to={``} className={`grid cursor-auto grid-cols-2 px-4 py-2 xl:px-6`}>
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
      ) : (
        <p className='mt-4 text-center'>No booking found on this date</p>
      ),
    [bookings, authUserMemberId],
  );
  const myBookingList = useMemo(() => {
    const hasMyBooking = bookings.some(({ memberId }) => memberId === authUserMemberId);
    return hasMyBooking ? (
      <ul className='grid w-full content-start justify-items-center gap-4'>
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
            memberId === authUserMemberId && (
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
    ) : (
      <p className='mt-4 text-center'>No booking found on this date</p>
    );
  }, [bookings, authUserMemberId]);

  return (
    <>
      <div
        id='booking-list-wrapper'
        className='col-[1_/_2] row-[2_/_3] flex w-full flex-col items-center gap-5 lg:col-[2_/_3] lg:row-[1_/_2]'
      >
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          aria-label='Dropdown list for filtering bookings'
          className='select-primary select select-sm w-full max-w-xs'
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

function BookingListTrainerView({ bookings, authUserTrainerId }) {
  const [filter, setFilter] = useState('all');
  const allBookingList = useMemo(
    () =>
      bookings?.length ? (
        <ul className='grid w-full content-start justify-items-center gap-4'>
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
              authUserTrainerId === trainerId ? (
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
              ) : (
                <li id={`booking-list-card-${id}`} key={id} className='w-full max-w-[22rem] rounded-lg bg-base-300'>
                  <NavLink to={``} className={`grid cursor-auto grid-cols-2 px-4 py-2 xl:px-6`}>
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
      ) : (
        <p className='mt-4 text-center'>No booking found on this date</p>
      ),
    [bookings, authUserTrainerId],
  );
  const myBookingList = useMemo(() => {
    const hasMyBooking = bookings.some(({ trainerId }) => trainerId === authUserTrainerId);
    return hasMyBooking ? (
      <ul className='grid w-full content-start justify-items-center gap-4'>
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
            trainerId === authUserTrainerId && (
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
    ) : (
      <p className='mt-4 text-center'>No booking found on this date</p>
    );
  }, [bookings, authUserTrainerId]);

  return (
    <>
      <div
        id='booking-list-wrapper'
        className='col-[1_/_2] row-[2_/_3] flex w-full flex-col items-center gap-5 lg:col-[2_/_3] lg:row-[1_/_2]'
      >
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          aria-label='Dropdown list for filtering bookings'
          className='select-primary select select-sm w-full max-w-xs'
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

function NoBookingAdminView() {
  return (
    <>
      <div
        id='empty-list-wrapper'
        className='col-[1_/_2] row-[2_/_3] grid w-full place-items-center lg:sticky lg:top-28 lg:col-[2_/_3] lg:row-[1_/_2] lg:min-h-[80vh]'
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

function NoBookingGuestView() {
  return (
    <div
      id='empty-list-wrapper'
      className='col-[1_/_2] row-[2_/_4] grid w-full place-items-center lg:sticky lg:top-28 lg:col-[2_/_4] lg:row-[1_/_2] lg:min-h-[80vh]'
    >
      <p className='text-lg'>😢 No booking found on this date.</p>
    </div>
  );
}
