export default function FCSelectGender({ issue, isRequired }) {
  return (
    <div className='form-control w-full'>
      <label htmlFor='gender' className='label py-1 3xl:py-2'>
        <span className='label-text text-accent'>Gender:</span>
        {isRequired === false || <span className='label-text-alt text-gray-500'>Required</span>}
      </label>
      <select
        name='gender'
        defaultValue=''
        className='select select-primary h-10 min-h-0 text-base font-normal 3xl:h-12'
      >
        {/* NB If this option is disabled and its value (empty string) is used as `defaultValue`, the `<select>`'s value will be null in the `request.formData`, i.e. DON'T disable this option if its value is used as `defaultValue` */}
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
