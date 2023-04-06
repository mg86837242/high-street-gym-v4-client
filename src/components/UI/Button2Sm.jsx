export default function Button2Sm({ children, type, form, onClick, w }) {
  return (
    <button
      type={type}
      form={form}
      onClick={onClick}
      className={`${w} shadow btn btn-primary btn-sm text-primary-content shadow-black/50`}
    >
      {children}
    </button>
  );
}
