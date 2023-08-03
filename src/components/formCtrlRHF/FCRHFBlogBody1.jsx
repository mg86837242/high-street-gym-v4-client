export default function FCRHFBlogBody1Sm({ children, label, register, issue, isRequired }) {
  return (
    <div className='form-control col-span-2 w-full xl:col-span-3'>
      <label className='label py-1 3xl:py-2'>
        <span className='label-text'>{label}:</span>
        {isRequired === false || <span className='label-text-alt'>Required</span>}
      </label>
      <textarea
        {...register}
        rows={10}
        placeholder={`Enter your ${label.toLowerCase()} ...`}
        className='textarea textarea-bordered placeholder:italic placeholder:text-gray-500'
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
