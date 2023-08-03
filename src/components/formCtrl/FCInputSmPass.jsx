import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

export default function FCInputSmPass({ issue, initialValue }) {
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(faEyeSlash);

  function handleToggle(e) {
    e.stopPropagation();
    setType(type === 'password' ? 'text' : 'password');
    setIcon(icon === faEyeSlash ? faEye : faEyeSlash);
  }

  return (
    <div className='form-control relative w-full'>
      <label htmlFor='password' className='label py-1 3xl:py-2'>
        <span className='label-text text-accent'>Password:</span>
        <span className='label-text-alt text-gray-500'>Required</span>
      </label>
      <input
        name='password'
        type={type}
        placeholder='Enter your password here'
        defaultValue={initialValue}
        className='input input-primary input-sm text-accent'
      />
      <button type='button' onClick={handleToggle} className='absolute right-0 mr-3 mt-8 cursor-pointer 3xl:mt-10'>
        <FontAwesomeIcon icon={icon} className='h-4 w-4' />
      </button>
      <label htmlFor='password' className='label py-1'>
        {issue ? (
          <span className='label-text-alt text-rose-500'>{issue}</span>
        ) : (
          <span className='label-text-alt text-gray-500'>Validation information will appear here</span>
        )}
      </label>
    </div>
  );
}
