export default function FCRHFSm({ children, label, type, register, issue, isRequired }) {
  return (
    <div className='w-full form-control'>
      <label className='py-1 3xl:py-2 label'>
        <span className='label-text'>{label}:</span>
        {isRequired === false || <span className='label-text-alt'>Required</span>}
      </label>
      {children ? children : <input type={type || 'text'} {...register} className='input input-bordered input-sm' />}
      <label className='py-1 3xl:py-2 label'>
        {issue ? (
          <span className='text-rose-500 label-text-alt'>{issue}</span>
        ) : (
          <span className='label-text-alt'>Validation info will appear here</span>
        )}
      </label>
    </div>
  );
}
