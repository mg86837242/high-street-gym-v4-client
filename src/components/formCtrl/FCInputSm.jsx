export default function FCInputSm({ name, type, issue, initialValue, isRequired }) {
  return (
    <div className='form-control w-full'>
      <label htmlFor={id} className='label py-1 3xl:py-2'>
        <span className='label-text text-accent'>
          {name
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .slice(0, 1)
            .toUpperCase()}
          {name.replace(/([a-z])([A-Z])/g, '$1 $2').slice(1)}:
        </span>
        {isRequired === false || <span className='label-text-alt text-gray-500'>Required</span>}
      </label>
      <input
        name={name}
        type={type}
        placeholder={`Enter your ${name.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()} here`}
        defaultValue={initialValue}
        className='input-primary input input-sm text-accent'
      />
      <label htmlFor={id} className='label py-1 3xl:py-2'>
        {issue ? (
          <span className='label-text-alt text-rose-500'>{issue}</span>
        ) : (
          <span className='label-text-alt text-gray-500'>Validation information will appear here</span>
        )}
      </label>
    </div>
  );
}
