export default function FCRHFSmTextarea({ children, label, issue, isRequired }) {
  return (
    <div className='w-full form-control col-span-2 xl:col-span-3'>
      <label className='py-1 3xl:py-2 label'>
        <span className='label-text'>{label}:</span>
        {isRequired === false || <span className='label-text-alt'>Required</span>}
      </label>
      {children}
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
