import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { Outlet, NavLink, Navigate, useLoaderData, useActionData, Form } from 'react-router-dom';
import useData from '../../hooks/useFetchData';
import { API_URL } from '../../data/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import InputSmallGroupEmail from '../UI/InputSmallGroupEmail';
import InputSmallGroupPass from '../UI/InputSmallGroupPass';
import InputSmallGroup from '../UI/InputSmallGroup';
import SelectSmallGroupGender from '../UI/SelectSmallGroupGender';
import SelectSmallGroupCountry from '../UI/SelectSmallGroupCountry';

export function ProfilePanel() {
  return (
    <div id='profile-panel-wrapper' className='flex flex-col w-full h-full px-4 py-6 md:flex-row max-w-7xl'>
      <LeftSidePanel />
      <Outlet />
    </div>
  );
}

function LeftSidePanel() {
  const { authenticatedUser } = useContext(AuthContext);

  return (
    <div id='profile-sidebar-wrapper' className='flex flex-col gap-5 py-6 pr-6 w-[18.5rem]'>
      <div className='flex items-center justify-between gap-5'>
        <div className='avatar'>
          <div className='rounded-full w-14'>
            <img src='https://picsum.photos/200/200?random=1&grayscale' />
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <p className='text-lg'>Greetings,</p>
          <p className='text-lg text-primary'>{authenticatedUser?.username && authenticatedUser.username}</p>
        </div>
      </div>
      <nav>
        <ul className='flex flex-col'>
          <li>
            <NavLink
              to='account'
              className={({ isActive }) =>
                `flex items-center justify-start w-full h-full gap-2 px-2 font-normal btn btn-sm btn-ghost py-1.5 ${
                  isActive && 'btn-active'
                }`
              }
            >
              <span>
                <FontAwesomeIcon icon={faUser} className='w-4 h-4' />
              </span>
              <span className='flex items-center justify-start text-sm'>Edit My Account</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='blog'
              className={({ isActive }) =>
                `flex items-center justify-start w-full h-full gap-2 px-2 font-normal btn btn-sm btn-ghost py-1.5 ${
                  isActive && 'btn-active'
                }`
              }
            >
              <span>
                <FontAwesomeIcon icon={faPenToSquare} className='w-4 h-4' />
              </span>
              <span className='flex items-center justify-start text-sm'>Edit My Blogs</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export function ProfileEditIndex() {
  return <Navigate to='account' replace />;
}

export function ProfileEditAccount() {
  const { authenticatedUser } = useContext(AuthContext);
  const { emails } = useLoaderData();
  const issues = useActionData() || {};
  let defaultValues = {};
  switch (authenticatedUser?.role) {
    case 'Admin':
      defaultValues = useData(`${API_URL}/admins/admin-with-logins-and-addresses-by-id/${authenticatedUser.adminId}`);
      break;
    case 'Trainer':
      defaultValues = useData(
        `${API_URL}/trainers/trainer-with-logins-and-addresses-by-id/${authenticatedUser.trainerId}`
      );
      break;
    case 'Member':
      defaultValues = useData(
        `${API_URL}/members/member-with-logins-and-addresses-by-id/${authenticatedUser.memberId}`
      );
      break;
    default:
      defaultValues = {};
  }

  /* TODO 1 Profile account page for member => (1) custom Hook to fetch current user's form data as default value (endpoint with joined query), (2) customized API to update address based on memberId (hidden input), (3) 2 buttons with name attr in order to handle 2 forms with 1 action */

  return (
    <div className='flex-grow px-4 py-6'>
      <h1 className='font-sans text-3xl text-primary-content'>Edit My Account</h1>
      <Form method='post' noValidate className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'>
        {authenticatedUser?.role === 'Admin' ? (
          <>
            <InputSmallGroupEmail issue={issues?.email} defaultValue='demoadmin@gmail.com' emails={emails} />
            <InputSmallGroupPass issue={issues?.password} defaultValue='abcd1234' />
            <InputSmallGroup name='username' type='text' issue={issues?.username} defaultValue='demoadmin' />
            <InputSmallGroup name='firstName' type='text' issue={issues?.firstName} defaultValue='Demo' />
            <InputSmallGroup name='lastName' type='text' issue={issues?.lastName} defaultValue='Admin' />
            <InputSmallGroup name='phone' type='tel' issue={issues?.phone} defaultValue='0123456789' />
            {/* TODO 3 Profile account route for admin */}
            {/* TODO 4 "My Bookings" button for member and trainer && cond rendering edit button only for their own bookings */}
          </>
        ) : authenticatedUser?.role === 'Trainer' ? (
          <>
            <InputSmallGroupEmail issue={issues?.email} defaultValue='demotrainer@gmail.com' emails={emails} />
            <InputSmallGroupPass issue={issues?.password} defaultValue='abcd1234' />
            <InputSmallGroup name='username' type='text' issue={issues?.username} defaultValue='demotrainer' />
            <InputSmallGroup name='firstName' type='text' issue={issues?.firstName} defaultValue='Demo' />
            <InputSmallGroup name='lastName' type='text' issue={issues?.lastName} defaultValue='Trainer' />
            <InputSmallGroup name='phone' type='tel' issue={issues?.phone} defaultValue='0123456789' />
            {/* TODO 2 Profile account route for trainer */}
          </>
        ) : authenticatedUser?.role === 'Member' ? (
          <>
            <InputSmallGroupEmail issue={issues?.email} defaultValue='demomember@gmail.com' emails={emails} />
            <InputSmallGroupPass issue={issues?.password} defaultValue='abcd1234' />
            <InputSmallGroup name='username' type='text' issue={issues?.username} defaultValue='demomember' />
            <InputSmallGroup name='firstName' type='text' issue={issues?.firstName} defaultValue='Demo' />
            <InputSmallGroup name='lastName' type='text' issue={issues?.lastName} defaultValue='Member' />
            <InputSmallGroup name='phone' type='tel' issue={issues?.phone} defaultValue='0123456789' />
            <InputSmallGroup name='age' type='number' issue={issues?.age} isRequired={false} />
            <SelectSmallGroupGender issue={issues?.gender} defaultValue='' isRequired={false} />
          </>
        ) : (
          // <LoadingGlobal />
          <h1>TESTING LOADING</h1>
        )}
      </Form>
      <div className='divider'></div>
      <h1 className='font-sans text-3xl text-primary-content'>Edit My Address</h1>
      <Form method='post' noValidate className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'>
        <InputSmallGroup name='lineOne' type='text' issue={issues?.lineOne} defaultValue='123 Some St' />
        <InputSmallGroup name='lineTwo' type='text' issue={issues?.lineTwo} defaultValue='' />
        <InputSmallGroup name='suburb' type='text' issue={issues?.suburb} defaultValue='Brisbane City' />
        <InputSmallGroup name='postcode' type='text' issue={issues?.postcode} defaultValue='4000' />
        <InputSmallGroup name='state' type='text' issue={issues?.state} defaultValue='QLD' />
        <SelectSmallGroupCountry issue={issues?.country} defaultValue='Australia' />
      </Form>
    </div>
  );
}

export function ProfileEditBlog() {
  return (
    <div className='flex-grow px-4 py-6'>
      <h1 className='font-sans text-3xl text-primary-content'>Edit My Blog</h1>
      <img src='https://picsum.photos/500/300?random=2' />
    </div>
  );
}
