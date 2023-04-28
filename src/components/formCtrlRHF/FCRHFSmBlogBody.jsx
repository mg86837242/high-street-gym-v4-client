export default function FCRHFSmBlogBody({ children, label, register, issue, isRequired }) {
  return (
    <div className='form-control col-span-2 w-full xl:col-span-3'>
      <label className='label py-1 3xl:py-2'>
        <span className='label-text'>{label}:</span>
        {isRequired === false || <span className='label-text-alt'>Required</span>}
      </label>
      <textarea
        {...register}
        rows={10}
        placeholder='Enter blog post body here ...'
        className='textarea-bordered textarea'
      />
      <label className='label py-1 3xl:py-2'>
        {issue ? (
          <span className='label-text-alt text-rose-500'>{issue}</span>
        ) : (
          <span className='label-text-alt'>Validation info will appear here</span>
        )}
      </label>
    </div>
  );
}
