export default function InputSmallGroup({ name, type, issue, defaultValue, isRequired }) {
  const id = name.replace(/([a-z])([A-Z])/g, "$1-$2");

  return (
    <div id={`${id}-input-group`} className="w-full form-control">
      <label htmlFor={id} className="py-1 3xl:py-2 label">
        <span className="text-white label-text">
          {name
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .slice(0, 1)
            .toUpperCase()}
          {name.replace(/([a-z])([A-Z])/g, "$1 $2").slice(1)}:
        </span>
        {isRequired === false || <span className="text-gray-500 label-text-alt">Required</span>}
      </label>
      <input
        name={name}
        id={id}
        type={type}
        placeholder={`Enter your ${name.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase()} here`}
        defaultValue={defaultValue}
        className="w-full text-white input input-bordered input-primary input-sm"
      />
      <label htmlFor={id} className="py-1 3xl:py-2 label">
        {issue ? (
          <span className="text-rose-500 label-text-alt">{issue}</span>
        ) : (
          <span className="text-gray-500 label-text-alt">Validation information will appear here</span>
        )}
      </label>
    </div>
  );
}
