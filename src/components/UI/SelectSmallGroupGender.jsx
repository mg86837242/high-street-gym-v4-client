import { useState, useEffect } from 'react';

export default function SelectSmallGroupGender({ issue, defaultValue, isRequired }) {
  const [latestDefault, setLatestDefault] = useState('');

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      setLatestDefault(defaultValue);
    }
    return () => {
      ignore = true;
    };
  }, [defaultValue]);

  // console.log(`🟢 [${new Date().toLocaleTimeString()}] latestDefault: ${latestDefault}`);
  // ??? Default value doesn't work as intended, currently print "Male", but not reflected in the default selected option (also print `defaultValues` fires 4 times in `ProfilePanel` component)

  return (
    <div id='gender-select-group' className='w-full form-control'>
      <label htmlFor='gender' className='py-1 3xl:py-2 label'>
        <span className='text-white label-text'>Gender:</span>
        {isRequired === false || <span className='text-gray-500 label-text-alt'>Required</span>}
      </label>
      <select
        name='gender'
        id='gender'
        defaultValue={latestDefault}
        className='min-h-0 font-normal select select-primary select-sm'
      >
        {/* NB If this option is disabled and its value (empty string) is used as `defaultValue`, the `<select>`'s value will be null in the formData, i.e. DON'T disable this option if its value is used as `defaultValue`*/}
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
