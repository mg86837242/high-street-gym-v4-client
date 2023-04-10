import { useState } from 'react';

export default function InputGrpEmail({ issue, emails, initialValue, isRequired }) {
  const [input, setInput] = useState(initialValue);
  const isDuplicate = emails.find(e => input === e.email);

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
        value={input}
        onChange={e => setInput(e.target.value)}
        className='w-full h-10 text-accent input input-primary 3xl:h-12'
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
