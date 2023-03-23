import { useState, useEffect } from 'react';

export default function SelectSmallGroupGender({ issue, defaultValue, isRequired }) {
  const [selectedGender, setSelectedGender] = useState(defaultValue);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      setSelectedGender(defaultValue);
    }
    return () => {
      ignore = true;
    };
  }, [defaultValue]);
  // PS printing `selectedGender` fire thrice: (1) initial state in the `useState`, (2) `useEffect` sync with props
  //  passed down by parent component, with no `user` state/context, (3) `useEffect` sync with props passed down by
  //  parent component, with populated `user` state/context
  // console.log(`🟢 [${new Date().toLocaleTimeString()}] selectedGender: ${selectedGender}`);

  return (
    <div id='gender-select-group' className='w-full form-control'>
      <label htmlFor='gender' className='py-1 3xl:py-2 label'>
        <span className='text-white label-text'>Gender:</span>
        {isRequired === false || <span className='text-gray-500 label-text-alt'>Required</span>}
      </label>
      <select
        // NB This is actually a React component called `<select>`, see:
        //  -- https://stackoverflow.com/questions/5589629/value-attribute-on-select-tag-not-selecting-default-option/44798498#44798498
        //  -- https://react.dev/reference/react-dom/components/select#reference: "use `<select defaultValue>` for
        //  uncontrolled select boxes and `<select value>` for controlled select boxes."
        //  -- https://react.dev/reference/react-dom/components/select#controlling-a-select-box-with-a-state-variable:
        //  (1) "To render a controlled select box, pass the value prop to it. React will force the select box to always
        //  have the value you passed", (2) the pitfall section explains that an `onChange` event handler is a MUST
        //  -- https://www.geeksforgeeks.org/what-are-controlled-components-in-reactjs/
        name='gender'
        id='gender'
        value={selectedGender}
        onChange={(e) => setSelectedGender(e.target.value)}
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
