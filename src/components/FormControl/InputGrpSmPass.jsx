import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

export default function InputGrpSmPass({ issue, initialValue }) {
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
        <span className='text-accent label-text'>Password:</span>
        <span className='text-gray-500 label-text-alt'>Required</span>
      </label>
      <input
        name='password'
        id='password'
        type={inputType}
        placeholder='Enter your password here'
        defaultValue={initialValue}
        className='text-accent input input-bordered input-primary input-sm'
      />
      <button type='button' onClick={handleToggle} className='absolute right-0 mr-3 cursor-pointer mt-8 3xl:mt-10'>
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
