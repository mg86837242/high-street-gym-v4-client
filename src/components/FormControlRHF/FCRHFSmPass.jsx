import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

export default function FCRHFSmPass({ children, label, issue, isRequired, register }) {
  const [inputType, setInputType] = useState('password');
  const [icon, setIcon] = useState(faEyeSlash);

  function handleToggle(e) {
    e.stopPropagation();
    setInputType(inputType === 'password' ? 'text' : 'password');
    setIcon(icon === faEyeSlash ? faEye : faEyeSlash);
  }

  return (
    <div className='relative w-full form-control'>
      <label className='py-1 3xl:py-2 label'>
        <span className='label-text'>{label}:</span>
        {isRequired === false || <span className='label-text-alt'>Required</span>}
      </label>
      <input type={inputType} {...register('password')} className='input input-bordered input-sm' />
      <button type='button' onClick={handleToggle} className='absolute right-0 mr-3 cursor-pointer mt-8 3xl:mt-10'>
        <FontAwesomeIcon icon={icon} className='w-4 h-4' />
      </button>
      <label className='py-1 3xl:py-2 label'>
        {issue ? (
          <span className='text-rose-500 label-text-alt'>{issue}</span>
        ) : (
          <span className='label-text-alt'>Validation info will appear here</span>
        )}
      </label>
    </div>
  );
}