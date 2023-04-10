import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

export default function FCInputPass({ issue, initialValue }) {
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(faEyeSlash);

  function handleToggle(e) {
    e.stopPropagation();
    setType(type === 'password' ? 'text' : 'password');
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
        type={type}
        placeholder='Enter your password here'
        defaultValue={initialValue}
        className='w-full h-10 text-accent input input-primary 3xl:h-12'
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