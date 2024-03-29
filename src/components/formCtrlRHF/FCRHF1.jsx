export default function FCRHF1Sm({ children, label, type, register, issue, isRequired }) {
  return (
    <div className='form-control w-full'>
      <label className='label py-1 3xl:py-2'>
        <span className='label-text'>{label}:</span>
        {isRequired === false || <span className='label-text-alt'>Required</span>}
      </label>
      {children ? (
        children
      ) : (
        <input
          type={type || 'text'}
          {...register}
          placeholder={`Enter your ${label.toLowerCase()} ...`}
          className='input input-bordered input-sm placeholder:italic placeholder:text-gray-500'
        />
      )}
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
