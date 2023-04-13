import { useState } from 'react';

export default function FCInputSmEmail({ issue, emails, initialValue, isRequired }) {
  const [value, setValue] = useState(initialValue);
  const emailExists = value !== initialValue && emails.some(e => value === e.email);

  return (
    <div id='email-input-group' className='w-full form-control'>
      <label htmlFor='email' className='py-1 3xl:py-2 label'>
        <span className='text-accent label-text'>Email:</span>
        {isRequired === false || <span className='text-gray-500 label-text-alt'>Required</span>}
      </label>
      <input
        name='email'
        id='email'
        type='text'
        placeholder='Enter your email here'
        // NB The following 2 props imply this is a controlled input, see: https://react.dev/reference/react-dom/components/input#reference
        value={value}
        onChange={e => setValue(e.target.value)}
        className='text-accent input input-primary input-sm'
      />
      <label htmlFor='email' className='py-1 3xl:py-2 label'>
        {emailExists ? (
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
