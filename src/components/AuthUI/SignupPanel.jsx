import { useState } from 'react';
import { Link, Form, useActionData, useLoaderData, useNavigation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import InputGroup from '../UI/InputGroup';
import Button1Full from '../UI/Button1Full';

export default function SignupPanel({ emails }) {
  return (
    <div
      id='signup-panel-wrapper'
      className='flex flex-col w-full max-w-lg md:max-w-2xl gap-6 px-10 pt-12 pb-8 my-auto bg-neutral rounded-xl shadow-[0_0_30px_15px_rgba(255,255,255,0.2)]'
    >
      <Directions />
      <SignupForm emails={emails} />
    </div>
  );
}

function Directions() {
  return (
    <div className='flex flex-col gap-5'>
      <p className='text-3xl font-extrabold focus:outline-none text-primary-content'>Sign up form</p>
      <p className='text-sm font-medium leading-none focus:outline-none text-primary-content'>
        Already have account?{' '}
        <Link
          to='/login'
          className={`text-sm font-medium leading-none underline cursor-pointer link link-primary focus:outline-none`}
        >
          Log in here
        </Link>
      </p>
    </div>
  );
}

function SignupForm({ emails }) {
  const issues = useActionData();
  const navigation = useNavigation();
  const statusText = navigation.state === 'submitting' ? 'Signing up...' : 'Signup';

  return (
    <Form method='post' className='grid w-full grid-cols-1 md:grid-cols-2 gap-x-5' noValidate>
      <InputGroupEmail issue={issues?.email} defaultValue='demomember@gmail.com' emails={emails} />
      <InputGroupPass issue={issues?.password} defaultValue='abcd1234' />
      <InputGroup name='username' type='text' issue={issues?.username} defaultValue='demomember' />
      <InputGroup name='firstName' type='text' issue={issues?.firstName} defaultValue='Demo' />
      <InputGroup name='lastName' type='text' issue={issues?.lastName} defaultValue='Member' />
      <InputGroup name='phone' type='tel' issue={issues?.phone} defaultValue='0123456789' />
      <InputGroup name='age' type='number' issue={issues?.age} isRequired={false} />
      <SelectGroupGender issue={issues?.gender} isRequired={false} />
      <div className='col-span-1 pt-4 md:col-span-2'>
        <Button1Full>{statusText}</Button1Full>
      </div>
    </Form>
  );
}

function InputGroupEmail({ issue, emails, defaultValue, isRequired }) {
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
        className='w-full h-10 text-white input input-bordered input-primary 3xl:h-12'
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

function InputGroupPass({ issue, defaultValue }) {
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
        className='w-full h-10 text-white input input-bordered input-primary 3xl:h-12'
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

function SelectGroupGender({ issue, isRequired }) {
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
        className='h-10 min-h-0 text-base font-normal select select-primary 3xl:h-12'
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
