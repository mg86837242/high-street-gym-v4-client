export default function FCSelectSmGender({ issue, initialValue, isRequired }) {
  return (
    <div className='form-control w-full'>
      <label htmlFor='gender' className='label py-1 3xl:py-2'>
        <span className='label-text text-accent'>Gender:</span>
        {isRequired === false || <span className='label-text-alt text-gray-500'>Required</span>}
      </label>
      <select
        name='gender'
        // NB This is actually a React component called `<select>`, see:
        //  -- https://stackoverflow.com/questions/5589629/value-attribute-on-select-tag-not-selecting-default-option/44798498#44798498
        //  -- https://react.dev/reference/react-dom/components/select#reference: "use `<select defaultValue>` for
        //  uncontrolled select boxes and `<select value>` for controlled select boxes."
        defaultValue={initialValue}
        className='select-primary select select-sm font-normal'
      >
        {/* NB If this option is disabled and its value (empty string) is used as `defaultValue`, the `<select>`'s value will be null in the `request.formData`, i.e. DON'T disable this option if its value is used as `defaultValue`*/}
        <option value=''>-- Choose Gender --</option>
        <option value='Female'>Female</option>
        <option value='Male'>Male</option>
        <option value='Other'>Other</option>
      </select>
      <label htmlFor='gender' className='label py-1 3xl:py-2'>
        {issue ? (
          <span className='label-text-alt text-rose-500'>{issue}</span>
        ) : (
          <span className='label-text-alt text-gray-500'>Validation information will appear here</span>
        )}
      </label>
    </div>
  );
}
