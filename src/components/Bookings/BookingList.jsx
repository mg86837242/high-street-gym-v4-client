import { useContext, useMemo, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { useLoaderData, NavLink, Outlet } from 'react-router-dom';
import { monthNames, getOrdinal } from '../../utils/mapDates';
// TODO Dup booking: same member can't book at the same time, even the trainer is available

export default function BookingList() {
  const {
    authenticatedUser: { role, memberId },
  } = useContext(AuthContext);
  const { bookings } = useLoaderData();

  if (role === 'Member') {
    if (bookings.length) {
      return <BookingListMemberView bookings={bookings} userMemberId={memberId} />;
    } else {
      return <NoBookingAuthedView />;
    }
  } else if (role === 'Trainer' || 'Admin') {
    if (bookings.length) {
      return <BookingListAdminView bookings={bookings} />;
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

function BookingListMemberView({ bookings, userMemberId }) {
  // TODO (1) no booking prompt if nothing in myBookingList, (2) my booking list view (dropdown) for trainer, but not for admin
  const [selectedValue, setSelectedValue] = useState('all-booking-list');
  const allBookingList = useMemo(
    () =>
      bookings.map(
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
        ) => {
          return userMemberId === memberId ? (
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
                  {getOrdinal(dateTime.slice(8, 10))} {monthNames[Number(dateTime.slice(5, 7))]} {dateTime.slice(0, 4)}
                </p>
                <p className='p-1 bg-base-100'>Time:</p>
                <p className='p-1 bg-base-100'>{dateTime.slice(-8)}</p>
                <p className='p-1'>Duration:</p>
                <p className='p-1'>{durationMinutes} minutes</p>
              </NavLink>
            </li>
          );
        }
      ),
    [bookings, userMemberId]
  );
  const myBookingList = useMemo(
    () =>
      bookings.map(
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
          userMemberId === memberId && (
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
    [bookings, userMemberId]
  );
  console.log('🟢');
  console.log(myBookingList);
  console.log('🟢');

  return (
    <>
      <div
        id='booking-list-wrapper'
        className='flex flex-col items-center gap-5 w-full col-[1_/_2] row-[2_/_3] lg:col-[2_/_3] lg:row-[1_/_2]'
      >
        <select
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
          className='select select-primary select-sm w-full max-w-xs'
        >
          <option value='all-booking-list'>All bookings</option>
          <option value='my-booking-list'>My bookings</option>
        </select>
        <ul className='grid justify-items-center content-start w-full gap-4'>
          {selectedValue === 'all-booking-list' ? allBookingList : myBookingList}
        </ul>
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

function BookingListAdminView({ bookings, user }) {
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
    [bookings, user]
  );

  return (
    <>
      <ul className='grid justify-items-center content-start w-full gap-4'>{bookingList}</ul>
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
