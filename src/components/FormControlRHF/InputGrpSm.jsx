export default function InputGrpSm({ children, labelText, issue, isRequired }) {
  return (
    <div className='w-full max-w-xs form-control'>
      <label className='py-1 3xl:py-2 label'>
        <span className='label-text'>{labelText}:</span>
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
