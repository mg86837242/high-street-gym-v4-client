export default function FCInput({ name, type, issue, initialValue, isRequired }) {
  const id = name.replace(/([a-z])([A-Z])/g, '$1-$2');

  return (
    <div id={`${id}-input-group`} className='form-control w-full'>
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
        id={id}
        type={type}
        placeholder={`Enter your ${name.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()} here`}
        defaultValue={initialValue}
        className='input-primary input h-10 w-full text-accent 3xl:h-12'
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
