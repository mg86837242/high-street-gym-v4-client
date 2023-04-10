export default function FCSelectSmGender({ issue, initialValue, isRequired }) {
  return (
    <div id='gender-select-group' className='w-full form-control'>
      <label htmlFor='gender' className='py-1 3xl:py-2 label'>
        <span className='text-accent label-text'>Gender:</span>
        {isRequired === false || <span className='text-gray-500 label-text-alt'>Required</span>}
      </label>
      <select
        name='gender'
        id='gender'
        // NB This is actually a React component called `<select>`, see:
        //  -- https://stackoverflow.com/questions/5589629/value-attribute-on-select-tag-not-selecting-default-option/44798498#44798498
        //  -- https://react.dev/reference/react-dom/components/select#reference: "use `<select defaultValue>` for
        //  uncontrolled select boxes and `<select value>` for controlled select boxes."
        defaultValue={initialValue}
        className='font-normal select select-primary select-sm'
      >
        {/* NB If this option is disabled and its value (empty string) is used as `defaultValue`, the `<select>`'s value will be null in the `request.formData`, i.e. DON'T disable this option if its value is used as `defaultValue`*/}
        <option value=''>-- Choose Gender --</option>
        <option value='Female'>Female</option>
        <option value='Male'>Male</option>
        <option value='Other'>Other</option>
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
