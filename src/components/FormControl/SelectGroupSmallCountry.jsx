import * as data from '../../data/countries.json';

export default function SelectGroupSmallCountry({ issue, initialValue, isRequired }) {
  const countries = data.default;

  return (
    <div id='country-select-group' className='w-full form-control'>
      <label htmlFor='country' className='py-1 3xl:py-2 label'>
        <span className='text-white label-text'>Country:</span>
        {isRequired === false || <span className='text-gray-500 label-text-alt'>Required</span>}
      </label>
      <select
        name='country'
        id='country'
        defaultValue={initialValue}
        className='min-h-0 font-normal select select-primary select-sm'
      >
        <option value='' disabled>
          -- Choose Country --
        </option>
        {countries.map((c, i) => (
          <option value={c.name} key={i}>
            {c.name}
          </option>
        ))}
      </select>
      <label htmlFor='country' className='py-1 3xl:py-2 label'>
        {issue ? (
          <span className='text-rose-500 label-text-alt'>{issue}</span>
        ) : (
          <span className='text-gray-500 label-text-alt'>Validation information will appear here</span>
        )}
      </label>
    </div>
  );
}
