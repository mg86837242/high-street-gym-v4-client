import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../contexts/AuthContext';

export default function InputSmallGroupEmail({ issue, emails, defaultValue, isRequired }) {
  const { authenticatedUser } = useContext(AuthContext);
  const [input, setInput] = useState(defaultValue);
  const isDuplicate = input !== authenticatedUser?.email && emails.find((e) => input === e.email);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      setInput(defaultValue);
    }
    return () => {
      ignore = true;
    };
  }, [defaultValue]);

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
      <label htmlFor='email' className='py-1 3xl:py-2 label'>
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
