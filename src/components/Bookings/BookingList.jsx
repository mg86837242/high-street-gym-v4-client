import { useContext, useMemo, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { useLoaderData, NavLink, Outlet } from 'react-router-dom';
import { monthNames, getOrdinal } from '../../utils/mapDates';

export default function BookingList() {
  const { authenticatedUser } = useContext(AuthContext);
  const { bookings } = useLoaderData();

  // PS DA `authenticatedUser` to `{role, memberId}` will break the code
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
  const [sort, setSort] = useState('all-booking-list');
  const allBookingList = useMemo(
    () =>
      bookings?.length ? (
        <ul className='grid justify-items-center content-start w-full gap-4'>
          {bookings.map(
            (
              {
                id,
                memberId,
                memberFirstName,
                memberLastName,
                trainerFirstName,
                trainerLastName,
                activityName,
                dateTime,
                durationMinutes,
              },
              i
            ) =>
              userMemberId === memberId ? (
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
              ) : (
                <li id='booking-list-card' key={i} className='w-full rounded-lg bg-base-300 max-w-[22rem]'>
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
        <p className='text-center mt-4'>No booking found on this date</p>
      ),
    [bookings, userMemberId]
  );
  const myBookingList = useMemo(() => {
    const hasMyBooking = bookings.find(({ memberId }) => memberId === userMemberId);
    return hasMyBooking ? (
      <ul className='grid justify-items-center content-start w-full gap-4'>
        {bookings.map(
          (
            {
              id,
              memberId,
              memberFirstName,
              memberLastName,
              trainerFirstName,
              trainerLastName,
              activityName,
              dateTime,
              durationMinutes,
            },
            i
          ) =>
            memberId === userMemberId && (
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
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className='select select-primary select-sm w-full max-w-xs'
        >
          <option value='all-booking-list'>All bookings</option>
          <option value='my-booking-list'>My bookings</option>
        </select>
        {sort === 'all-booking-list' ? allBookingList : myBookingList}
      </div>
      <Outlet />
    </>
  );
}

function BookingListTrainerView({ bookings, userTrainerId }) {
  const [sort, setSort] = useState('all-booking-list');
  const allBookingList = useMemo(
    () =>
      bookings?.length ? (
        <ul className='grid justify-items-center content-start w-full gap-4'>
          {bookings.map(
            (
              {
                id,
                trainerId,
                memberFirstName,
                memberLastName,
                trainerFirstName,
                trainerLastName,
                activityName,
                dateTime,
                durationMinutes,
              },
              i
            ) =>
              userTrainerId === trainerId ? (
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
              ) : (
                <li id='booking-list-card' key={i} className='w-full rounded-lg bg-base-300 max-w-[22rem]'>
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
        <p className='text-center mt-4'>No booking found on this date</p>
      ),
    [bookings, userTrainerId]
  );
  const myBookingList = useMemo(() => {
    const hasMyBooking = bookings.find(({ trainerId }) => trainerId === userTrainerId);
    return hasMyBooking ? (
      <ul className='grid justify-items-center content-start w-full gap-4'>
        {bookings.map(
          (
            {
              id,
              trainerId,
              memberFirstName,
              memberLastName,
              trainerFirstName,
              trainerLastName,
              activityName,
              dateTime,
              durationMinutes,
            },
            i
          ) =>
            trainerId === userTrainerId && (
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
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className='select select-primary select-sm w-full max-w-xs'
        >
          <option value='all-booking-list'>All bookings</option>
          <option value='my-booking-list'>My bookings</option>
        </select>
        {sort === 'all-booking-list' ? allBookingList : myBookingList}
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
