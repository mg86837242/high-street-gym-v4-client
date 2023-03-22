import { useContext, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { Outlet, NavLink, Navigate, useActionData, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPenToSquare, faEyeSlash, faEye } from '@fortawesome/free-regular-svg-icons';
import InputSmallGroup from '../UI/InputSmallGroup';

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
  // const { emails } = useLoaderData();
  const emails = [];
  const issues = useActionData();

  return (
    <div className='flex-grow px-4 py-6'>
      <h1 className='font-sans text-3xl text-primary-content'>Edit My Account</h1>
      <InputSmallGroupEmail issue={issues?.email} defaultValue='demomember@gmail.com' emails={emails} />
      <InputSmallGroupPass issue={issues?.password} defaultValue='abcd1234' />
      <InputSmallGroup name='username' type='text' issue={issues?.username} defaultValue='demomember' />
      <InputSmallGroup name='firstName' type='text' issue={issues?.firstName} defaultValue='Demo' />
      <InputSmallGroup name='lastName' type='text' issue={issues?.lastName} defaultValue='Member' />
      <InputSmallGroup name='phone' type='tel' issue={issues?.phone} defaultValue='0123456789' />
      <InputSmallGroup name='age' type='number' issue={issues?.age} isRequired={false} />
      <SelectSmallGroupGender issue={issues?.gender} isRequired={false} />
    </div>
  );
}

function InputSmallGroupEmail({ issue, emails, defaultValue, isRequired }) {
  const [input, setInput] = useState(defaultValue);
  const isDuplicate = emails.find((e) => input === e.email);

  return (
    <div id='email-input-group' className='w-full form-control'>
      <label htmlFor='email' className='py-1 3xl:py-2 label'>
        <span className='text-white label-text'>Email:</span>
        {isRequired === false || <span className='text-gray-500 label-text-alt'>Required</span>}
      </label>
      <input
        name='email'
        id='email'
        type='text'
        placeholder='Enter your email here'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className='w-full text-white input input-bordered input-primary input-sm'
      />
      <label htmlFor='email' className='py-1 3xl:py-2label'>
        {isDuplicate ? (
          <span className='text-rose-500 label-text-alt'>Email has already been used</span>
        ) : issue ? (
          <span className='text-rose-500 label-text-alt'>{issue}</span>
        ) : (
          <span className='text-gray-500 label-text-alt'>Validation information will appear here</span>
        )}
      </label>
    </div>
  );
}

function InputSmallGroupPass({ issue, defaultValue }) {
  const [inputType, setInputType] = useState('password');
  const [icon, setIcon] = useState(faEyeSlash);

  function handleToggle(e) {
    e.stopPropagation();
    setInputType(inputType === 'password' ? 'text' : 'password');
    setIcon(icon === faEyeSlash ? faEye : faEyeSlash);
  }

  return (
    <div id='password-group' className='relative w-full form-control'>
      <label htmlFor='password' className='py-1 3xl:py-2 label'>
        <span className='text-white label-text'>Password:</span>
        <span className='text-gray-500 label-text-alt'>Required</span>
      </label>
      <input
        name='password'
        id='password'
        type={inputType}
        placeholder='Enter your password here'
        defaultValue={defaultValue}
        className='w-full text-white input input-bordered input-primary input-sm'
      />
      <button type='button' onClick={handleToggle} className='absolute right-0 mr-3 cursor-pointer mt-9 3xl:mt-12'>
        <FontAwesomeIcon icon={icon} className='w-4 h-4' />
      </button>
      <label htmlFor='password' className='py-1 label'>
        {issue ? (
          <span className='text-rose-500 label-text-alt'>{issue}</span>
        ) : (
          <span className='text-gray-500 label-text-alt'>Validation information will appear here</span>
        )}
      </label>
    </div>
  );
}

function SelectSmallGroupGender({ issue, isRequired }) {
  return (
    <div id='gender-select-group' className='w-full form-control'>
      <label htmlFor='gender' className='py-1 3xl:py-2 label'>
        <span className='text-white label-text'>Gender:</span>
        {isRequired === false || <span className='text-gray-500 label-text-alt'>Required</span>}
      </label>
      <select
        name='gender'
        id='gender'
        defaultValue=''
        className='min-h-0 text-base font-normal select select-primary select-sm'
      >
        {/* NB If this option is disabled and its value (empty string) is used as defaultValue, the select's value will be null in the formData, i.e. DON'T disable this option */}
        <option value=''>-- Choose Gender --</option>
        <option value='Female'>Female</option>
        <option value='Male'>Male</option>
        <option value='Prefer not to say'>Prefer not to say</option>
      </select>
      <label htmlFor='gender' className='py-1 3xl:py-2 label'>
        {issue ? (
          <span className='text-rose-500 label-text-alt'>{issue}</span>
        ) : (
          <span className='text-gray-500 label-text-alt'>Validation information will appear here</span>
        )}
      </label>
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
