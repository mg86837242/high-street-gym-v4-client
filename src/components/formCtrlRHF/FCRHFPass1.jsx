import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

export default function FCRHFPass1Sm({ children, label, register, issue, isRequired }) {
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(faEyeSlash);

  function handleToggle(e) {
    e.stopPropagation();
    setType(type === 'password' ? 'text' : 'password');
    setIcon(icon === faEyeSlash ? faEye : faEyeSlash);
  }

  return (
    <div className='form-control relative w-full'>
      <label className='label py-1 3xl:py-2'>
        <span className='label-text'>{label}:</span>
        {isRequired === false || <span className='label-text-alt'>Required</span>}
      </label>
      <input
        type={type}
        {...register}
        placeholder={`Enter your ${label.toLowerCase()} ...`}
        className='input input-bordered input-sm placeholder:italic placeholder:text-gray-500'
      />
      <button type='button' onClick={handleToggle} className='absolute right-0 mr-3 mt-8 cursor-pointer 3xl:mt-10'>
        <FontAwesomeIcon icon={icon} className='h-4 w-4' />
      </button>
      <label className='label py-1 3xl:py-2'>
        {issue ? (
          <span className='label-text-alt text-rose-500'>{issue}</span>
        ) : (
          <span className='label-text-alt'>Validation info will appear here</span>
        )}
      </label>
    </div>
  );
}
