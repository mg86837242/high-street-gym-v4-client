import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { Outlet, NavLink, Navigate, useLoaderData, useActionData, Form } from 'react-router-dom';
import useDefaultValues from '../../hooks/useDefaultValues';
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
          <div className='w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
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
  const [statusText, setStatusText] = useState('');
  const [issues, setIssues] = useState({});
  const { emails } = useLoaderData();
  // TODO Form validation in action and input label, currently no validation messages
  const actionData = useActionData(null);
  const defaultValues = useDefaultValues();

  useEffect(() => {
    let ignore = false;
    if (actionData?.status === 200) {
      (async () => {
        setStatusText(`✅ ${actionData.message}`);
        await new Promise((res) => setTimeout(res, 5_000));
        setStatusText('');
      })();
    }
    return () => {
      ignore = true;
    };
  }, [actionData]);

  // if (actionData?.status === 200) {
  //   setStatusText(actionData.message);
  // }

  // [ ] 1.0 Profile account page for member => customized API to update address based on memberId (hidden input)
  // [ ] 2.0 Conditional input fields for trainers and admins (API & query => useDefaultValues)
  // [ ] 3.0 "Filter My Bookings" button for member and trainer && cond rendering edit button only for their own bookings

  // NB Need to check if `defaultValues` is truthy, o/w `undefined` will be passed as the `defaultValue` prop for
  //  following inputs before `defaultValues` is populated by the custom Hook, and `useEffect` will be needed to
  //  subscribe to the change of `defaultValues` from `undefined` to something
  return defaultValues ? (
    <div className='flex-grow px-4 py-6'>
      <h1 className='font-sans text-3xl text-primary-content'>Edit My Account</h1>
      <Form method='post' noValidate className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'>
        {/* (1) Shared input fields: */}
        <InputSmallGroupEmail issue={issues?.email} defaultValue={defaultValues?.email} emails={emails} />
        <InputSmallGroupPass issue={issues?.password} defaultValue={defaultValues?.password} />
        <InputSmallGroup name='username' type='text' issue={issues?.username} defaultValue={defaultValues?.username} />
        <InputSmallGroup
          name='firstName'
          type='text'
          issue={issues?.firstName}
          defaultValue={defaultValues?.firstName}
        />
        <InputSmallGroup name='lastName' type='text' issue={issues?.lastName} defaultValue={defaultValues?.lastName} />
        <InputSmallGroup name='phone' type='tel' issue={issues?.phone} defaultValue={defaultValues?.phone} />
        {/* (2) Conditional input fields: */}
        {authenticatedUser?.role === 'Admin' ? (
          <></>
        ) : authenticatedUser?.role === 'Trainer' ? (
          <></>
        ) : authenticatedUser?.role === 'Member' ? (
          <>
            <InputSmallGroup
              name='age'
              type='number'
              issue={issues?.age}
              defaultValue={defaultValues?.age}
              isRequired={false}
            />
            <SelectSmallGroupGender issue={issues?.gender} defaultValue={defaultValues?.gender} isRequired={false} />
            <input type='hidden' name='id' value={authenticatedUser.memberId} />
            <button type='submit' name='_action' value='updateMemberById' className='btn btn-primary btn-sm mt-4'>
              Save
            </button>
            <p className='text-success self-center mt-4'>{statusText}</p>
          </>
        ) : (
          <></>
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
        <input type='hidden' name='memberId' value={authenticatedUser.memberId} />
        <button type='submit' name='_action' value='updateAddressByMemberId' className='btn btn-primary btn-sm mt-5'>
          Save
        </button>
      </Form>
    </div>
  ) : (
    <></>
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
