export default function SelectGroupGender({ issue, isRequired }) {
  return (
    <div id='gender-select-group' className='w-full form-control'>
      <label htmlFor='gender' className='py-1 3xl:py-2 label'>
        <span className='text-white label-text'>Gender:</span>
        {isRequired === false || <span className='text-gray-500 label-text-alt'>Required</span>}
      </label>
      <select
        name='gender'
        id='gender'
        // NB No update/effect will occur here, so use `<select defaultValue>` for uncontrolled select box would
        //  suffice, see:
        // -- https://react.dev/reference/react-dom/components/select#reference
        // -- https://react.dev/reference/react-dom/components/select#controlling-a-select-box-with-a-state-variable
        // -- https://www.geeksforgeeks.org/what-are-controlled-components-in-reactjs/
        defaultValue=''
        className='h-10 min-h-0 text-base font-normal select select-primary 3xl:h-12'
      >
        {/* NB If this option is disabled and its value (empty string) is used as defaultValue, the select's value will be null in the formData, i.e. DON'T disable this option */}
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
